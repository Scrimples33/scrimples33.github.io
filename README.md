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

- **Gallery artworks** to add or change a piece (photo, tags, date, medium, description).
- **Gallery tags** to add, rename, recolour or reorder the gallery tabs.
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
| Gallery tags (tab order, descriptions, colours) | `src/data/tags.json` |
| Colours and fonts | top of `src/styles/global.css` |
| CMS fields | `.pages.yml` |

## Gallery tags

Each artwork has one or more tags, and each tag with at least one picture gets its own tab on the gallery page
(and a panel on the home page). Tabs follow the order of the list in **Gallery tags**; a tag with no pictures
is hidden. A picture with several tags shows under each of them. The first tag on a picture sets its colour.
Each tag can use any of 21 garden colours (picked in Pages CMS); the colours are listed in `src/data/tags.ts`.
Tag names match however they're typed ("Dying plants" = "dying plants"), and a tag used on a picture but
missing from the list still gets a tab, at the end.

## Still to fill in

Anywhere the site needs Anne's own words there's a dashed "To fill in" box
(`src/components/Placeholder.astro`). Replace the box with the real text.

- Home: the short note under the main picture.
- About: her story, the process captions and photos, and the bit about life away from the easel.
- Commissions: the prices are examples (set `pricesNote` to an empty string once they're real), plus some of the
  steps, the timescale, the small print and the FAQ answers.
- Contact: the Facebook link in `src/data/site.ts`.
- Journal: the two sample posts.
- Artwork dates were worked out from Instagram, so some are approximate.

## Contact form

The form sends through [Formspree](https://formspree.io). Put the form's address in `formEndpoint` in
`src/data/site.ts` and messages arrive by email at the address the Formspree form was set up with. If `formEndpoint`
is empty, pressing Send opens the visitor's email app with the message filled in instead.
