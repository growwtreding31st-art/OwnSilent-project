// Inline script that runs BEFORE React hydrates
// This prevents any flash by redirecting immediately
(function() {
  // Only run on client-side
  if (typeof window === 'undefined') return;
  
  // Get current pathname
  const pathname = window.location.pathname;
  const pathSegments = pathname.split('/').filter(Boolean);
  const firstSegment = pathSegments[0];
  
  // List of valid country slugs (must match SUPPORTED_COUNTRIES)
  const validCountries = [
    'america', 'india', 'uae', 'uk', 'australia', 'germany', 'france', 'canada',
    'russia', 'china', 'japan', 'brazil', 'italy', 'spain', 'mexico', 'south-korea',
    'netherlands', 'sweden', 'switzerland', 'singapore'
  ];
  
  // Check if already on a country-specific URL
  const hasCountryPrefix = validCountries.includes(firstSegment);
  
  // If already on a country URL, save it and exit
  if (hasCountryPrefix) {
    localStorage.setItem('detectedCountry', firstSegment);
    return;
  }
  
  // Check for cached country
  const cachedCountry = localStorage.getItem('detectedCountry');
  if (cachedCountry && validCountries.includes(cachedCountry)) {
    // Instant redirect using cached country
    const newPath = '/' + cachedCountry + pathname;
    window.location.replace(newPath);
  }
  // If no cached country, the React component will handle detection
})();
