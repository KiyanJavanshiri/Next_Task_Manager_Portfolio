const BoardsPage = async ({
  searchParams,
}: {
  searchParams: Promise<{ board: string }>;
}) => {
  const params = await searchParams;

  console.log("params: ", params);
  return <div className="">boards</div>;
};

export default BoardsPage;
