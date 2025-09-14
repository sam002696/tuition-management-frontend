// src/pages/Teacher/Dashboard/Dashboard.jsx
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import TeacherLayout from "../../../Layout/TeacherLayout/TeacherLayout";
import {
  UsersIcon,
  PlayCircleIcon,
  ClockIcon,
  CurrencyDollarIcon,
  CheckCircleIcon,
  UserPlusIcon,
  BoltIcon,
  SparklesIcon,
  CalendarDaysIcon,
  ArrowTrendingUpIcon,
} from "@heroicons/react/24/outline";

const StatCard = ({ title, value, icon: Icon, accent, hint }) => (
  <div className="relative overflow-hidden rounded-2xl border border-gray-200 bg-white p-5 shadow-sm transform transition hover:-translate-y-0.5">
    <div className="flex items-start justify-between gap-4">
      <div className="space-y-1">
        <p className="text-xs font-semibold uppercase tracking-wide text-gray-400">
          {title}
        </p>
        <p className="flex items-baseline gap-2">
          <span className="text-2xl font-bold text-gray-900">{value}</span>
        </p>
        {hint && <p className="mt-2 text-xs text-gray-400">{hint}</p>}
      </div>

      <div
        className={`flex h-12 w-12 items-center justify-center rounded-xl ${accent} ring-1 ring-inset`}
      >
        {Icon && <Icon className="h-6 w-6" />}
      </div>
    </div>

    <div className="pointer-events-none absolute right-0 top-0 -mr-12 -mt-12 h-28 w-28 rounded-full opacity-10 blur-3xl bg-gradient-to-tr from-indigo-500 to-purple-400" />
  </div>
);

const SmallEmpty = ({ title, subtitle }) => (
  <div className="rounded-2xl border border-dashed border-gray-200 bg-gray-50 p-6 text-center">
    <SparklesIcon className="mx-auto h-8 w-8 text-gray-300" />
    <h3 className="mt-3 text-sm font-semibold text-gray-900">{title}</h3>
    <p className="mt-1 text-xs text-gray-500">{subtitle}</p>
  </div>
);

const ActivityRow = ({ icon: Icon, title, time, accent }) => (
  <li className="flex items-start gap-3 p-4">
    <div
      className={`mt-1 inline-flex h-9 w-9 items-center justify-center rounded-lg bg-gray-50 ${accent}`}
    >
      {Icon && <Icon className="h-5 w-5" />}
    </div>
    <div className="flex-1">
      <p className="text-sm font-medium text-gray-900">{title}</p>
      <p className="mt-1 text-xs text-gray-500">{time}</p>
    </div>
  </li>
);

