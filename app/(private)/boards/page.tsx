import { Suspense } from "react";
import BoardContainer from "@/compositions/BoardContainer";
import BoardsLoading from "@/components/Skeletons/BoardsLoading";

const BoardsPage = async ({
  searchParams,
}: {
  searchParams: Promise<{ board: string }>;
}) => {
  const { board } = await searchParams;

  return (
    <section>
      <h1 className="text-2xl font-semibold text-black leading-[143%] pb-4 border-b border-b-gray-300">
        My Boards
      </h1>
      <Suspense fallback={<BoardsLoading/>}>
        <BoardContainer search={board || ""} />
      </Suspense>
    </section>
  );
};

export default BoardsPage;
