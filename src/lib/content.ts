import { getCollection, type CollectionEntry } from 'astro:content';
import { categories, type CategoryId } from '../data/categories';
import settingsJson from '../data/settings.json';
import { withBase } from './url';

export type Post = CollectionEntry<'posts'>;
export type Artwork = CollectionEntry<'artworks'>;
export type Availability = Artwork['data']['availability'];

/** Human labels for artwork availability ('nfs' is never shown as a badge). */
export const availabilityLabels: Record<Availability, string> = {
  available: 'Original available',
  sold: 'Sold',
  commission: 'Private commission',
  nfs: 'Not for sale',
};

/** Editable site settings (src/data/settings.json, editable in Pages CMS). */
export const settings: { commissionsOpen: boolean; commissionsNote: string } = settingsJson;

/** Published journal posts, newest first (drafts hidden in production, future dates hidden). */
export async function getPublishedPosts(): Promise<Post[]> {
  const now = new Date();
  const posts = await getCollection('posts', ({ data }) => {
    if (import.meta.env.PROD && data.draft) return false;
    return data.date <= now;
  });
  return posts.sort((a, b) => b.data.date.valueOf() - a.data.date.valueOf());
}

/** All artworks, newest first. */
export async function getArtworks(): Promise<Artwork[]> {
  const works = await getCollection('artworks');
  return works.sort((a, b) => b.data.date.valueOf() - a.data.date.valueOf());
}

/** Artworks in one category, newest first. */
export async function getArtworksInCategory(id: CategoryId): Promise<Artwork[]> {
  return (await getArtworks()).filter((a) => a.data.category === id);
}

/**
 * Every category (in the order of src/data/categories.ts) with its artworks, newest first.
 * Categories with no artworks are included with an empty list.
 */
export async function getArtworksByCategory() {
  const works = await getArtworks();
  return categories.map((category) => ({
    ...category,
    artworks: works.filter((a) => a.data.category === category.id),
  }));
}

/** Featured artworks, newest first. */
export async function getFeaturedArtworks(): Promise<Artwork[]> {
  return (await getArtworks()).filter((a) => a.data.featured);
}

/** Journal post URL (with base path). */
export const postUrl = (post: Post) => withBase(`/journal/${post.id}/`);

/** Gallery deep link that opens the lightbox on this artwork (with base path). */
export const artworkUrl = (artwork: Artwork) => withBase(`/gallery/#art-${artwork.id}`);
