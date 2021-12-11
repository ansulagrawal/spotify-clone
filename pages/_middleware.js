import { getToken } from 'next-auth/jwt';
import { NextResponse } from 'next/server';

export async function middleware(req) {
   // Token will only exits if the user is logged in
   const token = await getToken({ req, secret: process.env.JWT_SECRET });

   const { pathname } = req.nextUrl;
   // Allow the request to continue if its true..
   // 1. Its a request for next-auth session & providing fetching
   // 2. token exits

   if (pathname.includes('/api/auth') || token) {
      return NextResponse.next();
   }

   // Redirect to login page if they don't have a token and are requesting a protected route to prevent them from accessing the page
   if (!token && pathname !== '/login') {
      return NextResponse.redirect('/login');
   }
}
