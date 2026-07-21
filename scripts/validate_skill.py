#!/usr/bin/env python3
"""Validate the structure of a skill folder for Codex and Claude Code."""

from __future__ import annotations

import argparse
import re
from pathlib import Path


VALID_NAME = re.compile(r"^[a-z0-9]+(?:-[a-z0-9]+)*$")
ALLOWED_KEYS = {"name", "description", "license", "allowed-tools", "metadata"}


def parse_frontmatter(text: str) -> dict[str, str]:
    text = text.lstrip("\ufeff")
    if not text.startswith("---\n"):
        raise ValueError("missing YAML frontmatter")
    end = text.find("\n---\n", 4)
    if end == -1:
        raise ValueError("invalid YAML frontmatter delimiter")
    block = text[4:end]
    data: dict[str, str] = {}
    for raw_line in block.splitlines():
        line = raw_line.rstrip()
        if not line.strip() or line.lstrip().startswith("#"):
            continue
        if ":" not in line:
            raise ValueError(f"cannot parse line in frontmatter: {raw_line}")
        key, value = line.split(":", 1)
        key = key.strip()
        value = value.strip().strip('"\'')
        if not re.fullmatch(r"[A-Za-z0-9_-]+", key):
            raise ValueError(f"invalid key in frontmatter: {key}")
        data[key] = value
    return data


def pick_root_file(skill_dir: Path) -> Path:
    for candidate in (skill_dir / "SKILL.md", skill_dir / "skill.md"):
        if candidate.exists():
            return candidate
    raise FileNotFoundError("expected SKILL.md or skill.md")


def validate(skill_dir: Path) -> list[str]:
    issues: list[str] = []
    if not skill_dir.exists():
        return [f"folder does not exist: {skill_dir}"]
    if not skill_dir.is_dir():
        return [f"path is not a directory: {skill_dir}"]

    try:
        root_file = pick_root_file(skill_dir)
    except FileNotFoundError as exc:
        return [str(exc)]

    try:
        frontmatter = parse_frontmatter(root_file.read_text(encoding="utf-8-sig"))
    except Exception as exc:  # noqa: BLE001
        return [f"{root_file.name}: {exc}"]

    extra = sorted(set(frontmatter) - ALLOWED_KEYS)
    if extra:
        issues.append(f"unexpected frontmatter keys: {', '.join(extra)}")

    name = frontmatter.get("name")
    description = frontmatter.get("description")
    if not isinstance(name, str) or not name.strip():
        issues.append("missing or invalid name")
    elif not VALID_NAME.fullmatch(name.strip()):
        issues.append("name must be lowercase hyphen-case")

    if not isinstance(description, str) or not description.strip():
        issues.append("missing or invalid description")

    for subdir in ("references", "scripts", "assets", "agents"):
        path = skill_dir / subdir
        if path.exists() and not path.is_dir():
            issues.append(f"{subdir} exists but is not a directory")

    if isinstance(name, str) and name.strip():
        if skill_dir.name.lower() != name.strip().lower():
            issues.append(f"folder name '{skill_dir.name}' does not match skill name '{name.strip()}'")

    return issues


def main() -> int:
    parser = argparse.ArgumentParser()
    parser.add_argument("skill_dir", type=Path)
    args = parser.parse_args()

    issues = validate(args.skill_dir)
    if issues:
        for issue in issues:
            print(f"FAIL: {issue}")
        return 1

    print("PASS: skill structure looks valid")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())