const Dashboard = () => {
  const dispatch = useDispatch();

  const { loading, error, meta, overview, stats, schedule_today } = useSelector(
    (state) => state.teacherHome || {}
  );

  useEffect(() => {
    dispatch({ type: "teacherHomeData" });
  }, [dispatch]);

  // safe fallbacks
  const ov = overview ?? {
    sessions_today: 0,
    students_today: 0,
    attendance_rate: null,
    pending_requests: 0,
    next_class: null,
  };

  const st = stats ?? {
    students_total: 0,
    new_students_today: 0,
    classes_total: 0,
    classes_today: 0,
  };

  const scheduleToday = Array.isArray(schedule_today) ? schedule_today : [];

  const attendancePct =
    ov.attendance_rate === null || ov.attendance_rate === undefined
      ? null
      : Math.round(ov.attendance_rate * 100);

  const cards = [
    {
      title: "Total Students",
      value: st.students_total ?? 0,
      icon: UsersIcon,
      accent: "bg-gradient-to-br from-blue-50 to-indigo-50 text-blue-700",
      hint: `${st.new_students_today ?? 0} new today`,
    },
    {
      title: "Sessions Today",
      value: ov.sessions_today ?? 0,
      icon: PlayCircleIcon,
      accent: "bg-gradient-to-br from-green-50 to-emerald-50 text-green-700",
      hint: `${st.classes_today ?? 0} classes scheduled`,
    },
    {
      title: "Pending Requests",
      value: ov.pending_requests ?? 0,
      icon: ClockIcon,
      accent: "bg-gradient-to-br from-yellow-50 to-amber-50 text-yellow-700",
    },
    {
      title: "Attendance",
      value: attendancePct === null ? "N/A" : `${attendancePct}%`,
      icon: CheckCircleIcon,
      accent: "bg-gradient-to-br from-purple-50 to-pink-50 text-purple-700",
    },
  ];

  return (
    <TeacherLayout>
      <div className="space-y-6">
        <header className="flex items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-semibold tracking-tight">
              Teacher Dashboard
            </h1>
            <p className="mt-1 text-sm text-gray-500">
              Overview of today's classes, students, and recent activity.
            </p>
          </div>

          <div className="hidden items-center gap-3 sm:flex">
            <button
              disabled={loading}
              onClick={() => dispatch({ type: "teacherHomeData" })}
              className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-sm font-medium shadow-sm ring-1 ring-gray-100 hover:shadow-md disabled:opacity-60"
            >
              Refresh
            </button>
            <div className="rounded-full bg-gradient-to-tr from-indigo-500 to-pink-500 p-0.5">
              <button className="flex items-center gap-2 rounded-full bg-white px-4 py-2 text-sm font-semibold">
                <BoltIcon className="h-4 w-4 text-indigo-500" />
                Quick Actions
              </button>
            </div>
          </div>
        </header>

        {loading && (
          <div className="rounded-2xl border border-gray-200 bg-white p-6 text-center">
            <p className="text-sm text-gray-500">Loading dashboard...</p>
          </div>
        )}

        {error && (
          <div className="rounded-2xl border border-red-200 bg-red-50 p-4 text-sm text-red-700">
            Error: {error}
          </div>
        )}

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {cards.map((c) => (
            <StatCard
              key={c.title}
              title={c.title}
              value={c.value}
              icon={c.icon}
              accent={c.accent}
              hint={c.hint}
            />
          ))}
        </div>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          <div className="lg:col-span-2 rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
            <div className="flex items-start justify-between">
              <div>
                <h2 className="text-lg font-semibold">Recent Activity</h2>
                <p className="mt-1 text-xs text-gray-500">
                  Latest events and requests related to your account.
                </p>
              </div>

              <div className="text-xs text-gray-400">
                <span>Updated: </span>
                <span>{meta?.date ?? "—"}</span>
              </div>
            </div>

            <ul className="mt-4 divide-y divide-gray-100">
              <ActivityRow
                icon={UserPlusIcon}
                title={`${st.new_students_today ?? 0} new students joined`}
                time={"Today"}
                accent="bg-indigo-50 text-indigo-600"
              />
              <ActivityRow
                icon={ClockIcon}
                title={`You have ${ov.pending_requests ?? 0} pending requests`}
                time={"Action recommended"}
                accent="bg-yellow-50 text-yellow-600"
              />

              {scheduleToday.length > 0 ? (
                scheduleToday.map((s, idx) => (
                  <ActivityRow
                    key={idx}
                    icon={CalendarDaysIcon}
                    title={`${s.student_name ?? s.name ?? "Student"} — ${
                      s.subject ?? s.title ?? "Session"
                    }`}
                    time={s.time ?? s.start_time ?? "Scheduled"}
                    accent="bg-green-50 text-green-600"
                  />
                ))
              ) : (
                <li className="p-6">
                  <SmallEmpty
                    title="No sessions scheduled for today"
                    subtitle="Looks like you have a calm day — plan ahead or add a class."
                  />
                </li>
              )}
            </ul>

            <div className="mt-6 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="rounded-lg bg-gradient-to-tr from-indigo-600 to-pink-500 p-3">
                  <ArrowTrendingUpIcon className="h-5 w-5 text-white" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-gray-900">
                    Weekly growth
                  </p>
                  <p className="mt-1 text-xs text-gray-500">
                    Based on recent signups & classes
                  </p>
                </div>
              </div>

              <div className="h-10 w-36 overflow-hidden">
                <svg viewBox="0 0 100 20" className="h-full w-full">
                  <polyline
                    fill="none"
                    stroke="#7c3aed"
                    strokeWidth="2"
                    points="0,14 10,12 20,6 30,9 40,4 50,8 60,5 70,6 80,3 90,6 100,2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    opacity="0.9"
                  />
                </svg>
              </div>
            </div>
          </div>

          <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-md font-semibold">Upcoming Sessions</h3>
                <p className="mt-1 text-xs text-gray-500">
                  Next scheduled classes (today)
                </p>
              </div>
            </div>

            <ul className="mt-4 space-y-3">
              {scheduleToday.length > 0 ? (
                scheduleToday.map((s, idx) => (
                  <li
                    key={idx}
                    className="flex items-center justify-between gap-3 rounded-lg border border-gray-100 bg-gray-50 p-3"
                  >
                    <div className="flex items-center gap-3">
                      <img
                        src={
                          s.avatar ||
                          "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=96&auto=format&fit=facearea&facepad=2&h=96"
                        }
                        alt={s.student_name ?? s.name ?? "Student avatar"}
                        className="h-10 w-10 rounded-full object-cover"
                      />
                      <div>
                        <p className="text-sm font-semibold text-gray-900">
                          {s.student_name ?? s.name ?? "Unknown"}
                        </p>
                        <p className="text-xs text-gray-500">
                          {s.subject ?? s.title ?? "Subject"}
                        </p>
                      </div>
                    </div>

                    <div className="text-right">
                      <p className="text-sm font-medium text-gray-700">
                        {s.time ?? s.start_time ?? "—"}
                      </p>
                      <p className="mt-1 text-xs text-gray-400">
                        {s.duration ? `${s.duration} min` : ""}
                      </p>
                    </div>
                  </li>
                ))
              ) : (
                <>
                  <li>
                    <SmallEmpty
                      title="No sessions today"
                      subtitle="You can schedule a class or invite a student."
                    />
                  </li>
                  <li className="mt-3 grid grid-cols-1 gap-3">
                    <button className="flex items-center justify-center gap-2 rounded-lg border border-transparent bg-indigo-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-700">
                      Start a Class
                    </button>
                    <button className="flex items-center justify-center gap-2 rounded-lg border border-gray-200 bg-white px-4 py-2 text-sm font-medium shadow-sm hover:shadow-md">
                      Invite Students
                    </button>
                  </li>
                </>
              )}
            </ul>

            <div className="mt-6 space-y-3">
              <div className="flex items-center justify-between rounded-lg bg-gray-50 p-3">
                <div className="flex items-center gap-3">
                  <UsersIcon className="h-5 w-5 text-indigo-500" />
                  <div>
                    <p className="text-xs text-gray-500">Total students</p>
                    <p className="text-sm font-semibold text-gray-900">
                      {st.students_total ?? 0}
                    </p>
                  </div>
                </div>
                <div className="text-xs text-green-600 font-medium">
                  {st.new_students_today ?? 0} new
                </div>
              </div>

              <div className="flex items-center justify-between rounded-lg bg-gray-50 p-3">
                <div className="flex items-center gap-3">
                  <CurrencyDollarIcon className="h-5 w-5 text-amber-500" />
                  <div>
                    <p className="text-xs text-gray-500">Classes total</p>
                    <p className="text-sm font-semibold text-gray-900">
                      {st.classes_total ?? 0}
                    </p>
                  </div>
                </div>
                <div className="text-xs text-gray-500">
                  {st.classes_today ?? 0} today
                </div>
              </div>
            </div>
          </div>
        </div>

        <footer className="flex items-center justify-between text-xs text-gray-400">
          <div>Timezone: {meta?.timezone ?? "UTC"}</div>
          <div>As of: {meta?.now_iso ?? meta?.date ?? "—"}</div>
        </footer>
      </div>
    </TeacherLayout>
  );
};

export default Dashboard;
