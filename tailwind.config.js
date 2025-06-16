/** @type {import('tailwindcss').Config} */

module.exports = {
	content: ["./src/app/**/*.{js,ts,jsx,tsx}", "./src/components/**/*.{js,ts,jsx,tsx}"],
	theme: {
		extend: {
			colors: {
				black: "#000000",
				white: "#ffffff",
				primary: "#498f6e",
				secondary: "var(--color-secondary)",
				body: "var(--color-body)",
				heading: "var(--color-heading)",
				placeholder: "var(--color-placeholder)",
				border: "var(--color-border)",
				grey: {
					darken: "var(--color-grey-darken)",
					DEFAULT: "var(--color-grey)",
					lighten: "var(--color-grey-lighten)",
				},
			},
			fontFamily: {
				body: ["'Radio Canada', sans-serif"],
				display: ["'Radio Canada', sans-serif"],
				segoe: ["'Segoe UI', sans-serif"],
			},
			fontSize: {
				sm: ["14px", "1.8"],
				base: ["16px", "1.6"],
				lg: ["18px", "1.5"],
				xl: ["20px", "1.5"],
				"2xl": ["22px", "1.4"],
				"3xl": ["26px", "1.3"],
				"4xl": ["36px", "1.2"],
				"5xl": ["46px", "1.2"],
				"6xl": ["68px", "1.2"],
			},
			borderWidth: {
				3: "3px",
				6: "6px",
				10: "10px",
			},
			animation: {
				lefttoright: "titleDeviderAnimation 3s ease-in-out infinite",
				ledgerleftright: "ledgerLeftRight 3s ease-in-out infinite",
				ledgerrightleft: "ledgerRightLeft 3s ease-in-out infinite",
				ledgertopbottom: "ledgerTopBottom 3s ease-in-out infinite",
				ledgerbottomtop: "ledgerBottomTop 3s ease-in-out infinite",
				slidedown: "slideDown 1s ease-in-out 1",
			},
		},
	},
};

