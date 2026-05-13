#!/usr/bin/env node

// Validates the markdown files in the news/ directory before they reach the
// rocky-linux/rockylinux.org website's build. The website clones this repo's
// news/ at build time, so a malformed frontmatter block or missing required
// field would fail the production deploy. This script is the gate that runs
// on PRs (and on push to main as a safety net) so editors get immediate
// feedback and broken content can't merge.
//
// Usage: node scripts/validate-news-content.mjs [news-dir]
//
// Rules:
//   - YAML frontmatter block (--- ... ---) must be present and parseable.
//   - `title` must be a non-empty string.
//   - `date` must be present and parseable as a date.
//   - Filename (without `.md`) must be a URL-safe slug: alphanumerics
//     separated by single hyphens, e.g. `rocky-linux-9-ga`. Mixed case is
//     allowed for backward compatibility with already-published posts, but
//     new posts should prefer all-lowercase.
//
// Emits GitHub Actions error annotations when GITHUB_ACTIONS=true so problems
// surface inline on PR diffs. Exits 0 with a count on success, 1 with a
// per-file list on failure.

import { readdirSync, readFileSync, statSync } from "node:fs";
import { basename, join, relative, resolve } from "node:path";

import matter from "gray-matter";

const NEWS_DIR = resolve(process.argv[2] ?? "news");
const IS_GH_ACTIONS = process.env.GITHUB_ACTIONS === "true";
const REPO_ROOT = process.env.GITHUB_WORKSPACE ?? process.cwd();

const log = (msg) => console.log(`[validate-news] ${msg}`);
const err = (msg) => console.error(`[validate-news] ${msg}`);

const annotate = (filePath, msg) => {
  if (IS_GH_ACTIONS) {
    // Paths in annotations should be repo-relative so GitHub can render them
    // inline on the PR diff view.
    const repoRelative = relative(REPO_ROOT, filePath);
    const escaped = msg
      .replace(/%/g, "%25")
      .replace(/\r/g, "%0D")
      .replace(/\n/g, "%0A");
    console.log(`::error file=${repoRelative}::${escaped}`);
  }
  err(`  - ${basename(filePath)}: ${msg}`);
};

const SLUG_RE = /^[A-Za-z0-9]+(?:-[A-Za-z0-9]+)*$/;

const validateDate = (value) => {
  if (value === undefined || value === null || value === "") {
    return "`date` is missing";
  }
  if (value instanceof Date) {
    return Number.isNaN(value.getTime())
      ? "`date` parsed to Invalid Date — check the YAML format"
      : null;
  }
  if (typeof value === "string") {
    return Number.isNaN(Date.parse(value))
      ? `\`date\` is not a parseable date (got "${value}")`
      : null;
  }
  return `\`date\` must be a string or date, got ${typeof value}`;
};

const validateFile = (path) => {
  const filename = basename(path);
  const slug = filename.replace(/\.md$/, "");
  const problems = [];

  if (!SLUG_RE.test(slug)) {
    problems.push(
      `filename must be alphanumeric and hyphen-separated (got "${filename}")`,
    );
  }

  const content = readFileSync(path, "utf8");
  let parsed;
  try {
    parsed = matter(content);
  } catch (e) {
    problems.push(`frontmatter parse error: ${e.message}`);
    return problems;
  }

  const { data } = parsed;
  if (typeof data !== "object" || data === null || Array.isArray(data)) {
    problems.push("frontmatter is missing or not an object");
    return problems;
  }

  if (
    !data.title ||
    typeof data.title !== "string" ||
    data.title.trim() === ""
  ) {
    problems.push("`title` is missing or not a non-empty string");
  }

  const dateProblem = validateDate(data.date);
  if (dateProblem) problems.push(dateProblem);

  return problems;
};

let stats;
try {
  stats = statSync(NEWS_DIR);
} catch {
  err(`directory not found: ${NEWS_DIR}`);
  process.exit(1);
}
if (!stats.isDirectory()) {
  err(`not a directory: ${NEWS_DIR}`);
  process.exit(1);
}

const files = readdirSync(NEWS_DIR)
  .filter((f) => f.endsWith(".md"))
  .map((f) => join(NEWS_DIR, f))
  .sort();

if (files.length === 0) {
  log(`no .md files found in ${NEWS_DIR} — nothing to validate.`);
  process.exit(0);
}

let totalProblems = 0;
for (const path of files) {
  const problems = validateFile(path);
  if (problems.length > 0) {
    totalProblems += problems.length;
    for (const p of problems) annotate(path, p);
  }
}

if (totalProblems > 0) {
  err(
    `${totalProblems} validation problem(s) across ${files.length} file(s) in ${NEWS_DIR}.`,
  );
  process.exit(1);
}

log(`${files.length} file(s) OK in ${NEWS_DIR}.`);
