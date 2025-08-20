const SkeletonLoadingCalendarDayCell = () => {
  const skeletonDays = Array(42).fill(null);

  return (
    <div className="shadow-sm ring-1 ring-black/5 lg:flex lg:flex-auto lg:flex-col animate-pulse">
      <div className="grid grid-cols-7 gap-px border-b border-gray-300 bg-gray-200 text-center text-xs/6 font-semibold text-gray-700 lg:flex-none">
        {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day, idx) => (
          <div key={idx} className="flex justify-center bg-white py-2">
            <span className="w-4 h-4 rounded bg-gray-300"></span>
          </div>
        ))}
      </div>

      <div className="flex bg-gray-200 text-xs/6 text-gray-700 lg:flex-auto">
        <div className="hidden w-full lg:grid lg:grid-cols-7 lg:grid-rows-6 lg:gap-px">
          {skeletonDays.map((_, idx) => (
            <div
              key={idx}
              className="relative h-28 bg-gray-50 px-3 py-2 text-gray-500"
            >
              {/* Date placeholder */}
              <div className="w-6 h-6 rounded-full bg-gray-300 mb-2"></div>
              {/* Event placeholders */}
              <div className="space-y-1">
                <div className="h-3 rounded bg-gray-300 w-3/4"></div>
                <div className="h-3 rounded bg-gray-300 w-1/2"></div>
              </div>
            </div>
          ))}
        </div>

        <div className="isolate grid w-full grid-cols-7 grid-rows-6 gap-px lg:hidden">
          {skeletonDays.map((_, idx) => (
            <div key={idx} className="flex h-14 flex-col px-3 py-2 bg-gray-50">
              {/* Date placeholder */}
              <div className="w-4 h-4 rounded-full bg-gray-300 mb-1"></div>
              {/* Event dots placeholder */}
              <div className="flex flex-wrap-reverse">
                <div className="mx-0.5 mb-1 h-3 w-3 rounded-full bg-gray-300" />
                <div className="mx-0.5 mb-1 h-3 w-3 rounded-full bg-gray-300" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SkeletonLoadingCalendarDayCell;
