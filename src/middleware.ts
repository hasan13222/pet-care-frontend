import { getCurrentUser } from '@/services/authService';
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export async function middleware(request: NextRequest) {
    const user = await getCurrentUser();
    if(user){
        return NextResponse.next();
    }
  return NextResponse.redirect(new URL('/login', request.url))
}
 
// See "Matching Paths" below to learn more
export const config = {
  matcher: ['/profile/:path*', '/'],
}