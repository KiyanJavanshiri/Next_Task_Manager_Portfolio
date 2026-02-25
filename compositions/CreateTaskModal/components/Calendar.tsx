"use client";
import { useState } from "react";
import {
  startOfToday,
  isToday,
  startOfMonth,
  startOfWeek,
  subMonths,
  addMonths,
  format,
  getDay,
  getMonth,
  addDays,
  isEqual,
} from "date-fns";
import { MdKeyboardArrowRight, MdKeyboardArrowLeft } from "react-icons/md";
import Button from "@/components/Button/Button";

const DAYS_OF_WEEK = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];
const START_OF_COLUMN_CLASSES = [
  "",
  "col-start-2",
  "col-start-3",
  "col-start-4",
  "col-start-5",
  "col-start-6",
  "col-start-7",
];

const Calendar = ({
  selectedDate,
  handleSetDate,
  onClose,
}: {
  selectedDate: Date | null;
  handleSetDate: (date: Date) => void;
  onClose: () => void;
}) => {
  const currentDate = startOfToday();
  const [month, setMonth] = useState(startOfMonth(currentDate));

  const monthDays = Array.from({ length: 42 }, (_, i) =>
    addDays(startOfWeek(month), i),
  );

  const handleMonths = (type: "next" | "previous") => {
    if (type === "next") {
      setMonth(addMonths(month, 1));
      return;
    }
    setMonth(subMonths(month, 1));
  };

  return (
    <div className="max-w-65 absolute right-0 top-0 -translate-x-4 -translate-y-1/2 bg-white shadow-[0_0_10px_rgba(0,0,0,10%)] rounded-md p-4 z-10">
      <div className="flex justify-between items-center">
        <Button
          className="inline-block"
          onClick={() => handleMonths("previous")}
        >
          <MdKeyboardArrowLeft className="w-5 h-5" />
        </Button>
        <span className="text-sm font-medium text-black leading-[143%]">
          {format(month, "MMMM yyyy")}
        </span>
        <Button className="inline-block" onClick={() => handleMonths("next")}>
          <MdKeyboardArrowRight className="w-5 h-5" />
        </Button>
      </div>
      <div className="mt-6">
        <div className="grid grid-cols-7 gap-1">
          {DAYS_OF_WEEK.map((day, i) => (
            <span
              className="block text-sm font-medium text-black leading-[143%] text-center"
              key={i}
            >
              {day}
            </span>
          ))}
          {monthDays.map((day, i) => (
            <Button
              className={`relative px-4 py-1 rounded-full flex justify-center items-center ${selectedDate && isEqual(day, selectedDate) ? "bg-black text-white hover:bg-gray-700" : "text-black bg-white hover:bg-gray-200"} ${
                i === 0 ? START_OF_COLUMN_CLASSES[getDay(day)] : ""
              } ${getMonth(day) !== getMonth(month) ? "text-gray-400" : ""}`}
              key={day.toString()}
              onClick={() => {
                handleSetDate(day);
                onClose();
              }}
            >
              {format(day, "d")}
              {isToday(day) && <div className={`absolute w-4 h-0.5 rounded-full ${selectedDate && isEqual(day, selectedDate) ? "bg-white" : "bg-black"} bottom-1 left-1/2 -translate-x-1/2`}></div>}
            </Button>
          ))}
        </div>
      </div>
      <Button
        className="inline-block mt-2 px-3 py-1 rounded-md border border-gray-300 text-black text-sm leading-[143%] font-normal"
        onClick={onClose}
      >
        Close
      </Button>
    </div>
  );
};

export default Calendar;
