"use client";
import { createContext, useContext, useState, useEffect, useCallback } from 'react';

const NotesContext = createContext();

export function NotesProvider({ children }) {
    const [notes, setNotes] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchNotes = useCallback(async () => {
        try {
            const res = await fetch('/api/notes', { cache: 'no-store' });
            const data = await res.json();
            setNotes(data);
        } catch (error) {
            console.error("Failed to fetch notes:", error);
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchNotes();
    }, [fetchNotes]);

    return (
        <NotesContext.Provider value={{ notes, fetchNotes, loading }}>
            {children}
        </NotesContext.Provider>
    );
}

export function useNotes() {
    return useContext(NotesContext);
}
