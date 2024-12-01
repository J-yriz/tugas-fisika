import React, { useState } from "react";
import CanvasBg from "./components/CanvasBg";
import { ICanvasData } from "../utility/Type";

function App() {
  const [canvasData, setCanvasData] = useState<ICanvasData>({} as ICanvasData);

  const handleButton = () => {
    const inputData = {
      kecepatan: Number((document.getElementById("kecepatan") as HTMLInputElement).value),
      sudut: Number((document.getElementById("sudut") as HTMLInputElement).value),
      warna: (document.getElementById("warna") as HTMLInputElement).value,
    };

    setCanvasData(inputData);
  };

  return (
    <div className="container mx-auto space-y-2">
      <div className="font-sans flex items-center space-x-2 justify-center mt-5">
        <input type="number" id="kecepatan" placeholder="Masukan kecepatan..." className="bg-slate-200 outline-none p-1 rounded" />
        <input type="number" id="sudut" placeholder="Masukan untuk sudut.." className="bg-slate-200 outline-none p-1 rounded" />
        <input type="color" name="warna" id="warna" className="h-9" />
        <button onClick={handleButton} className="bg-sky-300 hover:bg-sky-400 transition-colors p-1 px-3 rounded">
          GO!
        </button>
      </div>
      <CanvasBg canvasData={canvasData} />
    </div>
  );
}

export default App;
