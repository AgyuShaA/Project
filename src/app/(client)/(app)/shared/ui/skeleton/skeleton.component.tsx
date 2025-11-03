const Skeleton = ({ className = "h-6 w-full rounded-md" }) => {
  return (
    <div
      className={`bg-gray-300 dark:bg-gray-700 animate-pulse ${className}`}
    ></div>
  );
};

export default Skeleton;
