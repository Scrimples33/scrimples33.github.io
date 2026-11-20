import { getCollection, type CollectionEntry } from 'astro:content';
import { tags, findTag, type Tag } from '../data/tags';
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

/** An artwork's tags (duplicates removed), in the order they were typed. The first is its main tag. */
export function artworkTags(artwork: Artwork): Tag[] {
  const out: Tag[] = [];
  for (const name of artwork.data.tags) {
    const tag = findTag(name);
    if (tag.id && !out.some((t) => t.id === tag.id)) out.push(tag);
  }
  return out;
}

/** The tag that sets an artwork's colour (its first tag). */
export const mainTag = (artwork: Artwork): Tag => artworkTags(artwork)[0] ?? findTag('Gallery');

/**
 * Every tag that has at least one artwork, with those artworks (newest first).
 * Order: the tag list in src/data/tags.json, then any tag used on an artwork but missing
 * from the list (alphabetically). Tags with no artworks are left out.
 */
export async function getArtworksByTag(): Promise<(Tag & { artworks: Artwork[] })[]> {
  const works = await getArtworks();
  const used = new Map<string, Tag>();
  for (const w of works) for (const t of artworkTags(w)) if (!used.has(t.id)) used.set(t.id, t);
  const listed = tags.filter((t) => used.has(t.id));
  const extra = [...used.values()]
    .filter((t) => !tags.some((l) => l.id === t.id))
    .sort((a, b) => a.label.localeCompare(b.label));
  return [...listed, ...extra].map((tag) => ({
    ...tag,
    artworks: works.filter((w) => artworkTags(w).some((t) => t.id === tag.id)),
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
