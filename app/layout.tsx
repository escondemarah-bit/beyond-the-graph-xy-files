import type { Metadata } from 'next';
import './globals.css';
export const metadata: Metadata = { title:'Beyond the Graph: The X-Y Files', description:'A Digital Journey of X, Y & Us — Functioning Together' };
export default function RootLayout({children}:{children:React.ReactNode}) { return <html lang="en"><body>{children}</body></html>; }
