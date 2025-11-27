import type { Column } from "@/hooks/useTable";
import type { User } from "@/services/userService";
import type { Post } from "@/services/postService";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

// User 테이블 액션 핸들러 타입
export interface UserTableActions {
  onEdit?: (user: User) => void;
  onDelete?: (id: number) => void;
}

// Post 테이블 액션 핸들러 타입
export interface PostTableActions {
  onEdit?: (post: Post) => void;
  onDelete?: (id: number) => void;
  onPublish?: (id: number) => void;
  onArchive?: (id: number) => void;
  onRestore?: (id: number) => void;
}

// User 테이블 컬럼 정의
export const getUserColumns = (actions: UserTableActions): Column<User>[] => [
  {
    key: "id",
    header: "ID",
  },
  {
    key: "username",
    header: "사용자명",
  },
  {
    key: "email",
    header: "이메일",
  },
  {
    key: "role",
    header: "역할",
    render: (user) => {
      if (!user.role) return "-";
      const roleConfig: Record<
        User["role"],
        { variant: "red" | "orange" | "blue"; label: string }
      > = {
        admin: { variant: "red", label: "관리자" },
        moderator: { variant: "orange", label: "운영자" },
        user: { variant: "blue", label: "사용자" },
      };
      const config = roleConfig[user.role as User["role"]];
      if (!config) return String(user.role);
      return <Badge variant={config.variant}>{config.label}</Badge>;
    },
  },
  {
    key: "status",
    header: "상태",
    render: (user) => {
      if (!user.status) return "-";
      const statusConfig: Record<
        User["status"],
        { variant: "green" | "gray" | "red"; label: string }
      > = {
        active: { variant: "green", label: "Active" },
        inactive: { variant: "gray", label: "Inactive" },
        suspended: { variant: "red", label: "Suspended" },
      };
      const config = statusConfig[user.status as User["status"]];
      if (!config) return String(user.status);
      return <Badge variant={config.variant}>{config.label}</Badge>;
    },
  },
  {
    key: "createdAt",
    header: "생성일",
  },
  {
    key: "lastLogin",
    header: "마지막 로그인",
    render: (user) => user.lastLogin || "-",
  },
  {
    key: "actions",
    header: "관리",
    sortable: false,
    render: (user) => (
      <div style={{ display: "flex", gap: "8px" }}>
        <Button size="sm" variant="blue" onClick={() => actions.onEdit?.(user)}>
          수정
        </Button>
        <Button
          size="sm"
          variant="red"
          onClick={() => actions.onDelete?.(user.id)}
        >
          삭제
        </Button>
      </div>
    ),
  },
];

// Post 테이블 컬럼 정의
export const getPostColumns = (actions: PostTableActions): Column<Post>[] => [
  {
    key: "id",
    header: "ID",
  },
  {
    key: "title",
    header: "제목",
  },
  {
    key: "author",
    header: "작성자",
  },
  {
    key: "category",
    header: "카테고리",
    render: (post) => {
      if (!post.category) return "-";
      const type =
        post.category === "development"
          ? "blue"
          : post.category === "design"
            ? "blue"
            : post.category === "accessibility"
              ? "red"
              : "gray";
      return (
        <Badge variant={type} shape="pill">
          {String(post.category)}
        </Badge>
      );
    },
  },
  {
    key: "status",
    header: "상태",
    render: (post) => {
      if (!post.status) return "-";
      const statusConfig: Record<
        Post["status"],
        { variant: "green" | "orange" | "gray"; label: string }
      > = {
        published: { variant: "green", label: "게시됨" },
        draft: { variant: "orange", label: "임시저장" },
        archived: { variant: "gray", label: "보관됨" },
      };
      const config = statusConfig[post.status as Post["status"]];
      if (!config) return String(post.status);
      return <Badge variant={config.variant}>{config.label}</Badge>;
    },
  },
  {
    key: "views",
    header: "조회수",
    render: (post) => post.views?.toLocaleString() || "0",
  },
  {
    key: "createdAt",
    header: "작성일",
  },
  {
    key: "actions",
    header: "관리",
    sortable: false,
    render: (post) => (
      <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
        <Button size="sm" variant="blue" onClick={() => actions.onEdit?.(post)}>
          수정
        </Button>
        {post.status === "draft" && (
          <Button
            size="sm"
            variant="green"
            onClick={() => actions.onPublish?.(post.id)}
          >
            게시
          </Button>
        )}
        {post.status === "published" && (
          <Button
            size="sm"
            variant="gray"
            onClick={() => actions.onArchive?.(post.id)}
          >
            보관
          </Button>
        )}
        {post.status === "archived" && (
          <Button
            size="sm"
            variant="blue"
            onClick={() => actions.onRestore?.(post.id)}
          >
            복원
          </Button>
        )}
        <Button
          size="sm"
          variant="red"
          onClick={() => actions.onDelete?.(post.id)}
        >
          삭제
        </Button>
      </div>
    ),
  },
];
