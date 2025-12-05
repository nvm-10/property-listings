import { withAuth } from 'next-auth/middleware';
import { NextResponse } from 'next/server';

export default withAuth(
  function middleware(req) {
    // Allow the request to proceed
    return NextResponse.next();
  },
  {
    callbacks: {
      authorized: ({ token, req }) => {
        // Public routes that don't require authentication
        const publicRoutes = ['/', '/properties', '/about', '/closed-deals'];
        const pathname = req.nextUrl.pathname;
        
        // Allow public routes
        if (publicRoutes.includes(pathname) || pathname.startsWith('/api/auth')) {
          return true;
        }
        
        // For protected routes, require a valid token
        if (pathname.startsWith('/dashboard') || pathname.startsWith('/role-selection')) {
          return !!token;
        }
        
        // Allow all other routes
        return true;
      },
    },
  }
);

// Only run middleware on specific paths
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder
     */
    '/((?!_next/static|_next/image|favicon.ico|.*\\..*|public).*)',
  ],
};
