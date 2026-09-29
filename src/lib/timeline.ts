import { getCollection } from "astro:content";
import { getPosts, postUrl } from "./posts";

export async function getTimeline() {
  const [posts, shares] = await Promise.all([
    getPosts(),
    getCollection("timeline", ({ data }) => !data.draft),
  ]);

  return [
    ...shares.map((entry) => ({
      kind: "share" as const,
      id: `share-${entry.id}`,
      href: `/#${encodeURIComponent(`share-${entry.id}`)}`,
      entry,
    })),
    ...posts.map((entry) => ({
      kind: "post" as const,
      id: `post-${entry.id}`,
      href: postUrl(entry.id),
      entry,
    })),
  ].sort(
    (a, b) =>
      b.entry.data.publishedAt.getTime() - a.entry.data.publishedAt.getTime() ||
      b.id.localeCompare(a.id),
  );
}
