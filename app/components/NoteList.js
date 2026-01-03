"use client";
import { useState } from 'react';
import { Search, Star } from 'lucide-react';
import NoteCard from './NoteCard';
import { useNotes } from '../context/NotesContext';
import { useRouter } from 'next/navigation';

export default function NoteList() {
    const { notes } = useNotes();
    const router = useRouter();
    const [search, setSearch] = useState('');
    const [sortBy, setSortBy] = useState('updated');
    const [filterTag, setFilterTag] = useState(null);

    const handleNoteClick = (id) => {
        router.push(`/notes/${id}`);
    };

    const filteredNotes = notes
        .filter(note => {
            const term = search.toLowerCase();
            const matchesSearch = (
                (note.title || '').toLowerCase().includes(term) ||
                (note.content || '').toLowerCase().includes(term)
            );
            const matchesTag = filterTag ? (note.tags || []).includes(filterTag) : true;
            return matchesSearch && matchesTag;
        })
        .sort((a, b) => {
            if (sortBy === 'updated') return new Date(b.updatedAt) - new Date(a.updatedAt);
            if (sortBy === 'created') return new Date(b.createdAt || 0) - new Date(a.createdAt || 0);
            if (sortBy === 'title') return (a.title || '').localeCompare(b.title || '');
            return 0;
        });

    const favorites = filteredNotes.filter(n => n.isFavorite);
    const others = filteredNotes.filter(n => !n.isFavorite);

    return (
        <div className="h-full flex flex-col bg-white dark:bg-black w-full md:w-80 md:w-96">
            {/* Header / Search */}
            <div className="p-4 border-b border-neutral-100 dark:border-neutral-900 sticky top-0 bg-white/80 dark:bg-black/80 backdrop-blur-md z-10">
                <h2 className="text-xl font-bold mb-4 text-black dark:text-white">Notes</h2>
                <div className="relative group mb-3">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400 group-focus-within:text-black dark:group-focus-within:text-white transition-colors" size={16} />
                    <input
                        type="text"
                        placeholder="Search notes..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="w-full bg-neutral-100 dark:bg-neutral-900 border border-transparent focus:border-neutral-200 dark:focus:border-neutral-800 pl-9 pr-4 py-2 rounded-xl text-sm outline-none transition-all placeholder:text-neutral-400 text-neutral-900 dark:text-neutral-100"
                    />
                </div>

                {/* Filters */}
                <div className="flex items-center gap-2 overflow-x-auto scrollbar-hide pb-1">
                    <select
                        value={sortBy}
                        onChange={(e) => setSortBy(e.target.value)}
                        className="text-xs bg-transparent border border-neutral-200 dark:border-neutral-800 rounded-lg px-2 py-1 outline-none focus:border-black dark:focus:border-white text-neutral-600 dark:text-neutral-300 cursor-pointer"
                    >
                        <option value="updated">Latest</option>
                        <option value="created">Created</option>
                        <option value="title">A-Z</option>
                    </select>

                    {Array.from(new Set(notes.flatMap(n => n.tags || []))).map(tag => (
                        <button
                            key={tag}
                            onClick={() => setFilterTag(filterTag === tag ? null : tag)}
                            className={`
                                text-[10px] px-2 py-1 rounded-full whitespace-nowrap border transition-colors
                                ${filterTag === tag
                                    ? 'bg-black dark:bg-white text-white dark:text-black border-black dark:border-white'
                                    : 'bg-neutral-50 dark:bg-neutral-900 text-neutral-500 dark:text-neutral-400 border-neutral-100 dark:border-neutral-800 hover:border-neutral-200 dark:hover:border-neutral-700'}
                            `}
                        >
                            #{tag}
                        </button>
                    ))}
                </div>
            </div>

            {/* List */}
            <div className="flex-1 overflow-y-auto p-3 space-y-6">
                {favorites.length > 0 && (
                    <div className="space-y-2">
                        <h3 className="text-xs font-semibold text-neutral-400 uppercase tracking-wider px-2 flex items-center gap-1">
                            <Star size={12} className="fill-current" /> Favorites
                        </h3>
                        {favorites.map(note => (
                            <div key={note.id} onClick={() => handleNoteClick(note.id)}>
                                <NoteCard note={note} />
                            </div>
                        ))}
                    </div>
                )}

                <div className="space-y-2">
                    {favorites.length > 0 && others.length > 0 && (
                        <h3 className="text-xs font-semibold text-neutral-400 uppercase tracking-wider px-2">All Notes</h3>
                    )}

                    {filteredNotes.length === 0 ? (
                        <div className="text-center py-10 text-neutral-400 text-sm">
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
        </div>
    );
}
