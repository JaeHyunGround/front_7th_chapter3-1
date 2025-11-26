import type { Meta, StoryObj } from "@storybook/react-vite";
import { Badge } from "../components/ui/common/badge";
import { CheckCircle, AlertCircle, Info, XCircle } from "lucide-react";

const meta = {
  title: "Components/Badge",
  component: Badge,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: "select",
      options: ["blue", "gray", "green", "red", "orange", "outline"],
      description: "배지의 색상 스타일",
    },
    size: {
      control: "select",
      options: ["sm", "md", "lg"],
      description: "배지의 크기",
    },
    shape: {
      control: "select",
      options: ["rounded", "pill", "square"],
      description: "배지의 모양",
    },
    dot: {
      control: "boolean",
      description: "상태 표시 점 표시 여부",
    },
  },
} satisfies Meta<typeof Badge>;

export default meta;
type Story = StoryObj<typeof meta>;

// 기본 Playground
export const Playground: Story = {
  args: {
    children: "Badge",
    variant: "blue",
    size: "md",
    shape: "rounded",
  },
};

// 모든 변형 보기
export const Variants: Story = {
  render: () => (
    <div className="flex flex-col gap-8">
      <div>
        <h3 className="text-sm font-semibold mb-3 text-gray-700">Colors</h3>
        <div className="flex gap-2 flex-wrap">
          <Badge variant="blue">Blue</Badge>
          <Badge variant="gray">Gray</Badge>
          <Badge variant="green">Green</Badge>
          <Badge variant="red">Red</Badge>
          <Badge variant="orange">Orange</Badge>
          <Badge variant="outline">Outline</Badge>
        </div>
      </div>

      <div>
        <h3 className="text-sm font-semibold mb-3 text-gray-700">Sizes</h3>
        <div className="flex gap-2 items-center flex-wrap">
          <Badge size="sm">Small</Badge>
          <Badge size="md">Medium</Badge>
          <Badge size="lg">Large</Badge>
        </div>
      </div>

      <div>
        <h3 className="text-sm font-semibold mb-3 text-gray-700">Shapes</h3>
        <div className="flex gap-2 flex-wrap">
          <Badge shape="rounded">Rounded</Badge>
          <Badge shape="pill">Pill</Badge>
          <Badge shape="square">Square</Badge>
        </div>
      </div>

      <div>
        <h3 className="text-sm font-semibold mb-3 text-gray-700">With Dot</h3>
        <div className="flex gap-2 flex-wrap">
          <Badge variant="green" dot>
            Active
          </Badge>
          <Badge variant="red" dot>
            Inactive
          </Badge>
          <Badge variant="orange" dot>
            Pending
          </Badge>
        </div>
      </div>

      <div>
        <h3 className="text-sm font-semibold mb-3 text-gray-700">With Icon</h3>
        <div className="flex gap-2 flex-wrap">
          <Badge variant="green" icon={<CheckCircle size={14} />}>
            Completed
          </Badge>
          <Badge variant="red" icon={<XCircle size={14} />}>
            Failed
          </Badge>
          <Badge variant="orange" icon={<AlertCircle size={14} />}>
            Warning
          </Badge>
          <Badge variant="blue" icon={<Info size={14} />}>
            Information
          </Badge>
        </div>
      </div>
    </div>
  ),
  parameters: {
    layout: "padded",
  },
};

// 실제 사용 예시
export const UsageExamples: Story = {
  render: () => (
    <div className="flex flex-col gap-8">
      <div>
        <h3 className="text-sm font-semibold mb-3 text-gray-700">
          User Roles
        </h3>
        <div className="flex gap-2 flex-wrap">
          <Badge variant="red">관리자</Badge>
          <Badge variant="orange">운영자</Badge>
          <Badge variant="blue">사용자</Badge>
          <Badge variant="gray">게스트</Badge>
        </div>
      </div>

      <div>
        <h3 className="text-sm font-semibold mb-3 text-gray-700">
          Post Status
        </h3>
        <div className="flex gap-2 flex-wrap">
          <Badge variant="green" dot>
            게시됨
          </Badge>
          <Badge variant="orange" dot>
            임시저장
          </Badge>
          <Badge variant="gray" dot>
            보관됨
          </Badge>
        </div>
      </div>

      <div>
        <h3 className="text-sm font-semibold mb-3 text-gray-700">
          Categories
        </h3>
        <div className="flex gap-2 flex-wrap">
          <Badge variant="blue" shape="pill">
            development
          </Badge>
          <Badge variant="blue" shape="pill">
            design
          </Badge>
          <Badge variant="red" shape="pill">
            accessibility
          </Badge>
        </div>
      </div>

      <div>
        <h3 className="text-sm font-semibold mb-3 text-gray-700">
          User Status
        </h3>
        <div className="flex gap-2 flex-wrap">
          <Badge variant="green" icon={<CheckCircle size={14} />}>
            Active
          </Badge>
          <Badge variant="gray" icon={<AlertCircle size={14} />}>
            Inactive
          </Badge>
          <Badge variant="red" icon={<XCircle size={14} />}>
            Suspended
          </Badge>
        </div>
      </div>

      <div>
        <h3 className="text-sm font-semibold mb-3 text-gray-700">
          In Table Context
        </h3>
        <div className="p-4 border border-gray-200 rounded-lg">
          <table className="w-full">
            <thead>
              <tr className="text-left border-b">
                <th className="pb-2">Name</th>
                <th className="pb-2">Role</th>
                <th className="pb-2">Status</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b">
                <td className="py-2">홍길동</td>
                <td className="py-2">
                  <Badge variant="red" size="sm">
                    관리자
                  </Badge>
                </td>
                <td className="py-2">
                  <Badge variant="green" size="sm" dot>
                    Active
                  </Badge>
                </td>
              </tr>
              <tr className="border-b">
                <td className="py-2">김철수</td>
                <td className="py-2">
                  <Badge variant="orange" size="sm">
                    운영자
                  </Badge>
                </td>
                <td className="py-2">
                  <Badge variant="green" size="sm" dot>
                    Active
                  </Badge>
                </td>
              </tr>
              <tr>
                <td className="py-2">이영희</td>
                <td className="py-2">
                  <Badge variant="blue" size="sm">
                    사용자
                  </Badge>
                </td>
                <td className="py-2">
                  <Badge variant="gray" size="sm" dot>
                    Inactive
                  </Badge>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  ),
  parameters: {
    layout: "padded",
  },
};
