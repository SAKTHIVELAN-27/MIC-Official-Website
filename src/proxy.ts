import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function proxy(request: NextRequest) {
  // Get the user-agent from the request headers.
  const userAgent = request.headers.get('user-agent') || '';

  // Check if the user-agent string contains common mobile keywords.
  const isMobile = Boolean(userAgent.match(
    /Android|BlackBerry|iPhone|iPad|iPod|Opera Mini|IEMobile|WPDesktop/i
  ));

  // If the user is on a mobile device and is not already on the mobile page,
  // redirect them to the /mobile path.
  if (isMobile && request.nextUrl.pathname !== '/mobile') {
    return NextResponse.redirect(new URL('/mobile', request.url));
  }
  
  // If not a mobile device or already on the mobile page, proceed to the next handler.
  return NextResponse.next();
}

// Set a matcher to define which paths the proxy should run on.
export const config = {
  matcher: [
    /*
     * The following regex ensures the proxy does not run on static files,
     * such as images, fonts, and stylesheets. It matches all paths that do not
     * end with a file extension, while also excluding Next.js internal paths and API routes.
     */
    '/((?!.*\\.[^/]+$|_next|api|favicon.ico).*)',
  ],
};
