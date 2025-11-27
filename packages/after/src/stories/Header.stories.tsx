import { Header } from "@/components/ui/header";
import type { Meta, StoryObj } from "@storybook/react-vite";

const meta = {
  title: "Components/Header",
  component: Header,
  parameters: {
    layout: "fullscreen",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof Header>;

export default meta;
type Story = StoryObj<typeof meta>;

// 기본 Header
export const Default: Story = {};

// 스크롤 동작 확인을 위한 긴 컨텐츠
export const WithScrollContent: Story = {
  render: () => (
    <div>
      <Header />
      <div className="p-6 space-y-4">
        <h2 className="text-2xl font-bold">Sticky Header 테스트</h2>
        <p>아래로 스크롤하면 헤더가 상단에 고정됩니다.</p>
        {Array.from({ length: 50 }, (_, i) => (
          <div key={i} className="p-4 bg-gray-50 rounded">
            <h3 className="font-semibold">섹션 {i + 1}</h3>
            <p className="text-sm text-gray-600">
              이것은 스크롤 테스트를 위한 더미 컨텐츠입니다. 헤더가 상단에
              고정되어 있는지 확인하세요.
            </p>
          </div>
        ))}
      </div>
    </div>
  ),
};
