# Face Edit Workflow

Use this reference when the cover must include the user's real face identity.

## Goal

Ensure the skill uses a model path that actually uploads the face reference image to the backend image model instead of merely mentioning the file path in text.

## Required inputs

- Face identity anchor: `assets/face/default-face.png`, unless the user provides a newer face photo.
- Cover prompt: the final concise prompt derived from the content brief.
- Optional style references: one or more local images used only for hierarchy, composition, or quality.

## Default execution path

Use Codex built-in image generation first:

1. Load `assets/face/default-face.png` into the current conversation with `view_image`.
2. Call the built-in `image_gen` tool.
3. State in the image prompt that the previously loaded face image is the identity anchor.
4. Generate 3 vertical `3:4` cover candidates by default.

## Fallback local wrapper

Use the local wrapper only when built-in `image_gen` is unavailable, the user explicitly asks for the backend API path, or the built-in result needs a face-stability fallback:

```bash
python3 scripts/face_edit_cover.py \
  --prompt "..." \
  --out output/imagegen/cover-v1.png
```

What this wrapper does:

1. Resolves the skill-local face image path.
2. Calls `$CODEX_HOME/skills/.system/imagegen/scripts/image_gen.py edit`.
3. Uploads the face image as the first `--image` input to the OpenAI Images Edit API.
4. Optionally uploads extra style reference images as additional `--image` inputs.
5. Saves outputs into `output/imagegen/`.

## Model guidance

- Default: `gpt-image-2`
  Best for the normal face-preserving cover workflow in this skill.
- Optional: `gpt-image-1.5`
  Use only when the user explicitly asks for it or when a model-specific parameter is needed.

Important:
- Do not pass `--input-fidelity` with `gpt-image-2`.
- If using `gpt-image-1.5`, `--input-fidelity high` is allowed and preferred for identity-sensitive edits.

## Failure handling

- If `OPENAI_API_KEY` is missing, only the fallback backend wrapper is unavailable; the default built-in `image_gen` path can still work after `view_image` loads the face image.
- If the tool in use cannot upload local images, do not claim that face identity is preserved.
- If face similarity is weak, retry with a tighter prompt that reinforces identity preservation and reduces scene complexity.
- If batch generation drifts across variants, regenerate each cover separately with the same face input.
