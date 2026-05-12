export default function PokemonCard({ pokemon, caught, toggle }) {
  return (
    <div
      onClick={() => toggle(pokemon.id)}
      className={`cursor-pointer p-3 rounded-2xl border shadow-sm transition active:scale-95
        ${caught ? "bg-green-50 border-green-300" : "bg-white border-gray-200"}
      `}
    >

      <img
        src={`/${pokemon.image}`}
        alt={pokemon.name}
        className="w-20 h-20 mx-auto"
      />

      <p className="text-center text-sm font-medium capitalize mt-2">
        {pokemon.name}
      </p>

      <p className="text-center text-xs mt-1">
        {caught ? "✅ Capturado" : "⬜ Pendiente"}
      </p>

    </div>
  );
}