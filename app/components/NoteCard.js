"use client";
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { FileText, Star } from 'lucide-react';

export default function NoteCard({ note }) {
    const pathname = usePathname();
    const isActive = pathname === `/notes/${note.id}`;

    return (
        <Link href={`/notes/${note.id}`} className="block">
            <div
                className={`
          group flex flex-col gap-2 p-4 rounded-xl transition-all duration-200 border
          ${isActive
                        ? 'bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 shadow-sm'
                        : 'hover:bg-white/50 dark:hover:bg-slate-800/50 border-transparent hover:border-slate-200/50 dark:hover:border-slate-700/50'
                    }
        `}
            >
                <div className="flex items-start gap-3">
                    <div className={`
            p-2 rounded-lg transition-colors
            ${isActive
                            ? 'bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400'
                            : 'bg-slate-100 dark:bg-slate-800 text-slate-400 dark:text-slate-500 group-hover:bg-white dark:group-hover:bg-slate-700 group-hover:text-slate-600 dark:group-hover:text-slate-300'
                        }
          `}>
                        {note.isFavorite ? <Star size={18} className="fill-current text-yellow-400" /> : <FileText size={18} />}
                    </div>
                    <div className="flex-1 min-w-0">
                        <h3 className={`font-semibold text-sm truncate ${isActive ? 'text-slate-900 dark:text-slate-100' : 'text-slate-700 dark:text-slate-300'}`}>
                            {note.title || 'Untitled Note'}
                        </h3>
                        <div className="flex items-center gap-2 mt-1">
                            <p className="text-xs text-slate-400 dark:text-slate-500">
                                {new Date(note.updatedAt).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })}
                            </p>
                            {note.tags && note.tags.length > 0 && (
                                <div className="flex gap-1">
                                    {note.tags.slice(0, 2).map(tag => (
                                        <span key={tag} className="text-[10px] bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 px-1.5 py-0.5 rounded-full">
                                            #{tag}
                                        </span>
                                    ))}
                                    {note.tags.length > 2 && (
                                        <span className="text-[10px] text-slate-400">+</span>
                                    )}
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </Link>
    );
}
