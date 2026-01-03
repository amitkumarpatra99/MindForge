"use client";
import { useState, useEffect, useRef } from 'react';
import { useRouter, useParams } from 'next/navigation';
import ReactMarkdown from 'react-markdown';
import { Trash2, Eye, Edit3, Star, Hash, X, Download, ChevronLeft } from 'lucide-react';
import { useNotes } from '../../context/NotesContext';

export default function NoteEditor() {
  const params = useParams();
  const router = useRouter();
  const { notes, updateNote, deleteNote: contextDeleteNote } = useNotes();

  const [note, setNote] = useState(null);
  const [status, setStatus] = useState('Saved');
  const [isPreview, setIsPreview] = useState(false);
  const [tagInput, setTagInput] = useState('');

  const saveTimerRef = useRef(null);

  // Load note from context
  useEffect(() => {
    if (notes.length > 0) {
      const found = notes.find(n => n.id === params.id);
      if (found) {
        setNote(found);
      } else {
        // Note not found, redirect or handle
        // router.push('/'); 
      }
    }
  }, [params.id, notes]);

  // Handle Input Changes
  const handleChange = (field, value) => {
    if (!note) return;

    const updated = { ...note, [field]: value };
    setNote(updated);
    setStatus('Saving...');

    if (saveTimerRef.current) clearTimeout(saveTimerRef.current);
    saveTimerRef.current = setTimeout(() => {
      updateNote(note.id, { [field]: value });
      setStatus('Saved');
    }, 500);
  };

  const toggleFavorite = () => {
    handleChange('isFavorite', !note.isFavorite);
  };

  const addTag = (e) => {
    if (e.key === 'Enter' && tagInput.trim()) {
      e.preventDefault();
      if (!note.tags.includes(tagInput.trim())) {
        const newTags = [...note.tags, tagInput.trim()];
        handleChange('tags', newTags);
      }
      setTagInput('');
    }
  };

  const removeTag = (tagToRemove) => {
    const newTags = note.tags.filter(tag => tag !== tagToRemove);
    handleChange('tags', newTags);
  };

  const handleDelete = async () => {
    if (!confirm("Delete this note?")) return;
    contextDeleteNote(note.id);
    router.push('/');
  };

  if (!note) return <div className="p-8 text-neutral-400">Loading note...</div>;

  return (
    <div className="flex flex-col h-full bg-white dark:bg-black transition-colors">
      {/* Header */}
      <header className="flex justify-between items-center px-4 md:px-8 py-4 md:py-6 border-b border-neutral-100 dark:border-neutral-800 bg-white/80 dark:bg-black/80 backdrop-blur-sm sticky top-0 z-10 transition-colors">
        <div className="flex items-center gap-2 md:gap-4">
          <button
            onClick={() => router.push('/')}
            className="md:hidden p-2 -ml-2 text-neutral-500 hover:text-black dark:hover:text-white"
          >
            <ChevronLeft size={24} />
          </button>

          <span className={`text-xs font-medium px-3 py-1 rounded-full border ${status === 'Saved' ? 'border-neutral-200 dark:border-neutral-800 text-neutral-600 dark:text-neutral-400' : 'border-neutral-200 dark:border-neutral-800 text-neutral-400 dark:text-neutral-500'}`}>
            {status}
          </span>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={toggleFavorite}
            className={`p-2 rounded-lg transition ${note.isFavorite ? 'text-black dark:text-white bg-neutral-100 dark:bg-neutral-800' : 'text-neutral-400 hover:text-black dark:hover:text-white hover:bg-neutral-100 dark:hover:bg-neutral-800'}`}
            title={note.isFavorite ? "Unpin Note" : "Pin Note"}
          >
            <Star size={18} className={note.isFavorite ? "fill-current" : ""} />
          </button>
          <div className="w-px h-4 bg-neutral-200 dark:bg-neutral-800 mx-2" />
          <button
            onClick={() => setIsPreview(!isPreview)}
            className="p-2 text-neutral-400 hover:text-black dark:hover:text-white hover:bg-neutral-100 dark:hover:bg-neutral-800 rounded-lg transition"
            title={isPreview ? "Edit" : "Preview"}
          >
            {isPreview ? <Edit3 size={18} /> : <Eye size={18} />}
          </button>
          <button
            onClick={() => {
              const blob = new Blob([note.content], { type: 'text/markdown' });
              const url = URL.createObjectURL(blob);
              const a = document.createElement('a');
              a.href = url;
              a.download = `${note.title || 'untitled'}.md`;
              a.click();
              URL.revokeObjectURL(url);
            }}
            className="p-2 text-neutral-400 hover:text-black dark:hover:text-white hover:bg-neutral-100 dark:hover:bg-neutral-800 rounded-lg transition"
            title="Export to Markdown"
          >
            <Download size={18} />
          </button>
          <button
            onClick={handleDelete}
            className="p-2 text-neutral-400 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition"
            title="Delete Note"
          >
            <Trash2 size={18} />
          </button>
        </div>
      </header>

      {/* Editor Area */}
      <main className="flex-1 max-w-4xl w-full mx-auto p-4 md:p-8 flex flex-col gap-4 md:gap-6 overflow-y-auto">
        <input
          type="text"
          value={note.title}
          onChange={(e) => handleChange('title', e.target.value)}
          placeholder="Note Title"
          className="text-2xl md:text-4xl font-bold text-black dark:text-white placeholder-neutral-300 dark:placeholder-neutral-700 outline-none w-full bg-transparent"
        />

        {/* Tags Input */}
        <div className="flex flex-wrap items-center gap-2">
          {note.tags && note.tags.map(tag => (
            <span key={tag} className="flex items-center gap-1 text-sm bg-neutral-100 dark:bg-neutral-900 text-neutral-600 dark:text-neutral-300 px-2 py-1 rounded-full group">
              <Hash size={12} className="text-neutral-400" />
              {tag}
              <button onClick={() => removeTag(tag)} className="ml-1 text-neutral-400 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity">
                <X size={12} />
              </button>
            </span>
          ))}
          <div className="flex items-center gap-1 text-neutral-400 focus-within:text-black dark:focus-within:text-white">
            <Hash size={14} />
            <input
              type="text"
              value={tagInput}
              onChange={(e) => setTagInput(e.target.value)}
              onKeyDown={addTag}
              placeholder="Add tag..."
              className="bg-transparent outline-none text-sm min-w-[80px] placeholder-neutral-300 dark:placeholder-neutral-700 text-neutral-600 dark:text-neutral-300"
            />
          </div>
        </div>

        {isPreview ? (
          <div className="prose prose-neutral dark:prose-invert lg:prose-lg max-w-none flex-1">
            <ReactMarkdown>{note.content}</ReactMarkdown>
          </div>
        ) : (
          <textarea
            value={note.content}
            onChange={(e) => handleChange('content', e.target.value)}
            placeholder="Start typing your thoughts... (Markdown supported)"
            className="flex-1 w-full resize-none outline-none text-lg text-neutral-700 dark:text-neutral-300 leading-relaxed placeholder-neutral-300 dark:placeholder-neutral-700 font-mono bg-transparent"
          />
        )}
      </main>

      {/* Footer Stats */}
      <footer className="px-4 md:px-8 py-4 border-t border-neutral-100 dark:border-neutral-800 text-xs text-neutral-400 flex flex-col md:flex-row justify-between items-center gap-2 bg-white/80 dark:bg-black/80 backdrop-blur-sm transition-colors">
        <div className="flex gap-4">
          <span>{note.content.trim().split(/\s+/).filter(Boolean).length} words</span>
          <span>{note.content.length} characters</span>
        </div>
        <div className="text-neutral-300 dark:text-neutral-600">
          Last updated: {new Date(note.updatedAt).toLocaleTimeString()}
        </div>
      </footer>
    </div>
  );
}