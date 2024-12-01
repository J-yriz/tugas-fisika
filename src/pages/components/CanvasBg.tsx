import React, { useRef, useEffect, useState } from "react";
import { ICanvasData } from "../../utility/Type";
import { menghitungAkhirMendatar } from "../../utility/Function";

interface IViewUser {
  tengahMendatar: number;
  akhirMendatar: number;
}

const CanvasBg = ({ canvasData }: { canvasData: ICanvasData }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const resistansiUdara = Number((Math.random() * (10 - 5) + 5).toFixed(3));
  const animationRef = useRef<number | null>(null); // Menyimpan ID animasi untuk dibatalkan
  const [viewUser, setViewUser] = useState<IViewUser>({ tengahMendatar: 0, akhirMendatar: 0 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const context = canvas.getContext("2d") as CanvasRenderingContext2D;

    // const akhirMendatar = menghitungAkhirMendatar(canvasData.kecepatan, canvasData.sudut);
    // if (typeof akhirMendatar === "number") setViewUser({ tengahMendatar: 0, akhirMendatar });
    // else return;

    const width = canvas.width;
    const height = canvas.height;

    const draw = (Vo: number, angle: number) => {
      // Bersihkan animasi sebelumnya
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }

      const Vox = Vo * Math.cos(angle);
      const Voy = Vo * Math.sin(angle);
      const g = 9.8;
      const startTime = Date.now();

      const update = () => {
        const t = (Date.now() - startTime) / 1000; // Konversi waktu ke detik
        const x = Vox * t;
        const y = Voy * t - 0.5 * g * Math.pow(t, 2);
        const gridSize = 25; // Ukuran grid dalam piksel

        // Bersihkan canvas
        context.clearRect(0, 0, width, height);

        // Gambar grid
        context.strokeStyle = "#ddd"; // Warna garis grid
        context.lineWidth = 1;

        // Garis vertikal
        for (let x = 0; x <= width; x += gridSize) {
          context.beginPath();
          context.moveTo(x, 0);
          context.lineTo(x, height);
          context.stroke();
        }

        // Garis horizontal
        for (let y = 0; y <= height; y += gridSize) {
          context.beginPath();
          context.moveTo(0, y);
          context.lineTo(width, y);
          context.stroke();
        }

        // Gambar bola
        context.beginPath();
        context.arc(x, y, 8, 0, Math.PI * 2, true);
        context.fill();

        // Berhenti jika bola mencapai tanah
        if (y < 0) {
          animationRef.current = null;
          return;
        }

        // Lanjutkan animasi
        animationRef.current = requestAnimationFrame(update);
      };

      update();
    };

    // Atur ulang transformasi dan warna
    context.setTransform(1, 0, 0, -1, 0, height);
    context.fillStyle = canvasData.warna;

    // Mulai menggambar
    draw(canvasData.kecepatan, Number(canvasData.sudut) * (Math.PI / 180));
    // draw(99, 45 * (Math.PI / 180));

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [canvasData]);

  return (
    <div className="place-self-center">
      <p className="text-end">Resistensi Udara : {resistansiUdara} m/s²</p>
      <canvas ref={canvasRef} width={1000} height={500} className="border-2" />
      <div className="information space-y-2">
        <div className="flex items-center justify-between">
          <p>0</p>
          <p>{viewUser.tengahMendatar}</p>
          <p>{viewUser.akhirMendatar}</p>
        </div>
        <div className="w-full bg-slate-500 rounded h-1">
          <p className="text-center p-1">3 Meter</p>
        </div>
      </div>
    </div>
  );
};

export default CanvasBg;
