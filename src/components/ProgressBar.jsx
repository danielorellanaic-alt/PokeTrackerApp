export default function ProgressBar({ caught, total }) {
  const percent = total === 0 ? 0 : (caught / total) * 100;

  return (
    <div className="px-4 mt-2">

      <div className="flex justify-between text-sm mb-1">
        <span>Pokédex</span>
        <span>{caught}/{total}</span>
      </div>

      <div className="w-full h-3 bg-gray-200 rounded-full overflow-hidden">
        <div
          className="h-full bg-blue-500 transition-all duration-300"
          style={{ width: `${percent}%` }}
        />
      </div>

    </div>
  );
}