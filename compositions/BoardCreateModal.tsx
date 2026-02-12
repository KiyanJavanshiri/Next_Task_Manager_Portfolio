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
  const [state, action, isPending] = useActionState(createBoard, undefined);

  return (
    <>
      <div className="relative">
        <Button
          className="inline-block px-4 py-2 rounded-sm bg-black transition-colors duration-100 ease-in-out hover:bg-gray-800 text-base text-gray-300 font-medium leading-[143%]"
          onClick={() => setIsOpen(!isOpen)}
        >
          Create a board
        </Button>
        {isOpen && (
          <div className="absolute top-0 -left-2 -translate-x-full p-6 rounded-md shadow-[0_0_10px_rgba(0,0,0,10%)] bg-white min-w-70 z-10">
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
                          className="absolute opacity-0 inset-0 cursor-pointer peer"
                          value={bgColor}
                        />
                        <FaCheck className="hidden text-white peer-checked:block" />
                      </label>
                    ),
                  )}
                </div>
                {state?.errors?.background && <p className="mt-1 text-[12px] leading-[143%] font-normal text-red-500">{state.errors.background}</p>}
              </div>
              <fieldset>
                <label
                  className="block leading-[143%] text-black text-sm font-medium mb-2"
                  htmlFor="board-name"
                >
                  Board Name
                </label>
                <input
                  id="board-name"
                  placeholder="Enter board name..."
                  name="boardName"
                  maxLength={30}
                  className="w-full px-3 py-1.5 outline-none text-sm leading-[143%] font-normal border border-black rounded-sm text-black placeholder:text-gray-400 focus:border-2"
                />
                {state?.errors?.boardName && <p className="mt-1 text-[12px] leading-[143%] font-normal text-red-500">{state.errors.boardName}</p>}
              </fieldset>
              <Button
                type="submit"
                className="block mt-4 w-full p-2 rounded-sm text-white text-base leading-[143%] font-medium transition-colors duration-100 ease-in-out bg-black hover:bg-gray-900 disabled:bg-gray-900"
                disabled={isPending}
              >
                {isPending ? "Creating..." : "Create"}
              </Button>
            </form>
          </div>
        )}
      </div>
    </>
  );
};

export default BoardCreateModal;
