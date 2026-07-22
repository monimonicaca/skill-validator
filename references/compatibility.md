# Compatibility notes

## Codex

- Canonical root file: `SKILL.md`.
- Optional product metadata may live in `agents/openai.yaml`.
- Keep references relative to the skill directory.
- Use `scripts/validate_skill.js` for the JS-based structural check.

## Claude Code

- Keep the same directory layout and markdown-first workflow.
- Use the same frontmatter fields and relative references.
- If a deployment requires lowercase `skill.md`, copy the canonical file during packaging.
- The JS validator should stay dependency-free and use Node core modules only.

## Shared subset

- One skill folder per workflow.
- One required markdown root file.
- Optional `references/`, `scripts/`, and `assets/` folders.
- No hard dependency on a platform-specific runtime feature.
- Best-practice checks should stay in plain markdown so they work across runtimes.