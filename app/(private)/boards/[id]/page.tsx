import { actionGetTasks } from "@/utils/actions/tasks/getTasks";
import Button from "@/components/Button/Button";
import AddMemberModal from "@/compositions/AddMemberModal/AddMemberModal";
import CreateTaskModal from "@/compositions/CreateTaskModal/CreateTaskModal";
import ColumnsContainer from "@/compositions/ColumnsContainer";

const AllTasksPage = async ({
  params,
}: {
  params: Promise<{ id: string }>;
}) => {
  const { id } = await params;

  const board = await actionGetTasks(id);
  const { title, tasks, members } = board!;

  return (
    <section className="">
      <h2 className="text-3xl leading-[143%] text-black font-semibold">
        {title}
      </h2>
      <div className="mt-3 flex justify-between items-center pb-4 border-b border-gray-300">
        <div className="">
          <Button className="">Board</Button>
        </div>
        <div className="flex justify-center items-center gap-x-4">
          <AddMemberModal boardId={board!.id} />
          <CreateTaskModal
            boardId={board!.id}
            members={members.map((member) => ({ ...member.user }))}
          />
        </div>
      </div>
      <ColumnsContainer tasks={tasks} boardId={board!.id} />
    </section>
  );
};

export default AllTasksPage;
