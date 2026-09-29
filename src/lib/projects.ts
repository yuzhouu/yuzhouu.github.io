import { getCollection } from "astro:content";

export async function getProjects() {
  const projects = await getCollection("projects", ({ data }) => !data.draft);
  return projects.sort(
    (a, b) => a.data.order - b.data.order || a.id.localeCompare(b.id),
  );
}
