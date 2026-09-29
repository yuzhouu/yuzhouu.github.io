import rss from "@astrojs/rss";
import type { APIRoute } from "astro";
import { site } from "../data/site";
import { getPosts, postUrl } from "../lib/posts";

export const GET: APIRoute = async (context) =>
  rss({
    title: `${site.name}'s Blog`,
    description: site.description,
    site: context.site!,
    items: (await getPosts()).map((post) => ({
      title: post.data.title,
      description: post.data.description,
      pubDate: post.data.publishedAt,
      link: postUrl(post.id),
    })),
    customData: "<language>en</language>",
  });
