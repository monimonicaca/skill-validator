# Compatibility notes

## Codex

- Canonical root file: `SKILL.md`.
- Optional product metadata may live in `agents/openai.yaml`.
- Keep references relative to the skill directory.

## Claude Code

- Keep the same directory layout and markdown-first workflow.
- Use the same frontmatter fields and relative references.
- If a deployment requires lowercase `skill.md`, copy the canonical file during packaging.

## Shared subset

- One skill folder per workflow.
- One required markdown root file.
- Optional `references/`, `scripts/`, and `assets/` folders.
- No hard dependency on a platform-specific runtime feature.
