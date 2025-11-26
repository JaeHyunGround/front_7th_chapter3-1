import type { Meta, StoryObj } from "@storybook/react-vite";
import { Button } from "../components/ui/button";

const meta = {
  title: "Components/Button",
  component: Button,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: "select",
      options: ["none", "blue", "gray", "red", "green"],
      description: "버튼의 색상 및 스타일 변형",
    },
    size: {
      control: "select",
      options: ["none", "sm", "md", "lg", "fullwidth"],
      description: "버튼의 크기",
    },
    disabled: {
      control: "boolean",
      description: "버튼 비활성화 상태",
    },
  },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

// 기본 Playground - Controls에서 모든 props를 테스트할 수 있음
export const Playground: Story = {
  args: {
    children: "Button",
    variant: "blue",
    size: "md",
  },
};

// 모든 변형을 한눈에 보기
export const Variants: Story = {
  render: () => (
    <div className="flex flex-col gap-6">
      <div>
        <h3 className="text-sm font-semibold mb-3 text-gray-700">Colors</h3>
        <div className="flex gap-2 items-center flex-wrap">
          <Button variant="blue">Blue</Button>
          <Button variant="gray">Gray</Button>
          <Button variant="red">Red</Button>
          <Button variant="green">Green</Button>
          <Button variant="none">None</Button>
        </div>
      </div>

      <div>
        <h3 className="text-sm font-semibold mb-3 text-gray-700">Sizes</h3>
        <div className="flex gap-2 items-center flex-wrap">
          <Button size="sm">Small</Button>
          <Button size="md">Medium</Button>
          <Button size="lg">Large</Button>
        </div>
      </div>

      <div>
        <h3 className="text-sm font-semibold mb-3 text-gray-700">Disabled</h3>
        <div className="flex gap-2 items-center flex-wrap">
          <Button variant="blue" disabled>
            Disabled
          </Button>
          <Button variant="gray" disabled>
            Disabled
          </Button>
        </div>
      </div>
    </div>
  ),
  parameters: {
    layout: "padded",
  },
};
