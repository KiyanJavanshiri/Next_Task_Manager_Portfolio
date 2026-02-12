import { actionGetTasks } from "@/utils/actions/tasks/getTasks";
import Button from "@/components/Button/Button";

const AllTasksPage = async ({
  params,
}: {
  params: Promise<{ id: string }>;
}) => {
  const { id } = await params;

  const board = await actionGetTasks(id);

  return (
    <section className="">
        <h2>
            {board?.title}
        </h2>
        <div className="">
            <div className="">
                <Button className="">
                    Board
                </Button>
            </div>
            <Button className="">
                create new task
            </Button>
        </div>
    </section>
  );
};

export default AllTasksPage;
