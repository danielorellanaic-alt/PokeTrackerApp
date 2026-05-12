export default function ProgressBar({ caught, total }) {
  const percent = (caught / total) * 100;

  return (
    <div className="w-full px-4 mt-2">
      
      <div className="flex justify-between items-center mb-1">
        <span className="text-sm font-medium text-gray-600">
          Pokédex Progress
        </span>
        <span className="text-sm font-semibold text-gray-700">
          {caught}/{total}
        </span>
      </div>

      <div className="w-full h-3 bg-gray-200 rounded-full overflow-hidden">
        <div
          className="h-full bg-gradient-to-r from-green-400 to-blue-500 transition-all duration-500"
          style={{ width: `${percent}%` }}
        />
      </div>

    </div>
  );
}