# annewilliamson.art

Website for Anne Williamson, portrait and wildlife artist. Built with [Astro](https://astro.build), hosted on
GitHub Pages and edited through [Pages CMS](https://pagescms.org).

## Running it locally

You need Node 22.23.4 or newer.

```sh
npm install
npm run dev
npm run build
```

## Editing

Sign in to Pages CMS with GitHub, choose this repository, then use:

- **Gallery artworks** to add or change a piece (photo, section, date, medium, description).
- **Journal posts** to write a post.
- **Site settings** to open or close commissions and change the status line.

Saving commits to `main`, and GitHub Actions rebuilds the site in about a minute.

## Where things are

| What | Where |
| --- | --- |
| Artworks | `src/content/artworks/` (images in `src/assets/artworks/`) |
| Journal posts | `src/content/posts/` (images in `src/assets/posts/`) |
| Email, Instagram, Facebook, contact form, shop on/off | `src/data/site.ts` |
| Commission prices, steps, papers and FAQ | `src/data/commissions.ts` |
| Gallery sections | `src/data/categories.ts` |
| Colours and fonts | top of `src/styles/global.css` |
| CMS fields | `.pages.yml` |

## Still to fill in

Anywhere the site needs Anne's own words there's a dashed "To fill in" box
(`src/components/Placeholder.astro`). Replace the box with the real text.

- Home: the short note under the main picture.
- About: her story, the process captions and photos, and the bit about life away from the easel.
- Commissions: the prices are examples (set `pricesNote` to an empty string once they're real), plus some of the
  steps, the timescale, the small print and the FAQ answers.
- Contact: the reply time, and the email address and Facebook link in `src/data/site.ts`.
- Journal: the two sample posts.
- Artwork dates were worked out from Instagram, so some are approximate.

## Contact form

The form doesn't send anything itself. When someone presses Send it opens their email app with the message ready to
go, addressed to the email in `src/data/site.ts`. The button stays switched off until that address is filled in.

## Shop

Turn it on by setting `shopEnabled: true` in `src/data/site.ts`. The simplest way to take payments from a static
site is Stripe Payment Links: one link per print, with a "Buy" button on the shop page.
