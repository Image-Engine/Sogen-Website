import {
  fetchArticleByHandle,
  fetchCollectionByHandle,
  fetchProducts,
} from "../src/lib/shopify";
import { buildLinkInventory } from "../src/test/linkInventory";
import {
  BLOG_SITE_URL,
  extractFaqBlogHandles,
  getAllHardcodedCollectionHandles,
} from "../src/test/hardcodedHandles";

interface CheckResult {
  path: string;
  status: "ok" | "broken" | "orphan";
  detail?: string;
}

async function checkCollections(handles: string[]): Promise<CheckResult[]> {
  const results: CheckResult[] = [];
  for (const handle of handles) {
    const path = `/collections/${handle}`;
    const collection = await fetchCollectionByHandle(handle, 1);
    results.push({
      path,
      status: collection ? "ok" : "broken",
      detail: collection ? collection.title : "collection not found in Shopify",
    });
  }
  return results;
}

async function checkBlogArticles(handles: string[]): Promise<CheckResult[]> {
  const results: CheckResult[] = [];
  for (const handle of handles) {
    const path = `${BLOG_SITE_URL}/FAQ/${handle}`;
    const article = await fetchArticleByHandle("FAQ", handle);
    results.push({
      path,
      status: article ? "ok" : "broken",
      detail: article ? article.title : "article not found in Shopify",
    });
  }
  return results;
}

function formatSection(title: string, results: CheckResult[]): string {
  const lines = [`## ${title}`, ""];
  if (results.length === 0) {
    lines.push("_None_", "");
    return lines.join("\n");
  }
  for (const r of results) {
    const icon = r.status === "ok" ? "OK" : r.status === "orphan" ? "ORPHAN" : "BROKEN";
    lines.push(`- [${icon}] \`${r.path}\`${r.detail ? ` — ${r.detail}` : ""}`);
  }
  lines.push("");
  return lines.join("\n");
}

async function main() {
  const inventory = buildLinkInventory();
  const collectionHandles = getAllHardcodedCollectionHandles();
  const blogHandles = extractFaqBlogHandles();

  console.log("# Link Health Report\n");
  console.log(`Generated: ${new Date().toISOString()}\n`);

  const orphanResults: CheckResult[] = inventory.orphans.map((o) => ({
    path: o.path,
    status: "orphan" as const,
    detail: o.sourceFile,
  }));

  const collectionResults = await checkCollections(collectionHandles);
  const blogResults = await checkBlogArticles(blogHandles);

  const products = await fetchProducts(1);
  const productResult: CheckResult = {
    path: products[0] ? `/product/${products[0].node.handle}` : "/product/{handle}",
    status: products[0] ? "ok" : "broken",
    detail: products[0] ? products[0].node.title : "no products returned",
  };

  console.log(formatSection("Static internal links", inventory.staticLinks.map((p) => ({ path: p, status: "ok" as const }))));
  console.log(formatSection("Orphan links (no matching route)", orphanResults));
  console.log(formatSection("Hardcoded collection links (live Shopify)", collectionResults));
  console.log(formatSection("FAQ blog article links (live Shopify)", blogResults));
  console.log(formatSection("Sample product link (live Shopify)", [productResult]));

  const broken = [
    ...orphanResults,
    ...collectionResults,
    ...blogResults,
    productResult,
  ].filter((r) => r.status !== "ok");

  if (broken.length > 0) {
    console.log(`\n**${broken.length} issue(s) found.**\n`);
    process.exit(1);
  }

  console.log("\n**All checks passed.**\n");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
