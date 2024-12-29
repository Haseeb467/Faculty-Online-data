/** @type {import('tailwindcss').Config} */
export default {
    darkMode: ["class"],
    content: ["./index.html", "./src/**/*.{ts,tsx,js,jsx}"],
  theme: {
  	extend: {
  		// colors: {
  		// 	sidebar: {
  		// 		DEFAULT: 'hsl(var(--sidebar-background))',
  		// 		foreground: 'hsl(var(--sidebar-foreground))',
  		// 		primary: 'hsl(var(--sidebar-primary))',
  		// 		'primary-foreground': 'hsl(var(--sidebar-primary-foreground))',
  		// 		accent: 'hsl(var(--sidebar-accent))',
  		// 		'accent-foreground': 'hsl(var(--sidebar-accent-foreground))',
  		// 		border: 'hsl(var(--sidebar-border))',
  		// 		ring: 'hsl(var(--sidebar-ring))'
  		// 	}
  		// }
  	}
  },
	plugins: [],	
  
}
// tailwind.config.js
module.exports = {
  theme: {
    extend: {
      keyframes: {
        "hourglass-rotate": {
          "0%": { transform: "rotateX(0deg)" },
          "50%": { transform: "rotateX(180deg)" },
          "100%": { transform: "rotateX(180deg)" },
        },
        "hourglass-hide": {
          "0%": { opacity: "1" },
          "25%": { opacity: "0" },
          "30%": { opacity: "0" },
          "40%": { opacity: "1" },
          "100%": { opacity: "1" },
        },
        "sand-stream": {
          "0%": { height: "0px", top: "35px" },
          "50%": { height: "35px", top: "8px" },
          "100%": { height: "0px", top: "8px" },
        },
        "sand-fillup": {
          "0%": { opacity: "0", height: "0" },
          "60%": { opacity: "1", height: "0" },
          "100%": { opacity: "1", height: "17px" },
        },
        "sand-deplete": {
          "0%": { opacity: "0", height: "17px" },
          "100%": { opacity: "1", height: "0px" },
        },
      },
      animation: {
        "hourglass-rotate": "hourglass-rotate 2s ease-in infinite",
        "hourglass-hide": "hourglass-hide 2s ease-in infinite",
        "sand-stream": "sand-stream 2s ease-in infinite",
        "sand-fillup": "sand-fillup 2s ease-in infinite",
        "sand-deplete": "sand-deplete 2s ease-in infinite",
      },
    },
  },
  plugins: [],
};


