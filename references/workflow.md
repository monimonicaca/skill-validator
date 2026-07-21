# Validation workflow

1. Confirm the folder path is the intended skill root.
2. Confirm the root file exists.
3. Confirm frontmatter parses and includes required fields.
4. Confirm the skill name and folder name are aligned when required.
5. Confirm any referenced resources exist.
6. Run one realistic task prompt.
7. Record whether the skill was triggered and whether the output matched the workflow.
8. Fix the smallest issue and rerun.

## Suggested pass/fail rules

- **Pass**: all required files exist, frontmatter parses, and the sample task follows the workflow.
- **Warn**: the skill works but needs packaging adjustments for another runtime.
- **Fail**: required files are missing, frontmatter is invalid, or the sample task cannot complete.
