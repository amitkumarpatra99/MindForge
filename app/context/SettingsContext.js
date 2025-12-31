"use client";
import { createContext, useContext, useState, useEffect } from 'react';

const SettingsContext = createContext();

export const ACCENT_COLORS = [
    { name: 'Blue', value: 'blue' },
    { name: 'Purple', value: 'purple' },
    { name: 'Green', value: 'green' },
    { name: 'Orange', value: 'orange' },
    { name: 'Pink', value: 'pink' },
];

export const FONT_FAMILIES = [
    { name: 'Sans', value: 'font-sans' },
    { name: 'Serif', value: 'font-serif' },
    { name: 'Mono', value: 'font-mono' },
];

export function SettingsProvider({ children }) {
    const [accentColor, setAccentColor] = useState('blue');
    const [fontFamily, setFontFamily] = useState('font-sans');
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        const savedSettings = localStorage.getItem('mindforge_settings');
        if (savedSettings) {
            try {
                const parsed = JSON.parse(savedSettings);
                if (parsed.accentColor) setAccentColor(parsed.accentColor);
                if (parsed.fontFamily) setFontFamily(parsed.fontFamily);
            } catch (e) {
                console.error("Failed to parse settings", e);
            }
        }
        setMounted(true);
    }, []);

    const updateSettings = (key, value) => {
        const newSettings = {
            accentColor: key === 'accentColor' ? value : accentColor,
            fontFamily: key === 'fontFamily' ? value : fontFamily,
        };

        if (key === 'accentColor') setAccentColor(value);
        if (key === 'fontFamily') setFontFamily(value);

        localStorage.setItem('mindforge_settings', JSON.stringify(newSettings));
    };

    // Apply settings to document element
    useEffect(() => {
        if (!mounted) return;

        const root = document.documentElement;

        // Remove old font classes
        FONT_FAMILIES.forEach(font => root.classList.remove(font.value));
        // Add new font class
        root.classList.add(fontFamily);

        // Set accent attribute for CSS variables
        root.setAttribute('data-accent', accentColor);

    }, [accentColor, fontFamily, mounted]);

    return (
        <SettingsContext.Provider value={{
            accentColor,
            setAccentColor: (val) => updateSettings('accentColor', val),
            fontFamily,
            setFontFamily: (val) => updateSettings('fontFamily', val)
        }}>
            {children}
        </SettingsContext.Provider>
    );
}

export function useSettings() {
    return useContext(SettingsContext);
}
