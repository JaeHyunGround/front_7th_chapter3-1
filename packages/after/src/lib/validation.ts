/**
 * Form validation schemas using Zod
 * react-hook-form과 함께 사용하기 위한 검증 스키마
 */

import { z } from "zod";

/**
 * 사용자 생성/수정 스키마
 */
export const userSchema = z.object({
  username: z
    .string()
    .min(3, "사용자명은 3자 이상이어야 합니다")
    .max(20, "사용자명은 20자 이하여야 합니다")
    .regex(/^[a-zA-Z0-9_]+$/, "영문, 숫자, 언더스코어만 사용 가능합니다")
    .refine(
      (val) =>
        !["admin", "root", "system", "administrator"].includes(
          val.toLowerCase()
        ),
      "이미 존재하는 사용자명입니다"
    ),
  email: z
    .string()
    .min(1, "이메일을 입력해주세요")
    .email("올바른 이메일 형식이 아닙니다"),
  role: z.union([
    z.literal("user"),
    z.literal("moderator"),
    z.literal("admin"),
  ]),
  status: z.union([
    z.literal("active"),
    z.literal("inactive"),
    z.literal("suspended"),
  ]),
});

/**
 * 게시글 생성/수정 스키마
 */
export const postSchema = z.object({
  title: z
    .string()
    .min(5, "제목은 5자 이상이어야 합니다")
    .max(100, "제목은 100자 이하여야 합니다")
    .refine(
      (val) => !["광고", "스팸", "홍보"].some((word) => val.includes(word)),
      "제목에 금지된 단어가 포함되어 있습니다"
    ),
  author: z.string().min(1, "작성자를 입력해주세요"),
  category: z.union([
    z.literal("development"),
    z.literal("design"),
    z.literal("accessibility"),
  ]),
  content: z.string().optional(),
  status: z
    .union([z.literal("draft"), z.literal("published"), z.literal("archived")])
    .optional(),
});

/**
 * TypeScript 타입 추출
 */
export type UserFormData = z.infer<typeof userSchema>;
export type PostFormData = z.infer<typeof postSchema>;
