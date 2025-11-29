"use client";
import { ThemeProvider } from "next-themes";
import { NotesProvider } from "../context/NotesContext";

export default function Providers({ children }) {
    return (
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
            <NotesProvider>
                {children}
            </NotesProvider>
        </ThemeProvider>
    );
}
