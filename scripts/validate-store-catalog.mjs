import path from "node:path";
import { fileURLToPath } from "node:url";
import { readJson, validateCatalog } from "./store-catalog-lib.mjs";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const catalogPath = process.argv[2]
  ? path.resolve(process.argv[2])
  : path.join(root, "public", "data", "store", "catalog.json");
const catalog = await readJson(catalogPath);
const extraHosts = (process.env.STORE_ALLOWED_DOWNLOAD_HOSTS || "").split(",");
const errors = validateCatalog(catalog, { extraHosts });

if (errors.length) {
  console.error(`Store Catalog validation failed:\n- ${errors.join("\n- ")}`);
  process.exit(1);
}

console.log(`Store Catalog validation passed: ${catalog.tools.length} tool(s).`);
