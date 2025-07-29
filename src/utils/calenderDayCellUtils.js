export const convertTo12HourFormat = (time24) => {
  if (!time24) return "";
  const [hour, minute] = time24.split(":").map(Number);
  const ampm = hour >= 12 ? "PM" : "AM";
  const hour12 = hour % 12 || 12;
  return `${hour12}:${minute.toString().padStart(2, "0")}${ampm}`;
};

export const getEventTextColor = (status) => {
  switch (status) {
    case "accepted":
      return "text-green-600 group-hover:text-green-800";
    case "pending":
      return "text-yellow-600 group-hover:text-yellow-800";
    case "rejected":
      return "text-red-600 group-hover:text-red-800";
    default:
      return "text-gray-900 group-hover:text-indigo-600"; // fallback
  }
};
