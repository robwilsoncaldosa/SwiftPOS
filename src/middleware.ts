import { NextResponse, type NextRequest } from 'next/server';
import { cookies } from 'next/headers';

export function middleware(request: NextRequest) {
    // Get the session cookie
    const sessionCookie = cookies().get('session')?.value;

    // Initialize the name variable
    let name: string | null = null;

    if (sessionCookie) {
        try {
            // Parse the session cookie JSON
            const sessionData = JSON.parse(sessionCookie);
            name = sessionData?.name;
        } catch (error) {
            // Handle parsing error
            console.error('Failed to parse session cookie:', error);
        }
    }

    // Check if the request path is not the login page and the name is invalid
    if (
        (name !== 'Jannah Aleriosa' && name !== 'Catherine Ferolin') &&
        !request.nextUrl.pathname.endsWith('/login')
    ) {
        return NextResponse.redirect(new URL('/login', request.url));
    }

    // Check if the request path is the login page and the name is valid
    if (
        (name === 'Jannah Aleriosa' || name === 'Catherine Ferolin') &&
        request.nextUrl.pathname.endsWith('/login')
    ) {
        return NextResponse.redirect(new URL('/', request.url));
    }

    // Continue with the response if no redirection is needed
    return NextResponse.next();
}

export const config = {
    matcher: [
        /*
         * Match all request paths except for the ones starting with:
         * - api (API routes)
         * - _next/static (static files)
         * - _next/image (image optimization files)
         * - favicon.ico (favicon file)
         */
        '/((?!api|_next/static|_next/image|favicon.ico).*)',
    ],
};
