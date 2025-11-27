import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { postSchema, type PostFormData } from "@/lib/validation";
import { Input } from "./input";
import { Label } from "./label";
import { Textarea } from "./textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./select";

interface PostFormProps {
  defaultValues?: Partial<PostFormData>;
  onSubmit: (data: PostFormData) => void | Promise<void>;
  formId?: string;
}

export function PostForm({ defaultValues, onSubmit, formId = "post-form" }: PostFormProps) {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<PostFormData>({
    resolver: zodResolver(postSchema),
    defaultValues: {
      title: "",
      author: "",
      category: "development",
      content: "",
      ...defaultValues,
    },
  });

  return (
    <form id={formId} onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      {/* Title Field */}
      <div className="space-y-2">
        <Label htmlFor="title">
          제목
          <span className="ml-1 text-destructive">*</span>
        </Label>
        <Input
          id="title"
          {...register("title")}
          placeholder="게시글 제목을 입력하세요"
          aria-invalid={!!errors.title}
        />
        {errors.title && (
          <p className="text-sm text-destructive">{errors.title.message}</p>
        )}
      </div>

      {/* Author and Category Fields */}
      <div className="grid grid-cols-2 gap-4">
        {/* Author Field */}
        <div className="space-y-2">
          <Label htmlFor="author">
            작성자
            <span className="ml-1 text-destructive">*</span>
          </Label>
          <Input
            id="author"
            {...register("author")}
            placeholder="작성자명"
            aria-invalid={!!errors.author}
          />
          {errors.author && (
            <p className="text-sm text-destructive">{errors.author.message}</p>
          )}
        </div>

        {/* Category Field */}
        <div className="space-y-2">
          <Label htmlFor="category">카테고리</Label>
          <Controller
            name="category"
            control={control}
            render={({ field }) => (
              <Select value={field.value} onValueChange={field.onChange}>
                <SelectTrigger id="category" aria-invalid={!!errors.category}>
                  <SelectValue placeholder="카테고리 선택" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="development">Development</SelectItem>
                  <SelectItem value="design">Design</SelectItem>
                  <SelectItem value="accessibility">Accessibility</SelectItem>
                </SelectContent>
              </Select>
            )}
          />
          {errors.category && (
            <p className="text-sm text-destructive">{errors.category.message}</p>
          )}
        </div>
      </div>

      {/* Content Field */}
      <div className="space-y-2">
        <Label htmlFor="content">내용</Label>
        <Textarea
          id="content"
          {...register("content")}
          placeholder="게시글 내용을 입력하세요"
          rows={6}
          aria-invalid={!!errors.content}
        />
        {errors.content && (
          <p className="text-sm text-destructive">{errors.content.message}</p>
        )}
      </div>
    </form>
  );
}
