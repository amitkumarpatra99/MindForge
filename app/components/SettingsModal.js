"use client";
import { X, Check, Sun, Moon } from 'lucide-react';
import { useSettings, FONT_FAMILIES } from '../context/SettingsContext';

export default function SettingsModal({ onClose }) {
    const { fontFamily, setFontFamily } = useSettings();

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
            <div className="bg-white dark:bg-black rounded-2xl shadow-2xl w-full max-w-md overflow-hidden border border-neutral-200 dark:border-neutral-800 animate-in fade-in zoom-in duration-200">

                {/* Header */}
                <div className="px-6 py-4 border-b border-neutral-100 dark:border-neutral-800 flex items-center justify-between bg-white dark:bg-black">
                    <h2 className="text-lg font-bold text-neutral-900 dark:text-neutral-100">Settings</h2>
                    <button
                        onClick={onClose}
                        className="p-2 rounded-full hover:bg-neutral-100 dark:hover:bg-neutral-800 text-neutral-500 dark:text-neutral-400 transition-colors"
                    >
                        <X size={20} />
                    </button>
                </div>

                {/* Content */}
                <div className="p-6 space-y-8">

                    {/* Theme */}
                    <div className="space-y-3">
                        <h3 className="text-sm font-semibold text-neutral-500 uppercase tracking-wider">App Theme</h3>
                        <div className="grid grid-cols-2 gap-2">
                            <button
                                onClick={() => setTheme('light')}
                                className={`
                                    px-4 py-3 rounded-xl border text-center transition-all flex items-center justify-center gap-2
                                    ${theme === 'light'
                                        ? 'border-black dark:border-white bg-neutral-50 dark:bg-neutral-900 text-black dark:text-white'
                                        : 'border-neutral-200 dark:border-neutral-800 hover:border-neutral-300 dark:hover:border-neutral-700 text-neutral-700 dark:text-neutral-300'}
                                `}
                            >
                                <Sun size={18} />
                                <span className="text-sm font-medium">Light</span>
                            </button>
                            <button
                                onClick={() => setTheme('dark')}
                                className={`
                                    px-4 py-3 rounded-xl border text-center transition-all flex items-center justify-center gap-2
                                    ${theme === 'dark'
                                        ? 'border-black dark:border-white bg-neutral-50 dark:bg-neutral-900 text-black dark:text-white'
                                        : 'border-neutral-200 dark:border-neutral-800 hover:border-neutral-300 dark:hover:border-neutral-700 text-neutral-700 dark:text-neutral-300'}
                                `}
                            >
                                <Moon size={18} />
                                <span className="text-sm font-medium">Dark</span>
                            </button>
                        </div>
                    </div>

                    {/* Font Family */}
                    <div className="space-y-3">
                        <h3 className="text-sm font-semibold text-neutral-500 uppercase tracking-wider">Font Family</h3>
                        <div className="grid grid-cols-1 gap-2">
                            {FONT_FAMILIES.map((font) => (
                                <button
                                    key={font.value}
                                    onClick={() => setFontFamily(font.value)}
                                    className={`
                    px-4 py-3 rounded-xl border text-left transition-all flex items-center justify-between
                    ${fontFamily === font.value
                                            ? 'border-black dark:border-white bg-neutral-50 dark:bg-neutral-900 text-black dark:text-white'
                                            : 'border-neutral-200 dark:border-neutral-800 hover:border-neutral-300 dark:hover:border-neutral-700 text-neutral-700 dark:text-neutral-300'}
                    ${font.value} 
                  `}
                                >
                                    <span className="text-base">The quick brown fox jumps over the lazy dog.</span>
                                    {fontFamily === font.value && <Check size={18} className="text-black dark:text-white" />}
                                </button>
                            ))}
                        </div>
                    </div>

                </div>

                {/* Footer */}
                <div className="px-6 py-4 bg-neutral-50 dark:bg-neutral-900 border-t border-neutral-100 dark:border-neutral-800 text-center">
                    <p className="text-xs text-neutral-400">
                        Changes are saved automatically.
                    </p>
                </div>
            </div>
        </div>
    );
}
