"use client";
import { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { v4 as uuidv4 } from 'uuid';

const NotesContext = createContext();

export function NotesProvider({ children }) {
    const [notes, setNotes] = useState([]);
    const [loading, setLoading] = useState(true);

    // Load notes from LocalStorage on mount
    useEffect(() => {
        const savedNotes = localStorage.getItem('mindforge_notes');
        if (savedNotes) {
            try {
                setNotes(JSON.parse(savedNotes));
            } catch (e) {
                console.error("Failed to parse notes from local storage", e);
                setNotes([]);
            }
        } else {
            // Default initial note
            const initialNote = {
                id: uuidv4(),
                title: 'Welcome to MindForge',
                content: '# Welcome to MindForge\n\nThis is your new local-first note-taking app. Notes are saved directly in your browser.',
                tags: ['welcome'],
                isFavorite: false,
                updatedAt: new Date().toISOString(),
            };
            setNotes([initialNote]);
            localStorage.setItem('mindforge_notes', JSON.stringify([initialNote]));
        }
        setLoading(false);
    }, []);

    const saveNotesToStorage = (updatedNotes) => {
        localStorage.setItem('mindforge_notes', JSON.stringify(updatedNotes));
        setNotes(updatedNotes);
    };

    const createNote = () => {
        const newNote = {
            id: uuidv4(),
            title: 'Untitled Note',
            content: '',
            tags: [],
            isFavorite: false,
            updatedAt: new Date().toISOString(),
        };
        const updatedNotes = [newNote, ...notes];
        saveNotesToStorage(updatedNotes);
        return newNote;
    };

    const updateNote = (id, updates) => {
        const updatedNotes = notes.map(note =>
            note.id === id ? { ...note, ...updates, updatedAt: new Date().toISOString() } : note
        );
        saveNotesToStorage(updatedNotes);
    };

    const deleteNote = (id) => {
        const updatedNotes = notes.filter(note => note.id !== id);
        saveNotesToStorage(updatedNotes);
    };

    return (
        <NotesContext.Provider value={{ notes, loading, createNote, updateNote, deleteNote }}>
            {children}
        </NotesContext.Provider>
    );
}

export function useNotes() {
    return useContext(NotesContext);
}
