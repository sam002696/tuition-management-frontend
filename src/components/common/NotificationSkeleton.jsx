const NotificationSkeleton = () => {
  return (
    <div className="flex w-full items-start bg-white p-4 animate-pulse space-x-3 ring-1 ring-black/5">
      <div className="h-6 w-6 rounded-full bg-gray-300" />
      <div className="flex-1 space-y-2">
        <div className="h-4 bg-gray-300 rounded w-1/3" />
        <div className="h-3 bg-gray-200 rounded w-3/4" />
      </div>
    </div>
  );
};

export default NotificationSkeleton;
