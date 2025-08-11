// Get initials from a full name
export const getInitials = (name) => {
  return name
    ?.split(" ")
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
};

// Generate a consistent background color from a string (name)
const colors = [
  "bg-pink-500",
  "bg-blue-500",
  "bg-green-500",
  "bg-yellow-500",
  "bg-purple-500",
  "bg-red-500",
  "bg-indigo-500",
  "bg-teal-500",
];
export const generateColor = (name) => {
  let hash = 0;
  for (let i = 0; i < name?.length; i++) {
    hash = name.charCodeAt(i) + ((hash << 4) - hash);
  }
  return colors[Math.abs(hash) % colors.length];
};
