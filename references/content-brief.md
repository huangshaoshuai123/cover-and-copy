# Content Brief

Use this reference before generating covers from short copy, scripts, outlines, or document content. The goal is to turn raw text into a compact creative brief that can drive visual decisions.

## Input Handling

- Short copy: treat it as the seed of the topic, not as a shot list.
- Script or voiceover: find the first strong claim, the most visual result, and the clearest audience benefit.
- Outline: infer the main argument from section headings and repeated keywords.
- Document content: extract only the parts relevant to the video topic; ignore boilerplate, footers, unrelated metadata, and long citations.
- Text files and documents: read or extract text first, then brief from the extracted content.
- Raw video without transcript: do not claim to analyze the video. Ask the user for a script, transcript, or outline.

## Brief Schema

Create this brief internally unless the user asks to see it:

```text
输入类型：
主题：
工具/产品/模型：
核心观点：
3 秒钩子：
目标观众：
情绪基调：
自动匹配的视觉风格：
主标题：
副标题：
核心卖点：
封面只表达的一个钩子：
核心视觉物：
人物动作：
背景世界：
必要文字：
可省略信息：
画面禁区：
```

## Hook Selection

Pick one cover hook, not a summary of everything.

Good hooks usually come from:

- A new ability becoming available to ordinary users.
- A visible before/after result.
- A surprising workflow shortcut.
- A model/tool capability that changes the user's creative process.
- A strong sensory result: movie look, 3D interaction, editable PPT, advanced motion, high-quality AI design.

Avoid hooks that are too abstract:

- "AI is developing fast"
- "This tool is powerful"
- "A new feature launched"
- "The future is here"

Translate abstract ideas into visible objects:

- "world model on phone" becomes a phone with a walkable miniature world.
- "editable PPT workflow" becomes slides, editable handles, layout blocks, and transition frames.
- "movie color grading" becomes a before/after monitor, color card, film still, and lighting contrast.
- "AI website motion" becomes browser windows, 3D model, scroll background, and interaction handles.

## Title Extraction

- Main title should be a short noun or noun phrase, usually 2 to 6 Chinese characters.
- Use product/model names only when they are the strongest click hook.
- If the topic is tool tutorial, title the result rather than the process.
- If the topic is evaluation, keep the tool/model name and one clear promise.
- Subtitle can carry context such as "1 分钟看懂", "手机也能玩", "一键电影感", "可编辑工作流".

## Creative Compression

When the input contains many features, choose only one visual direction for the cover:

- Feature cluster: combine related abilities into one object, such as one phone, one screen, one board, one stage, or one before/after setup.
- Visual proof: show what changed, not how every step works.
- Person-tool relation: the person should hold, point to, operate, compare, reveal, or enter the core visual object.
- Background should support the hook, not become a second topic.

## Brief Quality Check

Before generating images, make sure the brief answers:

- What is the one thing viewers should understand in 1 second?
- What object proves that idea visually?
- Why is the person in this scene?
- Which style document best matches the topic and audience for direct generation?
- Which details must be removed so the cover does not get crowded?
