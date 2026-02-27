const BoardsLoading = () => {
  return (
    <ul className="mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {Array.from({ length: 6 }).map((_, i) => (
        <li className="h-29 bg-gray-200 rounded-sm dark:bg-gray-700" key={i}></li>
      ))}
    </ul>
  );
};

export default BoardsLoading;
