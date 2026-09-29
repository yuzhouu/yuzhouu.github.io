import { getCollection } from "astro:content";

export async function getPosts() {
  const posts = await getCollection("posts", ({ data }) => !data.draft);
  return posts.sort(
    (a, b) => b.data.publishedAt.getTime() - a.data.publishedAt.getTime(),
  );
}

export function postUrl(id: string) {
  return `/posts/${id.split("/").map(encodeURIComponent).join("/")}/`;
}

export function formatDate(date: Date, month: "long" | "short" = "long") {
  return new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month,
    day: "numeric",
    timeZone: "Asia/Shanghai",
  }).format(date);
}
