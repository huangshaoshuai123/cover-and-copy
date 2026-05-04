# Horizontal Adaptation

Use this reference when generating `16:9` or `4:3` covers from a selected vertical `3:4` cover.

## Trigger

Generate horizontal versions when:

- The user asks for 横版, B 站封面, 视频号封面, 16:9, 4:3, or 全套封面.
- The user has selected one vertical cover as the mother version.
- The user asks for one-stop delivery and does not want to choose; in this case, choose the strongest vertical image after inspection and use it as the mother version.

## Required Inputs

- Selected vertical cover image.
- Original identity reference image.
- Content brief.
- Chosen style details.
- Exact title and subtitle.

Horizontal versions should be generated with image edit, outpaint, or image-to-image workflows whenever possible. Do not rely on a pure text prompt if a vertical mother image is available.

## Core Rule

Horizontal cover is not a crop and not a stretch. It is a same-series redesign:

- Preserve identity, facial features, expression type, and overall person styling.
- Preserve main title, subtitle, core object, visual hook, style, palette, lighting direction, material logic, and background world.
- Recompose for horizontal space so title, face, and core object remain readable.
- Extend or rebuild side background areas in the same world.
- Avoid adding new unrelated objects or changing the topic.

## Ratio Guidance

### 16:9

- Best for B 站 and general video thumbnails.
- Use wider scene depth and stronger left/right balance.
- Good layouts:
  - Title on left or top-left, person on right, core object in center foreground.
  - Title across top, person center-right, result/object center-left.
  - Before/after split with person as bridge.
- Leave enough negative space around title for readability.

### 4:3

- More compact than 16:9, closer to editorial poster.
- Keep title larger relative to frame than in 16:9.
- Person can remain center or lower-right.
- Core object should not become too small after recomposition.
- Avoid pushing important details to edges.

## Horizontal Prompt Template

```text
基于输入竖版封面生成同系列横版封面，比例 <16:9 或 4:3>。这不是裁剪、拉伸或重新换风格，而是同一套封面的横版重构。

保持：人物身份和脸部辨识度、表情气质、服装风格、主标题“<主标题>”、副标题“<副标题>”、核心视觉物“<核心视觉物>”、主题钩子“<封面只表达的一个钩子>”、整体风格“<风格名称>”、主色调“<主色调>”、强调色“<强调色>”、光线方向、材质质感和背景世界“<背景世界>”。

重构：为横版重新安排标题、人物和核心道具。横向扩展背景空间，让画面有完整场景，不要简单裁切竖版。标题在横版中仍然大且可读，人物脸清楚，核心道具保持冲击力。

避免：拉伸变形、裁掉头部或标题、换脸、换发型、换服装气质、换色调、换世界观、添加无关对象、假 logo、水印、二维码、乱码、小字污染、过多标签。
```

## Adaptation Steps

1. Inspect the vertical mother image and identify its anchors:
   - title placement
   - face and body placement
   - core object
   - light direction
   - color palette
   - background world
2. Decide the horizontal layout before prompting.
3. Generate `16:9` first, because it needs the largest recomposition.
4. Generate `4:3` second, using the same anchors but a tighter layout.
5. Inspect both outputs and regenerate if the face, title, palette, or core object drifts.

## Quality Check

Horizontal output passes only if:

- It looks like the same campaign as the vertical image.
- The person is still recognizable.
- Title and subtitle remain readable.
- The core object still explains the hook.
- New side areas look intentionally designed, not filled with random texture.
- There is no obvious stretching, cropping damage, or inconsistent lighting.
