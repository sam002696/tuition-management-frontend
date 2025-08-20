const SkeletonBox = ({ className = "" }) => (
  <div className={`animate-pulse rounded bg-gray-200 ${className}`} />
);

const TuitionDetailsSkeleton = () => {
  return (
    <div className="max-w-2xl mt-6 space-y-6 bg-white shadow-sm sm:rounded-md sm:p-6">
      <SkeletonBox className="h-6 w-1/3" />

      <div className="grid grid-cols-6 gap-6 pt-5">
        <SkeletonBox className="h-10 col-span-6 sm:col-span-3" />
        <SkeletonBox className="h-10 col-span-6 sm:col-span-3" />
        <SkeletonBox className="h-10 col-span-6 sm:col-span-3" />
        <SkeletonBox className="h-10 col-span-6 sm:col-span-3" />
      </div>

      <SkeletonBox className="h-10 w-full" />
      <SkeletonBox className="h-10 w-full" />

      <div className="grid grid-cols-6 gap-6">
        <SkeletonBox className="h-10 col-span-6 sm:col-span-3" />
        <SkeletonBox className="h-10 col-span-6 sm:col-span-3" />
      </div>

      <SkeletonBox className="h-10 w-full" />

      <div className="grid grid-cols-6 gap-6">
        <SkeletonBox className="h-10 col-span-6 sm:col-span-3" />
        <SkeletonBox className="h-10 col-span-6 sm:col-span-3" />
      </div>

      <SkeletonBox className="h-10 w-full" />

      <div className="grid grid-cols-6 gap-6">
        <SkeletonBox className="h-10 col-span-6 sm:col-span-3" />
        <SkeletonBox className="h-10 col-span-6 sm:col-span-3" />
      </div>

      <SkeletonBox className="h-10 w-32" />
    </div>
  );
};

export default TuitionDetailsSkeleton;
