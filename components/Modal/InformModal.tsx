"use client";
import { useEffect } from "react";
import { createPortal } from "react-dom";

const InformModal = ({
  onClose,
  message,
}: {
  onClose: () => void;
  message: string;
}) => {
  useEffect(() => {
    setTimeout(() => {
      onClose();
    }, 3000);
  }, []);

  return createPortal(
    <div className="absolute top-6 left-1/2 -translate-x-1/2 px-4 py-2 rounded-sm text-center max-w-50 bg-white shadow-[0_0_10px_rgba(0,0,0,10%)] border border-gray-400">
      <p className="font-medium text-black leading-[143%] text-sm">
        {message}
      </p>
    </div>,
    document.getElementById("modals")!,
  );
};

export default InformModal;
