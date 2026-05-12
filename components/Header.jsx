export default function Header({ search, setSearch }) {
  return (
    <div className="w-full px-4 pt-4 pb-2 flex flex-col gap-3">
      
      <h1 className="text-2xl font-bold text-center tracking-tight">
        PokéTracker
      </h1>

      <div className="relative w-full">
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search Pokémon..."
          className="w-full px-4 py-3 pl-10 rounded-2xl bg-white shadow-sm border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        <span className="absolute left-3 top-3.5 text-gray-400">
          🔍
        </span>
      </div>

    </div>
  );
}