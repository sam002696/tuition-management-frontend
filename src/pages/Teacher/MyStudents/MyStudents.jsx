import { useEffect, useMemo, useRef, useState } from "react";
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
  const { connectionRequests, pagination, loading } = useSelector(
    (state) => state.studentManagement
  );
  const dispatch = useDispatch();

  const [currentTab, setCurrentTab] = useState("Active students");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedDept, setSelectedDept] = useState("All Departments");

  const didMountRef = useRef(false);

  const handleFilterClick = () => {
    console.log("Filtering with:", { searchTerm, selectedDept });
  };

  // Building base filters from the current tab (and future non-search filters)
  const baseFilters = useMemo(() => {
    let filters = { per_page: 10 };

    if (currentTab === "Active students") {
      filters = { ...filters, status: "accepted", is_active: true };
    } else if (currentTab === "Pending students") {
      filters = { ...filters, status: "pending" };
    } else if (currentTab === "Past students") {
      filters = { ...filters, status: "accepted", is_active: false };
    }

    return filters;
  }, [currentTab]);

  // Immediate fetch when tab (or other non-search filters) change.
  // Also cancelling any pending debounced search to avoid stale overwrite.
  useEffect(() => {
    const trimmed = searchTerm.trim();
    // Cancelling any pending debounced search from the previous tab
    dispatch({ type: "CANCEL_SEARCH" });

    const filters = {
      ...baseFilters,
      page: 1,
      ...(trimmed ? { search: trimmed } : {}),
    };

    dispatch({
      type: "FETCH_CONNECTION_REQUESTS",
      payload: { filters },
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [baseFilters, dispatch]);

  // Debounced fetch only when typing starts/changes
  useEffect(() => {
    const trimmed = searchTerm.trim();

    // Skipping on first mount
    if (!didMountRef.current) {
      didMountRef.current = true;
      if (trimmed === "") return;
    }

    if (trimmed) {
      dispatch({
        type: "FETCH_CONNECTION_REQUESTS_SEARCH", // debounced in saga
        payload: { filters: { ...baseFilters, search: trimmed, page: 1 } },
      });
    } else {
      // Clear search -> cancel pending and immediately refresh
      dispatch({ type: "CANCEL_SEARCH" });
      dispatch({
        type: "FETCH_CONNECTION_REQUESTS",
        payload: { filters: { ...baseFilters, page: 1 } },
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchTerm, dispatch]); // deliberately excluding baseFilters to avoid firing on tab change

  return (
    <TeacherLayout>
      <div className="pb-10">
        <StatCard />
      </div>

      <div className="rounded-xl border border-gray-300 bg-white shadow-sm">
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
              <ActiveStudents
                connectionRequests={connectionRequests}
                loading={loading}
              />
            )}
            {currentTab === "Pending students" && (
              <PendingStudents
                connectionRequests={connectionRequests}
                loading={loading}
              />
            )}
            {currentTab === "Past students" && (
              <PastStudents
                connectionRequests={connectionRequests}
                loading={loading}
              />
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
              const trimmed = searchTerm.trim();
              const filters = {
                ...baseFilters,
                per_page: 10,
                page,
                ...(trimmed ? { search: trimmed } : {}),
              };

              // Cancel any pending debounced search before paginating
              dispatch({ type: "CANCEL_SEARCH" });

              // Pagination should be instant
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
