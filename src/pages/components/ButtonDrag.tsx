import React from "react";

const ButtonDrag = ({ active, handleDragMode }: { active: boolean; handleDragMode: () => void }) => {
  return (
    <>
      <button type="button" onClick={handleDragMode} className="w-16 h-10 bg-slate-500 rounded-full">
        <div className={`flex items-center justify-center rounded-full w-8 h-8 ml-1 transition-all text-sm bg-green-800 text-white ${active && "translate-x-6"}`}>
          { active ? "On" : "Off" }
        </div>
      </button>
      <p>Drag Mode</p>
    </>
  );
};

export default ButtonDrag;
