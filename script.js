<script>
  const CosValues = {
    COS_0: 1, // cos(0°) : 1
    COS_1: 0.9998477, // cos(1°)
    COS_2: 0.9993908, // cos(2°)
    COS_3: 0.9986295, // cos(3°)
    COS_4: 0.9975641, // cos(4°)
    COS_5: 0.9961947, // cos(5°)
    COS_6: 0.9945219, // cos(6°)
    COS_7: 0.9925462, // cos(7°)
    COS_8: 0.9902681, // cos(8°)
    COS_9: 0.9876883, // cos(9°)
    COS_10: 0.9848078, // cos(10°)
    COS_11: 0.9816272, // cos(11°)
    COS_12: 0.9781476, // cos(12°)
    COS_13: 0.9743701, // cos(13°)
    COS_14: 0.9702957, // cos(14°)
    COS_15: 0.9659258, // cos(15°)
    COS_16: 0.9612617, // cos(16°)
    COS_17: 0.9563048, // cos(17°)
    COS_18: 0.9510565, // cos(18°)
    COS_19: 0.9455186, // cos(19°)
    COS_20: 0.9396926, // cos(20°)
    COS_21: 0.9335804, // cos(21°)
    COS_22: 0.9271839, // cos(22°)
    COS_23: 0.9205049, // cos(23°)
    COS_24: 0.9135455, // cos(24°)
    COS_25: 0.9063078, // cos(25°)
    COS_26: 0.898794, // cos(26°)
    COS_27: 0.8910065, // cos(27°)
    COS_28: 0.8829476, // cos(28°)
    COS_29: 0.8746197, // cos(29°)
    COS_30: 0.8660254, // cos(30°)
    COS_31: 0.8571673, // cos(31°)
    COS_32: 0.8480481, // cos(32°)
    COS_33: 0.8386706, // cos(33°)
    COS_34: 0.8290376, // cos(34°)
    COS_35: 0.819152, // cos(35°)
    COS_36: 0.809017, // cos(36°)
    COS_37: 0.7986355, // cos(37°)
    COS_38: 0.7880108, // cos(38°)
    COS_39: 0.7771459, // cos(39°)
    COS_40: 0.7660444, // cos(40°)
    COS_41: 0.7547096, // cos(41°)
    COS_42: 0.7431448, // cos(42°)
    COS_43: 0.7313537, // cos(43°)
    COS_44: 0.7193398, // cos(44°)
    COS_45: 0.7071068, // cos(45°) : √2 / 2
  };

  const SinValues = {
    SIN_0: 0, // sin(0°) : 0
    SIN_1: 0.0174524, // sin(1°)
    SIN_2: 0.0348995, // sin(2°)
    SIN_3: 0.052336, // sin(3°)
    SIN_4: 0.0697565, // sin(4°)
    SIN_5: 0.0871557, // sin(5°)
    SIN_6: 0.1045285, // sin(6°)
    SIN_7: 0.1218693, // sin(7°)
    SIN_8: 0.1391731, // sin(8°)
    SIN_9: 0.1564345, // sin(9°)
    SIN_10: 0.1736482, // sin(10°)
    SIN_11: 0.190809, // sin(11°)
    SIN_12: 0.2079117, // sin(12°)
    SIN_13: 0.2249511, // sin(13°)
    SIN_14: 0.2419219, // sin(14°)
    SIN_15: 0.258819, // sin(15°)
    SIN_16: 0.2756374, // sin(16°)
    SIN_17: 0.2923717, // sin(17°)
    SIN_18: 0.309017, // sin(18°)
    SIN_19: 0.3255682, // sin(19°)
    SIN_20: 0.3420201, // sin(20°)
    SIN_21: 0.3583679, // sin(21°)
    SIN_22: 0.3746066, // sin(22°)
    SIN_23: 0.3907311, // sin(23°)
    SIN_24: 0.4067366, // sin(24°)
    SIN_25: 0.4226183, // sin(25°)
    SIN_26: 0.4383711, // sin(26°)
    SIN_27: 0.4539905, // sin(27°)
    SIN_28: 0.4694716, // sin(28°)
    SIN_29: 0.4848096, // sin(29°)
    SIN_30: 0.5, // sin(30°) : 1/2
    SIN_31: 0.5150381, // sin(31°)
    SIN_32: 0.5299193, // sin(32°)
    SIN_33: 0.544639, // sin(33°)
    SIN_34: 0.5591929, // sin(34°)
    SIN_35: 0.5735764, // sin(35°)
    SIN_36: 0.5877853, // sin(36°)
    SIN_37: 0.601815, // sin(37°)
    SIN_38: 0.6156615, // sin(38°)
    SIN_39: 0.6293204, // sin(39°)
    SIN_40: 0.6427876, // sin(40°)
    SIN_41: 0.656059, // sin(41°)
    SIN_42: 0.6691306, // sin(42°)
    SIN_43: 0.6819984, // sin(43°)
    SIN_44: 0.6946584, // sin(44°)
    SIN_45: 0.7071068, // sin(45°) : √2 / 2
  };

  const menghitungAkhirMendatar = (kecepatanAwal, sudut) => {
    const massaBola = 0.5; // kg
    const gravitasi = 9.8; // m/s^2
    const resistansiUdara = Number((Math.random() * (10 - 5) + 5).toFixed(3)); // m/s^2

    // Validasi input
    if (kecepatanAwal < 0 || kecepatanAwal > 55) return "Tolong Input Kecepatan 0-55";
    if (sudut < 0 || sudut > 45) return "Tolong Input Sudut 0-45";

    // Ambil nilai cos dari enum
    const cosValue = CosValues[`COS_${sudut}`];
    if (cosValue === undefined) return "Nilai sudut tidak valid";

    // Perhitungan
    const Vox = kecepatanAwal * cosValue; // Kecepatan mendatar awal
    const gayaNormal = massaBola * gravitasi; // Gaya normal
    const koefisienGesekan = 0.3 * gayaNormal; // Koefisien gesekan rata-rata
    const percepatanGesekan = koefisienGesekan / massaBola; // Percepatan akibat gesekan
    const totalPercepatan = percepatanGesekan + resistansiUdara; // Total percepatan
    if (totalPercepatan <= 0) return "Total percepatan tidak valid"; // Pastikan percepatan masuk akal

    const t_darat = Vox / totalPercepatan; // Waktu total mendatar
    const posisiAkhirX = Vox * t_darat - 0.5 * totalPercepatan * Math.pow(t_darat, 2); // Posisi mendatar akhir

    return posisiAkhirX >= 0 ? posisiAkhirX : 0; // Jika negatif, posisi diatur ke 0
  };

  const menghitungAkhirVerHori = (kecepatanAwal, sudut) => {
    const gravitasi = 9.8; // m/s^2
    const posisiAwalY = 0; // m
    const posisiAwalX = 0; // m

    // Validasi input
    if (kecepatanAwal < 0 || kecepatanAwal > 55) return "Tolong Input Kecepatan 0-55";
    if (sudut < 0 || sudut > 45) return "Tolong Input Sudut 0-45";

    // Ambil nilai sin dan cos dari enum
    const sinValue = SinValues[`SIN_${sudut}`];
    const cosValue = CosValues[`COS_${sudut}`];

    if (sinValue === undefined || cosValue === undefined) return "Nilai sudut tidak valid";

    // Perhitungan
    const Voy = kecepatanAwal * sinValue; // Kecepatan vertikal awal
    const Vox = kecepatanAwal * cosValue; // Kecepatan horizontal awal
    const totalPercepatanMendatar = Number((Math.random() * (10 - 5) + 5).toFixed(3)); // Resistansi udara acak
    const totalPercepatanVertikal = gravitasi; // Percepatan vertikal akibat gravitasi

    const t_udara = (2 * Voy) / gravitasi; // Waktu total di udara
    const posisiAkhirX = posisiAwalX + Vox * t_udara - 0.5 * totalPercepatanMendatar * Math.pow(t_udara, 2); // Posisi horizontal akhir
    const posisiAkhirY = posisiAwalY; // Posisi vertikal akhir tetap sama karena kembali ke tanah
    const titikTertinggi = posisiAwalY + Voy * (0.5 * t_udara) - 0.5 * totalPercepatanVertikal * Math.pow(0.5 * t_udara, 2); // Titik tertinggi

    return { posisiAkhirX, posisiAkhirY, titikTertinggi };
  };
</script>
