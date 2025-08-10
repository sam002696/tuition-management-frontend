import React from "react";
import TeacherLayout from "../../../Layout/TeacherLayout/TeacherLayout";
import StatCard from "../../../components/Teacher/StatCard";
import {
  UsersIcon,
  PlayCircleIcon,
  ClockIcon,
  CurrencyDollarIcon,
  CheckCircleIcon,
  UserPlusIcon,
} from "@heroicons/react/24/outline";

const Dashboard = () => {
  // You can wire these to Redux later
  const stats = [
    {
      title: "Total Students",
      value: 24,
      icon: UsersIcon,
      accent: "bg-blue-50 text-blue-600 ring-blue-200",
      iconBg: "bg-blue-100",
    },
    {
      title: "Active Sessions",
      value: 8,
      icon: PlayCircleIcon,
      accent: "bg-green-50 text-green-600 ring-green-200",
      iconBg: "bg-green-100",
    },
    {
      title: "Pending Requests",
      value: 3,
      icon: ClockIcon,
      accent: "bg-yellow-50 text-yellow-600 ring-yellow-200",
      iconBg: "bg-yellow-100",
    },
    {
      title: "This Month",
      value: "$2,400",
      icon: CurrencyDollarIcon,
      accent: "bg-purple-50 text-purple-600 ring-purple-200",
      iconBg: "bg-purple-100",
    },
  ];

  const recentActivity = [
    {
      id: 1,
      icon: CheckCircleIcon,
      iconClass: "text-green-600",
      title: "Session completed with Sarah Johnson",
      time: "2 hours ago",
    },
    {
      id: 2,
      icon: UserPlusIcon,
      iconClass: "text-blue-600",
      title: "New connection request from Mike Davis",
      time: "5 hours ago",
    },
  ];

  const upcoming = [
    {
      id: 1,
      name: "Emma Wilson",
      subject: "Mathematics",
      time: "2:00 PM",
      avatar:
        "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=96&auto=format&fit=facearea&facepad=2&h=96",
    },
    {
      id: 2,
      name: "Alex Chen",
      subject: "Physics",
      time: "4:00 PM",
      avatar:
        "https://images.unsplash.com/photo-1607746882042-944635dfe10e?q=80&w=96&auto=format&fit=facearea&facepad=2&h=96",
    },
  ];

  return (
    <TeacherLayout>
      <div className="space-y-6">
        <h1 className="text-2xl font-semibold tracking-tight">
          Teacher Dashboard
        </h1>

        {/* Stat cards */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {stats.map((s) => (
            <StatCard
              key={s.title}
              title={s.title}
              value={s.value}
              icon={s.icon}
              accent={s.accent}
              iconBg={s.iconBg}
            />
          ))}
        </div>

        {/* Bottom sections */}
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          {/* Recent Activity */}
          <div className="rounded-2xl border border-gray-200 bg-white shadow-sm">
            <div className="border-b border-gray-100 p-5">
              <h2 className="text-lg font-semibold">Recent Activity</h2>
            </div>
            <ul className="divide-y divide-gray-100">
              {recentActivity.map((item) => (
                <li key={item.id} className="flex items-start gap-3 p-5">
                  <span className="mt-1 inline-flex h-8 w-8 items-center justify-center rounded-full bg-gray-50">
                    <item.icon className={`h-6 w-6 ${item.iconClass}`} />
                  </span>
                  <div className="flex-1">
                    <p className="text-lg font-medium text-gray-900">
                      {item.title}
                    </p>
                    <p className="mt-1 text-xs text-gray-500">{item.time}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          {/* Upcoming Sessions */}
          <div className="rounded-2xl border border-gray-200 bg-white shadow-sm">
            <div className="border-b border-gray-100 p-5">
              <h2 className="text-lg font-semibold">Upcoming Sessions</h2>
            </div>

            <ul className="space-y-3 p-5">
              {upcoming.map((s) => (
                <li
                  key={s.id}
                  className="flex items-center justify-between rounded-xl border border-gray-100 bg-gray-50 p-4 hover:bg-gray-100 transition"
                >
                  <div className="flex items-center gap-3">
                    <img
                      src={s.avatar}
                      className="h-10 w-10 rounded-full object-cover"
                      alt={s.name}
                    />
                    <div>
                      <p className="text-sm font-semibold text-gray-900">
                        {s.name}
                      </p>
                      <p className="text-xs text-gray-500">{s.subject}</p>
                    </div>
                  </div>
                  <p className="text-sm font-medium text-gray-700">{s.time}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </TeacherLayout>
  );
};

export default Dashboard;
