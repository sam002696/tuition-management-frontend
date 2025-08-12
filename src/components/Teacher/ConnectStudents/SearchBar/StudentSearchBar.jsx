import { useState } from "react";

import { MagnifyingGlassIcon } from "@heroicons/react/24/solid";
import Input from "../../../common/Input";
import Button from "../../../common/Button";
import { useDispatch, useSelector } from "react-redux";

const StudentSearchBar = () => {
  const { loading } = useSelector((state) => state.connectStudents);
  const dispatch = useDispatch();
  const [studentId, setStudentId] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!studentId.trim()) {
      setError("Student ID is required");
      return;
    }
    // console.log("studentId", studentId);
    setError("");
    dispatch({ type: "FIND_STUDENT", payload: { custom_id: studentId } });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white shadow-md rounded-lg p-6 max-w-5xl mr-auto mt-10"
    >
      <label className="block text-sm font-medium text-gray-700 mb-2">
        Student ID
      </label>
      <div className="flex gap-4 items-center">
        <div className="w-full">
          <Input
            name="studentId"
            placeholder="Enter student ID (e.g., S017XX)"
            value={studentId}
            onChange={(e) => setStudentId(e.target.value)}
            error={error}
          />
        </div>
        <div className="w-[180px] pt-2.5">
          <Button
            isDisabled={loading || !studentId}
            type="submit"
            icon={MagnifyingGlassIcon}
            iconPosition="left"
            isLoading={loading}
          >
            Search
          </Button>
        </div>
      </div>
    </form>
  );
};

export default StudentSearchBar;
