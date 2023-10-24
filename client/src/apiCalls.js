import axios from "axios";

export const empezar = async () => {
  const response = await axios.put("http://localhost:8000/empezar", {
    jugadores: ["Juan", "Pedro"],
  });
  console.log(response.data);
  return response.data;
};
