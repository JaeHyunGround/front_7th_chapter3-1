import type { Meta, StoryObj } from "@storybook/react-vite";
import { PaginationButton } from "../components/ui/pagination-button";

const meta = {
  title: "Components/PaginationButton",
  component: PaginationButton,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    disabled: {
      control: "boolean",
      description: "버튼 비활성화 상태",
    },
    children: {
      control: "text",
      description: "버튼 내용",
    },
  },
} satisfies Meta<typeof PaginationButton>;

export default meta;
type Story = StoryObj<typeof meta>;

// 기본 Playground
export const Playground: Story = {
  args: {
    children: "이전",
  },
};

// 다양한 상태
export const States: Story = {
  render: () => (
    <div className="flex flex-col gap-6">
      <div>
        <h3 className="text-sm font-semibold mb-3 text-gray-700">기본 상태</h3>
        <div className="flex gap-2 items-center">
          <PaginationButton>이전</PaginationButton>
          <PaginationButton>다음</PaginationButton>
        </div>
      </div>

      <div>
        <h3 className="text-sm font-semibold mb-3 text-gray-700">
          비활성화 상태
        </h3>
        <div className="flex gap-2 items-center">
          <PaginationButton disabled>이전</PaginationButton>
          <PaginationButton disabled>다음</PaginationButton>
        </div>
      </div>

      <div>
        <h3 className="text-sm font-semibold mb-3 text-gray-700">혼합 상태</h3>
        <div className="flex gap-2 items-center">
          <PaginationButton disabled>이전</PaginationButton>
          <span className="px-3 py-1.5 text-sm">1 / 5</span>
          <PaginationButton>다음</PaginationButton>
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
  render: () => {
    const PaginationExample = ({
      totalPages,
      currentPage: initialPage,
    }: {
      totalPages: number;
      currentPage: number;
    }) => {
      const [currentPage, setCurrentPage] = React.useState<number>(initialPage);

      return (
        <div className="flex gap-2 items-center">
          <PaginationButton
            onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
            disabled={currentPage === 1}
          >
            이전
          </PaginationButton>
          <span className="px-3 py-1.5 text-sm">
            {currentPage} / {totalPages}
          </span>
          <PaginationButton
            onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
            disabled={currentPage === totalPages}
          >
            다음
          </PaginationButton>
        </div>
      );
    };

    return (
      <div className="flex flex-col gap-8">
        <div>
          <h3 className="text-sm font-semibold mb-3 text-gray-700">
            첫 페이지
          </h3>
          <PaginationExample totalPages={10} currentPage={1} />
        </div>

        <div>
          <h3 className="text-sm font-semibold mb-3 text-gray-700">
            중간 페이지
          </h3>
          <PaginationExample totalPages={10} currentPage={5} />
        </div>

        <div>
          <h3 className="text-sm font-semibold mb-3 text-gray-700">
            마지막 페이지
          </h3>
          <PaginationExample totalPages={10} currentPage={10} />
        </div>

        <div>
          <h3 className="text-sm font-semibold mb-3 text-gray-700">
            테이블 컨텍스트
          </h3>
          <div className="border border-gray-200 rounded-lg p-4">
            <table className="w-full mb-4">
              <thead>
                <tr className="text-left border-b">
                  <th className="pb-2">이름</th>
                  <th className="pb-2">이메일</th>
                  <th className="pb-2">상태</th>
                </tr>
              </thead>
              <tbody>
                {Array.from({ length: 3 }, (_, i) => (
                  <tr key={i} className="border-b">
                    <td className="py-2">사용자 {i + 1}</td>
                    <td className="py-2">user{i + 1}@example.com</td>
                    <td className="py-2">
                      <span className="text-green-600">Active</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <PaginationExample totalPages={5} currentPage={2} />
          </div>
        </div>
      </div>
    );
  },
  parameters: {
    layout: "padded",
  },
};

// React import for useState
import React from "react";
