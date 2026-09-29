import { component, defineMarkdocConfig, nodes } from "@astrojs/markdoc/config";
import shiki from "@astrojs/markdoc/shiki";

export default defineMarkdocConfig({
  extends: [
    shiki({
      themes: { light: "github-light", dark: "github-dark" },
      defaultColor: false,
    }),
  ],
  nodes: {
    document: { ...nodes.document, render: "div" },
    heading: {
      ...nodes.heading,
      render: component("./src/components/ArticleHeading.astro"),
    },
    image: {
      ...nodes.image,
      render: component("./src/components/ArticleImage.astro"),
    },
  },
  tags: {
    image: {
      render: component("./src/components/ArticleImage.astro"),
      attributes: {
        src: { type: String, required: true },
        alt: { type: String, required: true },
        title: { type: String },
        width: { type: Number },
        height: { type: Number },
        loading: { type: String, matches: ["lazy", "eager"], default: "lazy" },
      },
    },
  },
});
