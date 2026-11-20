// Everything on the Commissions page lives here, so Anne's prices and wording
// are easy to change without touching the page itself.
//
// HOW TO EDIT
// - Words: change anything between the quote marks. Keep the quote marks and
//   the comma at the end of the line.
// - Prices: change the numbers (no £ sign, no quote marks).
// - The price estimator reads from `pricing` below, so a price only ever needs
//   changing in one place.
//
// !!! EVERY PRICE IN THIS FILE IS A PLACEHOLDER until Anne confirms her real ones. !!!
// The page shows an "Example prices – to be confirmed" note (see `pricesNote`)
// next to the estimator. Once the prices are real, set it to ''.
//
// PLACEHOLDERS FOR ANNE'S WORDS
// Anywhere you see `prompt: '...'` (instead of `text` or `a`), the site shows a dashed
// "To fill in" box with that prompt. To fill it in, replace `prompt` with `text` (steps)
// or `a` (questions) and write the real wording.

export const pricesNote = 'Example prices – to be confirmed.';

// ---------------------------------------------------------------------------
// How it works: the five steps, in order.
// ---------------------------------------------------------------------------
export const steps: { title: string; text?: string; prompt?: string }[] = [
  {
    title: 'Get in touch',
    text: 'Say who or what you would like drawn, and roughly the size and medium you have in mind.',
  },
  {
    title: 'Send photos',
    text: 'Send a few reference photos of your subject.',
    prompt: 'What makes a good reference photo: good quality, in good light, from different angles, and so on.',
  },
  {
    title: 'Quote',
    prompt: 'How quotes, deposits and payment work.',
  },
  {
    title: 'Drawing',
    prompt: 'What happens while the piece is being drawn (progress photos?).',
  },
  {
    title: 'Delivery',
    prompt: 'How finished pieces are posted or collected.',
  },
];

// ---------------------------------------------------------------------------
// PRICING (one object drives the estimator).
// All prices are in pounds. PLACEHOLDER prices throughout.
//
// How a price is worked out:
//   1. Start with the size price (one head study, colour pencil).
//   2. Full body multiplies that by 1.4.
//   3. Each extra subject adds 60% of the price from step 2.
//   4. Watercolour multiplies steps 1–3 by 0.9 (10% less).
//   5. Add the surface extra, the background extra and the frame price for that size.
//   6. Round to the nearest £10.
// ---------------------------------------------------------------------------
export const pricing: Pricing = {
  // The two media. `multiplier` 1 = normal price; 0.9 = 10% less.
  media: [
    {
      id: 'pencil',
      label: 'Colour pencil',
      multiplier: 1, // PLACEHOLDER
      text: 'The main medium. Pencils: Faber-Castell Polychromos, Derwent Lightfast, Caran d’Ache Luminance and Pablo.',
    },
    {
      id: 'watercolour',
      label: 'Watercolour',
      multiplier: 0.9, // PLACEHOLDER
      text: 'Watercolour commissions are also available, painted on Strathmore hot-pressed watercolour paper.',
    },
  ],

  // The three surfaces. `extra` is added to the price. `suits` lists which
  // media can be used on it ('pencil', 'watercolour'); the estimator only
  // offers a surface when it suits the chosen medium.
  surfaces: [
    {
      id: 'board',
      label: 'Pastelmat board',
      extra: 0, // PLACEHOLDER
      suits: ['pencil'],
      text: 'Pastelmat, a pastel board with a fine tooth.',
    },
    {
      id: 'vellum',
      label: 'Bristol vellum',
      extra: 0, // PLACEHOLDER
      suits: ['pencil'],
      text: 'Bristol vellum, a smooth drawing paper.',
    },
    {
      id: 'film',
      label: 'Grafix film',
      extra: 30, // PLACEHOLDER
      suits: ['pencil'],
      text: 'Grafix drafting film, a smooth, slightly translucent film.',
    },
    {
      id: 'paper',
      label: 'Watercolour paper',
      inSentence: 'watercolour paper', // how it reads mid-sentence (brand names keep their capitals)
      extra: 0, // PLACEHOLDER
      suits: ['pencil', 'watercolour'],
      text: 'Strathmore hot-pressed watercolour paper.',
    },
  ],

  // Sizes. `base` = price for ONE head study in colour pencil.
  sizes: [
    { id: 'a5', label: 'A5', dimensions: '148 × 210 mm', base: 180 }, // PLACEHOLDER
    { id: 'a4', label: 'A4', dimensions: '210 × 297 mm', base: 270 }, // PLACEHOLDER
    { id: 'a3', label: 'A3', dimensions: '297 × 420 mm', base: 420 }, // PLACEHOLDER
  ],

  // Subject types. `multiplier` is applied to the size price.
  subjects: [
    { id: 'head', label: 'Head study', multiplier: 1 }, // PLACEHOLDER
    { id: 'full', label: 'Full body', multiplier: 1.4 }, // PLACEHOLDER
  ],

  // Each subject after the first adds this share of the single-subject price.
  // 0.6 = 60%.
  additionalSubject: 0.6, // PLACEHOLDER
  maxSubjects: 5,

  // Backgrounds. `extra` is added to the price.
  backgrounds: [
    { id: 'none', label: 'None', extra: 0 }, // PLACEHOLDER
    { id: 'simple', label: 'Simple', extra: 50 }, // PLACEHOLDER
    { id: 'detailed', label: 'Detailed', extra: 90 }, // PLACEHOLDER
  ],

  // Frames. `prices` gives the frame price for each size id (a5, a4, a3).
  frames: [
    { id: 'none', label: 'No frame', prices: { a5: 0, a4: 0, a3: 0 } },
    { id: 'framed', label: 'Mounted and framed', prices: { a5: 40, a4: 60, a3: 90 } }, // PLACEHOLDER
  ],

  // Prices are rounded to the nearest this many pounds.
  roundTo: 10,

  // What the estimator shows first.
  defaults: {
    medium: 'pencil',
    surface: 'board',
    size: 'a4',
    subject: 'head',
    count: 1,
    background: 'none',
    frame: 'none',
  },
};

