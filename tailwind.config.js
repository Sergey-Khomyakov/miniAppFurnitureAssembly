/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./**/*.html','./**/*.js','./**/*.pug'],
  theme: {
    extend: {
      marging:{
        'unset': 'unset',
      },
      gridTemplateColumns: {
        'full': '100%',
        'auto-1fr': 'auto 1fr',
        'auto-auto': 'auto auto',
        '1fr-auto': '1fr auto',
        '1fr-1fr': '1fr 1fr',
        '1fr-1-5fr': '1fr 1.5fr',
        'auto-auto-1fr': 'auto auto 1fr',
        '1fr-auto-1fr' : '1fr auto 1fr',
        'auto-1fr-auto' : 'auto 1fr auto',
        'auto-auto-auto-5': 'auto auto auto 5%',
        'auto-auto-auto-30': 'auto auto auto 30%',
        'auto-auto-auto-40': 'auto auto auto 40%',
        'auto-auto-auto': 'auto auto auto',
        'custom-2': '67rem 21.75rem',
      },
      boxShadow: {
        'custom-1': '0 1px 2px 0 rgba(51, 56, 66, 0.08), 0 1px 4px 0 rgba(16, 24, 40, 0.08)',
      },
      screens: {
        'hover-hover': {'raw': '(hover: hover)'},
        'hover-none': {'raw': '(hover: none)'},
      },
    },
    fontFamily:{
      'montserrat': ['Montserrat', 'sans-serif'],
    },
    colors: {
      "primary": "#6968FF",
      "secondary": "#000000", 
      "white": "#fff",
      "black": "#404040",
      "slate-200" : "#f8f8f8",
      gray: {
        "100": "#f3f4f6",
        "200": "#e5e7eb",
        "300": "#d1d5db",
        "400": "#9ca3af",
        "500": "#6b7280",
        "600": "#4b5563",
        "700": "#374151",
        "800": "#1f2937",
        "900": "#111827"
      },
      amber: {
        "50": "#fffbeb",
        "100": "#fef3c7",
        "200": "#fde68a",
        "300": "#fcd34d",
        "400": "#fbbf24",
        "500": "#f59e0b",
        "600": "#d97706",
        "700": "#b45309",
        "800": "#92400e",
        "900": "#78350f"
      },
      green: {
        "50": "#f0fdf4",
        "100": "#dcfce7",
        "200": "#bbf7d0",
        "300": "#86efac",
        "400": "#4ade80",
        "500": "#22c55e",
        "600": "#16a34a",
        "700": "#15803d",
        "800": "#166534",
        "900": "#14532d"
      },
      red: {
        "50": "#fef2f2",
        "100": "#fee2e2",
        "200": "#fecaca",
        "300": "#fca5a5",
        "400": "#f87171",
        "500": "#ef4444",
        "600": "#dc2626",
        "700": "#b91c1c",
        "800": "#991b1b",
        "900": "#7f1d1d"
      }
    }
  },
  plugins: [],
}

