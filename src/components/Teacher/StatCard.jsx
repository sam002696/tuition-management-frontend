/**
 * Props:
 * - title: string
 * - value: string|number
 * - icon: Heroicon component
 * - accent: tailwind classes for soft bg/text/ring
 * - iconBg: tailwind bg class for the icon bubble
 */
const StatCard = ({ title, value, icon: Icon, accent, iconBg }) => {
  return (
    <div className="group relative overflow-hidden rounded-2xl border border-gray-200 bg-white p-5 shadow-sm transition hover:shadow-md">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm text-gray-500">{title}</p>
          <p className="mt-2 text-3xl font-bold text-gray-900">{value}</p>
        </div>

        <div
          className={`ml-3 inline-flex h-11 w-11 items-center justify-center rounded-2xl ${iconBg}`}
        >
          {Icon && <Icon className="h-6 w-6 text-gray-700/80" />}
        </div>
      </div>

      {/* subtle accent chip (top-right) */}
      <div
        className={`pointer-events-none absolute right-3 top-3 hidden rounded-lg px-2 py-1 text-xs font-medium ring-1 sm:block ${accent}`}
      >
        {title.split(" ")[0]}
      </div>
    </div>
  );
};

export default StatCard;
