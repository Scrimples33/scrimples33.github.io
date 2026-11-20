export const categories = [
  {
    id: 'botanical',
    label: 'Botanical',
    blurb: 'Plants and flowers.',
  },
  {
    id: 'portraits',
    label: 'Portraits',
    blurb: 'Portraits of people.',
  },
  {
    id: 'pets',
    label: 'Pets',
    blurb: 'Pet portraits.',
  },
  {
    id: 'wildlife',
    label: 'Wildlife',
    blurb: 'Wild animals.',
  },
] as const;

export type CategoryId = (typeof categories)[number]['id'];
export const categoryIds = categories.map((c) => c.id) as [CategoryId, ...CategoryId[]];
