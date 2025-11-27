import { Table } from "@/components/ui/table";
import { TablePagination } from "@/components/ui/table-pagination";
import { useTable } from "@/hooks/useTable";
import { getUserColumns, getPostColumns } from "@/config/table-columns";
import type { User } from "@/services/userService";
import type { Post } from "@/services/postService";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { useState } from "react";

const meta = {
  title: "Components/Table",
  component: Table,
  parameters: {
    layout: "padded",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof Table>;

export default meta;
type Story = StoryObj<typeof meta>;

// 샘플 User 데이터
const sampleUsers: User[] = [
  {
    id: 1,
    username: "john_doe",
    email: "john@example.com",
    role: "admin",
    status: "active",
    createdAt: "2024-01-15",
    lastLogin: "2024-03-20",
  },
  {
    id: 2,
    username: "jane_smith",
    email: "jane@example.com",
    role: "moderator",
    status: "active",
    createdAt: "2024-02-10",
    lastLogin: "2024-03-19",
  },
  {
    id: 3,
    username: "bob_wilson",
    email: "bob@example.com",
    role: "user",
    status: "inactive",
    createdAt: "2024-01-20",
    lastLogin: "2024-02-15",
  },
  {
    id: 4,
    username: "alice_brown",
    email: "alice@example.com",
    role: "user",
    status: "active",
    createdAt: "2024-03-01",
    lastLogin: "2024-03-18",
  },
  {
    id: 5,
    username: "charlie_davis",
    email: "charlie@example.com",
    role: "user",
    status: "suspended",
    createdAt: "2024-02-20",
    lastLogin: "2024-03-10",
  },
];

// 샘플 Post 데이터
const samplePosts: Post[] = [
  {
    id: 1,
    title: "React 19 새로운 기능 소개",
    content: "React 19의 주요 기능들을 살펴봅니다.",
    author: "김개발",
    category: "development",
    status: "published",
    views: 1523,
    createdAt: "2024-03-15",
    updatedAt: "2024-03-16",
  },
  {
    id: 2,
    title: "디자인 시스템 구축하기",
    content: "효율적인 디자인 시스템 구축 방법",
    author: "박디자인",
    category: "design",
    status: "published",
    views: 892,
    createdAt: "2024-03-10",
    updatedAt: "2024-03-11",
  },
  {
    id: 3,
    title: "웹 접근성 가이드",
    content: "모든 사용자를 위한 웹 접근성",
    author: "이접근",
    category: "accessibility",
    status: "draft",
    views: 234,
    createdAt: "2024-03-18",
  },
  {
    id: 4,
    title: "TypeScript 고급 테크닉",
    content: "TypeScript를 활용한 타입 안전성 향상",
    author: "최타입",
    category: "development",
    status: "published",
    views: 2341,
    createdAt: "2024-03-12",
    updatedAt: "2024-03-13",
  },
  {
    id: 5,
    title: "컴포넌트 아키텍처 패턴",
    content: "재사용 가능한 컴포넌트 설계",
    author: "정아키",
    category: "development",
    status: "archived",
    views: 567,
    createdAt: "2024-02-28",
    updatedAt: "2024-03-01",
  },
];

// User Table Playground
const UserTableComponent = () => {
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  const columns = getUserColumns({
    onEdit: (user) => {
      alert(`수정: ${user.username}`);
      setSelectedUser(user);
    },
    onDelete: (id) => {
      if (confirm("정말 삭제하시겠습니까?")) {
        alert(`사용자 ID ${id} 삭제`);
      }
    },
  });

  const table = useTable({
    data: sampleUsers,
    columns,
    itemsPerPage: 5,
    searchable: true,
  });

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold">사용자 관리 테이블</h3>
        <input
          type="text"
          placeholder="검색..."
          value={table.searchTerm}
          onChange={(e) => table.setSearchTerm(e.target.value)}
          className="px-3 py-2 border border-gray-300 rounded-md w-64"
        />
      </div>

      {selectedUser && (
        <div className="p-4 bg-blue-50 border border-blue-200 rounded-md">
          <p className="font-medium">선택된 사용자:</p>
          <p className="text-sm">
            {selectedUser.username} ({selectedUser.email})
          </p>
        </div>
      )}

      <div className="border rounded-lg overflow-hidden">
        <Table table={table} striped hover />
        <TablePagination table={table} />
      </div>
    </div>
  );
};

export const UserTable: Story = {
  render: () => <UserTableComponent />,
};

// Post Table Playground
const PostTableComponent = () => {
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);

  const columns = getPostColumns({
    onEdit: (post) => {
      alert(`수정: ${post.title}`);
      setSelectedPost(post);
    },
    onDelete: (id) => {
      if (confirm("정말 삭제하시겠습니까?")) {
        alert(`게시글 ID ${id} 삭제`);
      }
    },
    onPublish: (id) => {
      alert(`게시글 ID ${id} 게시`);
    },
    onArchive: (id) => {
      alert(`게시글 ID ${id} 보관`);
    },
    onRestore: (id) => {
      alert(`게시글 ID ${id} 복원`);
    },
  });

  const table = useTable({
    data: samplePosts,
    columns,
    itemsPerPage: 5,
    searchable: true,
  });

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold">게시글 관리 테이블</h3>
        <input
          type="text"
          placeholder="검색..."
          value={table.searchTerm}
          onChange={(e) => table.setSearchTerm(e.target.value)}
          className="px-3 py-2 border border-gray-300 rounded-md w-64"
        />
      </div>

      {selectedPost && (
        <div className="p-4 bg-blue-50 border border-blue-200 rounded-md">
          <p className="font-medium">선택된 게시글:</p>
          <p className="text-sm">
            {selectedPost.title} - {selectedPost.author}
          </p>
        </div>
      )}

      <div className="border rounded-lg overflow-hidden">
        <Table table={table} striped hover />
        <TablePagination table={table} />
      </div>
    </div>
  );
};

export const PostTable: Story = {
  render: () => <PostTableComponent />,
};
