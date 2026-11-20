// Gallery tags. The list itself lives in tags.json (editable in Pages CMS as "Gallery tags");
// its order is the order of the tabs on the gallery page and the panels on the home page.
import tagList from './tags.json';

export type Tone = 'sage' | 'hen' | 'yolk' | 'sky' | 'blossom';
export interface Tag {
  id: string; // used in links, e.g. /gallery/#botanical
  label: string;
  blurb: string;
  tone: Tone;
}

const tones: Tone[] = ['sage', 'hen', 'yolk', 'sky', 'blossom'];

/** "Dying Plants " -> "dying-plants", so tag names match however they're typed. */
export function tagId(name: string): string {
  return name
    .trim()
    .toLowerCase()
    .normalize('NFKD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

type RawTag = { name?: string; description?: string; colour?: string };

const seen = new Set<string>();
export const tags: Tag[] = (tagList as RawTag[]).flatMap((t) => {
  const label = (t.name ?? '').trim();
  const id = tagId(label);
  if (!id || seen.has(id)) return [];
  seen.add(id);
  const tone = tones.includes(t.colour as Tone) ? (t.colour as Tone) : 'sage';
  return [{ id, label, blurb: (t.description ?? '').trim(), tone }];
});

/** The tag for a name typed on an artwork. A name missing from the list still works (sage, no description). */
export function findTag(name: string): Tag {
  const id = tagId(name);
  return tags.find((t) => t.id === id) ?? { id, label: name.trim(), blurb: '', tone: 'sage' };
}
