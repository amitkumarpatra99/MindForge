"use client";
import { X, Check } from 'lucide-react';
import { useSettings, ACCENT_COLORS, FONT_FAMILIES } from '../context/SettingsContext';

export default function SettingsModal({ onClose }) {
    const { accentColor, setAccentColor, fontFamily, setFontFamily } = useSettings();

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
            <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-2xl w-full max-w-md overflow-hidden border border-slate-200 dark:border-slate-800 animate-in fade-in zoom-in duration-200">

                {/* Header */}
                <div className="px-6 py-4 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between bg-slate-50/50 dark:bg-slate-900/50">
                    <h2 className="text-lg font-bold text-slate-800 dark:text-slate-100">Settings</h2>
                    <button
                        onClick={onClose}
                        className="p-2 rounded-full hover:bg-slate-200 dark:hover:bg-slate-800 text-slate-500 dark:text-slate-400 transition-colors"
                    >
                        <X size={20} />
                    </button>
                </div>

                {/* Content */}
                <div className="p-6 space-y-8">

                    {/* Accent Color */}
                    <div className="space-y-3">
                        <h3 className="text-sm font-semibold text-slate-500 uppercase tracking-wider">Accent Color</h3>
                        <div className="flex flex-wrap gap-3">
                            {ACCENT_COLORS.map((color) => (
                                <button
                                    key={color.value}
                                    onClick={() => setAccentColor(color.value)}
                                    className={`
                    w-12 h-12 rounded-full flex items-center justify-center transition-all
                    ${accentColor === color.value ? 'ring-2 ring-offset-2 ring-slate-400 dark:ring-slate-500 scale-110' : 'hover:scale-105'}
                  `}
                                    style={{ backgroundColor: `var(--accent-500)` }}
                                // Note: In a real implementation this inline style would need to look up the color hex code or use a map
                                // Since we are using CSS variables which are scoped to root, we can't easily grab the actual hex value here for the button background *before* it is selected if we rely purely on the variable.
                                // However, for this UI, we can use a hardcoded map for the button preview colors or apply a class that sets the variable locally.
                                // BETTER APPROACH: Add specific classes or inline styles for these buttons.
                                >
                                    <div
                                        className={`w-full h-full rounded-full`}
                                        style={{ backgroundColor: getColorHex(color.value) }}
                                    >
                                        {accentColor === color.value && (
                                            <div className="flex items-center justify-center w-full h-full text-white drop-shadow-md">
                                                <Check size={20} strokeWidth={3} />
                                            </div>
                                        )}
                                    </div>
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Font Family */}
                    <div className="space-y-3">
                        <h3 className="text-sm font-semibold text-slate-500 uppercase tracking-wider">Font Family</h3>
                        <div className="grid grid-cols-1 gap-2">
                            {FONT_FAMILIES.map((font) => (
                                <button
                                    key={font.value}
                                    onClick={() => setFontFamily(font.value)}
                                    className={`
                    px-4 py-3 rounded-xl border text-left transition-all flex items-center justify-between
                    ${fontFamily === font.value
                                            ? 'border-accent-500 bg-accent-50 dark:bg-accent-950/30 text-accent-700 dark:text-accent-300'
                                            : 'border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 text-slate-700 dark:text-slate-300'}
                    ${font.value} 
                  `}
                                >
                                    <span className="text-base">The quick brown fox jumps over the lazy dog.</span>
                                    {fontFamily === font.value && <Check size={18} className="text-accent-600 dark:text-accent-400" />}
                                </button>
                            ))}
                        </div>
                    </div>

                </div>

                {/* Footer */}
                <div className="px-6 py-4 bg-slate-50 dark:bg-slate-900 border-t border-slate-100 dark:border-slate-800 text-center">
                    <p className="text-xs text-slate-400">
                        Changes are saved automatically.
                    </p>
                </div>
            </div>
        </div>
    );
}

// Helper to get hex colors for preview circles
function getColorHex(colorName) {
    switch (colorName) {
        case 'blue': return '#3b82f6';
        case 'purple': return '#8b5cf6';
        case 'green': return '#22c55e';
        case 'orange': return '#f97316';
        case 'pink': return '#ec4899';
        default: return '#3b82f6';
    }
}
