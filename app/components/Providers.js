"use client";
import { ThemeProvider } from "next-themes";
import { NotesProvider } from "../context/NotesContext";
import { SettingsProvider } from "../context/SettingsContext";

export default function Providers({ children }) {
    return (
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
            <SettingsProvider>
                <NotesProvider>
                    {children}
                </NotesProvider>
            </SettingsProvider>
        </ThemeProvider>
    );
}
