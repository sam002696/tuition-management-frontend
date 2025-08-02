const StudentDetailsCardSkeleton = () => {
  return (
    <div className="lg:col-start-3 lg:row-end-1 max-w-xs mr-auto mt-5">
      <div className="rounded-lg bg-white shadow-xs outline-1 outline-gray-900/5 animate-pulse">
        <div className="flex flex-wrap">
          <div className="flex-auto pt-6 pl-6">
            <div className="h-4 w-24 bg-gray-200 rounded mb-2" />
            <div className="h-5 w-36 bg-gray-300 rounded" />
          </div>
          <div className="flex-none self-end px-6 pt-4">
            <div className="h-6 w-20 bg-gray-200 rounded-md" />
          </div>

          <div className="mt-6 flex w-full gap-x-4 border-t border-gray-900/5 px-6 pt-6">
            <div className="h-6 w-5 bg-gray-200 rounded" />
            <div className="h-4 w-32 bg-gray-300 rounded" />
          </div>

          <div className="mt-4 flex w-full gap-x-4 px-6">
            <div className="h-6 w-5 bg-gray-200 rounded" />
            <div className="h-4 w-28 bg-gray-300 rounded" />
          </div>

          <div className="mt-4 flex w-full gap-x-4 px-6">
            <div className="h-6 w-5 bg-gray-200 rounded" />
            <div className="h-4 w-24 bg-gray-300 rounded" />
          </div>
        </div>

        <div className="mt-6 border-t border-gray-900/5 px-6 py-6">
          <div className="h-9 w-full bg-gray-300 rounded-md" />
        </div>
      </div>
    </div>
  );
};

export default StudentDetailsCardSkeleton;
