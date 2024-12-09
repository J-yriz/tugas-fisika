import { CosValues, SinValues } from "../utility/Type";

// untuk derajat === 0
const menghitungAkhirMendatar = (kecepatanAwal: number, sudut: number, massaBenda: number, gravitasi: number, resistensiUdara: number) => {
  // Ambil nilai cos dari enum
  const cosValue = CosValues[`COS_${sudut}` as keyof typeof CosValues];
  if (cosValue === undefined) return "Nilai sudut tidak valid";

  // Perhitungan
  const Vox = kecepatanAwal * cosValue; // Kecepatan mendatar awal
  const gayaNormal = massaBenda * gravitasi; // Gaya normal
  const koefisienGesekan = 0.3 * gayaNormal; // Koefisien gesekan rata-rata
  const percepatanGesekan = koefisienGesekan / massaBenda; // Percepatan akibat gesekan
  const totalPercepatan = percepatanGesekan + resistensiUdara; // Total percepatan
  if (totalPercepatan <= 0) return "Total percepatan tidak valid"; // Pastikan percepatan masuk akal

  const t_darat = Vox / totalPercepatan; // Waktu total mendatar
  const posisiAkhirX = Vox * t_darat - 0.5 * totalPercepatan * Math.pow(t_darat, 2); // Posisi mendatar akhir

  return posisiAkhirX >= 0 ? { posisiAkhirX: Number(posisiAkhirX.toFixed(3)), Vox } : 0; // Jika negatif, posisi diatur ke 0
};

// untuk derajat > 0
const menghitungAkhirVerHori = (kecepatanAwal: number, sudut: number, gravitasi: number, resistensiUdara: number) => {
  const posisiAwalY = 0; // m
  const posisiAwalX = 0; // m

  // Ambil nilai sin dan cos dari enum
  const sinValue = SinValues[`SIN_${sudut}` as keyof typeof SinValues];
  const cosValue = CosValues[`COS_${sudut}` as keyof typeof CosValues];

  if (sinValue === undefined || cosValue === undefined) return "Nilai sudut tidak valid";

  // Perhitungan
  const Voy = kecepatanAwal * sinValue; // Kecepatan vertikal awal
  const Vox = kecepatanAwal * cosValue; // Kecepatan horizontal awal
  const totalPercepatanVertikal = gravitasi; // Percepatan vertikal akibat gravitasi

  const t_udara = (2 * Voy) / gravitasi; // Waktu total di udara
  const posisiAkhirX = Number((posisiAwalX + Vox * t_udara - 0.5 * resistensiUdara * Math.pow(t_udara, 2)).toFixed(3)); // Posisi horizontal akhir
  const posisiAkhirY = Number(posisiAwalY.toFixed(3)); // Posisi vertikal akhir tetap sama karena kembali ke tanah
  const titikTertinggi = Number((posisiAwalY + Voy * (0.5 * t_udara) - 0.5 * totalPercepatanVertikal * Math.pow(0.5 * t_udara, 2)).toFixed(3)); // Titik tertinggi

  return { posisiAkhirX, posisiAkhirY, titikTertinggi, Vox, Voy };
};

const mencariLuasPenampang = (jariJariBola: number) => {
  return Math.PI * Math.pow(jariJariBola, 2);
};

const mencariGayaHambatanHorizontal = (kecepatanAwal: number, sudut: number, dragBola: number, massaBenda: number, t: number) => {
  const jariJariBola = 0.11; // m
  const densitasUdara = 1.225; // kg/m^3
  const penampangBola = mencariLuasPenampang(jariJariBola); // m^2

  const V0x = kecepatanAwal * CosValues[`COS_${sudut}` as keyof typeof CosValues]; // m/s
  const Fd = 0.5 * dragBola * densitasUdara * Math.pow(V0x, 2) * penampangBola; // N
  const aX = -(Fd / massaBenda) * t; // m/s^2
  return aX;
};

export { menghitungAkhirMendatar, menghitungAkhirVerHori, mencariGayaHambatanHorizontal };
