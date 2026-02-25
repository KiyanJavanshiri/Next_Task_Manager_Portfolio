"use client";
import { useState } from "react";
import { startOfToday } from "date-fns";
import { FaCalendarAlt } from "react-icons/fa";
import Button from "@/components/Button/Button";
import Calendar from "./Calendar";

const TaskDateCalendar = () => {
  const [selectedDate, setSelectedDate] = useState(startOfToday());
  const [isOpen, setIsOpen] = useState(false);

  const handleCloseModal = () => {
    setIsOpen(false);
  };

  const handleSetDate = (date: Date) => {
    setSelectedDate(date);
  };

  return (
    <div className="relative">
      <p className="text-left mb-2 text-[14px] leading-[143%] text-black font-medium">
        Due Date
      </p>
      <Button
        className={`flex justify-between items-center gap-x-6 px-4 py-3 rounded-[10px] border bg-white text-[14px] leading-[143%] text-black font-normal ${isOpen ? "border-black shadow-[0_0_10px_rgba(0,0,0,5%)]" : "border-gray-200"}`}
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
      <input
        type="hidden"
        name="dueDate"
        value={selectedDate?.toISOString() || ""}
      />
    </div>
  );
};

export default TaskDateCalendar;
