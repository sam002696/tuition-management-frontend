// pages/Teacher/MyStudents/MyStudents.jsx
import { useEffect, useState } from "react";
import Tabs from "../../../components/common/Tabs";
import {
  UserGroupIcon,
  ClockIcon,
  ArchiveBoxIcon,
} from "@heroicons/react/20/solid";
import StatCard from "../../../components/Student/MyTeachersTab/StatCard/StatCard";
import Pagination from "../../../components/common/Pagination";
import { useDispatch, useSelector } from "react-redux";
import StudentLayout from "../../../Layout/StudentLayout/StudentLayout";
import TeacherFilterBar from "../../../components/Student/MyTeachersTab/FilterBar/TeacherFilterBar";
import ActiveTeachers from "../../../components/Student/MyTeachersTab/ActiveTeachers/ActiveTeachers";
import PendingTeachers from "../../../components/Student/MyTeachersTab/PendingTeachers/PendingTeachers";
import PastTeachers from "../../../components/Student/MyTeachersTab/PastTeachers/PastTeachers";

const tabItems = [
  { name: "Active teachers", href: "#", icon: UserGroupIcon },
  { name: "Pending teachers", href: "#", icon: ClockIcon },
  { name: "Past teachers", href: "#", icon: ArchiveBoxIcon },
];

const MyTeachers = () => {
  const { connectionRequests, pagination, loading } = useSelector(
    (state) => state.studentManagement
  );
  console.log("connectionRequests", connectionRequests);
  const dispatch = useDispatch();
  const [currentTab, setCurrentTab] = useState("Active teachers");

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedDept, setSelectedDept] = useState("All Departments");

  const handleFilterClick = () => {
    console.log("Filtering with:", { searchTerm, selectedDept });
  };

  useEffect(() => {
    let filters = { per_page: 10 }; // default pagination

    if (currentTab === "Active teachers") {
      filters = { ...filters, status: "accepted", is_active: true };
    } else if (currentTab === "Pending teachers") {
      filters = { ...filters, status: "pending" };
    } else if (currentTab === "Past teachers") {
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
    <StudentLayout>
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
          <TeacherFilterBar
            searchTerm={searchTerm}
            onSearchChange={setSearchTerm}
            selectedDept={selectedDept}
            onDeptChange={setSelectedDept}
            onFilterClick={handleFilterClick}
          />

          <div className="mt-4">
            {currentTab === "Active teachers" && (
              <>
                <ActiveTeachers
                  connectionRequests={connectionRequests}
                  loading={loading}
                />
              </>
            )}
            {currentTab === "Pending teachers" && (
              <>
                <PendingTeachers
                  connectionRequests={connectionRequests}
                  loading={loading}
                />
              </>
            )}
            {currentTab === "Past teachers" && (
              <>
                <PastTeachers
                  connectionRequests={connectionRequests}
                  loading={loading}
                />
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

              if (currentTab === "Active teachers") {
                filters = { ...filters, status: "accepted", is_active: true };
              } else if (currentTab === "Pending teachers") {
                filters = { ...filters, status: "pending" };
              } else if (currentTab === "Past teachers") {
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
    </StudentLayout>
  );
};

export default MyTeachers;
