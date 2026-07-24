import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        chalkboard: '#115e59', /* teal-900 */
        chalk: '#f8fafc', /* slate-50 */
        yellowChalk: '#fef08a', /* yellow-200 */
      }
    },
  },
  plugins: [],
};
export default config;
