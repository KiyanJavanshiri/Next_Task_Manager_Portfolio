"use client";
import { useState } from "react";
import { RxCross2 } from "react-icons/rx";
import { FaCheck } from "react-icons/fa6";
import Button from "@/components/Button/Button";

interface IBoardInfo {
  title: string;
  background: string;
}

const BACKGROUND_OPTIONS = [
  "rgba(64, 53, 222, 100%)",
  "rgba(138, 165, 210, 100%)",
  "rgba(101, 182, 216, 100%)",
  "rgba(0,0,0,100%)",
  "rgba(30, 69, 98, 100%)",
];

const BoardCreateModal = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [boardInfo, setBoardInfo] = useState<IBoardInfo>({
    background: BACKGROUND_OPTIONS[0],
    title: "",
  });

  console.log("board data: ", boardInfo);
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
            <form className="relative">
              <p className="text-center leading-[143%] text-black text-base font-semibold">
                Create a board
              </p>
              <div className="mt-3 mb-4">
                <p className="leading-[143%] text-black text-sm font-medium">
                  Board Background
                </p>
                <div className="flex justify-start items-center gap-2 mt-2">
                  {BACKGROUND_OPTIONS.map((bg, i) => (
                    <label
                      htmlFor={`bg-${i}`}
                      style={{ backgroundColor: bg }}
                      className={`flex justify-center items-center w-8 h-6 rounded-sm relative`}
                      key={i}
                    >
                      <input
                        id={`bg-${i}`}
                        type="radio"
                        name="background"
                        className="absolute opacity-0 inset-0 cursor-pointer"
                        value={bg}
                        onChange={(e) => {
                          setBoardInfo((prev) => ({
                            ...prev,
                            background: e.target.value,
                          }));
                          console.log("im working");
                        }}
                      />
                      {boardInfo.background === bg && (
                        <FaCheck className="text-white" />
                      )}
                    </label>
                  ))}
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
                  onChange={(e) =>
                    setBoardInfo((prev) => ({ ...prev, title: e.target.value }))
                  }
                  value={boardInfo.title}
                />
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
