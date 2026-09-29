import { getCollection } from "astro:content";
import { getPosts, postUrl } from "./posts";
import { getProjects } from "./projects";

export async function getTimeline() {
  const [posts, shares, projects] = await Promise.all([
    getPosts(),
    getCollection("timeline", ({ data }) => !data.draft),
    getProjects(),
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
    ...projects.map((entry) => ({
      kind: "project" as const,
      id: `project-${entry.id}`,
      href: entry.data.href,
      entry,
    })),
  ].sort(
    (a, b) =>
      b.entry.data.publishedAt.getTime() - a.entry.data.publishedAt.getTime() ||
      b.id.localeCompare(a.id),
  );
}
