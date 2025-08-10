import {
  EnvelopeIcon,
  PhoneIcon,
  IdentificationIcon,
} from "@heroicons/react/20/solid";
import { useDispatch, useSelector } from "react-redux";
import { setToastAlert } from "../../../../slices/error/errorSlice";
import { useEffect } from "react";
import { getConnectionButtonState } from "../../../../utils/connectionStatusUtils";
import StudentDetailsCardSkeleton from "./StudentDetailsCardSkeleton";

export default function StudentDetailsCard({ studentDetails }) {
  const { tuitionDetails, connectionStatus, loading, connectionStatusLoading } =
    useSelector((state) => state.connectStudents);

  const {
    label,
    disabled,
    className: buttonClass,
    icon: Icon,
  } = getConnectionButtonState(connectionStatus);
  const dispatch = useDispatch();

  // check connection status with a student regarding teacher

  useEffect(() => {
    if (studentDetails?.id) {
      dispatch({
        type: "CHECK_CONNECTION_STATUS",
        payload: {
          student_id: studentDetails.id,
        },
      });
    }
  }, [dispatch, studentDetails?.id]);

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
        student_id: studentDetails?.id,
        custom_id: studentDetails?.custom_id,
        tuition_details_id: tuitionDetails?.id,
      },
    });
  };

  return (
    <>
      {loading ? (
        <>
          <StudentDetailsCardSkeleton />
        </>
      ) : (
        <>
          <div className="lg:col-start-3 lg:row-end-1 max-w-xs mr-auto mt-5">
            <h2 className="sr-only">Student Summary</h2>
            <div className="rounded-lg bg-white shadow-xs  outline-1 outline-gray-900/5">
              <dl className="flex flex-wrap">
                <div className="flex-auto pt-6 pl-6">
                  <dt className="text-sm/6 font-semibold text-gray-900">
                    Full Name
                  </dt>
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
                  <dd className="text-sm/6 text-gray-500">
                    {studentDetails?.phone}
                  </dd>
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
                  disabled={disabled || loading || connectionStatusLoading}
                  className={`inline-flex items-center gap-x-1.5 rounded-md px-2.5 py-1.5 text-sm font-semibold shadow-xs focus-visible:outline-2 focus-visible:outline-offset-2 ${buttonClass}`}
                >
                  <Icon
                    aria-hidden="true"
                    className={`-ml-0.5 size-5 ${
                      connectionStatusLoading && "hidden"
                    }`}
                  />
                  {loading
                    ? "Sending request..."
                    : connectionStatusLoading
                    ? "Loading..."
                    : label}
                </button>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
}
