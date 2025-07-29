import { useState } from "react";

const Toast = ({ message }) => {
  const [isOpen, setIsOpen] = useState(true);

  return (
    isOpen && (
      <div className="z-50 fixed top-4 right-4 bg-slate-800 text-white px-4 py-3 rounded-lg shadow-lg border border-slate-700 flex items-center gap-3 max-w-sm animate-in slide-in-from-right duration-300">
        {message}
        <button
          onClick={() => {
            setIsOpen(false);
          }}
          className="ml-auto text-slate-400 hover:text-white transition-colors p-1 hover:bg-slate-700 rounded"
          aria-label="Close"
        >
          x
        </button>
      </div>
    )
  );
};

export default Toast;
