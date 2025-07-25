import {
  EnvelopeIcon,
  PhoneIcon,
  IdentificationIcon,
} from "@heroicons/react/20/solid";
import { CheckCircleIcon } from "@heroicons/react/24/solid";
import { useDispatch, useSelector } from "react-redux";
import { setToastAlert } from "../../../../slices/error/errorSlice";

export default function StudentDetailsCard({ studentDetails }) {
  const { tuitionDetails } = useSelector((state) => state.connectStudents);
  const dispatch = useDispatch();

  const handleConnect = () => {
    // Dispatch an action to connect with the student
    if (!tuitionDetails) {
      dispatch(
        setToastAlert({
          type: "error",
          message: "Please submit tuition details first.",
        })
      );
      return;
    }
    dispatch({
      type: "SEND_CONNECTION_REQUEST",
      payload: {
        custom_id: studentDetails.custom_id,
        tuition_details_id: tuitionDetails?.id,
      },
    });
  };

  return (
    <div className="lg:col-start-3 lg:row-end-1 max-w-xs mr-auto mt-5">
      <h2 className="sr-only">Student Summary</h2>
      <div className="rounded-lg bg-white shadow-xs  outline-1 outline-gray-900/5">
        <dl className="flex flex-wrap">
          <div className="flex-auto pt-6 pl-6">
            <dt className="text-sm/6 font-semibold text-gray-900">Full Name</dt>
            <dd className="mt-1 text-base font-semibold text-indigo-500">
              {studentDetails?.name}
            </dd>
          </div>
          <div className="flex-none self-end px-6 pt-4">
            <dt className="sr-only">Role</dt>
            <dd className="inline-flex items-center rounded-md bg-blue-50 px-2 py-1 text-xs font-medium text-blue-700 ring-1 ring-inset ring-blue-600/20">
              Student
            </dd>
          </div>

          <div className="mt-6 flex w-full flex-none gap-x-4 border-t border-gray-900/5 px-6 pt-6">
            <dt className="flex-none">
              <EnvelopeIcon
                className="h-6 w-5 text-red-400"
                aria-hidden="true"
              />
            </dt>
            <dd className="text-sm/6 font-medium text-gray-900">
              {studentDetails?.email}
            </dd>
          </div>

          <div className="mt-4 flex w-full flex-none gap-x-4 px-6">
            <dt className="flex-none">
              <PhoneIcon
                className="h-6 w-5 text-green-400"
                aria-hidden="true"
              />
            </dt>
            <dd className="text-sm/6 text-gray-500">{studentDetails?.phone}</dd>
          </div>

          <div className="mt-4 flex w-full flex-none gap-x-4 px-6">
            <dt className="flex-none">
              <IdentificationIcon
                className="h-6 w-5 text-blue-400"
                aria-hidden="true"
              />
            </dt>
            <dd className="text-sm/6 text-gray-500">
              {studentDetails?.custom_id}
            </dd>
          </div>
        </dl>

        <div className="mt-6 border-t border-gray-900/5 px-6 py-6">
          <button
            type="button"
            onClick={handleConnect}
            className="inline-flex items-center gap-x-1.5 rounded-md bg-green-600 px-2.5 py-1.5 text-sm font-semibold text-white shadow-xs hover:bg-green-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-600 cursor-pointer"
          >
            <CheckCircleIcon aria-hidden="true" className="-ml-0.5 size-5" />
            Connect
          </button>
        </div>
      </div>
    </div>
  );
}
