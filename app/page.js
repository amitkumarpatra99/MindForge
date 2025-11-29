export default function Home() {
  return (
    <main className="h-full flex flex-col items-center justify-center text-slate-400 p-8 text-center">
      <div className="w-24 h-24 bg-slate-50 rounded-full flex items-center justify-center mb-6">
        <span className="text-4xl">👋</span>
      </div>
      <h1 className="text-2xl font-bold text-slate-800 mb-2">Welcome to MindForge</h1>
      <p className="max-w-md">
        Select a note from the sidebar to start editing, or create a new one to capture your thoughts.
      </p>
    </main>
  );
}