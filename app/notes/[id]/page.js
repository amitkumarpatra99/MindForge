"use client";
import { useState, useEffect, useRef } from 'react';
import { useRouter, useParams } from 'next/navigation';
import ReactMarkdown from 'react-markdown';
import { Trash2, Eye, Edit3, Star, Hash, X } from 'lucide-react';
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

  if (!note) return <div className="p-8 text-slate-400">Loading note...</div>;

  return (
    <div className="flex flex-col h-full bg-white dark:bg-slate-950 transition-colors">
      {/* Header */}
      <header className="flex justify-between items-center px-8 py-6 border-b border-slate-100 dark:border-slate-800 bg-white/80 dark:bg-slate-950/80 backdrop-blur-sm sticky top-0 z-10">
        <div className="flex items-center gap-4">
          <span className={`text-xs font-medium px-2 py-1 rounded-full ${status === 'Saved' ? 'bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400' : 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-600 dark:text-yellow-400'}`}>
            {status}
          </span>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={toggleFavorite}
            className={`p-2 rounded-lg transition ${note.isFavorite ? 'text-yellow-400 bg-yellow-50 dark:bg-yellow-900/20' : 'text-slate-400 hover:text-yellow-400 hover:bg-slate-100 dark:hover:bg-slate-800'}`}
            title={note.isFavorite ? "Unpin Note" : "Pin Note"}
          >
            <Star size={18} className={note.isFavorite ? "fill-current" : ""} />
          </button>
          <div className="w-px h-4 bg-slate-200 dark:bg-slate-800 mx-2" />
          <button
            onClick={() => setIsPreview(!isPreview)}
            className="p-2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition"
            title={isPreview ? "Edit" : "Preview"}
          >
            {isPreview ? <Edit3 size={18} /> : <Eye size={18} />}
          </button>
          <button
            onClick={handleDelete}
            className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition"
            title="Delete Note"
          >
            <Trash2 size={18} />
          </button>
        </div>
      </header>

      {/* Editor Area */}
      <main className="flex-1 max-w-4xl w-full mx-auto p-8 flex flex-col gap-6 overflow-y-auto">
        <input
          type="text"
          value={note.title}
          onChange={(e) => handleChange('title', e.target.value)}
          placeholder="Note Title"
          className="text-4xl font-bold text-slate-800 dark:text-slate-100 placeholder-slate-300 dark:placeholder-slate-700 outline-none w-full bg-transparent"
        />

        {/* Tags Input */}
        <div className="flex flex-wrap items-center gap-2">
          {note.tags && note.tags.map(tag => (
            <span key={tag} className="flex items-center gap-1 text-sm bg-slate-100 dark:bg-slate-900 text-slate-600 dark:text-slate-300 px-2 py-1 rounded-full group">
              <Hash size={12} className="text-slate-400" />
              {tag}
              <button onClick={() => removeTag(tag)} className="ml-1 text-slate-400 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity">
                <X size={12} />
              </button>
            </span>
          ))}
          <div className="flex items-center gap-1 text-slate-400 focus-within:text-blue-500">
            <Hash size={14} />
            <input
              type="text"
              value={tagInput}
              onChange={(e) => setTagInput(e.target.value)}
              onKeyDown={addTag}
              placeholder="Add tag..."
              className="bg-transparent outline-none text-sm min-w-[80px] placeholder-slate-300 dark:placeholder-slate-700 text-slate-600 dark:text-slate-300"
            />
          </div>
        </div>

        {isPreview ? (
          <div className="prose prose-slate dark:prose-invert lg:prose-lg max-w-none">
            <ReactMarkdown>{note.content}</ReactMarkdown>
          </div>
        ) : (
          <textarea
            value={note.content}
            onChange={(e) => handleChange('content', e.target.value)}
            placeholder="Start typing your thoughts... (Markdown supported)"
            className="flex-1 w-full resize-none outline-none text-lg text-slate-600 dark:text-slate-300 leading-relaxed placeholder-slate-300 dark:placeholder-slate-700 font-mono bg-transparent"
          />
        )}
      </main>
    </div>
  );
}