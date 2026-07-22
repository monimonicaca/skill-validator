# Example prompts

Use one of these prompts to rehearse the skill after structural checks pass.

1. `Check whether C:\skills\sample-skill is a valid skill folder, then tell me what is missing.`
2. `Run the JS validator for this skill and report any frontmatter, trigger, or workflow gaps.`
3. `Review a newly created skill and judge whether the description, workflow, instructions, and test cases are complete.`
4. `Inspect this skill for ambiguity and best-practice issues, then summarize the smallest fixes.`

## Expected signals

- The skill identifies the intended root folder.
- The skill checks `SKILL.md` before the example task.
- The skill reports a concrete pass/fail outcome for the rehearsal.
- The review covers triggerability, workflow completeness, executability, ambiguity, test cases, and best practices.