import { Suspense } from "react";
import BoardContainer from "@/compositions/BoardContainer";
import BoardCreateModal from "@/compositions/BoardCreateModal";
import BoardsLoading from "@/components/Skeletons/BoardsLoading";

const BoardsPage = async ({
  searchParams,
}: {
  searchParams: Promise<{ board: string }>;
}) => {
  const { board } = await searchParams;

  return (
    <section>
      <div className="pb-4 border-b border-b-gray-300 dark:border-b-gray-600 flex justify-between items-center">
        <h1 className="text-2xl font-semibold text-black dark:text-white leading-[143%]">
          My Boards
        </h1>
        <BoardCreateModal/>
      </div>
      <Suspense fallback={<BoardsLoading />}>
        <BoardContainer search={board || ""} />
      </Suspense>
    </section>
  );
};

export default BoardsPage;
