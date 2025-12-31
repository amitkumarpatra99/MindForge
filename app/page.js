export default function Home() {
  return (
    <main className="h-full flex flex-col items-center justify-center text-slate-400 p-8 text-center bg-slate-50/30 dark:bg-slate-900/30">
      <div className="w-24 h-24 bg-accent-100 dark:bg-accent-900/30 text-accent-600 dark:text-accent-400 rounded-full flex items-center justify-center mb-6 shadow-xl shadow-accent-500/10">
        <span className="text-4xl text-accent-500">👋</span>
      </div>
      <h1 className="text-3xl font-bold text-slate-800 dark:text-slate-100 mb-3">Welcome to MindForge</h1>
      <p className="max-w-md text-slate-500 dark:text-slate-400 text-lg">
        Select a note from the sidebar to start editing, or <span className="text-accent-600 dark:text-accent-400 font-medium">create a new one</span> to capture your thoughts.
      </p>
    </main>
  );
}