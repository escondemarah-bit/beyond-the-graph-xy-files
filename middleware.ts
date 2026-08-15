import {NextRequest,NextResponse} from 'next/server';
export function middleware(request:NextRequest){const {pathname}=request.nextUrl;if(pathname.startsWith('/login')||pathname.startsWith('/api')||pathname.startsWith('/_next')||pathname==='/favicon.ico')return NextResponse.next();if(!request.cookies.get('xy_portfolio_access'))return NextResponse.redirect(new URL('/login',request.url));return NextResponse.next();}
export const config={matcher:['/((?!.*\\..*).*)']};
