"use client";
import { useState } from 'react';
import { usePathname } from 'next/navigation';
import { Home, Plus, Settings } from 'lucide-react';
import Link from 'next/link';
import { useNotes } from '../context/NotesContext';
import { useRouter } from 'next/navigation';

import SettingsModal from './SettingsModal';

export default function MobileLayout({ children, noteList, navigation }) {
    const pathname = usePathname();
    const isNoteOpen = pathname.startsWith('/notes/');
    const router = useRouter();
    const { createNote } = useNotes();
    const [isSettingsOpen, setIsSettingsOpen] = useState(false);

    const handleCreateNote = () => {
        const newNote = createNote();
        router.push(`/notes/${newNote.id}`);
    };

    return (
        <div className="flex w-full h-full flex-col md:flex-row">
            {/* Desktop: Navigation (Right now handled in parent, but we can wrap here too) */}
            {/* Actually, the parent Layout.js passes pre-rendered components. 
                But for mobile toggling, we need control over visibility.
            */}

            {/* Pane 1: Navigation (Desktop Only) */}
            <div className="hidden md:block h-full flex-shrink-0">
                {navigation}
            </div>

            {/* Pane 2: Note List */}
            {/* Mobile: Show if NO note is open */}
            {/* Desktop: Always show */}
            <div className={`
                ${isNoteOpen ? 'hidden' : 'flex'} 
                md:flex 
                w-full md:w-auto h-full flex-shrink-0 
                border-r border-neutral-200 dark:border-neutral-800
                flex-col
            `}>
                {noteList}

                {/* Mobile Bottom Nav (Visible only when list is showing) */}
                <div className="md:hidden mt-auto border-t border-neutral-200 dark:border-neutral-800 p-4 bg-white dark:bg-black flex justify-around items-center shrink-0 h-16 safe-area-pb">
                    <Link href="/" className="p-2 text-neutral-500 hover:text-black dark:hover:text-white">
                        <Home size={24} />
                    </Link>
                    <button
                        onClick={handleCreateNote}
                        className="p-3 bg-black dark:bg-white text-white dark:text-black rounded-full shadow-lg -mt-8 border-4 border-white dark:border-black"
                    >
                        <Plus size={24} />
                    </button>
                    <button
                        onClick={() => setIsSettingsOpen(true)}
                        className="p-2 text-neutral-500 hover:text-black dark:hover:text-white"
                    >
                        <Settings size={24} />
                    </button>
                </div>
            </div>

            {/* Pane 3: Editor / Children */}
            {/* Mobile: Show if Note IS open */}
            {/* Desktop: Always show */}
            <div className={`
                ${isNoteOpen ? 'flex' : 'hidden'} 
                md:flex 
                flex-1 h-full min-w-0 
                bg-white dark:bg-black 
                overflow-hidden relative
            `}>
                {children}
            </div>
            {isSettingsOpen && <SettingsModal onClose={() => setIsSettingsOpen(false)} />}
        </div>
    );
}
