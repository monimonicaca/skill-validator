# Validation workflow

1. Confirm the folder path is the intended skill root.
2. Confirm `SKILL.md` or `skill.md` exists at the root.
3. Run `node scripts/validate_skill.js <skill_dir>` to parse frontmatter and check structure.
4. Review the skill against the Skill Compliance Checklist:
   - `SKILL.md` exists
   - valid YAML frontmatter
   - `name` exists
   - `description` exists
   - `description` explains trigger
   - workflow has clear steps
   - inputs defined
   - outputs defined
   - scripts documented
   - references linked
   - examples provided
   - failure cases handled
5. Review the skill against the 7 quality checks:
   - format correctness
   - triggerability
   - workflow completeness
   - executability
   - ambiguity
   - test cases
   - Skill best practices
6. Run one realistic task prompt.
7. Record whether the skill was triggered and whether the output matched the workflow.
8. Fix the smallest issue and rerun.

## Suggested pass/fail rules

- **Pass**: required files exist, frontmatter parses, the compliance checklist is complete, the description triggers correctly, the workflow is complete, instructions are executable, ambiguity is low, test cases exist, and the skill follows best practices.
- **Warn**: the skill works but needs wording, packaging, or portability adjustments.
- **Fail**: required files are missing, frontmatter is invalid, the skill does not trigger, or the workflow cannot complete.