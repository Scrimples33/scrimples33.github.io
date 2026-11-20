import rss from '@astrojs/rss';
import { getPublishedPosts } from '../lib/content';
import { site } from '../data/site';

export async function GET(context) {
  const posts = await getPublishedPosts();
  const base = import.meta.env.BASE_URL.replace(/\/$/, '');
  return rss({
    title: `${site.name}: Journal`,
    description: 'Journal posts from Anne Williamson, portrait and wildlife artist.',
    site: context.site,
    items: posts.map((post) => ({
      title: post.data.title,
      pubDate: post.data.date,
      description: post.data.summary,
      categories: post.data.tags,
      link: `${base}/journal/${post.id}/`,
    })),
    customData: '<language>en-gb</language>',
  });
}
