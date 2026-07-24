---
name: skill-validator
description: Judge skills' quality by checking format, triggerability, workflow completeness, executability, ambiguity, and Skill best practices.
---

# Skill Validator

Judge a skill in layered passes: structure first, then the tiered checkpoints, then rehearsal and best-practice review.
Use `scripts/validate_skill.js` for the structural check, then follow the reference documents below.

## Checkpoint tiers
- Required checkpoints: `references/required-checkpoints.md`
- Recommended checkpoints: `references/recommended-checkpoints.md`
- Optional checkpoints: `references/optional-checkpoints.md`

## Supporting references
- `references/workflow.md` for validation order and reporting
- `references/compatibility.md` for Codex and Claude packaging rules
- `scripts/validate_skill.js` for the automated structure check

## Validation flow
1. Confirm the folder is the intended skill root.
2. Run the JS validator.
3. Review the required checkpoints first, then the recommended checkpoints, then the optional checkpoints.
4. Run one realistic task prompt.
5. Record whether the skill passed, warned, or failed.
