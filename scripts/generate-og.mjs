import { readFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const source = new URL("../src/assets/social-card.svg", import.meta.url);
const output = new URL("../public/og.png", import.meta.url);

await sharp(await readFile(source))
  .resize(1200, 630)
  .png()
  .toFile(fileURLToPath(output));
console.log("Generated public/og.png (1200 × 630).");
