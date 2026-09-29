import { getCollection, type CollectionEntry } from "astro:content";
import { shareTextSummary } from "./share-summary";

export async function getMusic() {
  return getCollection(
    "timeline",
    ({ data }) => !data.draft && Boolean(data.spotifyTrackId),
  );
}

export function musicUrl(id: string) {
  return `/music/${id.split("/").map(encodeURIComponent).join("/")}/`;
}

export function musicDescription(entry: CollectionEntry<"timeline">) {
  const text = [
    entry.data.title,
    entry.data.description?.trim(),
    shareTextSummary(entry.body),
  ]
    .filter(Boolean)
    .join(" · ");
  const characters = Array.from(text);
  return characters.length > 160
    ? `${characters.slice(0, 160).join("").trimEnd()}…`
    : text;
}
