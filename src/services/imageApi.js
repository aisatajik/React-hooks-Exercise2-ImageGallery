// Image source:
// - If an Unsplash key is set in the .env file (VITE_UNSPLASH_KEY), the Unsplash API is used.
// - Otherwise the free Picsum Photos API is used (no key required).

export const PAGE_SIZE = 9;

const UNSPLASH_KEY = import.meta.env.VITE_UNSPLASH_KEY;

export const SOURCE_NAME = UNSPLASH_KEY ? "Unsplash" : "Picsum Photos";

// Both sources are converted to the same shape: { id, url, alt, author }

async function fetchFromUnsplash(page) {
  const response = await fetch(
    `https://api.unsplash.com/photos?page=${page}&per_page=${PAGE_SIZE}`,
    { headers: { Authorization: `Client-ID ${UNSPLASH_KEY}` } }
  );

  if (!response.ok) {
    throw new Error(
      response.status === 401
        ? "Invalid Unsplash API key. Please check your .env file."
        : `Failed to load images (status ${response.status}).`
    );
  }

  const data = await response.json();
  return data.map((photo) => ({
    id: photo.id,
    url: photo.urls.small,
    alt: photo.alt_description || `Photo by ${photo.user.name}`,
    author: photo.user.name,
  }));
}

async function fetchFromPicsum(page) {
  const response = await fetch(
    `https://picsum.photos/v2/list?page=${page}&limit=${PAGE_SIZE}`
  );

  if (!response.ok) {
    throw new Error(`Failed to load images (status ${response.status}).`);
  }

  const data = await response.json();
  return data.map((photo) => ({
    id: photo.id,
    url: `https://picsum.photos/id/${photo.id}/400/300`,
    alt: `Photo by ${photo.author}`,
    author: photo.author,
  }));
}

/**
 * Fetches one page (PAGE_SIZE images) from the configured source.
 */
export function fetchImages(page) {
  return UNSPLASH_KEY ? fetchFromUnsplash(page) : fetchFromPicsum(page);
}
