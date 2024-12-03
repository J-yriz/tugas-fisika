import React, { useRef, useEffect, useState } from "react";
import { CosValues, ICanvasData, SinValues } from "../../utility/Type";
import { menghitungAkhirMendatar, menghitungAkhirVerHori } from "../../utility/Function";

interface IViewUser {
  tengahMendatar: number;
  akhirMendatar: number;
}

const CanvasBg = ({ canvasData }: { canvasData: ICanvasData }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const resistansiUdara = useRef<number>(Number((Math.random() * (10 - 5) + 5).toFixed(3))).current;
  const animationRef = useRef<number | null>(null); // Menyimpan ID animasi untuk dibatalkan
  const [viewUser, setViewUser] = useState<IViewUser>({ tengahMendatar: 0, akhirMendatar: 0 });

  useEffect(() => {
    // Melakukan pengecekan apakah data yang diinput kosong atau tidak
    if (canvasData.kecepatan <= 0) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const context = canvas.getContext("2d") as CanvasRenderingContext2D;

    const hasilHitungDatar = menghitungAkhirMendatar(canvasData.kecepatan, canvasData.sudut, resistansiUdara);
    const hasilHitungVeriHori = menghitungAkhirVerHori(canvasData.kecepatan, canvasData.sudut, resistansiUdara);

    // if (canvasData.sudut === 0 && typeof hasilHitungDatar === "object")
    //   setViewUser({ tengahMendatar: 0, akhirMendatar: hasilHitungDatar.posisiAkhirX });
    // else if (canvasData.sudut > 0 && typeof hasilHitungVeriHori === "object")
    //   setViewUser({ tengahMendatar: hasilHitungVeriHori.titikTertinggi, akhirMendatar: hasilHitungVeriHori.posisiAkhirX });

    const perMeter = 0.06; // per 1 meter dalam pixel
    const width = canvas.width;
    const height = canvas.height;

    const gambarGrid = () => {
      const gridSize = 25; // Ukuran grid dalam piksel

      // Gambar grid
      context.strokeStyle = "#ddd"; // Warna garis grid
      context.lineWidth = 1;

      // Garis vertikal
      for (let gx = 0; gx <= width; gx += gridSize) {
        context.beginPath();
        context.moveTo(gx, 0);
        context.lineTo(gx, height);
        context.stroke();
      }

      // Garis horizontal
      for (let gy = 0; gy <= height; gy += gridSize) {
        context.beginPath();
        context.moveTo(0, gy);
        context.lineTo(width, gy);
        context.stroke();
      }
    };

    const draw = (Vo: number, angle: number) => {
      // Bersihkan animasi sebelumnya
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }

      const Vox = Vo * CosValues[`COS_${angle}` as keyof typeof CosValues];
      const Voy = Vo * SinValues[`SIN_${angle}` as keyof typeof SinValues];
      const g = 9.8;
      const startTime = Date.now();

      const update = () => {
        const t = (Date.now() - startTime) / 100; // Konversi waktu ke detik
        const x = Vox * t + 10;
        const y = Voy * t - 0.5 * g * Math.pow(t, 2) + 12;

        // Menghapus canvas sebelum menggambar
        context.clearRect(0, 0, width, height);

        // Gambar grid
        gambarGrid();

        // agar tidak spam sistem
        if (isNaN(x) || isNaN(y)) return;

        // Gambar bola
        context.beginPath();
        context.arc(x, y > 10 ? y : 10, 10, 0, Math.PI * 2, true);
        context.fill();

        // Berhenti jika bola mencapai tanah
        if (y < 12) {
          animationRef.current = null;
          return; // Hentikan animasi
        }

        // Lanjutkan animasi
        animationRef.current = requestAnimationFrame(update);
        setViewUser({ tengahMendatar: 0, akhirMendatar: Number((x * perMeter).toFixed(2)) });
      };

      update();
    };

    // Atur ulang transformasi dan warna
    context.setTransform(1, 0, 0, -1, 0, height);
    context.fillStyle = canvasData.warna;
    context.beginPath();
    context.arc(10, 10, 10, 0, Math.PI * 2, true);
    context.fill();

    // Mulai menggambar
    draw(canvasData.kecepatan - resistansiUdara, Number(canvasData.sudut));
    // draw(99, 45 * (Math.PI / 180));

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [canvasData]);

  return (
    <div className="place-self-center">
      <div className="flex justify-between">
        <div className="flex items-center space-x-3">
          <p>Jarak Awal : 0</p>
          <p>Titik Tertinggi : {viewUser.tengahMendatar}</p>
          <p>Jarak Akhir : {viewUser.akhirMendatar} Meter</p>
        </div>
        <p>Resistensi Udara : {resistansiUdara} m/s²</p>
      </div>
      <canvas ref={canvasRef} width={1000} height={500} className="border-2" />
      <div className="information space-y-7 mt-3">
        <div className="w-full bg-green-700 rounded h-1">
          <p className="text-center p-1">Jarak Bola 5 Meter</p>
        </div>
        <div className="w-full bg-green-400 rounded h-1">
          <p className="text-center p-1">60 Meter / 0,06 KM</p>
        </div>
      </div>
    </div>
  );
};

export default CanvasBg;
