import axios from "axios";

export const empezar = async (jugadores) => {
  const response = await axios.put("http://localhost:8000/empezar", {
    jugadores: jugadores,
  });
  console.log(response.data);
  return response.data;
};

export const movimiento = async (columna, fila) => {
  const response = await axios.put("http://localhost:8000/movimiento", {
    columna: columna,
    fila: fila,
  });
  console.log(response.data);
  return response.data;
};
