import React, { useRef, useEffect, useState } from "react";
import { CosValues, ICanvasData, IDataTable, SinValues } from "../../utility/Type";
import { mencariGayaHambatanHorizontal } from "../../utility/Function";

interface IViewUser {
  tengahMendatar: string;
  akhirMendatar: string;
  waktuTempuh: string;
}

export let clearCanvas: () => void;

const CanvasBg = ({ canvasData, setDataTable }: { canvasData: ICanvasData; setDataTable: React.Dispatch<React.SetStateAction<IDataTable>> }) => {
  const animationRef = useRef<number | null>(null); // Menyimpan ID animasi untuk dibatalkan
  const canvasRef = useRef<HTMLCanvasElement | null>(null); // Referensi ke canvas
  // const resistensiUdara = useRef<number>(Number((Math.random() * (15 - 1) + 1).toFixed(3))).current;
  const [viewUser, setViewUser] = useState<IViewUser>({ tengahMendatar: "0 Meter", akhirMendatar: "0 Meter", waktuTempuh: "0 Detik" });

  // Menyimpan Lokasi Bola sebelumnya
  const lokasiBola = useRef<{ x: number; y: number }[]>([]);

  const perMeter = 0.06; // per 1 meter dalam pixel
  const perKM = 0.00006; // per 1 KM dalam pixel
  const massaBenda = 0.5; // kg
  const gravity = 9.8; // m/s^2
  const drag = 0.3; // koefisien hambatan bola

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const context = canvas.getContext("2d") as CanvasRenderingContext2D;

    const width = canvas.width; // Lebar canvas
    const height = canvas.height; // Tinggi canvas

    const backgroundImage = new Image();
    backgroundImage.src = "/bg-cover.svg";
    const ballImage = new Image();
    ballImage.src = "/bola.svg";

    let ballImageLoaded = false;
    ballImage.onload = () => (ballImageLoaded = true);

    const gambarLapangan = () => {
      context.save(); // simpan keadaan canvas sebelum di flip
      // set transformasi untuk flip canvas agar gambar normal
      context.setTransform(1, 0, 0, 1, 0, 0);
      context.drawImage(backgroundImage, 0, 0, width, height);
      context.restore(); // set ulang keadaan canvas sebelum diflip
    };

    const gambarBola = (x: number, y: number, angle: number) => {
      if (ballImageLoaded) {
        context.save(); // Simpan keadaan canvas sebelum di flip
        context.drawImage(ballImage, x, y > 90 ? y : 90, 30, 30);
        context.restore(); // Setel ulang keadaan canvas sebelum di flip
      } else {
        setTimeout(() => gambarBola(x, y, angle), 100); // Coba lagi setelah 100ms
      }
    };

    clearCanvas = () => {
      lokasiBola.current = [];
      context.clearRect(0, 0, width, height);
      gambarLapangan();
      gambarBola(0, 0, canvasData.sudut);
    };

    // Gambar lapangan
    backgroundImage.onload = () => {
      let tinggiSementara = 0;
      const draw = (Vo: number, angle: number) => {
        if (animationRef.current) cancelAnimationFrame(animationRef.current); // Bersihkan animasi sebelumnya

        const Vox = Vo * CosValues[`COS_${angle}` as keyof typeof CosValues];
        const Voy = Vo * SinValues[`SIN_${angle}` as keyof typeof SinValues];
        const startTime = Date.now();

        gambarLapangan(); // Gambar lapangan

        const update = () => {
          const t = (Date.now() - startTime) / 100; // Konversi waktu ke detik
          const x = Vox * t
          const y = Voy * t - gravity * Math.pow(t, 2) + 90;

          // console.log(x);

          if (!isNaN(x) || !isNaN(y)) {
            context.clearRect(0, 0, width, height); // Bersihkan canvas
            gambarLapangan(); // Gambar Lapangan
            gambarBola(x, y, angle); // Gambar bola
            lokasiBola.current.length && lokasiBola.current.forEach((lokasi) => gambarBola(lokasi.x, lokasi.y, canvasData.sudut));

            // Berhenti jika bola mencapai tanah
            if (y < 90) {
              if (lokasiBola.current.length >= 2) lokasiBola.current.shift();
              lokasiBola.current.push({ x, y });
              animationRef.current = null;
              gambarBola(0, 0, canvasData.sudut);
              return;
            } // Hentikan animasi

            // Lanjutkan animasi
            animationRef.current = requestAnimationFrame(update);
            if (tinggiSementara === 0) tinggiSementara = y;
            if (tinggiSementara < y) tinggiSementara = y;
            const changeTengahMendatar = Number((tinggiSementara * perMeter).toFixed(2)) >= 1000;
            const changeAkhirMendatar = Number((x * perMeter).toFixed(2)) >= 1000;
            setViewUser({
              tengahMendatar: changeTengahMendatar
                ? `${(tinggiSementara * perKM).toFixed(2)} KM`
                : `${(tinggiSementara * perMeter).toFixed(2)} Meter`,
              akhirMendatar: changeAkhirMendatar ? `${(x * perKM).toFixed(2)} KM` : `${(x * perMeter).toFixed(2)} Meter`,
              waktuTempuh: `${t} Detik`,
            });
          }
        };

        update();
      };

      // Atur ulang transformasi dan warna
      context.setTransform(1, 0, 0, -1, 0, height);
      gambarBola(0, 0, canvasData.sudut);

      // Mulai menggambar
      draw(canvasData.kecepatan, Number(canvasData.sudut));

      setDataTable({
        percepatan: { massaBenda },
        sudut: {
          sin: SinValues[`SIN_${canvasData.sudut}` as keyof typeof SinValues],
          cos: CosValues[`COS_${canvasData.sudut}` as keyof typeof CosValues],
        },
      });
    };

    return () => {
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
    };
  }, [canvasData, setDataTable, lokasiBola]);

  return (
    <div className="place-self-center">
      <div className="flex justify-between">
        <div className="flex items-center space-x-3">
          <p>Jarak Awal : 0.00 Meter</p>
          <p>Titik Tertinggi : {viewUser.tengahMendatar}</p>
          <p>Jarak Akhir : {viewUser.akhirMendatar}</p>
          <p>Waktu Tempuh : {viewUser.waktuTempuh}</p>
        </div>
        <p>Drag : {drag}</p>
      </div>
      <canvas ref={canvasRef} width={1000} height={500} className="border-2" />
      <div className="information space-y-7 mt-3">
        <div className="w-full bg-green-400 rounded h-1">
          <p className="text-center p-1">60 Meter / 0,06 KM</p>
        </div>
      </div>
    </div>
  );
};

export default CanvasBg;
