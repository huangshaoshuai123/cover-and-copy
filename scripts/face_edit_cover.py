#!/usr/bin/env python3
from __future__ import annotations

import argparse
import os
import subprocess
import sys
from pathlib import Path

IDENTITY_LOCK_PREFIX = (
    "Hard requirement: the first input image is the real face identity anchor and must be used. "
    "The generated cover must clearly show the same real person, preserve recognisable facial identity, "
    "and must not replace them with a stock model, stranger, or generic AI face."
)

COVER_FAILURE_SUFFIX = (
    "If the face is missing, heavily occluded, unrecognisable, or replaced by a different person, "
    "the result is invalid and must be regenerated."
)


def _repo_root() -> Path:
    return Path(__file__).resolve().parent.parent


def _default_face() -> Path:
    return _repo_root() / "assets" / "face" / "default-face.png"


def _default_image_gen() -> Path:
    codex_home = Path(os.environ.get("CODEX_HOME", Path.home() / ".codex"))
    return codex_home / "skills" / ".system" / "imagegen" / "scripts" / "image_gen.py"


def _must_exist(path: Path, label: str) -> None:
    if not path.exists():
        raise SystemExit(f"{label} not found: {path}")


def _parse_args() -> argparse.Namespace:
    parser = argparse.ArgumentParser(
        description="Upload a local face reference to the backend image edit model for cover generation."
    )
    prompt_group = parser.add_mutually_exclusive_group(required=True)
    prompt_group.add_argument("--prompt")
    prompt_group.add_argument("--prompt-file")

    parser.add_argument("--face", default=str(_default_face()))
    parser.add_argument("--style-ref", action="append", default=[])
    parser.add_argument("--model", default="gpt-image-2")
    parser.add_argument("--quality", default="high")
    parser.add_argument("--size", default="1024x1536")
    parser.add_argument("--n", type=int, default=3)
    parser.add_argument("--out", default="output/imagegen/cover-face.png")
    parser.add_argument("--out-dir")
    parser.add_argument("--background")
    parser.add_argument("--output-format", default="png")
    parser.add_argument("--input-fidelity", choices=["low", "high"])
    parser.add_argument("--dry-run", action="store_true")
    parser.add_argument("--force", action="store_true")
    parser.add_argument("--allow-single", action="store_true")
    parser.add_argument(
        "--allow-no-person",
        action="store_true",
        help="Opt out of the default hard rule that every cover must show the user's face.",
    )
    parser.add_argument(
        "--strict-identity",
        action=argparse.BooleanOptionalAction,
        default=True,
        help="Keep enabled to always prepend identity-lock constraints to the final prompt.",
    )

    parser.add_argument("--use-case", default="identity-preserve")
    parser.add_argument("--subject", default="Short-form video cover with the same real person identity as the face reference")
    parser.add_argument("--style")
    parser.add_argument("--composition", default="3:4 vertical cover, bold mobile-readable headline area, strong foreground subject hierarchy")
    parser.add_argument("--lighting")
    parser.add_argument("--palette")
    parser.add_argument("--materials")
    parser.add_argument("--text")
    parser.add_argument("--constraints", default="Preserve the same person identity from the first image; no fake logos; no gibberish; no watermark")
    parser.add_argument("--negative", default="different person, stock model face, distorted face, extra fingers, unreadable tiny text")
    return parser.parse_args()


def _read_prompt_text(args: argparse.Namespace) -> str:
    if args.prompt is not None:
        return args.prompt.strip()

    prompt_path = Path(args.prompt_file)
    _must_exist(prompt_path, "Prompt file")
    return prompt_path.read_text(encoding="utf-8").strip()


def _build_locked_prompt(prompt: str, allow_no_person: bool) -> str:
    prompt = prompt.strip()
    prefix_parts = [IDENTITY_LOCK_PREFIX]
    if not allow_no_person:
        prefix_parts.append(
            "This is a cover-generation task, so the user's face must appear clearly in the final image."
        )
    prefix = " ".join(prefix_parts)
    return f"{prefix}\n\n{prompt}\n\n{COVER_FAILURE_SUFFIX}"


def _build_command(args: argparse.Namespace) -> list[str]:
    image_gen = _default_image_gen()
    face = Path(args.face)

    _must_exist(image_gen, "image_gen.py")
    _must_exist(face, "Face reference")
    for ref in args.style_ref:
        _must_exist(Path(ref), "Style reference")

    prompt_text = _read_prompt_text(args)
    if args.strict_identity:
        prompt_text = _build_locked_prompt(prompt_text, args.allow_no_person)

    cmd = [sys.executable, str(image_gen), "edit"]
    cmd += ["--prompt", prompt_text]

    cmd += ["--image", str(face)]
    for ref in args.style_ref:
        cmd += ["--image", ref]

    cmd += ["--model", args.model]
    cmd += ["--quality", args.quality]
    cmd += ["--size", args.size]
    cmd += ["--n", str(args.n)]
    cmd += ["--out", args.out]
    cmd += ["--output-format", args.output_format]
    cmd += ["--use-case", args.use_case]
    cmd += ["--subject", args.subject]
    cmd += ["--composition", args.composition]
    cmd += ["--constraints", args.constraints]
    cmd += ["--negative", args.negative]

    optional_pairs = {
        "--out-dir": args.out_dir,
        "--background": args.background,
        "--input-fidelity": args.input_fidelity,
        "--style": args.style,
        "--lighting": args.lighting,
        "--palette": args.palette,
        "--materials": args.materials,
        "--text": args.text,
    }
    for flag, value in optional_pairs.items():
        if value:
            cmd += [flag, value]

    if args.force:
        cmd.append("--force")
    if args.dry_run:
        cmd.append("--dry-run")

    return cmd


def main() -> None:
    args = _parse_args()

    if not args.dry_run and not os.environ.get("OPENAI_API_KEY"):
        raise SystemExit("OPENAI_API_KEY is not set; cannot upload the face image to the backend model.")

    if args.n < 3 and not args.allow_single:
        raise SystemExit("Cover generation must output 3 candidates by default. Pass --allow-single only for explicit user-approved exceptions.")

    if args.model == "gpt-image-2" and args.input_fidelity is not None:
        raise SystemExit("gpt-image-2 does not support --input-fidelity; omit it or switch to gpt-image-1.5.")

    command = _build_command(args)
    subprocess.run(command, check=True)


if __name__ == "__main__":
    main()
