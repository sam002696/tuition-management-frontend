// pages/Teacher/MyStudents/MyStudents.jsx
import { useState } from "react";
import TeacherLayout from "../../../Layout/TeacherLayout/TeacherLayout";
import Tabs from "../../../components/common/Tabs";
import ActiveStudents from "../../../components/Teacher/MyStudentsTab/ActiveStudents/ActiveStudents";

const tabItems = [
  { name: "Active students", href: "#" },
  { name: "Pending students", href: "#" },
  { name: "Past students", href: "#" },
];

const MyStudents = () => {
  const [currentTab, setCurrentTab] = useState("Active students");

  return (
    <TeacherLayout>
      <Tabs
        tabs={tabItems}
        currentTab={currentTab}
        onTabChange={setCurrentTab}
      />

      <div className="mt-6">
        {currentTab === "Active students" && (
          <>
            <ActiveStudents />
          </>
        )}
        {currentTab === "Pending students" && (
          <div>Showing Pending Students</div>
        )}
        {currentTab === "Past students" && <div>Showing Past Students</div>}
      </div>
    </TeacherLayout>
  );
};

export default MyStudents;
