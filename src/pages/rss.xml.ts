import rss from "@astrojs/rss";
import type { APIRoute } from "astro";
import { site } from "../data/site";
import { getTimeline } from "../lib/timeline";

export const GET: APIRoute = async (context) =>
  rss({
    title: `${site.name}'s Blog`,
    description: site.description,
    site: context.site!,
    items: (await getTimeline()).map((item) => ({
      title:
        item.kind === "project" ? item.entry.data.name : item.entry.data.title,
      description: item.entry.data.description,
      pubDate: item.entry.data.publishedAt,
      link: item.href,
    })),
    customData: "<language>en</language>",
  });
