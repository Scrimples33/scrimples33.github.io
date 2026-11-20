// Gallery tags. The list itself lives in tags.json (editable in Pages CMS as "Gallery tags");
// its order is the order of the tabs on the gallery page and the panels on the home page.
import tagList from './tags.json';

// Colours a tag can have. The first five are the site's own; the rest are extra garden colours whose
// CSS lives in global.css (between the tag-palette markers). Keep this list, those rules and the
// colour options in .pages.yml in step. 'motif' is the small drawing beside the tag on the gallery page.
export type Motif = 'sprig' | 'feather' | 'egg' | 'leaf' | 'flower';
export const palette: { id: string; label: string; motif: Motif }[] = [
  { id: 'sage', label: 'Sage green', motif: 'sprig' },
  { id: 'hen', label: 'Hen russet', motif: 'feather' },
  { id: 'yolk', label: 'Egg-yolk yellow', motif: 'egg' },
  { id: 'sky', label: 'Duck-egg blue', motif: 'leaf' },
  { id: 'blossom', label: 'Blossom pink', motif: 'flower' },
  { id: 'moss', label: 'Moss green', motif: 'sprig' },
  { id: 'fern', label: 'Fern green', motif: 'sprig' },
  { id: 'mint', label: 'Mint', motif: 'leaf' },
  { id: 'teal', label: 'Teal', motif: 'leaf' },
  { id: 'cornflower', label: 'Cornflower blue', motif: 'flower' },
  { id: 'lavender', label: 'Lavender', motif: 'flower' },
  { id: 'heather', label: 'Heather purple', motif: 'flower' },
  { id: 'rose', label: 'Rose red', motif: 'flower' },
  { id: 'poppy', label: 'Poppy red', motif: 'flower' },
  { id: 'apricot', label: 'Apricot', motif: 'egg' },
  { id: 'marigold', label: 'Marigold orange', motif: 'flower' },
  { id: 'mustard', label: 'Mustard', motif: 'egg' },
  { id: 'bark', label: 'Bark brown', motif: 'feather' },
  { id: 'chestnut', label: 'Chestnut', motif: 'feather' },
  { id: 'slate', label: 'Slate grey', motif: 'feather' },
  { id: 'stone', label: 'Stone', motif: 'egg' },
];
export type Tone = string;
export interface Tag {
  id: string; // used in links, e.g. /gallery/#botanical
  label: string;
  blurb: string;
  tone: Tone;
}

const tones = palette.map((p) => p.id);

/** The small drawing that goes with a colour. */
export const toneMotif = (tone: Tone): Motif => palette.find((p) => p.id === tone)?.motif ?? 'sprig';

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
  const tone = t.colour && tones.includes(t.colour) ? t.colour : 'sage';
  return [{ id, label, blurb: (t.description ?? '').trim(), tone }];
});

/** The tag for a name typed on an artwork. A name missing from the list still works (sage, no description). */
export function findTag(name: string): Tag {
  const id = tagId(name);
  return tags.find((t) => t.id === id) ?? { id, label: name.trim(), blurb: '', tone: 'sage' };
}
