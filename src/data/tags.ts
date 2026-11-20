// Gallery tags. The list itself lives in tags.json (editable in Pages CMS as "Gallery tags");
// its order is the order of the tabs on the gallery page and the panels on the home page.
import tagList from './tags.json';

// Colours a tag can have. The first five are the site's own; the rest are extra garden colours whose
// CSS lives in global.css (between the tag-palette markers). Keep this list, those rules and the
// colour options in .pages.yml in step. 'motif' is the small drawing beside the tag on the gallery page.
export type Motif = 'sprig' | 'feather' | 'egg' | 'leaf' | 'flower';
export const palette: { id: string; label: string; hex: string; motif: Motif }[] = [
  { id: 'sage', label: 'Sage green', hex: '#7E9A72', motif: 'sprig' },
  { id: 'hen', label: 'Hen russet', hex: '#B5653A', motif: 'feather' },
  { id: 'yolk', label: 'Egg-yolk yellow', hex: '#D9A441', motif: 'egg' },
  { id: 'sky', label: 'Duck-egg blue', hex: '#5E9FA0', motif: 'leaf' },
  { id: 'blossom', label: 'Blossom pink', hex: '#D58A94', motif: 'flower' },
  { id: 'moss', label: 'Moss green', hex: '#6F7F3A', motif: 'sprig' },
  { id: 'fern', label: 'Fern green', hex: '#4F8A5B', motif: 'sprig' },
  { id: 'mint', label: 'Mint', hex: '#6FB3A0', motif: 'leaf' },
  { id: 'teal', label: 'Teal', hex: '#2F8A86', motif: 'leaf' },
  { id: 'cornflower', label: 'Cornflower blue', hex: '#5B7FC0', motif: 'flower' },
  { id: 'lavender', label: 'Lavender', hex: '#9A88C4', motif: 'flower' },
  { id: 'heather', label: 'Heather purple', hex: '#8E5A86', motif: 'flower' },
  { id: 'rose', label: 'Rose red', hex: '#B84A5A', motif: 'flower' },
  { id: 'poppy', label: 'Poppy red', hex: '#D2553A', motif: 'flower' },
  { id: 'apricot', label: 'Apricot', hex: '#E09A5B', motif: 'egg' },
  { id: 'marigold', label: 'Marigold orange', hex: '#E07B28', motif: 'flower' },
  { id: 'mustard', label: 'Mustard', hex: '#C4A93A', motif: 'egg' },
  { id: 'bark', label: 'Bark brown', hex: '#8A6A4A', motif: 'feather' },
  { id: 'chestnut', label: 'Chestnut', hex: '#9B4F2E', motif: 'feather' },
  { id: 'slate', label: 'Slate grey', hex: '#6E7780', motif: 'feather' },
  { id: 'stone', label: 'Stone', hex: '#A39A88', motif: 'egg' },
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
