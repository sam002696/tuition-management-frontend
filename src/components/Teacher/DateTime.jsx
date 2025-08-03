const DateTime = () => {
  const today = new Date();
  const formattedDate = today.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <div className="text-sm text-gray-700 font-semibold">{formattedDate}</div>
  );
};

export default DateTime;
