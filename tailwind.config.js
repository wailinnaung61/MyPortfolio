/** @type {import('tailwindcss').Config} */

module.exports = {
	content: ["./src/app/**/*.{js,ts,jsx,tsx}", "./src/components/**/*.{js,ts,jsx,tsx}"],
	darkMode: "class",
	theme: {
		extend: {
			colors: {
				black: "#000000",
				white: "#ffffff",
				primary: "#10b981",
				"primary-light": "#34d399",
				"primary-dark": "#059669",
				accent: "#14b8a6",
				"accent-light": "#2dd4bf",
				secondary: "var(--color-secondary)",
				body: "var(--color-body)",
				heading: "var(--color-heading)",
				placeholder: "var(--color-placeholder)",
				border: "var(--color-border)",
				surface: "var(--color-surface)",
				grey: {
					darken: "var(--color-grey-darken)",
					DEFAULT: "var(--color-grey)",
					lighten: "var(--color-grey-lighten)",
				},
			},
			fontFamily: {
				body: ["'Inter', sans-serif"],
				display: ["'Inter', sans-serif"],
			},
			fontSize: {
				xs: ["12px", "1.6"],
				sm: ["14px", "1.7"],
				base: ["16px", "1.6"],
				lg: ["18px", "1.55"],
				xl: ["20px", "1.5"],
				"2xl": ["24px", "1.4"],
				"3xl": ["28px", "1.3"],
				"4xl": ["36px", "1.2"],
				"5xl": ["48px", "1.15"],
				"6xl": ["64px", "1.05"],
				"7xl": ["80px", "1"],
			},
			borderWidth: {
				3: "3px",
				6: "6px",
				10: "10px",
			},
			boxShadow: {
				glow: "0 0 20px rgba(16, 185, 129, 0.15)",
				"glow-lg": "0 0 40px rgba(16, 185, 129, 0.2)",
				"glow-accent": "0 0 30px rgba(20, 184, 166, 0.15)",
				"card-hover": "0 8px 32px rgba(0, 0, 0, 0.3), 0 0 0 1px rgba(16, 185, 129, 0.1)",
				"card-rest": "0 1px 3px rgba(0, 0, 0, 0.12), 0 0 0 1px rgba(255, 255, 255, 0.04)",
			},
			transitionTimingFunction: {
				premium: "cubic-bezier(0.16, 1, 0.3, 1)",
			},
			transitionDuration: {
				400: "400ms",
			},
			animation: {
				lefttoright: "titleDeviderAnimation 3s ease-in-out infinite",
				ledgerleftright: "ledgerLeftRight 3s ease-in-out infinite",
				ledgerrightleft: "ledgerRightLeft 3s ease-in-out infinite",
				ledgertopbottom: "ledgerTopBottom 3s ease-in-out infinite",
				ledgerbottomtop: "ledgerBottomTop 3s ease-in-out infinite",
				slidedown: "slideDown 1s ease-in-out 1",
				"gradient-shift": "gradientShift 8s ease-in-out infinite",
				"pulse-slow": "pulse 4s ease-in-out infinite",
				"glow-pulse": "glowPulse 3s ease-in-out infinite",
			},
			keyframes: {
				gradientShift: {
					"0%, 100%": { backgroundPosition: "0% 50%" },
					"50%": { backgroundPosition: "100% 50%" },
				},
				glowPulse: {
					"0%, 100%": { opacity: "0.4" },
					"50%": { opacity: "0.8" },
				},
			},
			backgroundImage: {
				"gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
				"gradient-premium": "linear-gradient(135deg, #10b981 0%, #14b8a6 50%, #2dd4bf 100%)",
			},
			spacing: {
				18: "4.5rem",
				22: "5.5rem",
				30: "7.5rem",
				34: "8.5rem",
				38: "9.5rem",
			},
		},
	},
};
