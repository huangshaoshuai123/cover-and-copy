# Cover Prompt Templates

Use this reference to generate the first set of vertical covers. The default output is 3 distinct, separate `3:4` vertical cover image files.

## Before Prompting

Load or infer:

- Content brief from `content-brief.md`.
- Chosen style from the auto-matched or user-specified file in `references/cover-styles/`.
- Identity reference image, normally `assets/face/default-face.png`.
- Optional style reference images, used only for hierarchy and quality.
- Confirmed title when the task is in the `先生成文案和标题` branch of 自媒体三件套.

Do not output the prompt unless the user asks. Generate images directly when the image tool can use the face reference as an input image.

## Shared Cover Requirements

- Ratio: `3:4`.
- Quantity: 3 vertical covers by default.
- Output form: each candidate must be a separate standalone image file. Do not create a grid, collage, contact sheet, comparison board, storyboard page, long image, or one image containing three cover designs.
- Canvas discipline: each output image must strictly fill one `3:4` artboard. Do not include outer white margins, artboard mockups, multiple frames, or ratio preview boxes inside the generated image.
- Same main title and subtitle across the 3 covers unless the user asks for title testing.
- If the user confirmed a title after copywriting, use that title as the primary source for the in-image main title. Compress it only when it is too long for a mobile-readable cover.
- If the user chose direct generation for 自媒体三件套, derive the cover title from the content brief and keep it stable through the later horizontal adaptation unless the user explicitly asks to change it.
- Three covers must differ in composition, visual center, person-object relationship, and scene logic.
- Keep one hook per cover.
- The title should occupy the upper 25% to 40% of the image and remain readable on mobile.
- Person should be clear, identity-preserved, and actively interacting with the core object.
- Core object should be oversized or visually emphasized enough to explain the hook.
- Background must match the auto-matched or user-specified style document and topic.

## Identity Prompt Block

Use this meaning in every prompt:

```text
人物参考输入人脸图作为身份锚点，保持本人脸型、五官比例、眉眼特征、年龄感和整体辨识度。不要复制参考图背景、服装、姿势、手势、室内环境和原始光线。请根据当前主题自然调整表情、服装、身体动作、手部动作、镜头角度、光线和所处场景。表情默认自信的微笑。
```

## Vertical Prompt Template

```text
生成第 <n> 张封面，共 3 张候选中的独立单张。严格比例 3:4，画面必须填满一个竖版 3:4 画板，不要白边、不要画板预览、不要拼图、不要三宫格、不要合集图、不要在同一张图里出现多个候选。短视频爆款封面，高级商业质感，强层级，强冲击。当前输入人脸图仅作为人物身份参考；如传入风格参考图，则仅作为版式质感参考，不照抄文字、构图或题材。

先内部推演创意逻辑：这张图的核心钩子是什么，人物动作、核心道具、背景场景之间为什么有关联。不要输出推演过程，直接生成图。

1. 标题部分：
主标题“<主标题>”位于顶部，占满顶部 25% 到 40% 空间。标题极大、加粗、移动端一眼可读。标题质感为“<标题字体质感>”，与“<风格名称>”匹配；可以有描边、投影、纹理和轻微非金属厚度。副标题“<副标题>”最多一条，作为短贴纸/副牌/角标/副行文字出现。标题和副标题使用“<主色调>”中的深浅关系建立层级，用“<强调色>”做小面积焦点。禁止金属质感、铬合金、黄金、银色镭射、镜面电镀、液态金属、廉价金属字。

2. 人物部分：
人物参考输入人脸图作为身份锚点，保持本人脸型、五官比例、眉眼特征、年龄感和整体辨识度；不要复制参考图背景、服装、姿势、手势、室内环境和原始光线。人物<人物动作>，和<核心视觉物>发生互动。表情为自信的微笑，脸清楚，主体明确且优先突出。服装、姿态、镜头角度和光线根据“<主题>”自然适配。

3. 背景部分：
背景是“<背景世界>”，与“<主题>”强相关，单独设计，不使用参考图背景，不要纯黑或纯白。整体配色遵循“<主色调>”，只用“<强调色>”强化核心视觉物、按钮、贴纸或关键标记。用“<光线>”“<核心材质>”建立质感，整体高级、有纵深、有氛围，但背景元素数量和细节密度要适度收敛，避免复杂抢戏。

4. 画面重点：
核心视觉物：<核心视觉物>。它必须直接解释“<封面只表达的一个钩子>”，可以夸张放大并前置到镜头前。画面是可控高密度：标题最大，人物第二，道具第三，背景最后。优先强化主体轮廓、对比和聚焦感，适度弱化背景存在感。可以使用极少量无文字箭头、圈注、对勾或叉号辅助理解，但不要过多标签。

5. 避免：
避免假 logo、水印、二维码、复杂流程、不可读小字、过多小字、过多 UI 卡片、陌生人脸、发型大幅改变、元素平均用力。避免 <避免元素>。
```

## Style Variables

Fill these fields only from the matched or user-specified style document:

```text
风格名称：
标题字体质感：
主色调：
强调色：
光线：
核心材质：
背景世界：
避免元素：
```

If the matched style document does not define a needed field, infer from that same document only. Do not pull style details from `SKILL.md`.

## Three Variant Directions

Use one direction per generated cover:

1. **前景道具冲击**：手机、屏幕、产品、模型或结果物伸向镜头，人物在中下部与道具互动。
2. **结果对比冲击**：同一画面中清楚呈现普通结果 vs 高级结果，人物做判断、展示或指向。
3. **进入主题世界**：人物像进入工具生成的世界、片场、工作台、产品空间或结果场景，背景承接主题。

## Text Strategy

- Keep exact in-image text short: main title + optional subtitle.
- Do not ask the model to render paragraphs or long UI labels.
- If a product/model name is too long, put it in subtitle or small badge only when necessary.
- Avoid fake brand logos. Use generic screens or abstracted UI unless the user explicitly provides brand assets.

## Quality Check

After generation, inspect:

- Are there exactly 3 separate image files rather than one combined collage?
- Does each file strictly use a single `3:4` vertical canvas?
- Does the face still read as the same person?
- Is the title readable at thumbnail size?
- Is there one obvious hook?
- Is the style actually matched, or did it fall back to generic AI tech?
- Are there fake logos, watermarks, gibberish, extra fingers, unreadable UI, or too many labels?
- Does the background support the topic without stealing focus, and is it simple enough to keep the subject dominant?
