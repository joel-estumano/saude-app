/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ["./src/**/*.{html,ts}"],
	theme: {
		extend: {
			fontFamily: {
				montserrat: "var(--font-montserrat)",
				poppins: "var(--font-poppins)"
			},
			colors: {
				background: "hsl(var(--background))",
				foreground: "hsl(var(--foreground))",
				card: "hsl(var(--card))",
				"card-foreground": "hsl(var(--card-foreground))",
				popover: "hsl(var(--popover))",
				"popover-foreground": "hsl(var(--popover-foreground))",
				primary: "hsl(var(--primary))",
				"primary-foreground": "hsl(var(--primary-foreground))",
				secondary: "hsl(var(--secondary))",
				"secondary-foreground": "hsl(var(--secondary-foreground))",
				muted: "hsl(var(--muted))",
				"muted-foreground": "hsl(var(--muted-foreground))",
				accent: "hsl(var(--accent))",
				"accent-foreground": "hsl(var(--accent-foreground))",
				success: "hsl(var(--success))",
				"success-foreground": "hsl(var(--success-foreground))",
				destructive: "hsl(var(--destructive))",
				"destructive-foreground": "hsl(var(--destructive-foreground))",
				border: "hsl(var(--border))",
				input: "hsl(var(--input))",
				ring: "hsl(var(--ring))"
			},
			borderRadius: {
				DEFAULT: "var(--radius)"
			},
			animation: {
				progress: "progress 1.5s linear infinite"
			},
			keyframes: {
				progress: {
					"0%": { transform: "translateX(-100%)" },
					"100%": { transform: "translateX(100%)" }
				}
			}
		}
	},
	plugins: []
};
