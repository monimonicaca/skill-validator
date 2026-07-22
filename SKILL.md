---
name: skill-validator
description: Validate skill folders by checking format, triggerability, workflow completeness, executability, ambiguity, test coverage, and Skill best practices.
---

# Skill Validator

Validate a skill in layered passes: structure, triggerability, workflow quality, and best-practice alignment.
Use `scripts/validate_skill.js` for the structural check, then review the skill content against the checklist below.

## Use this skill when

- A skill was just created or edited.
- You need to confirm the folder is in the right place.
- You want one validation flow that works for Codex and Claude Code.
- You want a Node.js-based validator.

## Validation order

1. Confirm the target folder exists and is the intended skill root.
2. Confirm `SKILL.md` or `skill.md` exists at the root.
3. Run `node scripts/validate_skill.js <skill_dir>` to check structure and frontmatter.
4. Review the skill against the 7 quality checks below.
5. Run one representative task prompt through the skill.
6. Fix issues and repeat until the skill behaves correctly.

## Validation checklist

1. **Format correctness**
   - Confirm frontmatter parses and includes required fields.
   - Confirm `name` is lowercase hyphen-case.
   - Confirm the folder name matches the skill name when required.

2. **Triggerability**
   - Check whether the description is specific enough to select the skill for the intended request.
   - Confirm the wording matches the user intents the skill should catch.

3. **Workflow completeness**
   - Confirm the instructions cover the full end-to-end flow.
   - Confirm the user can follow the skill from start to finish without hidden steps.

4. **Executability**
   - Confirm each instruction can be performed as written.
   - Flag vague verbs, missing inputs, or unsupported actions.

5. **Ambiguity**
   - Look for instructions that can be interpreted in more than one way.
   - Prefer specific nouns, measurable outcomes, and explicit ordering.

6. **Test cases**
   - Confirm the skill includes at least one realistic rehearsal prompt.
   - Confirm the prompt reflects normal user wording, not only idealized wording.

7. **Skill best practices**
   - Keep instructions concise, imperative, and portable.
   - Prefer relative links and plain markdown.
   - Keep platform-specific details isolated to reference files.

## JavaScript workflow

- Use `scripts/validate_skill.js` as the canonical automated check.
- Run it with Node and a single skill directory argument.
- Keep the script dependency-free so it works inside the skill package.
- Prefer Node core modules for file and path checks.

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
- Check whether the output matches the skill's stated workflow.
- If it fails, adjust the description or the workflow instructions before testing again.

## Reporting

- Report `pass`, `warn`, or `fail` for each pass.
- Explain only the smallest fix needed to make the next run succeed.
- Save any reusable test prompts in `references/`.

## Resources

- `references/workflow.md` for the canonical checklist.
- `references/compatibility.md` for Codex and Claude packaging rules.
- `references/example-prompts.md` for repeatable test prompts.
- `scripts/validate_skill.js` for automated structure checks.