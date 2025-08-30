import {
  EyeIcon,
  PencilSquareIcon,
  TrashIcon,
} from "@heroicons/react/24/outline";
import DataTable from "../../../common/DataTable";
import { useState } from "react";
import ModalWrapper from "../../../common/ModalWrapper";
import TeacherDetails from "../../../common/TeacherDetails";

const PendingTeachers = ({ connectionRequests, loading }) => {
  const data = connectionRequests || [];

  const [open, setOpen] = useState(false);
  const [selectedTeacher, setSelectedTeacher] = useState(null);

  const handleView = (item) => {
    setSelectedTeacher(item);
    setOpen(true);
  };

  const columns = [
    {
      key: "teacher_info",
      header: "Teacher Info",
      render: (item) => (
        <div>
          <div className="font-medium text-gray-900">{item?.teacher?.name}</div>
          <div className="text-gray-500 text-sm">{item?.teacher?.email}</div>
        </div>
      ),
    },
    {
      key: "custom_id",
      header: "Teacher ID",
      render: (item) => item?.teacher?.custom_id,
    },
    {
      key: "phone",
      header: "Phone",
      render: (item) => item?.teacher?.phone,
    },
    {
      key: "class_level",
      header: "Tuition Type",
      render: (item) => item?.tuition_details?.tuition_type,
    },
    {
      key: "status",
      header: "Status",
      render: (item) => (
        <span
          className={`px-2 py-1 text-xs rounded-full ${
            item.status === "accepted"
              ? "bg-green-100 text-green-800"
              : item.status === "pending"
              ? "bg-yellow-100 text-yellow-800"
              : "bg-gray-100 text-gray-800"
          }`}
        >
          {item?.status}
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
      <DataTable columns={columns} data={data} loading={loading} />
      <ModalWrapper open={open} setOpen={setOpen}>
        {selectedTeacher && <TeacherDetails data={selectedTeacher} />}
      </ModalWrapper>
    </>
  );
};

export default PendingTeachers;
