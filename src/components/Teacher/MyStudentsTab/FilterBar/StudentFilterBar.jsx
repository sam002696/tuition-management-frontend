// import { FunnelIcon } from "@heroicons/react/20/solid";

// const departments = [
//   "All Departments",
//   "Computer Science",
//   "Engineering",
//   "Mathematics",
//   "Business",
// ];

const StudentFilterBar = ({
  searchTerm,
  onSearchChange,
  // selectedDept,
  // onDeptChange,
  // onFilterClick,
}) => {
  return (
    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 px-3">
      {/* Search */}
      <div className="w-full md:w-1/2">
        <input
          type="text"
          placeholder="Search students..."
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
          className="w-full rounded-md border border-gray-300 px-4 py-2 text-sm shadow-sm focus:border-indigo-500 focus:outline-none"
        />
      </div>

      {/* Filter Section */}
      {/* <div className="flex items-center gap-3">
        
        <select
          value={selectedDept}
          onChange={(e) => onDeptChange(e.target.value)}
          className="rounded-md border border-gray-300 bg-white px-3 py-2 text-sm shadow-sm focus:border-indigo-500 focus:outline-none font-semibold"
        >
          {departments.map((dept) => (
            <option key={dept} value={dept}>
              {dept}
            </option>
          ))}
        </select>

       
        <button
          onClick={onFilterClick}
          className="inline-flex items-center gap-1 rounded-md border border-gray-300 bg-white px-3 py-2 text-sm font-medium shadow-sm hover:bg-gray-100"
        >
          <FunnelIcon className="size-4 text-gray-600" />
          Filter
        </button>
      </div> */}
    </div>
  );
};

export default StudentFilterBar;
