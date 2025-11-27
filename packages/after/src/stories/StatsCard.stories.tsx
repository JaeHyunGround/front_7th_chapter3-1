import { StatsCard } from "@/components/ui/stats-card";
import type { Meta, StoryObj } from "@storybook/react-vite";

const meta = {
  title: "Components/StatsCard",
  component: StatsCard,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    type: {
      control: "select",
      options: ["blue", "green", "orange", "red", "gray"],
      description: "카드의 색상 테마",
    },
    label: {
      control: "text",
      description: "통계 라벨",
    },
    value: {
      control: "number",
      description: "통계 값",
    },
  },
} satisfies Meta<typeof StatsCard>;

export default meta;
type Story = StoryObj<typeof meta>;

// 기본 Playground
export const Playground: Story = {
  args: {
    label: "전체 사용자",
    value: 1234,
    type: "blue",
  },
};

// 모든 타입 예시
const AllTypesComponent = () => {
  return (
    <div className="space-y-4">
      <h3 className="text-sm font-semibold mb-3 text-gray-700">
        모든 카드 타입
      </h3>
      <div className="grid grid-cols-5 gap-3">
        <StatsCard label="Blue" value={100} type="blue" />
        <StatsCard label="Green" value={250} type="green" />
        <StatsCard label="Orange" value={50} type="orange" />
        <StatsCard label="Red" value={10} type="red" />
        <StatsCard label="Gray" value={500} type="gray" />
      </div>
    </div>
  );
};

export const AllTypes: Story = {
  render: () => <AllTypesComponent />,
  args: {
    label: "",
    value: 0,
  },
  parameters: {
    layout: "padded",
  },
};

// 사용자 통계 예시 (as const 사용)
const UsageExampleComponent = () => {
  const userStats = [
    { label: "전체", value: 150, type: "blue" as const },
    { label: "활성", value: 120, type: "green" as const },
    { label: "비활성", value: 20, type: "orange" as const },
    { label: "정지", value: 5, type: "red" as const },
    { label: "관리자", value: 5, type: "gray" as const },
  ];

  return (
    <div className="space-y-4">
      <div>
        <h3 className="text-lg font-semibold mb-2">실제 사용 예시</h3>
        <p className="text-sm text-gray-600 mb-4">
          배열 데이터를 map으로 렌더링하는 패턴 (as const 사용)
        </p>
      </div>
      <div className="grid grid-cols-5 gap-3">
        {userStats.map((stat, index) => (
          <StatsCard
            key={index}
            label={stat.label}
            value={stat.value}
            type={stat.type}
          />
        ))}
      </div>
    </div>
  );
};

export const UsageExample: Story = {
  render: () => <UsageExampleComponent />,
  args: {
    label: "",
    value: 0,
  },
  parameters: {
    layout: "padded",
  },
};
