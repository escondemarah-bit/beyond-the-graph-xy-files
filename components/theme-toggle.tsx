'use client';

import { Moon, Sun } from 'lucide-react';
import { useEffect, useState } from 'react';

export function ThemeToggle() {
  const [dark, setDark] = useState(false);
  useEffect(() => {
    const saved = localStorage.getItem('xy-theme');
    const enabled = saved === 'dark' || (!saved && window.matchMedia('(prefers-color-scheme: dark)').matches);
    setDark(enabled); document.documentElement.classList.toggle('dark', enabled);
  }, []);
  function toggle() { const next = !dark; setDark(next); document.documentElement.classList.toggle('dark', next); localStorage.setItem('xy-theme', next ? 'dark' : 'light'); }
  return <button type="button" aria-label="Toggle dark mode" aria-pressed={dark} onClick={toggle} className="theme-toggle"><Sun className="size-4"/><span>{dark ? 'Light' : 'Dark'}</span><Moon className="size-4"/></button>;
}
