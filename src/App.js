import { useEffect, useState } from "react";
import Header from "./components/Header";
import ProgressBar from "./components/ProgressBar";
import PokemonCard from "./components/PokemonCard";
import POKEMON from "./data/pokemon.json";

export default function App() {
  const [search, setSearch] = useState("");
  const [caught, setCaught] = useState([]);

  useEffect(() => {
    const saved = localStorage.getItem("caught");
    if (saved) setCaught(JSON.parse(saved));
  }, []);

  useEffect(() => {
    localStorage.setItem("caught", JSON.stringify(caught));
  }, [caught]);

  const toggleCaught = (id) => {
    setCaught((prev) =>
      prev.includes(id)
        ? prev.filter((x) => x !== id)
        : [...prev, id]
    );
  };

  const filtered = POKEMON.filter((p) =>
    p.name.toLowerCase().includes(search.toLowerCase().trim())
  );

  return (
    <div className="min-h-screen bg-gray-50 pb-10">

      <Header search={search} setSearch={setSearch} />

      <ProgressBar caught={caught.length} total={POKEMON.length} />

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