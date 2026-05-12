import { useEffect, useState } from "react";
import Header from "./components/Header";
import ProgressBar from "./components/ProgressBar";
import PokemonCard from "./components/PokemonCard";

// 🔥 Datos de ejemplo (puedes reemplazar por API después)
const POKEMONS = [
  { id: 1, name: "bulbasaur", image: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png" },
  { id: 2, name: "ivysaur", image: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/2.png" },
  { id: 3, name: "venusaur", image: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/3.png" },
  { id: 4, name: "charmander", image: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/4.png" },
  { id: 5, name: "charmeleon", image: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/5.png" },
  { id: 6, name: "charizard", image: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/6.png" },
];

export default function App() {
  const [search, setSearch] = useState("");
  const [caught, setCaught] = useState([]);

  // 🔥 cargar desde localStorage
  useEffect(() => {
    const saved = localStorage.getItem("caught");
    if (saved) setCaught(JSON.parse(saved));
  }, []);

  // 💾 guardar progreso
  useEffect(() => {
    localStorage.setItem("caught", JSON.stringify(caught));
  }, [caught]);

  const toggleCaught = (id) => {
    setCaught((prev) =>
      prev.includes(id)
        ? prev.filter((p) => p !== id)
        : [...prev, id]
    );
  };

  // 🔎 filtro búsqueda
  const filtered = POKEMONS.filter((p) =>
    p.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-50 pb-10">
      
      <Header search={search} setSearch={setSearch} />

      <ProgressBar caught={caught.length} total={POKEMONS.length} />

      <div className="grid grid-cols-3 gap-3 px-3 mt-4">
        {filtered.map((p) => (
          <PokemonCard
            key={p.id}
            pokemon={p}
            caught={caught.includes(p.id)}
            toggle={toggleCaught}
          />
        ))}
      </div>

    </div>
  );
}