import { NextAuthOptions } from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import { UserRole } from '@/types/user';

// Generate a unique server instance ID on startup
// This invalidates all sessions when server restarts
const SERVER_INSTANCE_ID = Date.now().toString();

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || '',
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || '',
    }),
  ],
  callbacks: {
    async signIn({ user, account, profile }) {
      // You can add custom logic here to save user to database
      return true;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.sub as string;
        session.user.role = (token.role as UserRole) || 'buyer';
      }
      return session;
    },
    async jwt({ token, user, trigger, session }) {
      // First time user signs in
      if (user) {
        token.role = 'buyer'; // Default role
        token.iat = Math.floor(Date.now() / 1000); // Issued at
        token.lastActivity = Math.floor(Date.now() / 1000); // Last activity timestamp
        token.serverInstance = SERVER_INSTANCE_ID; // Bind to current server instance
      }
      
      // Invalidate token if it's from a previous server instance
      if (token.serverInstance && token.serverInstance !== SERVER_INSTANCE_ID) {
        console.log('Token from old server instance - invalidating');
        return { ...token, exp: 0 }; // Force logout by expiring token
      }
      
      // Check if token has expired (7 days max session)
      const maxAge = 7 * 24 * 60 * 60; // 7 days in seconds
      const tokenAge = Math.floor(Date.now() / 1000) - (token.iat as number || 0);
      
      if (tokenAge > maxAge) {
        // Token expired - force logout
        return { ...token, exp: 0 }; // Return expired token
      }
      
      // Check for idle timeout (1 hour of inactivity)
      const idleTimeout = 60 * 60; // 1 hour in seconds
      const timeSinceLastActivity = Math.floor(Date.now() / 1000) - (token.lastActivity as number || 0);
      
      if (timeSinceLastActivity > idleTimeout) {
        // Idle timeout - force logout
        return { ...token, exp: 0 }; // Return expired token
      }
      
      // Update last activity timestamp
      token.lastActivity = Math.floor(Date.now() / 1000);
      
      // Allow role updates from client
      if (trigger === 'update' && session?.role) {
        token.role = session.role;
      }
      
      return token;
    },
  },
  pages: {
    signIn: '/',
    error: '/',
  },
  session: {
    strategy: 'jwt',
    maxAge: 7 * 24 * 60 * 60, // 7 days
    updateAge: 24 * 60 * 60, // Update session every 24 hours
  },
  cookies: {
    sessionToken: {
      name: `next-auth.session-token`,
      options: {
        httpOnly: true, // Prevent XSS attacks
        sameSite: 'lax', // CSRF protection
        path: '/',
        secure: process.env.NODE_ENV === 'production', // HTTPS only in production
      },
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
};
