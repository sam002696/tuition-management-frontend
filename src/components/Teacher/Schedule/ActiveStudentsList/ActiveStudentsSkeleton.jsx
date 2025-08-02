const ActiveStudentsSkeleton = ({ activeConnections = [] }) => {
  // Create placeholder array if activeConnections is empty
  const placeholders = activeConnections.length > 0 ? activeConnections : Array(3).fill({});
  return (
    <ul
      role="list"
      className="divide-y divide-gray-100 overflow-hidden bg-white shadow-xs ring-1 ring-gray-900/5 sm:rounded-xl max-w-lg animate-pulse"
    >
      {placeholders.map((_, idx) => (
        <li
          key={idx}
          className="flex justify-between gap-x-6 px-4 py-5 sm:px-6"
        >
          <div className="flex min-w-0 gap-x-4">
            <div className="h-12 w-12 rounded-full bg-gray-200" />

            <div className="min-w-0 flex-auto space-y-2">
              <div className="h-4 w-28 rounded bg-gray-200" />
              <div className="h-3 w-20 rounded bg-gray-100" />
            </div>
          </div>

          <div className="flex shrink-0 items-center gap-x-4">
            <div className="hidden sm:flex sm:flex-col sm:items-end space-y-2">
              <div className="h-4 w-16 rounded bg-gray-200" />
              <div className="h-3 w-20 rounded bg-gray-100" />
            </div>
            <div className="h-5 w-5 rounded-full bg-gray-200" />
          </div>
        </li>
      ))}
    </ul>
  );
};
export default ActiveStudentsSkeleton;
