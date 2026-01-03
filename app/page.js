export default function Home() {
  return (
    <main className="h-full flex flex-col items-center justify-center text-neutral-400 p-8 text-center bg-neutral-50/50 dark:bg-black">
      <div className="w-24 h-24 bg-white dark:bg-neutral-900 text-black dark:text-white rounded-full flex items-center justify-center mb-6 shadow-xl shadow-neutral-200 dark:shadow-none border border-neutral-100 dark:border-neutral-800">
        <span className="text-4xl">👋</span>
      </div>
      <h1 className="text-2xl md:text-3xl font-bold text-black dark:text-white mb-3">Welcome to MindForge</h1>
      <p className="max-w-md text-neutral-500 dark:text-neutral-400 text-base md:text-lg">
        Select a note from the sidebar to start editing, or <span className="text-black dark:text-white font-medium underline decoration-neutral-300 dark:decoration-neutral-700 underline-offset-4">create a new one</span> to capture your thoughts.
      </p>
    </main>
  );
}