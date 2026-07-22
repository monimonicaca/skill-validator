#!/usr/bin/env node
"use strict";

const fs = require("node:fs");
const path = require("node:path");

const VALID_NAME = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
const ALLOWED_KEYS = new Set(["name", "description", "license", "allowed-tools", "metadata"]);

function parseFrontmatter(text) {
  const normalized = text.replace(/^\ufeff/, "");
  if (!normalized.startsWith("---\n")) {
    throw new Error("missing YAML frontmatter");
  }

  const end = normalized.indexOf("\n---\n", 4);
  if (end === -1) {
    throw new Error("invalid YAML frontmatter delimiter");
  }

  const block = normalized.slice(4, end);
  const data = {};

  for (const rawLine of block.split(/\r?\n/)) {
    const line = rawLine.replace(/\r$/, "");
    if (!line.trim() || line.trimStart().startsWith("#")) {
      continue;
    }

    const colonIndex = line.indexOf(":");
    if (colonIndex === -1) {
      throw new Error(`cannot parse line in frontmatter: ${rawLine}`);
    }

    const key = line.slice(0, colonIndex).trim();
    const value = line.slice(colonIndex + 1).trim().replace(/^['\"]|['\"]$/g, "");
    if (!/^[A-Za-z0-9_-]+$/.test(key)) {
      throw new Error(`invalid key in frontmatter: ${key}`);
    }
    data[key] = value;
  }

  return data;
}

function pickRootFile(skillDir) {
  for (const candidate of [path.join(skillDir, "SKILL.md"), path.join(skillDir, "skill.md")]) {
    if (fs.existsSync(candidate)) {
      return candidate;
    }
  }
  throw new Error("expected SKILL.md or skill.md");
}

function validate(skillDir) {
  const issues = [];

  if (!fs.existsSync(skillDir)) {
    return [`folder does not exist: ${skillDir}`];
  }
  if (!fs.statSync(skillDir).isDirectory()) {
    return [`path is not a directory: ${skillDir}`];
  }

  let rootFile;
  try {
    rootFile = pickRootFile(skillDir);
  } catch (error) {
    return [String(error.message || error)];
  }

  let frontmatter;
  try {
    frontmatter = parseFrontmatter(fs.readFileSync(rootFile, "utf8"));
  } catch (error) {
    return [`${path.basename(rootFile)}: ${error.message || error}`];
  }

  const extra = Object.keys(frontmatter)
    .filter((key) => !ALLOWED_KEYS.has(key))
    .sort();
  if (extra.length > 0) {
    issues.push(`unexpected frontmatter keys: ${extra.join(", ")}`);
  }

  const name = frontmatter.name;
  const description = frontmatter.description;
  if (typeof name !== "string" || !name.trim()) {
    issues.push("missing or invalid name");
  } else if (!VALID_NAME.test(name.trim())) {
    issues.push("name must be lowercase hyphen-case");
  }

  if (typeof description !== "string" || !description.trim()) {
    issues.push("missing or invalid description");
  }

  for (const subdir of ["references", "scripts", "assets", "agents"]) {
    const target = path.join(skillDir, subdir);
    if (fs.existsSync(target) && !fs.statSync(target).isDirectory()) {
      issues.push(`${subdir} exists but is not a directory`);
    }
  }

  if (typeof name === "string" && name.trim()) {
    if (path.basename(skillDir).toLowerCase() !== name.trim().toLowerCase()) {
      issues.push(`folder name '${path.basename(skillDir)}' does not match skill name '${name.trim()}'`);
    }
  }

  return issues;
}

function main() {
  const skillDir = process.argv[2];
  if (!skillDir) {
    console.error("Usage: validate_skill.js <skill_dir>");
    return 1;
  }

  const issues = validate(path.resolve(skillDir));
  if (issues.length > 0) {
    for (const issue of issues) {
      console.log(`FAIL: ${issue}`);
    }
    return 1;
  }

  console.log("PASS: skill structure looks valid");
  return 0;
}

if (require.main === module) {
  process.exitCode = main();
}
