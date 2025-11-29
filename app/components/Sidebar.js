"use client";
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Plus, Search, BrainCircuit, Moon, Sun, Star } from 'lucide-react';
import NoteCard from './NoteCard';
import { useNotes } from '../context/NotesContext';
import { useTheme } from 'next-themes';

export default function Sidebar() {
    const { notes, fetchNotes } = useNotes();
    const [search, setSearch] = useState('');
    const router = useRouter();
    const { theme, setTheme } = useTheme();
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    const createNote = async () => {
        const res = await fetch('/api/notes', { method: 'POST' });
        const note = await res.json();
        await fetchNotes();
        router.push(`/notes/${note.id}`);
    };

    const filteredNotes = notes.filter(note => {
        const term = search.toLowerCase();
        return (
            (note.title || '').toLowerCase().includes(term) ||
            (note.content || '').toLowerCase().includes(term) ||
            (note.tags || []).some(tag => tag.toLowerCase().includes(term))
        );
    });

    const favorites = filteredNotes.filter(n => n.isFavorite);
    const others = filteredNotes.filter(n => !n.isFavorite);

    if (!mounted) return null;

    return (
        <aside className="w-80 h-screen flex flex-col border-r border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/50 backdrop-blur-xl transition-colors">
            {/* Header */}
            <div className="p-6">
                <div className="flex items-center justify-between mb-8">
                    <div className="flex items-center gap-3 text-slate-800 dark:text-slate-100">
                        <div className="p-2 bg-black dark:bg-white text-white dark:text-black rounded-lg">
                            <BrainCircuit size={24} />
                        </div>
                        <span className="font-bold text-xl tracking-tight">MindForge</span>
                    </div>

                    <button
                        onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                        className="p-2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-200 dark:hover:bg-slate-800 rounded-lg transition-colors"
                    >
                        {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
                    </button>
                </div>

                <button
                    onClick={createNote}
                    className="w-full bg-black dark:bg-white hover:bg-slate-800 dark:hover:bg-slate-200 text-white dark:text-black font-medium py-3 px-4 rounded-xl flex items-center justify-center gap-2 transition-all shadow-lg shadow-slate-200 dark:shadow-none active:scale-95"
                >
                    <Plus size={20} />
                    <span>New Note</span>
                </button>
            </div>

            {/* Search */}
            <div className="px-6 mb-4">
                <div className="relative group">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-500 transition-colors" size={18} />
                    <input
                        type="text"
                        placeholder="Search notes & tags..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="w-full bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 pl-10 pr-4 py-2.5 rounded-xl text-sm outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all placeholder:text-slate-400 dark:text-slate-200"
                    />
                </div>
            </div>

            {/* Notes List */}
            <div className="flex-1 overflow-y-auto px-4 pb-4 space-y-6 scrollbar-hide">
                {favorites.length > 0 && (
                    <div className="space-y-1">
                        <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-wider px-2 mb-2 flex items-center gap-1">
                            <Star size={12} className="fill-current" /> Favorites
                        </h3>
                        {favorites.map(note => (
                            <NoteCard key={note.id} note={note} />
                        ))}
                    </div>
                )}

                <div className="space-y-1">
                    {favorites.length > 0 && others.length > 0 && (
                        <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-wider px-2 mb-2">All Notes</h3>
                    )}

                    {filteredNotes.length === 0 ? (
                        <div className="text-center py-10 text-slate-400 text-sm">
                            {search ? 'No notes found' : 'No notes yet'}
                        </div>
                    ) : (
                        others.map(note => (
                            <NoteCard key={note.id} note={note} />
                        ))
                    )}
                </div>
            </div>
        </aside>
    );
}
