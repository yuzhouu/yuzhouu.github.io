import { defineConfig } from "astro/config";
import markdoc from "@astrojs/markdoc";
import sitemap from "@astrojs/sitemap";

export default defineConfig({
  site: "https://yuzhouu.github.io",
  output: "static",
  trailingSlash: "always",
  integrations: [markdoc(), sitemap()],
});
