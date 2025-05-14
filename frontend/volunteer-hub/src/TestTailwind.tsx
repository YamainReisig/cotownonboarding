// src/TestTailwind.tsx
export default function TestTailwind() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-6 p-8 bg-gray-50">
      <h1 className="text-4xl font-bold text-blue-600">Tailwind Test Page</h1>

      <div className="flex gap-4">
        <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors">
          Click Me
        </button>
        <button className="bg-red-500 text-white px-4 py-2 rounded hover:scale-110 transform transition-transform">
          Danger Zone
        </button>
      </div>

      <div className="bg-white p-4 shadow-lg rounded w-64 text-center">
        <p className="text-gray-700">Responsive Box</p>
        <p className="text-sm text-gray-500">Resize the screen to test</p>
      </div>

      <div className="w-16 h-16 bg-green-400 animate-spin rounded-full border-4 border-white border-t-green-700"></div>

      <p className="text-gray-400">If all looks good, Tailwind is working! 🎉</p>
    </div>
  );
}
