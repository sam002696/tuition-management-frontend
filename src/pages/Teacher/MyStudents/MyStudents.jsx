// pages/Teacher/MyStudents/MyStudents.jsx
import { useEffect, useState } from "react";
import TeacherLayout from "../../../Layout/TeacherLayout/TeacherLayout";
import Tabs from "../../../components/common/Tabs";
import ActiveStudents from "../../../components/Teacher/MyStudentsTab/ActiveStudents/ActiveStudents";
import PendingStudents from "../../../components/Teacher/MyStudentsTab/PendingStudents/PendingStudents";

import {
  UserGroupIcon,
  ClockIcon,
  ArchiveBoxIcon,
} from "@heroicons/react/20/solid";
import StudentFilterBar from "../../../components/Teacher/MyStudentsTab/FilterBar/StudentFilterBar";
import StatCard from "../../../components/Teacher/MyStudentsTab/StatCard/StatCard";
import Pagination from "../../../components/common/Pagination";
import PastStudents from "../../../components/Teacher/MyStudentsTab/PastStudents/PastStudents";
import { useDispatch, useSelector } from "react-redux";

const tabItems = [
  { name: "Active students", href: "#", icon: UserGroupIcon },
  { name: "Pending students", href: "#", icon: ClockIcon },
  { name: "Past students", href: "#", icon: ArchiveBoxIcon },
];

const MyStudents = () => {
  const { connectionRequests, pagination } = useSelector(
    (state) => state.studentManagement
  );
  const dispatch = useDispatch();
  const [currentTab, setCurrentTab] = useState("Active students");

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedDept, setSelectedDept] = useState("All Departments");

  const handleFilterClick = () => {
    console.log("Filtering with:", { searchTerm, selectedDept });
  };

  useEffect(() => {
    let filters = { per_page: 10 }; // default pagination

    if (currentTab === "Active students") {
      filters = { ...filters, status: "accepted", is_active: true };
    } else if (currentTab === "Pending students") {
      filters = { ...filters, status: "pending" };
    } else if (currentTab === "Past students") {
      filters = { ...filters, status: "accepted", is_active: false };
    }

    dispatch({
      type: "FETCH_CONNECTION_REQUESTS",
      payload: {
        filters,
      },
    });
  }, [currentTab, dispatch]);

  return (
    <TeacherLayout>
      <div className="pb-10">
        <StatCard />
      </div>

      <div className="rounded-xl border border-gray-300  bg-white shadow-sm">
        <Tabs
          tabs={tabItems}
          currentTab={currentTab}
          onTabChange={setCurrentTab}
        />

        <div className="mt-6">
          <StudentFilterBar
            searchTerm={searchTerm}
            onSearchChange={setSearchTerm}
            selectedDept={selectedDept}
            onDeptChange={setSelectedDept}
            onFilterClick={handleFilterClick}
          />

          <div className="mt-4">
            {currentTab === "Active students" && (
              <>
                <ActiveStudents connectionRequests={connectionRequests} />
              </>
            )}
            {currentTab === "Pending students" && (
              <>
                <PendingStudents connectionRequests={connectionRequests} />
              </>
            )}
            {currentTab === "Past students" && (
              <>
                <PastStudents connectionRequests={connectionRequests} />
              </>
            )}
          </div>
        </div>

        <div>
          <Pagination
            currentPage={pagination?.current_page}
            perPage={pagination?.per_page}
            hasMorePages={pagination?.has_more_pages}
            total={pagination?.total}
            totalPages={pagination?.total_pages}
            onPageChange={(page) => {
              let filters = { per_page: 10, page };

              if (currentTab === "Active students") {
                filters = { ...filters, status: "accepted", is_active: true };
              } else if (currentTab === "Pending students") {
                filters = { ...filters, status: "pending" };
              } else if (currentTab === "Past students") {
                filters = { ...filters, status: "accepted", is_active: false };
              }

              dispatch({
                type: "FETCH_CONNECTION_REQUESTS",
                payload: { filters },
              });
            }}
          />
        </div>
      </div>
    </TeacherLayout>
  );
};

export default MyStudents;
