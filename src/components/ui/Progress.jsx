const Progress = ({ value, className = "" }) => {
  // Function to determine color based on percentage
  const getColorClass = (percentage) => {
    if (percentage >= 90) return 'bg-red-500';
    if (percentage >= 75) return 'bg-yellow-500';
    return 'bg-green-500';
  };

  return (
    <div className="relative pt-1">
      <div className="overflow-hidden h-2 text-xs flex rounded bg-gray-200 dark:bg-gray-700">
        <div
          style={{ width: `${value}%` }}
          className={`shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center transition-all ${getColorClass(value)}`}
        />
      </div>
    </div>
  );
};

export default Progress; 