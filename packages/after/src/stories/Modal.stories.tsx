import { Button } from "@/components/ui/button";
import { Modal } from "@/components/ui/modal";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { useState } from "react";

const meta = {
  title: "Components/Modal",
  component: Modal,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    size: {
      control: "select",
      options: ["small", "medium", "large"],
      description: "모달의 크기",
    },
    title: {
      control: "text",
      description: "모달 제목",
    },
    isOpen: {
      control: "boolean",
      description: "모달 열림 상태",
    },
    showFooter: {
      control: "boolean",
      description: "푸터 영역 표시 여부",
    },
    onClose: {
      action: "closed",
      description: "모달 닫기 핸들러",
    },
    children: {
      control: "text",
      description: "모달 내용",
    },
  },
} satisfies Meta<typeof Modal>;

export default meta;
type Story = StoryObj<typeof meta>;

// 기본 Playground
const PlaygroundComponent = (args: Story["args"]) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <Button onClick={() => setIsOpen(true)}>모달 열기</Button>
      <Modal {...args} isOpen={isOpen} onClose={() => setIsOpen(false)}>
        {args?.children}
      </Modal>
    </>
  );
};

export const Playground: Story = {
  render: (args) => <PlaygroundComponent {...args} />,
  args: {
    isOpen: false,
    onClose: () => {},
    title: "모달 제목",
    size: "medium",
    children: "이것은 모달의 내용입니다.",
    showFooter: false,
  },
};

// 다양한 크기와 옵션
const VariantsComponent = () => {
  const [openModal, setOpenModal] = useState<string | null>(null);

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h3 className="text-sm font-semibold mb-3 text-gray-700">크기</h3>
        <div className="flex gap-2">
          <Button onClick={() => setOpenModal("small")}>Small</Button>
          <Button onClick={() => setOpenModal("medium")}>Medium</Button>
          <Button onClick={() => setOpenModal("large")}>Large</Button>
        </div>
      </div>

      <div>
        <h3 className="text-sm font-semibold mb-3 text-gray-700">옵션</h3>
        <div className="flex gap-2">
          <Button onClick={() => setOpenModal("withFooter")}>
            푸터 포함
          </Button>
          <Button onClick={() => setOpenModal("noTitle")}>제목 없음</Button>
          <Button onClick={() => setOpenModal("longContent")}>
            긴 컨텐츠
          </Button>
        </div>
      </div>

      {/* 크기 예시 */}
      <Modal
        isOpen={openModal === "small"}
        onClose={() => setOpenModal(null)}
        title="Small 모달"
        size="small"
      >
        <p>작은 크기의 모달입니다 (max-w-[400px])</p>
      </Modal>

      <Modal
        isOpen={openModal === "medium"}
        onClose={() => setOpenModal(null)}
        title="Medium 모달"
        size="medium"
      >
        <p>중간 크기의 모달입니다 (max-w-[600px])</p>
      </Modal>

      <Modal
        isOpen={openModal === "large"}
        onClose={() => setOpenModal(null)}
        title="Large 모달"
        size="large"
      >
        <p>큰 크기의 모달입니다 (max-w-[900px])</p>
      </Modal>

      {/* 옵션 예시 */}
      <Modal
        isOpen={openModal === "withFooter"}
        onClose={() => setOpenModal(null)}
        title="푸터가 있는 모달"
        showFooter={true}
        footerContent={
          <div className="flex gap-2 justify-end">
            <Button variant="gray" onClick={() => setOpenModal(null)}>
              취소
            </Button>
            <Button variant="blue" onClick={() => setOpenModal(null)}>
              확인
            </Button>
          </div>
        }
      >
        <p>이 모달은 하단에 푸터가 있습니다.</p>
      </Modal>

      <Modal
        isOpen={openModal === "noTitle"}
        onClose={() => setOpenModal(null)}
      >
        <div className="space-y-2">
          <h3 className="text-lg font-semibold">커스텀 제목</h3>
          <p>
            title prop을 전달하지 않으면 자유롭게 레이아웃을 구성할 수
            있습니다.
          </p>
        </div>
      </Modal>

      <Modal
        isOpen={openModal === "longContent"}
        onClose={() => setOpenModal(null)}
        title="약관 및 조건"
      >
        <div className="space-y-4">
          {[1, 2, 3, 4, 5].map((num) => (
            <section key={num}>
              <h3 className="font-semibold mb-2">{num}. 조항 제목</h3>
              <p className="text-sm text-gray-600">
                이것은 긴 컨텐츠를 표시하는 예시입니다. 내용이 많을 경우
                자동으로 스크롤이 생성됩니다.
              </p>
            </section>
          ))}
        </div>
      </Modal>
    </div>
  );
};

export const Variants: Story = {
  render: () => <VariantsComponent />,
  args: {
    isOpen: false,
    onClose: () => {},
    children: null,
  },
  parameters: {
    layout: "padded",
  },
};

// 실제 사용 예시
const UsageExamplesComponent = () => {
  const [activeModal, setActiveModal] = useState<string | null>(null);

  return (
    <div className="flex flex-col gap-4">
      <div>
        <h3 className="text-sm font-semibold mb-2 text-gray-700">
          확인 다이얼로그
        </h3>
        <Button variant="red" onClick={() => setActiveModal("delete")}>
          삭제하기
        </Button>
      </div>

      <div>
        <h3 className="text-sm font-semibold mb-2 text-gray-700">폼 모달</h3>
        <Button variant="blue" onClick={() => setActiveModal("form")}>
          데이터 편집
        </Button>
      </div>

      {/* 삭제 확인 */}
      <Modal
        isOpen={activeModal === "delete"}
        onClose={() => setActiveModal(null)}
        title="정말 삭제하시겠습니까?"
        size="small"
        showFooter={true}
        footerContent={
          <div className="flex gap-2 justify-end">
            <Button variant="gray" onClick={() => setActiveModal(null)}>
              취소
            </Button>
            <Button
              variant="red"
              onClick={() => {
                alert("삭제되었습니다!");
                setActiveModal(null);
              }}
            >
              삭제
            </Button>
          </div>
        }
      >
        <p>이 작업은 되돌릴 수 없습니다.</p>
      </Modal>

      {/* 폼 편집 */}
      <Modal
        isOpen={activeModal === "form"}
        onClose={() => setActiveModal(null)}
        title="게시글 편집"
        size="medium"
        showFooter={true}
        footerContent={
          <div className="flex gap-2 justify-end">
            <Button variant="gray" onClick={() => setActiveModal(null)}>
              취소
            </Button>
            <Button
              variant="blue"
              onClick={() => {
                alert("저장되었습니다!");
                setActiveModal(null);
              }}
            >
              저장
            </Button>
          </div>
        }
      >
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">제목</label>
            <input
              type="text"
              defaultValue="게시글 제목"
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">내용</label>
            <textarea
              defaultValue="게시글 내용입니다."
              rows={6}
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
            />
          </div>
        </div>
      </Modal>
    </div>
  );
};

export const UsageExamples: Story = {
  render: () => <UsageExamplesComponent />,
  args: {
    isOpen: false,
    onClose: () => {},
    children: null,
  },
  parameters: {
    layout: "padded",
  },
};
