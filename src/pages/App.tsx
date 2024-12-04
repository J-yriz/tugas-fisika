import React, { useState } from "react";
import CanvasBg from "./components/CanvasBg";
import ButtonDelay from "./components/ButtonDelay";
import { ICanvasData } from "../utility/Type";

function App() {
  const [canvasData, setCanvasData] = useState<ICanvasData>({} as ICanvasData);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const inputData = {
      kecepatan: Number(formData.get("kecepatan")),
      sudut: Number(formData.get("sudut")),
      warna: String(formData.get("warna")),
    };

    if (inputData.kecepatan <= 0) return;
    if (inputData.sudut > 90) return alert("Sudut tidak boleh lebih dari 45 derajat");

    setCanvasData(inputData);
  };

  return (
    <div className="container mx-auto space-y-2">
      <form onSubmit={handleSubmit} className="font-sans flex items-center space-x-2 justify-center mt-5">
        <input type="number" id="kecepatan" name="kecepatan" placeholder="Masukan kecepatan..." className="bg-slate-200 outline-none p-1 rounded" />
        <input type="number" id="sudut" name="sudut" placeholder="Masukan untuk sudut.." className="bg-slate-200 outline-none p-1 rounded" />
        <input type="color" id="warna" name="warna" className="h-9" />
        <button type="submit" className="bg-sky-300 hover:bg-sky-400 transition-colors p-1 px-3 rounded">
          GO!
        </button>
        <ButtonDelay />
      </form>
      <CanvasBg canvasData={canvasData} />
    </div>
  );
}

export default App;
