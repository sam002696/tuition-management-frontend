import React, { useEffect } from "react";
import StudentLayout from "../../../Layout/StudentLayout/StudentLayout";
import StatCard from "../../../components/Teacher/StatCard";
import { useDispatch, useSelector } from "react-redux";

const Dashboard = () => {
  //   const { dashboardData } = useSelector((state) => state.adminDashboard);
  const dispatch = useDispatch();

  const stats = [
    { title: "Total students", value: 12 },
    { title: "Active students", value: 4 },
    { title: "Pending requests", value: 5 },
  ];

  //   useEffect(() => {
  //     dispatch({
  //       type: "FETCH_DASHBOARD_DATA",
  //     });
  //   }, [dispatch]);

  return (
    <StudentLayout>
      <h1 className="text-2xl font-bold mb-6">Student Dashboard</h1>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {stats.map((stat) => (
          <StatCard key={stat.title} title={stat.title} value={stat.value} />
        ))}
      </div>
    </StudentLayout>
  );
};

export default Dashboard;
