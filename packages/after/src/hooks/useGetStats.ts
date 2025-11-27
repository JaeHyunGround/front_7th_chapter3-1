import type { Post } from "@/services/postService";
import type { User } from "@/services/userService";

export const useGetStats = (
  data: (User | Post)[],
  entityType: "user" | "post"
) => {
  const getStats = () => {
    if (entityType === "user") {
      const users = data as User[];
      return [
        {
          type: "blue",
          label: "전체",
          value: users.length,
        },
        {
          type: "green",
          label: "활성",
          value: users.filter((u) => u.status === "active").length,
        },
        {
          type: "orange",
          label: "비활성",
          value: users.filter((u) => u.status === "inactive").length,
        },
        {
          type: "red",
          label: "정지",
          value: users.filter((u) => u.status === "suspended").length,
        },
        {
          type: "gray",
          label: "관리자",
          value: users.filter((u) => u.role === "admin").length,
        },
      ] as const;
    } else {
      const posts = data as Post[];
      return [
        {
          type: "blue",
          label: "전체",
          value: posts.length,
        },
        {
          type: "green",
          label: "게시됨",
          value: posts.filter((p) => p.status === "published").length,
        },
        {
          type: "orange",
          label: "임시저장",
          value: posts.filter((p) => p.status === "draft").length,
        },
        {
          type: "red",
          label: "보관됨",
          value: posts.filter((p) => p.status === "archived").length,
        },
        {
          type: "gray",
          label: "총 조회수",
          value: posts.reduce((sum, p) => sum + p.views, 0),
        },
      ] as const;
    }
  };

  const stats = getStats();

  return { stats };
};
