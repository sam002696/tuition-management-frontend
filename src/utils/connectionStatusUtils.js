import {
  CheckCircleIcon,
  ClockIcon,
  ArrowPathIcon,
  UserPlusIcon,
} from "@heroicons/react/20/solid";

export function getConnectionButtonState(status) {
  switch (status) {
    case "accepted":
      return {
        label: "Connected",
        disabled: true,
        className: "bg-gray-600 text-white cursor-not-allowed",
        icon: CheckCircleIcon,
      };
    case "pending":
      return {
        label: "Pending Approval",
        disabled: true,
        className: "bg-yellow-500 text-white cursor-not-allowed",
        icon: ClockIcon,
      };
    case "rejected":
      return {
        label: "Connect Again",
        disabled: false,
        className:
          "bg-green-600 text-white hover:bg-green-500 focus-visible:outline-green-600",
        icon: ArrowPathIcon,
      };
    default:
      return {
        label: "Connect",
        disabled: false,
        className:
          "bg-green-600 text-white hover:bg-green-500 focus-visible:outline-green-600",
        icon: UserPlusIcon,
      };
  }
}
