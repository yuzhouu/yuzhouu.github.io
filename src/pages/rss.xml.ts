import rss from "@astrojs/rss";
import type { APIRoute } from "astro";
import { site } from "../data/site";
import { getTimeline } from "../lib/timeline";

export const GET: APIRoute = async (context) =>
  rss({
    title: `${site.name}'s Blog`,
    description: site.description,
    site: context.site!,
    items: (await getTimeline()).map(({ entry, href }) => ({
      title: entry.data.title,
      description: entry.data.description,
      pubDate: entry.data.publishedAt,
      link: href,
    })),
    customData: "<language>en</language>",
  });
