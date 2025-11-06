const Skeleton = ({ className = 'h-6 w-full rounded-md' }) => {
  return <div className={`animate-pulse bg-gray-300 dark:bg-gray-700 ${className}`}></div>
}

export default Skeleton
