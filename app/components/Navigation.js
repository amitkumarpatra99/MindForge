"use client";
import { useState } from 'react';
import { BrainCircuit, Moon, Sun, Settings, Plus, Menu } from 'lucide-react';
import { useTheme } from 'next-themes';
import SettingsModal from './SettingsModal';
import { useRouter } from 'next/navigation';
import { useNotes } from '../context/NotesContext';

export default function Navigation() {
    const { theme, setTheme } = useTheme();
    const [isSettingsOpen, setIsSettingsOpen] = useState(false);
    const router = useRouter();
    const { createNote } = useNotes();

    const handleCreateNote = () => {
        const newNote = createNote();
        router.push(`/notes/${newNote.id}`);
    };

    return (
        <>
            <nav className="w-16 md:w-20 h-full flex flex-col items-center py-6 bg-neutral-50 dark:bg-black border-r border-neutral-200 dark:border-neutral-800 z-50">
                {/* Logo */}
                <div className="mb-8">
                    <div className="p-2 bg-black dark:bg-white text-white dark:text-black rounded-xl">
                        <BrainCircuit size={24} />
                    </div>
                </div>

                {/* Primary Actions */}
                <div className="flex-1 flex flex-col gap-4 w-full px-2">
                    <button
                        onClick={handleCreateNote}
                        className="w-full aspect-square flex items-center justify-center rounded-xl bg-neutral-200 dark:bg-neutral-900 text-neutral-900 dark:text-white hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition-all shadow-sm"
                        title="New Note"
                    >
                        <Plus size={24} />
                    </button>

                    {/* Add more nav items here like Favorites/Tags/Home if needed */}
                </div>

                {/* Bottom Actions */}
                <div className="flex flex-col gap-4 w-full px-2">
                    <button
                        onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                        className="w-full aspect-square flex items-center justify-center rounded-xl text-neutral-500 hover:bg-neutral-200 dark:hover:bg-neutral-800 transition-colors"
                        title="Toggle Theme"
                    >
                        {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
                    </button>
                    <button
                        onClick={() => setIsSettingsOpen(true)}
                        className="w-full aspect-square flex items-center justify-center rounded-xl text-neutral-500 hover:bg-neutral-200 dark:hover:bg-neutral-800 transition-colors"
                        title="Settings"
                    >
                        <Settings size={20} />
                    </button>
                </div>
            </nav>

            {isSettingsOpen && <SettingsModal onClose={() => setIsSettingsOpen(false)} />}
        </>
    );
}
