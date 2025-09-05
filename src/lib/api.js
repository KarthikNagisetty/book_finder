// Build the Open Library search URL
export function buildSearchUrl({ title, page = 1 }) {
  const base = 'https://openlibrary.org/search.json';
  const params = new URLSearchParams();
  if (title && title.trim()) params.set('title', title.trim());
  params.set('page', String(page)); // Open Library supports page-based pagination
  return `${base}?${params.toString()}`;
}

// Map raw API docs into a shape our UI expects
export function mapDocs(docs = []) {
  return docs.map(d => ({
    key: d.key, // e.g. "/works/OL82563W"
    title: d.title || 'Untitled',
    authors: d.author_name || [],
    year: d.first_publish_year || null,
    coverId: d.cover_i || null,
  }));
}

// Build cover URL if available
export function coverUrl(coverId, size = 'M') {
  // Sizes: S, M, L
  return coverId
    ? `https://covers.openlibrary.org/b/id/${coverId}-${size}.jpg`
    : null;
}