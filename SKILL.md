---
name: skill-validator
description: Validate skill folders by checking directory placement, SKILL.md frontmatter, Codex/Claude compatibility, and a representative real-task example before packaging or sharing.
---

# Skill Validator

Validate a skill in three passes: location, format, then a real-task rehearsal.

## Use this skill when

- A skill was just created or edited.
- You need to confirm the folder is in the right place.
- You want one validation flow that works for Codex and Claude Code.

## Validation order

1. Confirm the target folder exists and is the intended skill root.
2. Confirm the root file exists and the layout is complete.
3. Confirm `SKILL.md` is valid and portable.
4. Run one representative task prompt through the skill.
5. Fix issues and repeat until the skill behaves correctly.

## Location check

- Treat the skill root as the folder that contains the primary skill file.
- Confirm the folder name matches the skill name when the deployment expects that convention.
- Confirm all referenced files are present at relative paths.

## Format check

- Require `name` and `description` in YAML frontmatter.
- Keep the `name` lowercase, hyphen-case, and stable across platforms.
- Keep the description specific enough to trigger the skill on the right task.
- Keep markdown body instructions imperative and concise.

## Cross-platform compatibility

- Keep the markdown body free of platform-specific syntax unless a reference file explains it.
- Prefer relative links and plain markdown headings.
- Use `SKILL.md` as the canonical file.
- For a target runtime that expects lowercase `skill.md`, mirror the same content during packaging.
- Keep Codex-specific metadata optional and isolated in `agents/openai.yaml`.

## Real-task rehearsal

- Use one concrete prompt that looks like a normal user request.
- Run the skill against that prompt with minimal extra context.
- Check whether the skill is actually selected or followed.
- Check whether the output matches the skill’s stated workflow.
- If it fails, adjust the description or the workflow instructions before testing again.

## Reporting

- Report `pass`, `warn`, or `fail` for each pass.
- Explain only the smallest fix needed to make the next run succeed.
- Save any reusable test prompts in `references/`.

## Resources

- `references/workflow.md` for the canonical checklist.
- `references/compatibility.md` for Codex and Claude packaging rules.
- `references/example-prompts.md` for repeatable test prompts.
- `scripts/validate_skill.py` for automated structure checks.