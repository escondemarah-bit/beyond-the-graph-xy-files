import type { Config } from 'tailwindcss';
const config: Config = { content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}'], theme: { extend: { colors: { paper:'#f7efe1', parchment:'#ead8b8', ink:'#3d2921', postal:'#a63632', seal:'#7d2528', sand:'#d4b98d' }, fontFamily:{ display:['Georgia','serif'], body:['ui-sans-serif','system-ui','sans-serif'] }, boxShadow:{ paper:'0 12px 28px rgba(79, 48, 30, .13)' } } }, plugins: [] };
export default config;
