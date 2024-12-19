const mencariLuasPenampang = (jariJariBola: number) => {
  return Math.PI * Math.pow(jariJariBola, 2);
};

const mencariFd = (dragBola: number, densitasUdara: number, penampangBola: number, Vox: number) => {
  return 0.5 * densitasUdara * dragBola * penampangBola * Math.pow(Vox, 2);
};

const mencariGayaHambatanHorizontal = (Vox: number, dragBola: number, massaBenda: number) => {
  const jariJariBola = 0.11; // m
  const densitasUdara = 1.23; // kg/m^3
  const penampangBola = Number(mencariLuasPenampang(jariJariBola).toFixed(2)); // m^2

  const Fd = mencariFd(dragBola, densitasUdara, penampangBola, Vox); // N
  const aX = Fd / massaBenda; // m/s^2
  return aX;
};

export { mencariLuasPenampang, mencariFd, mencariGayaHambatanHorizontal };
