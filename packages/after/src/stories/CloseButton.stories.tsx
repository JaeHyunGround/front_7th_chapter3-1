import type { Meta, StoryObj } from "@storybook/react-vite";
import { CloseButton } from "../components/ui/Button/CloseButton";

const meta = {
  title: "Components/CloseButton",
  component: CloseButton,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    disabled: {
      control: "boolean",
      description: "버튼 비활성화 상태",
    },
    className: {
      control: "text",
      description: "추가 CSS 클래스",
    },
  },
} satisfies Meta<typeof CloseButton>;

export default meta;
type Story = StoryObj<typeof meta>;

// 기본 Playground
export const Playground: Story = {
  args: {},
};

// 실제 사용 예시
export const UsageExamples: Story = {
  render: () => (
    <div className="flex flex-col gap-6">
      <div>
        <h3 className="text-sm font-semibold mb-3 text-gray-700">
          모달 헤더
        </h3>
        <div className="flex items-center justify-between p-4 border border-gray-300 rounded-md w-[400px]">
          <h2 className="text-lg font-bold">모달 제목</h2>
          <CloseButton />
        </div>
      </div>

      <div>
        <h3 className="text-sm font-semibold mb-3 text-gray-700">알림창</h3>
        <div className="flex items-center justify-between p-4 bg-blue-100 border border-blue-300 rounded-md w-[400px]">
          <p className="text-sm text-blue-700">이것은 알림 메시지입니다.</p>
          <CloseButton className="text-blue-700 hover:text-blue-900" />
        </div>
      </div>

      <div>
        <h3 className="text-sm font-semibold mb-3 text-gray-700">상태</h3>
        <div className="flex items-center gap-4">
          <div className="flex flex-col items-center gap-2">
            <CloseButton />
            <span className="text-xs text-gray-500">기본</span>
          </div>
          <div className="flex flex-col items-center gap-2">
            <CloseButton disabled />
            <span className="text-xs text-gray-500">비활성화</span>
          </div>
        </div>
      </div>
    </div>
  ),
  parameters: {
    layout: "padded",
  },
};
