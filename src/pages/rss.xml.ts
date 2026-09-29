import rss from "@astrojs/rss";
import type { APIRoute } from "astro";
import { site } from "../data/site";
import { getTimeline } from "../lib/timeline";

export const GET: APIRoute = async (context) =>
  rss({
    title: site.title,
    description: site.description,
    site: context.site!,
    items: (await getTimeline()).map((item) => ({
      title:
        item.kind === "project" ? item.entry.data.name : item.entry.data.title,
      description: item.entry.data.description,
      pubDate: item.entry.data.publishedAt,
      // Absolute URLs keep the RSS generator from appending a slash to anchors.
      link: new URL(item.href, context.site!).href,
    })),
    customData: "<language>en</language>",
  });
