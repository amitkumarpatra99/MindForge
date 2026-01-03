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
                        ? 'bg-black dark:bg-white border-black dark:border-white shadow-sm'
                        : 'hover:bg-neutral-50 dark:hover:bg-neutral-900 border-transparent hover:border-neutral-200 dark:hover:border-neutral-800'
                    }
        `}
            >
                <div className="flex items-start gap-3">
                    <div className={`
            p-2 rounded-lg transition-colors
            ${isActive
                            ? 'bg-white dark:bg-black text-black dark:text-white'
                            : 'bg-neutral-100 dark:bg-neutral-800 text-neutral-400 dark:text-neutral-500 group-hover:bg-white dark:group-hover:bg-neutral-700 group-hover:text-black dark:group-hover:text-white'
                        }
          `}>
                        {note.isFavorite ? <Star size={18} className="fill-current text-black dark:text-white" /> : <FileText size={18} />}
                    </div>
                    <div className="flex-1 min-w-0">
                        <h3 className={`font-semibold text-sm truncate ${isActive ? 'text-white dark:text-black' : 'text-neutral-700 dark:text-neutral-300'}`}>
                            {note.title || 'Untitled Note'}
                        </h3>
                        <div className="flex items-center gap-2 mt-1">
                            <p className={`text-xs ${isActive ? 'text-neutral-300 dark:text-neutral-600' : 'text-neutral-400 dark:text-neutral-500'}`}>
                                {new Date(note.updatedAt).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })}
                            </p>
                            {note.tags && note.tags.length > 0 && (
                                <div className="flex gap-1">
                                    {note.tags.slice(0, 2).map(tag => (
                                        <span key={tag} className={`text-[10px] px-1.5 py-0.5 rounded-full ${isActive ? 'bg-white/20 text-white dark:bg-black/10 dark:text-black' : 'bg-neutral-100 dark:bg-neutral-800 text-neutral-500 dark:text-neutral-400'}`}>
                                            #{tag}
                                        </span>
                                    ))}
                                    {note.tags.length > 2 && (
                                        <span className={`text-[10px] ${isActive ? 'text-neutral-300 dark:text-neutral-600' : 'text-neutral-400'}`}>+</span>
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
