import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { getCurrentUser } from './services/userService'

export async function middleware(request: NextRequest) {
    const user = await getCurrentUser();
    console.log(user)
    if(user){
        return NextResponse.next();
    }
  return NextResponse.redirect(new URL('/login', request.url))
}
 
// See "Matching Paths" below to learn more
export const config = {
  matcher: ['/profile/:path*', '/'],
}