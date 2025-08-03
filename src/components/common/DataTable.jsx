import SkeletonTableRows from "./SkeletonTableRows";

const DataTable = ({ columns, data, loading }) => {
  return (
    <div className="mt-8 flow-root">
      <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
          <div className="overflow-hidden  sm:rounded-bl-lg sm:rounded-br-lg ">
            <table className="min-w-full divide-y divide-gray-300">
              <thead className="bg-gray-50">
                <tr>
                  {columns.map((col) => (
                    <th
                      key={col.key}
                      scope="col"
                      className={`py-3.5 px-3 text-left text-sm font-semibold text-gray-900 ${
                        col.alignRight ? "text-right" : ""
                      }`}
                    >
                      {col.header}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 bg-white">
                {loading ? (
                  <SkeletonTableRows columns={columns} rowCount={6} />
                ) : (
                  data.map((item, idx) => (
                    <tr key={idx}>
                      {columns.map((col) => (
                        <td
                          key={col.key}
                          className={`px-3 py-4 text-sm whitespace-nowrap ${
                            col.alignRight
                              ? "text-right text-gray-900"
                              : "text-gray-500"
                          }`}
                        >
                          {col.render ? col.render(item) : item[col.key]}
                        </td>
                      ))}
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DataTable;
