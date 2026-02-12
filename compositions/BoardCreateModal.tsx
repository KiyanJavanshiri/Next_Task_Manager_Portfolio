"use client";
import { useState, useActionState } from "react";
import { BoardBackgroundColor } from "@/utils/types";
import { createBoard } from "@/utils/actions/board/createBoard";
import { RxCross2 } from "react-icons/rx";
import { FaCheck } from "react-icons/fa6";
import Button from "@/components/Button/Button";

export type TBoardState =
  | {
      errors: {
        boardName?: string;
        background?: string;
      };
    }
  | undefined;

const BoardCreateModal = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [state, action] = useActionState(createBoard, undefined);

  return (
    <>
      <div className="relative">
        <Button
          className="flex justify-center items-center rounded-sm bg-gray-700 h-31 w-full transition-colors duration-100 ease-in-out hover:bg-gray-600 text-base text-gray-300 font-medium leading-[143%]"
          onClick={() => setIsOpen(!isOpen)}
        >
          Create a board
        </Button>
        {isOpen && (
          <div className="absolute -top-1/2 -right-2 translate-x-full p-6 rounded-md shadow-[0_0_10px_rgba(0,0,0,10%)] bg-white">
            <Button
              className="absolute top-4 right-4 p-2 rounded-sm hover:bg-gray-200 z-10"
              onClick={() => setIsOpen(false)}
            >
              <RxCross2 />
            </Button>
            <form action={action} className="relative">
              <p className="text-center leading-[143%] text-black text-base font-semibold">
                Create a board
              </p>
              <div className="mt-3 mb-4">
                <p className="leading-[143%] text-black text-sm font-medium">
                  Board Background
                </p>
                <div className="flex justify-start items-center gap-2 mt-2">
                  {Object.entries(BoardBackgroundColor).map(
                    ([bgName, bgColor], i) => (
                      <label
                        htmlFor={`bg-${bgName}`}
                        style={{ backgroundColor: bgColor }}
                        className={`flex justify-center items-center w-8 h-6 rounded-sm relative`}
                        key={i}
                      >
                        <input
                          id={`bg-${i}`}
                          type="radio"
                          name="background"
                          className="absolute opacity-0 inset-0 cursor-pointer"
                          value={bgColor}
                        />
                        <FaCheck className="text-white" />
                      </label>
                    ),
                  )}
                </div>
              </div>
              <fieldset>
                <label
                  className="block leading-[143%] text-black text-sm font-medium"
                  htmlFor="board-name"
                >
                  Board Name
                </label>
                <input
                  id="board-name"
                  placeholder="Enter board name..."
                  name="boardName"
                />
                {state?.errors?.boardName && <p>{state.errors.boardName}</p>}
              </fieldset>
              <Button type="submit" className="">
                Create
              </Button>
            </form>
          </div>
        )}
      </div>
    </>
  );
};

export default BoardCreateModal;
