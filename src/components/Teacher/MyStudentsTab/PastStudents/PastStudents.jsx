import { useState } from "react";
import DataTable from "../../../common/DataTable";
import {
  EyeIcon,
  PencilSquareIcon,
  TrashIcon,
} from "@heroicons/react/24/outline";
import ModalWrapper from "../../../common/ModalWrapper";
import StudentDetails from "../../../common/StudentDetails";

const PastStudents = ({ connectionRequests }) => {
  const data = connectionRequests || [];

  const [open, setOpen] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState(null);

  const handleView = (item) => {
    setSelectedStudent(item);
    setOpen(true);
  };

  const columns = [
    {
      key: "student_info",
      header: "Student Info",
      render: (item) => (
        <div>
          <div className="font-medium text-gray-900">{item?.student?.name}</div>
          <div className="text-gray-500 text-sm">{item?.student?.email}</div>
        </div>
      ),
    },
    {
      key: "custom_id",
      header: "Student ID",
      render: (item) => item?.student?.custom_id,
    },
    {
      key: "phone",
      header: "Phone",
      render: (item) => item?.student?.phone,
    },
    {
      key: "class_level",
      header: "Class",
      render: (item) => item?.tuition_details?.class_level,
    },
    {
      key: "status",
      header: "Status",
      render: (item) => (
        <span
          className={`px-2 py-1 text-xs rounded-full ${
            item.status === "accepted" && item.is_active === 0
              ? "bg-red-100 text-red-800"
              : item.status === "pending"
              ? "bg-yellow-100 text-yellow-800"
              : "bg-gray-100 text-gray-800"
          }`}
        >
          disconnected
        </span>
      ),
    },
    {
      key: "actions",
      header: "Action",
      alignRight: true,
      render: (item) => (
        <div className="flex items-center justify-end space-x-2">
          <button
            type="button"
            title="View"
            className="p-1 text-blue-600 hover:text-blue-800 cursor-pointer"
            onClick={() => handleView(item)}
          >
            <EyeIcon className="h-5 w-5" />
          </button>
          <button
            type="button"
            title="Edit"
            className="p-1 text-green-600 hover:text-green-800 cursor-pointer"
            onClick={() => console.log("Edit", item)}
          >
            <PencilSquareIcon className="h-5 w-5" />
          </button>
          <button
            type="button"
            title="Delete"
            className="p-1 text-red-600 hover:text-red-800 cursor-pointer"
            onClick={() => console.log("Delete", item)}
          >
            <TrashIcon className="h-5 w-5" />
          </button>
        </div>
      ),
    },
  ];
  return (
    <>
      <DataTable columns={columns} data={data} />
      <ModalWrapper open={open} setOpen={setOpen}>
        {selectedStudent && <StudentDetails data={selectedStudent} />}
      </ModalWrapper>
    </>
  );
};

export default PastStudents;
