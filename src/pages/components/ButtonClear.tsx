import React from "react";
import { clearCanvas } from "./CanvasBg";

const ButtonClear = () => {
  return (
    <button type="button" onClick={clearCanvas} className="bg-emerald-300 hover:bg-emerald-400 transition-colors px-3 py-1 rounded">
      <img src="/sapu.png" alt="Sapu" width={24} />
    </button>
  );
};

export default ButtonClear;
