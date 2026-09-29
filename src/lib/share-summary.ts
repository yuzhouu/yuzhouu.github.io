import { Markdoc, nodes } from "@astrojs/markdoc/config";

const blocks = new Set([
  "article",
  "blockquote",
  "div",
  "h1",
  "h2",
  "h3",
  "h4",
  "h5",
  "h6",
  "li",
  "p",
  "pre",
  "table",
  "td",
  "th",
  "tr",
]);

function textContent(node: unknown): string {
  if (typeof node === "string" || typeof node === "number") return String(node);
  if (Array.isArray(node)) return node.map(textContent).join("");
  if (!Markdoc.Tag.isTag(node)) return "";
  if (node.name === "br" || node.name === "hr") return " ";
  if (node.name === "img") return String(node.attributes.alt || "");
  const text = node.children.map(textContent).join("");
  return blocks.has(node.name) ? `${text} ` : text;
}

export function shareSummary(body: string | undefined, description?: string) {
  if (description?.trim()) return description.trim();
  if (!body?.trim()) return undefined;

  // Match the site's tokenizer, including hidden HTML comments. Transform first
  // so links, formatting and conditional tags become the text readers see.
  const tokenizer = new Markdoc.Tokenizer({ allowComments: true });
  const ast = Markdoc.parse(tokenizer.tokenize(body));
  const rendered = Markdoc.transform(ast, { tags: { image: nodes.image } });
  const text = textContent(rendered).replace(/\s+/g, " ").trim();
  const characters = Array.from(text);
  const excerpt =
    characters.length > 280
      ? `${characters.slice(0, 280).join("").trimEnd()}…`
      : text;

  // RSS descriptions may be interpreted as HTML by readers; keep automatic
  // excerpts as text even when a share discusses HTML or comparison operators.
  return excerpt
    ? excerpt.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;")
    : undefined;
}
