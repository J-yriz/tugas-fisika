import React, { useState } from "react";
import CanvasBg from "./components/CanvasBg";
import ButtonClear from "./components/ButtonClear";
import { ICanvasData } from "../utility/Type";
import ButtonDrag from "./components/ButtonDrag";
// import ButtonAction from "./components/ButtonAction";

function App() {
  const [active, setActive] = useState<boolean>(true);
  // const [pausePlay, setPausePlay] = useState<boolean>(false);
  const [canvasData, setCanvasData] = useState<ICanvasData>({} as ICanvasData);
  // const [dataTable, setDataTable] = useState<IDataTable>({ percepatan: { massaBenda: 0 }, sudut: { sin: 0, cos: 0 } });

  const handleDragMode = () => setActive(!active);
  // const handlePausePlay = () => setPausePlay(!pausePlay);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const inputData = {
      kecepatan: Number(formData.get("kecepatan")),
      sudut: Number(formData.get("sudut")),
    };

    if (inputData.kecepatan <= 0 && inputData.kecepatan > 33) return;
    if (inputData.sudut > 90) return alert("Sudut tidak boleh lebih dari 90 derajat");

    setCanvasData(inputData);
  };

  return (
    <>
      <div className="container mx-auto space-y-2 my-5">
        <CanvasBg canvasData={canvasData} active={active} />
        <form onSubmit={handleSubmit} className="font-sans flex items-center space-x-2 justify-center mt-5">
          <input type="number" id="kecepatan" name="kecepatan" placeholder="Masukan kecepatan..." className="bg-slate-200 outline-none p-1 rounded" />
          <input type="number" id="sudut" name="sudut" placeholder="Masukan untuk sudut.." className="bg-slate-200 outline-none p-1 rounded" />
          <button type="submit" className="bg-sky-300 hover:bg-sky-400 transition-colors p-1 px-3 rounded">
            <img src="/bola.svg" alt="Play" width={24} />
          </button>
          <ButtonClear />
          <ButtonDrag active={active} handleDragMode={handleDragMode} />
          {/* <ButtonAction pausePlay={pausePlay} handlePausePlay={handlePausePlay} /> */}
        </form>
      </div>
      {/* <table className="place-self-center my-16">
        <thead>
          <tr>
            <th className="border-2 p-1 border-black">Diketahui</th>
            <th className="border-2 p-1 border-black">Rumus</th>
            <th className="border-2 p-1 border-black">Process</th>
            <th className="border-2 p-1 border-black">Hasil</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="border-2 p-1 border-black">Massa Benda</td>
            <td className="border-2 p-1 border-black">-</td>
            <td className="border-2 p-1 border-black">-</td>
            <td className="border-2 p-1 border-black">{dataTable.percepatan.massaBenda}</td>
          </tr>
          <tr>
            <td className="border-2 p-1 border-black">Hasil Percepatan</td>
            <td className="border-2 p-1 border-black">Massa Benda / Resistensi Udara</td>
            <td className="border-2 p-1 border-black">
              {dataTable.percepatan.massaBenda} / {dataTable.percepatan.resistensiUdara}
            </td>
            <td className="border-2 p-1 border-black">{dataTable.percepatan.massaBenda / dataTable.percepatan.resistensiUdara}</td>
          </tr>
          <tr>
            <td className="border-2 p-1 border-black">SIN θ</td>
            <td className="border-2 p-1 border-black">-</td>
            <td className="border-2 p-1 border-black">SIN {canvasData.sudut}</td>
            <td className="border-2 p-1 border-black">{dataTable.sudut.sin}</td>
          </tr>
          <tr>
            <td className="border-2 p-1 border-black">COS θ</td>
            <td className="border-2 p-1 border-black">-</td>
            <td className="border-2 p-1 border-black">COS {canvasData.sudut}</td>
            <td className="border-2 p-1 border-black">{dataTable.sudut.cos}</td>
          </tr>
        </tbody>
      </table> */}
    </>
  );
}

export default App;
