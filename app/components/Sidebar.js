"use client";
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Plus, Search, BrainCircuit, Moon, Sun, Star, Menu, X } from 'lucide-react';
import NoteCard from './NoteCard';
import { useNotes } from '../context/NotesContext';
import { useTheme } from 'next-themes';

export default function Sidebar() {
    const { notes, createNote } = useNotes();
    const [search, setSearch] = useState('');
    const router = useRouter();
    const { theme, setTheme } = useTheme();
    const [mounted, setMounted] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    const handleCreateNote = () => {
        const newNote = createNote();
        router.push(`/notes/${newNote.id}`);
        setIsMobileMenuOpen(false);
    };

    const handleNoteClick = (id) => {
        router.push(`/notes/${id}`);
        setIsMobileMenuOpen(false);
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
        <>
            {/* Mobile Navbar */}
            <div className="md:hidden fixed top-0 left-0 right-0 h-16 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 z-40 flex items-center px-4 justify-between">
                <div className="flex items-center gap-3">
                    <button
                        onClick={() => setIsMobileMenuOpen(true)}
                        className="p-2 -ml-2 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors"
                    >
                        <Menu size={20} />
                    </button>
                    <div className="flex flex-col">
                        <span className="font-bold text-lg leading-none text-slate-800 dark:text-slate-100">MindForge</span>
                        <span className="text-[10px] font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider">by Mr Patra</span>
                    </div>
                </div>
            </div>

            {/* Overlay */}
            {isMobileMenuOpen && (
                <div
                    className="fixed inset-0 bg-black/50 z-50 md:hidden backdrop-blur-sm"
                    onClick={() => setIsMobileMenuOpen(false)}
                />
            )}

            <aside className={`
                fixed md:relative z-[60] h-screen w-80 flex flex-col 
                border-r border-slate-200 dark:border-slate-800 
                bg-slate-50/95 dark:bg-slate-900/95 backdrop-blur-xl transition-transform duration-300 ease-in-out
                ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
            `}>
                {/* Header */}
                <div className="p-6">
                    <div className="flex items-center justify-between mb-8">
                        <div className="flex items-center gap-3 text-slate-800 dark:text-slate-100">
                            <div className="p-2 bg-black dark:bg-white text-white dark:text-black rounded-lg">
                                <BrainCircuit size={24} />
                            </div>
                            <div className="flex flex-col">
                                <span className="font-bold text-xl tracking-tight leading-none">MindForge</span>
                                <span className="text-[10px] font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider mt-0.5">by Mr Patra</span>
                            </div>
                        </div>

                        <div className="flex items-center gap-2">
                            <button
                                onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                                className="p-2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-200 dark:hover:bg-slate-800 rounded-lg transition-colors"
                            >
                                {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
                            </button>
                            <button
                                onClick={() => setIsMobileMenuOpen(false)}
                                className="md:hidden p-2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-200 dark:hover:bg-slate-800 rounded-lg transition-colors"
                            >
                                <X size={20} />
                            </button>
                        </div>
                    </div>

                    <button
                        onClick={handleCreateNote}
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
                                <div key={note.id} onClick={() => handleNoteClick(note.id)}>
                                    <NoteCard note={note} />
                                </div>
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
                                <div key={note.id} onClick={() => handleNoteClick(note.id)}>
                                    <NoteCard note={note} />
                                </div>
                            ))
                        )}
                    </div>
                </div>
            </aside>
        </>
    );
}
