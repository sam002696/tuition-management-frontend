import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/20/solid";

const btnBase =
  "relative inline-flex items-center px-3 py-2 text-sm ring-1 ring-inset ring-gray-300 focus:z-20";
const numBtn =
  "px-4 py-2 text-sm font-semibold ring-1 ring-inset ring-gray-300 focus:z-20";
const disabled = "disabled:opacity-50 disabled:cursor-not-allowed";

function classNames(...c) {
  return c.filter(Boolean).join(" ");
}

const Pagination = ({
  currentPage = 1,
  perPage = 10,
  total = 0,
  totalPages = Math.max(1, Math.ceil(total / perPage)),
  onPageChange,
  variant = "inset", // 'inset' | 'standalone'
  density = "comfortable", // 'comfortable' | 'compact'
  siblingCount = 1,
  boundaryCount = 1,
  showSummary = true,
  className = "",
}) => {
  // Build a compact page model with ellipses
  const buildItems = () => {
    const pages = new Set([1, totalPages]);
    for (let i = 1; i <= boundaryCount; i++) pages.add(i);
    for (let i = totalPages - boundaryCount + 1; i <= totalPages; i++)
      if (i >= 1) pages.add(i);
    for (
      let i = currentPage - siblingCount;
      i <= currentPage + siblingCount;
      i++
    )
      if (i >= 1 && i <= totalPages) pages.add(i);

    const sorted = [...pages].sort((a, b) => a - b);
    const items = [];
    let last = 0;

    for (const p of sorted) {
      if (last && p - last > 1) items.push("ellipsis");
      items.push(p);
      last = p;
    }
    return items;
  };

  const items = buildItems();

  const base =
    "w-full " + (density === "comfortable" ? "px-4 py-4" : "px-3 py-2");
  const look =
    variant === "inset"
      ? "bg-gray-50 border-t border-gray-200"
      : "bg-white ring-1 ring-gray-900/5 shadow-xs rounded-xl";
  const wrapperClasses = classNames(
    base,
    look,
    // layout that never feels cramped
    "flex flex-wrap items-center justify-between gap-3 sm:gap-4",
    className
  );

  const handleChange = (p) => {
    if (!onPageChange) return;
    const safe = Math.min(Math.max(1, p), totalPages);
    if (safe !== currentPage) onPageChange(safe);
  };

  return (
    <div className={wrapperClasses}>
      {/* Summary (wraps above/below controls when space is tight) */}
      {showSummary && (
        <div className="text-sm text-gray-700">
          {total === 0 ? (
            "No results found."
          ) : (
            <>
              Showing{" "}
              <span className="font-medium">
                {(currentPage - 1) * perPage + 1}
              </span>{" "}
              to{" "}
              <span className="font-medium">
                {Math.min(currentPage * perPage, total)}
              </span>{" "}
              of <span className="font-medium">{total}</span> results
            </>
          )}
        </div>
      )}

      {/* Controls */}
      <nav
        aria-label="Pagination"
        className={classNames(
          // allowing long lists to scroll instead of squishing
          "isolate inline-flex items-stretch rounded-md shadow-sm overflow-x-auto max-w-full",
          // small gap between buttons when overflowed
          "gap-px"
        )}
      >
        {/* First */}
        <button
          onClick={() => handleChange(1)}
          disabled={currentPage === 1}
          className={classNames(
            btnBase,
            "rounded-l-md text-gray-600 hover:bg-gray-50",
            disabled
          )}
          title="First page"
        >
          «
        </button>

        {/* Prev */}
        <button
          onClick={() => handleChange(currentPage - 1)}
          disabled={currentPage === 1}
          className={classNames(
            btnBase,
            "text-gray-600 hover:bg-gray-50",
            disabled
          )}
          title="Previous page"
        >
          <ChevronLeftIcon className="size-5" aria-hidden="true" />
        </button>

        {/* Numbers + ellipses */}
        {items.map((it, idx) =>
          it === "ellipsis" ? (
            <span
              key={`e-${idx}`}
              className={classNames(numBtn, "text-gray-400 select-none")}
            >
              …
            </span>
          ) : (
            <button
              key={it}
              onClick={() => handleChange(it)}
              aria-current={it === currentPage ? "page" : undefined}
              className={classNames(
                numBtn,
                it === currentPage
                  ? "z-10 bg-indigo-600 text-white"
                  : "bg-white text-gray-900 hover:bg-gray-50"
              )}
            >
              {it}
            </button>
          )
        )}

        {/* Next */}
        <button
          onClick={() => handleChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className={classNames(
            btnBase,
            "text-gray-600 hover:bg-gray-50",
            disabled
          )}
          title="Next page"
        >
          <ChevronRightIcon className="size-5" aria-hidden="true" />
        </button>

        {/* Last */}
        <button
          onClick={() => handleChange(totalPages)}
          disabled={currentPage === totalPages}
          className={classNames(
            btnBase,
            "rounded-r-md text-gray-600 hover:bg-gray-50",
            disabled
          )}
          title="Last page"
        >
          »
        </button>
      </nav>
    </div>
  );
};

export default Pagination;
