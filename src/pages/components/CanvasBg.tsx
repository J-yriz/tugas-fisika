import React, { useRef, useEffect, useState } from "react";
import { CosValues, ICanvasData, SinValues } from "../../utility/Type";
import { mencariFd, mencariGayaHambatanHorizontal, mencariLuasPenampang } from "../../utility/Function";

interface IViewUser {
  tengahMendatar: string;
  akhirMendatar: string;
  waktuTempuh: string;
}

export let clearCanvas: () => void;

const CanvasBg = ({
  canvasData,
  active,
}: {
  canvasData: ICanvasData;
  active: boolean;
}) => {
  const animationRef = useRef<number | null>(null); // Menyimpan ID animasi untuk dibatalkan
  const canvasRef = useRef<HTMLCanvasElement | null>(null); // Referensi ke canvas
  const [viewUser, setViewUser] = useState<IViewUser>({ tengahMendatar: "0 Meter", akhirMendatar: "0 Meter", waktuTempuh: "0 Detik" });
  const canvasSizeRef = useRef<{ width: number; height: number }>({ width: window.innerWidth - 50, height: window.innerHeight });

  const lokasiBola = useRef<{ x: number; y: number }[]>([]);

  const perMeter = 55 / canvasSizeRef.current.width; // per 1 meter dalam pixel
  const perKM = perMeter / 1000; // per 1 KM dalam pixel
  const massaBenda = 0.5; // kg
  const gravity = 9.81; // m/s^2
  const drag = 0.3; // koefisien hambatan bola
  const gayaGesekan = 1.4715; // gaya gesekan

  const CosValue = CosValues[`COS_${canvasData.sudut}` as keyof typeof CosValues];
  const SinValue = SinValues[`SIN_${canvasData.sudut}` as keyof typeof SinValues];

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const context = canvas.getContext("2d") as CanvasRenderingContext2D;

    const { width, height } = canvasSizeRef.current;
    canvas.width = width;
    canvas.height = height;

    const backgroundImage = new Image();
    backgroundImage.src = "/bg-cover1.svg";
    const ballImage = new Image();
    ballImage.src = "/bola.svg";
    const ronaldoImage = new Image();
    ronaldoImage.src = "/ronaldo.svg";

    let ballImageLoaded = false;
    ballImage.onload = () => (ballImageLoaded = true);

    const gambarLapangan = () => {
      context.save(); // simpan keadaan canvas sebelum di flip
      // set transformasi untuk flip canvas agar gambar normal
      context.setTransform(1, 0, 0, 1, 0, 0);
      context.drawImage(backgroundImage, 0, 0, width, height);
      context.restore(); // set ulang keadaan canvas sebelum diflip
    };

    const cancelAnimation = () => {
      cancelAnimationFrame(animationRef.current as number); // Hentikan animasi
      animationRef.current = null;
    };

    const gambarAttribute = (x: number, y: number, sudut: number) => {
      if (ballImageLoaded) {
        context.save(); // Simpan keadaan canvas sebelum di flip
        context.drawImage(ballImage, x, y > 90 ? y : 90, 45, 45);
        context.restore(); // Setel ulang keadaan canvas sebelum di flip
      } else {
        setTimeout(() => gambarAttribute(x, y, sudut), 100); // Coba lagi setelah 100ms
      }
    };

    clearCanvas = () => {
      // Bersihkan animasi sebelumnya
      if (animationRef.current) cancelAnimation();
      lokasiBola.current = [];
      context.clearRect(0, 0, width, height);
      gambarLapangan();
      gambarAttribute(120, 0, canvasData.sudut);
    };

    // Gambar lapangan
    backgroundImage.onload = () => {
      let tinggiSementara = 0;
      const draw = (kecepatanAwal: number, sudut: number) => {
        if (animationRef.current) cancelAnimation(); // Bersihkan animasi sebelumnya

        // Perhitungan kecepatan dikali dengan sin dan cos sudut
        let Vox = kecepatanAwal * CosValue;
        let Voy = kecepatanAwal * SinValue;

        const t = 0.02; // langkah waktu
        const Fd = mencariFd(drag, 1.23, mencariLuasPenampang(0.11), Vox); // Gaya hambatan udara
        const waktuTempuh = sudut <= 0 ? Vox / ((Fd + gayaGesekan) / massaBenda) : (2 * Voy) / gravity; // Waktu total di udara
        const totalFrame = Number((waktuTempuh / t).toFixed(0)); // Total frame animasi per-detik

        gambarLapangan(); // Gambar lapangan
        gambarAttribute(120, 0, canvasData.sudut);
        context.drawImage(ronaldoImage, 25, 90, 90, 200);

        let xAnimation: number = 0;
        let yAnimation: number = 0;
        let perulangan: number = 0;
        const update = () => {
          // Mencari sisi X
          const aX = active ? mencariGayaHambatanHorizontal(Vox, drag, massaBenda) : 0; // mencari percepatan horizontal
          const vt_x = Vox - aX * t; // mencari kecepatan dalam waktu tertentu
          xAnimation += Vox * t + massaBenda * -aX * Math.pow(t, 2); // menyimpan dan menambahkan posisi x

          // Mencari sisi Y [Gravitasi disini itu aY]
          const vt_y = Voy - gravity * t; // mencari kecepatan dalam waktu tertentu
          yAnimation += Voy * t + massaBenda * -gravity * Math.pow(t, 2); // menyimpan dan menambahkan posisi y

          if (!isNaN(xAnimation) || !isNaN(yAnimation)) {
            const x = (xAnimation * canvasSizeRef.current.width) / 55;
            const y = yAnimation < 0 ? 0 : (yAnimation * canvasSizeRef.current.width) / 55;
            context.clearRect(0, 0, width, height); // Bersihkan canvas
            gambarLapangan(); // Gambar Lapangan
            gambarAttribute(x + 115, y + 90, sudut); // Gambar bola
            context.drawImage(ronaldoImage, 30, 90, 90, 200);
            lokasiBola.current.length && lokasiBola.current.forEach((lokasi) => gambarAttribute(lokasi.x + 115, lokasi.y + 90, canvasData.sudut));

            if (tinggiSementara === 0) tinggiSementara = y;
            if (tinggiSementara < y) tinggiSementara = y;
            const changeTengahMendatar = Number((tinggiSementara * perMeter).toFixed(2)) >= 1000;
            const changeAkhirMendatar = Number((x * perMeter).toFixed(2)) >= 1000;
            setViewUser({
              tengahMendatar: changeTengahMendatar
                ? `${(tinggiSementara * perKM).toFixed(2)} KM`
                : `${(tinggiSementara * perMeter).toFixed(2)} Meter`,
              akhirMendatar: changeAkhirMendatar ? `${((x + 115) * perKM).toFixed(2)} KM` : `${((x + 115) * perMeter).toFixed(2)} Meter`,
              waktuTempuh: `${(perulangan * t).toFixed(2)} Detik`,
            });

            // Berhenti jika bola mencapai tanah
            if (perulangan >= totalFrame || y + 90 < 90) {
              if (lokasiBola.current.length >= 2) lokasiBola.current.shift();
              lokasiBola.current.push({ x, y });
              animationRef.current = null;
              gambarAttribute(120, 0, canvasData.sudut);
              context.drawImage(ronaldoImage, 30, 90, 90, 200);
              return;
            } // Hentikan animasi
            // Lanjutkan animasi
            animationRef.current = requestAnimationFrame(update);

            Vox = Number(vt_x);
            Voy = Number(vt_y);
            perulangan++;
          }
        };

        update();
      };

      // Atur ulang transformasi dan warna
      context.setTransform(1, 0, 0, -1, 0, height);

      // Mulai menggambar
      draw(canvasData.kecepatan, Number(canvasData.sudut));
    };

    return () => {
      if (animationRef.current) cancelAnimation(); // Bersihkan animasi sebelumnya
    };
  }, [canvasData, lokasiBola, CosValue, SinValue, perKM, perMeter, canvasSizeRef]);

  return (
    <div className="place-self-center">
      <div className="flex justify-between">
        <div className="flex items-center space-x-3 font-semibold bg-amber-400/50 px-5 p-2 mb-2 rounded-full">
          <p>Titik Tertinggi : {viewUser.tengahMendatar}</p>
          <p>Jarak Akhir : {viewUser.akhirMendatar}</p>
          <p>Waktu Tempuh : {viewUser.waktuTempuh}</p>
        </div>
      </div>
      <canvas ref={canvasRef} className="border-2" />
    </div>
  );
};

export default CanvasBg;
