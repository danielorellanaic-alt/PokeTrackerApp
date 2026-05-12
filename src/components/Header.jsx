export default function Header({ search, setSearch }) {
  return (
    <div className="w-full px-4 pt-4 pb-2 flex flex-col gap-3">

      <h1 className="text-2xl font-bold text-center">
        PokéTracker
      </h1>

      <input
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Search Pokémon..."
        className="w-full px-4 py-3 rounded-2xl bg-white border shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
      />

    </div>
  );
}