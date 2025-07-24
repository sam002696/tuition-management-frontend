import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import DataTable from "../../../common/DataTable";

const ActiveStudents = () => {
  const dispatch = useDispatch();
  const { acceptedRequests } = useSelector((state) => state.studentManagement);

  useEffect(() => {
    dispatch({ type: "FETCH_ACCEPTED_REQUESTS" });
  }, [dispatch]);

  const columns = [
    { key: "name", header: "Name" },
    { key: "title", header: "Title" },
    { key: "email", header: "Email" },
    { key: "role", header: "Role" },
    {
      key: "edit",
      header: "Action",
      alignRight: true,
      render: (item) => (
        <a href="#" className="text-indigo-600 hover:text-indigo-900">
          Edit<span className="sr-only">, {item.name}</span>
        </a>
      ),
    },
  ];

  // Placeholder data until you map real API data
  const people = [
    {
      name: "Lindsay Walton",
      title: "Front-end Developer",
      email: "lindsay.walton@example.com",
      role: "Member",
    },
    {
      name: "Courtney Henry",
      title: "Designer",
      email: "courtney.henry@example.com",
      role: "Admin",
    },
  ];

  console.log("acceptedRequests", acceptedRequests);

  return (
    <div className="px-4 sm:px-6 lg:px-8">
      {/* <h1 className="text-base font-semibold text-gray-900">Active Students</h1>
      <p className="mt-2 text-sm text-gray-700">
        List of students currently connected and accepted.
      </p> */}

      <DataTable columns={columns} data={people} />
      {/* Replace `people` with `acceptedRequests` once connected to backend */}
    </div>
  );
};

export default ActiveStudents;