// ---------------------------------------------------------------------------
// Frequently asked questions. `q` = question, `a` = answer.
// `prompt` instead of `a` shows a "To fill in" box: swap it for `a: '...'` with the real answer.
// ---------------------------------------------------------------------------
export const faqs: { q: string; a?: string; prompt?: string }[] = [
  { q: 'What photos do you need?', prompt: 'What makes a good reference photo.' },
  { q: 'How long will it take?', prompt: 'A typical timescale.' },
  { q: 'Can you work from an old or blurry photo?', prompt: 'Your answer.' },
  { q: 'Do you frame the artwork?', prompt: 'Framing, yes or no.' },
  { q: 'How do deposits and payment work?', prompt: 'Deposit and payment details.' },
  { q: 'Do you post overseas?', prompt: 'UK and overseas postage.' },
  { q: 'Can I give a commission as a gift?', prompt: 'Gifts and vouchers.' },
  { q: 'Can I see progress along the way?', prompt: 'Whether you send progress photos.' },
];

// ===========================================================================
// You don't need to edit anything below this line.
// ===========================================================================

export type MediumId = 'pencil' | 'watercolour';

export interface Pricing {
  media: { id: MediumId; label: string; multiplier: number; text: string }[];
  surfaces: { id: string; label: string; inSentence?: string; extra: number; suits: MediumId[]; text: string }[];
  sizes: { id: string; label: string; dimensions: string; base: number }[];
  subjects: { id: string; label: string; multiplier: number }[];
  additionalSubject: number;
  maxSubjects: number;
  backgrounds: { id: string; label: string; extra: number }[];
  frames: { id: string; label: string; prices: Record<string, number> }[];
  roundTo: number;
  defaults: Choice;
}

export interface Choice {
  medium: string;
  surface: string;
  size: string;
  subject: string;
  count: number;
  background: string;
  frame: string;
}

export interface Estimate {
  total: number;
  /** The choices, one per line ("Medium: Colour pencil"), for the contact form's message. */
  summary: string;
}

/** "£1,250" */
export const formatPrice = (n: number) => `£${Math.round(n).toLocaleString('en-GB')}`;

/** Surfaces that suit a medium, in the order listed above. */
export function surfacesFor(p: Pricing, medium: string) {
  return p.surfaces.filter((s) => s.suits.includes(medium as MediumId));
}

/** How a surface reads mid-sentence: "Grafix film", "watercolour paper". */
export const surfaceText = (s: { label: string; inSentence?: string }) => s.inSentence ?? s.label;

/**
 * Work out a price from the pricing rules above. Used on the server for the
 * first render and in the browser for the estimator (same function, same numbers).
 */
export function estimate(p: Pricing, choice: Choice): Estimate {
  const find = <T extends { id: string }>(list: T[], id: string) => list.find((x) => x.id === id) ?? list[0];
  const medium = find(p.media, choice.medium);
  const suitable = surfacesFor(p, medium.id);
  const surface = suitable.find((s) => s.id === choice.surface) ?? suitable[0] ?? p.surfaces[0];
  const size = find(p.sizes, choice.size);
  const subject = find(p.subjects, choice.subject);
  const background = find(p.backgrounds, choice.background);
  const frame = find(p.frames, choice.frame);
  const framePrice = frame.prices[size.id] ?? 0;
  const count = Math.min(p.maxSubjects, Math.max(1, Math.round(Number(choice.count) || 1)));

  const single = size.base * subject.multiplier;
  const more = single * p.additionalSubject * (count - 1);
  const artwork = (single + more) * medium.multiplier;
  const raw = artwork + surface.extra + background.extra + framePrice;
  const total = Math.round(raw / p.roundTo) * p.roundTo;

  const summary = [
    `Medium: ${medium.label}`,
    `Surface: ${surface.label}`,
    `Size: ${size.label}`,
    `Subject: ${subject.label}`,
    `Number of subjects: ${count}`,
    `Background: ${background.label}`,
    `Frame: ${frame.label}`,
    `Estimate: from ${formatPrice(total)}`,
  ].join('\n');

  return { total, summary };
}
