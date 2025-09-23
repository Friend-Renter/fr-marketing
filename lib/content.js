import fs from "fs";
import path from "path";

const citiesDir = path.join(process.cwd(), "content", "cities");

export function getCitySlugs() {
  return fs
    .readdirSync(citiesDir)
    .filter((f) => f.endsWith(".json") && !f.startsWith("_")) // ignore _list.json
    .map((f) => f.replace(/\.json$/, ""));
}

export function getCityContent(slug) {
  try {
    const p = path.join(citiesDir, `${slug}.json`);
    const raw = fs.readFileSync(p, "utf8");
    return JSON.parse(raw);
  } catch {
    return null;
  }
}
