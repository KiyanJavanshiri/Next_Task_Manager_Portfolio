import type { TBoardState } from "@/compositions/BoardCreateModal";

export const createBoard = async (state: TBoardState, formData: FormData) => {
  const data = Object.fromEntries(formData) as {
    boardName: string;
    background: string;
  };

  console.log("data: ", data);

  if (!data.boardName.trim())
    return {
      errors: {
        boardName: "Enter at least 1 symbol",
      },
    };
};
