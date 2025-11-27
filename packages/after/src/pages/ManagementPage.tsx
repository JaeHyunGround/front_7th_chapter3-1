/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState, useEffect } from "react";
import { userService } from "../services/userService";
import { postService } from "../services/postService";
import type { User } from "../services/userService";
import type { Post } from "../services/postService";
import { Button } from "@/components/ui/button";
import { Alert } from "@/components/ui/alert";
import { Modal } from "@/components/ui/modal";
import { Table } from "@/components/ui/table";
import { TablePagination } from "@/components/ui/table-pagination";
import { useTable } from "@/hooks/useTable";
import { getUserColumns, getPostColumns } from "@/config/table-columns";
import { StatsCard } from "@/components/ui/stats-card";
import { useGetStats } from "@/hooks/useGetStats";
import { UserForm } from "@/components/ui/user-form";
import { PostForm } from "@/components/ui/post-form";
import type { UserFormData, PostFormData } from "@/lib/validation";

type EntityType = "user" | "post";
type Entity = User | Post;

export const ManagementPage: React.FC = () => {
  const [entityType, setEntityType] = useState<EntityType>("post");
  const [data, setData] = useState<Entity[]>([]);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<Entity | null>(null);
  const [showSuccessAlert, setShowSuccessAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [showErrorAlert, setShowErrorAlert] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const [editFormData, setEditFormData] = useState<Partial<UserFormData | PostFormData>>({});

  const { stats } = useGetStats(data, entityType);

  useEffect(() => {
    loadData();
    setIsCreateModalOpen(false);
    setIsEditModalOpen(false);
    setSelectedItem(null);
    setEditFormData({});
  }, [entityType]);

  const loadData = async () => {
    try {
      let result: Entity[];

      if (entityType === "user") {
        result = await userService.getAll();
      } else {
        result = await postService.getAll();
      }

      setData(result);
    } catch (error: any) {
      console.error(error);
      setErrorMessage("데이터를 불러오는데 실패했습니다");
      setShowErrorAlert(true);
    }
  };

  const handleCreateUser = async (data: UserFormData) => {
    try {
      await userService.create({
        username: data.username,
        email: data.email,
        role: data.role,
        status: data.status,
      });
      await loadData();
      setIsCreateModalOpen(false);
      setAlertMessage("사용자가 생성되었습니다");
      setShowSuccessAlert(true);
    } catch (error: any) {
      setErrorMessage(error.message || "생성에 실패했습니다");
      setShowErrorAlert(true);
    }
  };

  const handleCreatePost = async (data: PostFormData) => {
    try {
      await postService.create({
        title: data.title,
        content: data.content || "",
        author: data.author,
        category: data.category,
        status: "draft",
      });
      await loadData();
      setIsCreateModalOpen(false);
      setAlertMessage("게시글이 생성되었습니다");
      setShowSuccessAlert(true);
    } catch (error: any) {
      setErrorMessage(error.message || "생성에 실패했습니다");
      setShowErrorAlert(true);
    }
  };

  const handleEdit = (item: Entity) => {
    setSelectedItem(item);

    if (entityType === "user") {
      const user = item as User;
      setEditFormData({
        username: user.username,
        email: user.email,
        role: user.role,
        status: user.status,
      });
    } else {
      const post = item as Post;
      setEditFormData({
        title: post.title,
        content: post.content,
        author: post.author,
        category: post.category as "development" | "design" | "accessibility",
      });
    }

    setIsEditModalOpen(true);
  };

  const handleUpdateUser = async (data: UserFormData) => {
    if (!selectedItem) return;

    try {
      await userService.update(selectedItem.id, data);
      await loadData();
      setIsEditModalOpen(false);
      setEditFormData({});
      setSelectedItem(null);
      setAlertMessage("사용자가 수정되었습니다");
      setShowSuccessAlert(true);
    } catch (error: any) {
      setErrorMessage(error.message || "수정에 실패했습니다");
      setShowErrorAlert(true);
    }
  };

  const handleUpdatePost = async (data: PostFormData) => {
    if (!selectedItem) return;

    try {
      await postService.update(selectedItem.id, data);
      await loadData();
      setIsEditModalOpen(false);
      setEditFormData({});
      setSelectedItem(null);
      setAlertMessage("게시글이 수정되었습니다");
      setShowSuccessAlert(true);
    } catch (error: any) {
      setErrorMessage(error.message || "수정에 실패했습니다");
      setShowErrorAlert(true);
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm("정말 삭제하시겠습니까?")) return;

    try {
      if (entityType === "user") {
        await userService.delete(id);
      } else {
        await postService.delete(id);
      }

      await loadData();
      setAlertMessage("삭제되었습니다");
      setShowSuccessAlert(true);
    } catch (error: any) {
      setErrorMessage(error.message || "삭제에 실패했습니다");
      setShowErrorAlert(true);
    }
  };

  const handleStatusAction = async (
    id: number,
    action: "publish" | "archive" | "restore"
  ) => {
    if (entityType !== "post") return;

    try {
      if (action === "publish") {
        await postService.publish(id);
      } else if (action === "archive") {
        await postService.archive(id);
      } else if (action === "restore") {
        await postService.restore(id);
      }

      await loadData();
      const message =
        action === "publish" ? "게시" : action === "archive" ? "보관" : "복원";
      setAlertMessage(`${message}되었습니다`);
      setShowSuccessAlert(true);
    } catch (error: any) {
      setErrorMessage(error.message || "작업에 실패했습니다");
      setShowErrorAlert(true);
    }
  };

  // Column 설정
  const columns =
    entityType === "user"
      ? getUserColumns({
          onEdit: handleEdit,
          onDelete: handleDelete,
        })
      : getPostColumns({
          onEdit: handleEdit,
          onDelete: handleDelete,
          onPublish: (id: number) => handleStatusAction(id, "publish"),
          onArchive: (id: number) => handleStatusAction(id, "archive"),
          onRestore: (id: number) => handleStatusAction(id, "restore"),
        });

  const table = useTable({
    data: data as any,
    columns: columns as any,
    itemsPerPage: 10,
    searchable: true,
  });

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="max-w-[1200px] mx-auto p-5">
        <div className="mb-5">
          <h1 className="text-2xl font-bold md-1 text-gray-800">관리 시스템</h1>

          <p className="text-gray-500 text-sm">사용자와 게시글을 관리하세요</p>
        </div>

        <div className="bg-white border border-gray-300 p-2.5">
          <div className="mb-4 border-b-2 border-gray-300 pb-2 flex gap-1">
            <Button
              onClick={() => setEntityType("post")}
              variant={entityType === "post" ? "blue" : "gray"}
              size="md"
            >
              게시글
            </Button>
            <Button
              onClick={() => setEntityType("user")}
              variant={entityType === "user" ? "blue" : "gray"}
              size="md"
            >
              사용자
            </Button>
          </div>

          <div>
            <div className="mb-4 text-right">
              <Button
                variant="blue"
                size="md"
                onClick={() => setIsCreateModalOpen(true)}
              >
                새로 만들기
              </Button>
            </div>

            {showSuccessAlert && (
              <div style={{ marginBottom: "10px" }}>
                <Alert
                  variant="success"
                  title="성공"
                  onClose={() => setShowSuccessAlert(false)}
                >
                  {alertMessage}
                </Alert>
              </div>
            )}

            {showErrorAlert && (
              <div style={{ marginBottom: "10px" }}>
                <Alert
                  variant="error"
                  title="오류"
                  onClose={() => setShowErrorAlert(false)}
                >
                  {errorMessage}
                </Alert>
              </div>
            )}

            <div className="grid gap-2.5 mb-4 grid-cols-[repeat(auto-fit,minmax(130px,1fr))]">
              {stats.map(({ type, label, value }, index) => (
                <StatsCard
                  key={index}
                  type={type}
                  label={label}
                  value={value}
                />
              ))}
            </div>

            <div className="border border-gray-300 bg-white overflow-auto">
              <Table table={table} striped hover />
              <TablePagination table={table} />
            </div>
          </div>
        </div>
      </div>

      <Modal
        isOpen={isCreateModalOpen}
        onClose={() => {
          setIsCreateModalOpen(false);
        }}
        title={`새 ${entityType === "user" ? "사용자" : "게시글"} 만들기`}
        size="large"
        showFooter
        footerContent={
          <>
            <Button
              variant="gray"
              size="md"
              onClick={() => {
                setIsCreateModalOpen(false);
              }}
            >
              취소
            </Button>
            <Button
              variant="blue"
              size="md"
              type="submit"
              form={entityType === "user" ? "create-user-form" : "create-post-form"}
            >
              생성
            </Button>
          </>
        }
      >
        {entityType === "user" ? (
          <UserForm
            formId="create-user-form"
            onSubmit={handleCreateUser}
          />
        ) : (
          <PostForm
            formId="create-post-form"
            onSubmit={handleCreatePost}
          />
        )}
      </Modal>

      <Modal
        isOpen={isEditModalOpen}
        onClose={() => {
          setIsEditModalOpen(false);
          setEditFormData({});
          setSelectedItem(null);
        }}
        title={`${entityType === "user" ? "사용자" : "게시글"} 수정`}
        size="large"
        showFooter
        footerContent={
          <>
            <Button
              variant="gray"
              size="md"
              onClick={() => {
                setIsEditModalOpen(false);
                setEditFormData({});
                setSelectedItem(null);
              }}
            >
              취소
            </Button>
            <Button
              variant="blue"
              size="md"
              type="submit"
              form={entityType === "user" ? "edit-user-form" : "edit-post-form"}
            >
              수정 완료
            </Button>
          </>
        }
      >
        <div>
          {selectedItem && (
            <Alert variant="info" className="mb-[16px]">
              ID: {selectedItem.id} | 생성일: {selectedItem.createdAt}
              {entityType === "post" &&
                ` | 조회수: ${(selectedItem as Post).views}`}
            </Alert>
          )}

          {entityType === "user" ? (
            <UserForm
              formId="edit-user-form"
              defaultValues={editFormData as Partial<UserFormData>}
              onSubmit={handleUpdateUser}
            />
          ) : (
            <PostForm
              formId="edit-post-form"
              defaultValues={editFormData as Partial<PostFormData>}
              onSubmit={handleUpdatePost}
            />
          )}
        </div>
      </Modal>
    </div>
  );
};
