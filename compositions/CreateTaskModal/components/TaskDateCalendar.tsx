"use client";
import { useState } from "react";
import { FaCalendarAlt } from "react-icons/fa";
import Button from "@/components/Button/Button";
import Calendar from "./Calendar";

const TaskDateCalendar = () => {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [isOpen, setIsOpen] = useState(false);

  const handleCloseModal = () => {
    setIsOpen(false);
  };

  const handleSetDate = (date: Date) => {
    setSelectedDate(date);
  };

  return (
    <div className="relative">
      <p className="text-left mb-2 text-[14px] leading-[143%] text-black font-medium dark:text-white ">
        Due Date
      </p>
      <Button
        className={`flex justify-between items-center gap-x-6 px-4 py-3 rounded-[10px] border bg-white text-[14px] leading-[143%] text-black font-normal ${isOpen ? "border-black shadow-[0_0_10px_rgba(0,0,0,5%)] dark:border-gray-300" : "border-gray-200 dark:border-gray-600"} dark:bg-gray-700 dark:text-gray-100 dark:hover:bg-gray-600`}
        onClick={() => setIsOpen(true)}
      >
        <p>{selectedDate?.toLocaleDateString() || "Select due date"}</p>
        <FaCalendarAlt />
      </Button>
      {isOpen && (
        <Calendar
          handleSetDate={handleSetDate}
          onClose={handleCloseModal}
          selectedDate={selectedDate}
        />
      )}
      {selectedDate && (
        <input
          type="hidden"
          name="dueDate"
          value={selectedDate.toISOString() || ""}
        />
      )}
    </div>
  );
};

export default TaskDateCalendar;
