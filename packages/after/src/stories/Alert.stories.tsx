import { Alert } from "@/components/ui/alert";
import type { Meta, StoryObj } from "@storybook/react-vite";
import {
  CheckCircle2,
  AlertCircle,
  AlertTriangle,
  Info,
  XCircle,
} from "lucide-react";

const meta = {
  title: "Components/Alert",
  component: Alert,
  parameters: {
    layout: "padded",
  },
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: "select",
      options: ["default", "info", "success", "warning", "error"],
      description: "Alert의 종류",
    },
    title: {
      control: "text",
      description: "Alert 제목",
    },
    onClose: {
      action: "closed",
      description: "닫기 버튼 클릭 핸들러",
    },
    icon: {
      control: false,
      description: "커스텀 아이콘 (React Node)",
    },
    children: {
      control: "text",
      description: "Alert 내용",
    },
  },
} satisfies Meta<typeof Alert>;

export default meta;
type Story = StoryObj<typeof meta>;

// 기본 Playground
export const Playground: Story = {
  args: {
    variant: "info",
    title: "알림",
    children: "이것은 알림 메시지입니다.",
  },
};

// 모든 Variant 보기
export const Variants: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      <Alert variant="default">
        <strong>기본 알림:</strong> 일반적인 정보를 표시할 때 사용합니다.
      </Alert>

      <Alert variant="info">
        <strong>정보 알림:</strong> 사용자에게 유용한 정보를 전달합니다.
      </Alert>

      <Alert variant="success">
        <strong>성공 알림:</strong> 작업이 성공적으로 완료되었습니다.
      </Alert>

      <Alert variant="warning">
        <strong>경고 알림:</strong> 주의가 필요한 상황입니다.
      </Alert>

      <Alert variant="error">
        <strong>오류 알림:</strong> 문제가 발생했습니다.
      </Alert>
    </div>
  ),
};

// Title과 함께 사용
export const WithTitle: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      <Alert variant="info" title="안내">
        시스템 점검이 예정되어 있습니다.
      </Alert>

      <Alert variant="success" title="성공">
        사용자 정보가 업데이트되었습니다.
      </Alert>

      <Alert variant="warning" title="주의">
        입력하신 정보를 다시 확인해주세요.
      </Alert>

      <Alert variant="error" title="오류">
        서버와의 연결이 끊어졌습니다.
      </Alert>
    </div>
  ),
};

// 아이콘과 함께 사용
export const WithIcons: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      <Alert variant="default" title="알림" icon={<Info className="h-5 w-5" />}>
        기본 알림에 아이콘을 추가했습니다.
      </Alert>

      <Alert variant="info" title="정보" icon={<Info className="h-5 w-5" />}>
        정보성 메시지입니다.
      </Alert>

      <Alert
        variant="success"
        title="성공"
        icon={<CheckCircle2 className="h-5 w-5" />}
      >
        작업이 성공적으로 완료되었습니다.
      </Alert>

      <Alert
        variant="warning"
        title="경고"
        icon={<AlertTriangle className="h-5 w-5" />}
      >
        주의가 필요합니다.
      </Alert>

      <Alert
        variant="error"
        title="오류"
        icon={<XCircle className="h-5 w-5" />}
      >
        오류가 발생했습니다.
      </Alert>
    </div>
  ),
};

// 닫기 버튼과 함께 사용
export const WithCloseButton: Story = {
  render: () => {
    const handleClose = () => {
      alert("Alert가 닫혔습니다!");
    };

    return (
      <div className="flex flex-col gap-4">
        <Alert variant="info" title="정보" onClose={handleClose}>
          닫기 버튼을 클릭해보세요.
        </Alert>

        <Alert
          variant="success"
          title="성공"
          icon={<CheckCircle2 className="h-5 w-5" />}
          onClose={handleClose}
        >
          아이콘과 닫기 버튼을 함께 사용할 수 있습니다.
        </Alert>

        <Alert variant="error" title="오류" onClose={handleClose}>
          오류 메시지도 닫을 수 있습니다.
        </Alert>
      </div>
    );
  },
};

// 실제 사용 예시
export const UsageExamples: Story = {
  render: () => (
    <div className="flex flex-col gap-6">
      <div>
        <h3 className="text-sm font-semibold mb-3 text-gray-700">
          단순 정보 표시 (아이콘 없음)
        </h3>
        <Alert variant="info">
          ID: 123 | 생성일: 2025-11-26 | 조회수: 456
        </Alert>
      </div>

      <div>
        <h3 className="text-sm font-semibold mb-3 text-gray-700">
          성공 메시지 (제목 + 닫기)
        </h3>
        <Alert
          variant="success"
          title="성공"
          onClose={() => console.log("closed")}
        >
          게시글가 생성되었습니다
        </Alert>
      </div>

      <div>
        <h3 className="text-sm font-semibold mb-3 text-gray-700">
          오류 메시지 (제목 + 닫기)
        </h3>
        <Alert
          variant="error"
          title="오류"
          onClose={() => console.log("closed")}
        >
          생성에 실패했습니다
        </Alert>
      </div>

      <div>
        <h3 className="text-sm font-semibold mb-3 text-gray-700">
          경고 메시지 (아이콘 + 제목 + 닫기)
        </h3>
        <Alert
          variant="warning"
          title="주의"
          icon={<AlertTriangle className="h-5 w-5" />}
          onClose={() => console.log("closed")}
        >
          이 작업은 취소할 수 없습니다. 계속하시겠습니까?
        </Alert>
      </div>

      <div>
        <h3 className="text-sm font-semibold mb-3 text-gray-700">
          정보 메시지 (아이콘 + 제목)
        </h3>
        <Alert
          variant="info"
          title="시스템 점검 안내"
          icon={<AlertCircle className="h-5 w-5" />}
        >
          2025년 11월 27일 02:00 ~ 04:00 시스템 점검이 예정되어 있습니다.
          <br />
          점검 시간 동안 서비스 이용이 제한될 수 있습니다.
        </Alert>
      </div>
    </div>
  ),
};
