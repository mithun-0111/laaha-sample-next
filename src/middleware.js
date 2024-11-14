import createIntlMiddleware from 'next-intl/middleware';
import { locales } from '@/navigation';

// Create the internationalization middleware
const intlMiddleware = createIntlMiddleware({
  locales,
  defaultLocale: 'en',
  localeDetection: true,
});

// Middleware function
export function middleware(request) {
  const acceptLanguage = request.headers.get('accept-language');

  const preferredLocales = acceptLanguage
    .split(',')
    .map(lang => lang.split(';')[0].trim())
    .filter(lang => locales.includes(lang));
  
  const localeValue = preferredLocales.length > 0 ? preferredLocales[0] : locales[0];

  // Fetch the country code from Cloudflare headers
  const countryCode = request.headers.get('CF-IPCountry') || 'US'; // Default to 'US' if not available

  // Call the intl middleware for redirect.
  const response = intlMiddleware(request);

  // Set the locale cookie
  response.cookies.set('NEXT_LOCALE', localeValue, {
    path: '/',
    httpOnly: true,
    maxAge: undefined,
  });

  // Set the country code cookie
  response.cookies.set('COUNTRY_CODE', countryCode, {
    path: '/',
    httpOnly: true,
    maxAge: undefined,
  });
  
  // Return the response
  return response;
}

// Export config for the middleware
export const config = {
  matcher: ['/((?!_next|.*\\..*).*)'],
};