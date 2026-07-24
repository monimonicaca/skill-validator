# Validation workflow

1. Confirm the folder path is the intended skill root.
2. Confirm `SKILL.md` exists at the root.
3. Run `node scripts/validate_skill.js <skill_dir>` to parse frontmatter and check structure.
4. Review the skill against the required checkpoints.
5. Review the skill against the recommended checkpoints.
6. Review the skill against the optional checkpoints.
7. Run one realistic task prompt.
8. Record whether the skill was triggered and whether the output matched the workflow.
9. Fix the smallest issue and rerun.

## Suggested pass/fail rules

- **Pass**: required files exist, frontmatter parses, required checkpoints pass, the description triggers correctly, the workflow is complete, instructions are executable, ambiguity is low, test cases exist, and the skill follows best practices.
- **Warn**: the skill works but needs wording, packaging, or portability adjustments.
- **Fail**: required files are missing, frontmatter is invalid, the skill does not trigger, or the workflow cannot complete.
