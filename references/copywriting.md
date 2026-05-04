# Copywriting

Use this reference when the user asks for 小红书文案, 标题, 发布文案, 简介, caption, or 全套内容包装. The default voice is "设计师黄白": professional, efficient, tool-focused, and lightly excited without becoming ad copy.

## Output Defaults

- Generate 3 to 5 title candidates unless the user asks for one.
- Generate one Xiaohongshu body around 200 Chinese characters. A practical range is 150 to 260 characters when the topic needs room.
- If the user asks for only titles, output titles only.
- If the user asks for only正文/文案, output body only.
- If the user asks for全套, output titles plus body, and do not repeat the cover prompt.
- If the user asks for 封面 + 文案, generate cover assets first when image generation is requested, then output titles and body.

## Routing

Choose the output mode from the user's wording:

- **title-only**: `帮我写标题`, `起几个标题`, `标题优化`, `标题候选`.
- **body-only**: `帮我写文案`, `小红书正文`, `发布文案`, `简介`, `caption`.
- **title-plus-body**: `标题和文案`, `小红书文案`, `发布用`, `全套文案`.
- **cover-plus-copy**: `全套`, `封面和文案`, `内容包装`, `封面生成完再写文案`.

When the request is title-only or body-only, do not generate images.

Default format:

```text
标题：
1. <标题候选>
2. <标题候选>
3. <标题候选>

正文：
<约 200 字小红书正文>
```

## Personal Title Style

Title patterns to prefer:

- `<时间成本>看懂，<AI 能力/工作流/结果>`
- `<数字>招<结果感>，<时间成本>学会`
- `<工具/模型名>深度评测：<数字>个功能玩转<领域>`
- `<强结果>！AI 一键<动作/效果>`
- `<工具/模型名> + <能力>：<具体玩法/工作流>`

Use the user's historical title rhythm:

- Short time promise first: `1分钟看懂`, `30秒看懂`, `40秒学会`.
- Clear result second: `更高质感的AI设计`, `AI生成PPT可编辑工作流`, `AI视频出镜玩法`.
- Tool/model name can lead when it is the topic: `Seedance 2.0深度评测`.
- Punctuation rhythm is direct: comma, colon, exclamation mark, and occasional brackets.

Useful phrases:

- `1分钟看懂`
- `30秒看懂`
- `40秒学会`
- `3招`
- `深度评测`
- `玩转`
- `一键`
- `高级感`
- `电影质感`
- `AI设计`
- `AI视频`
- `工作流`
- `可编辑`
- `复刻`
- `出镜玩法`

Title rules:

- Keep titles direct and result-oriented.
- Mention the tool/model name when it is a clear click hook.
- Prefer specific results over vague claims.
- Use punctuation sparingly: `！` and `：` are okay when they sharpen rhythm.
- Avoid long news-style headlines, abstract slogans, and heavy marketing language.

## Body Style

Use this structure by default:

1. Opening: one sentence introduces the tool, model, update, or video topic.
2. Judgment: one sentence explains why it is worth watching or trying.
3. Core points: 2 to 4 concise numbered or checked bullets.
4. Ending: light recommendation or personal sign-off when suitable.

The body should summarize the video, not rewrite the full script. It should feel like a creator's short publishing caption: clear enough for viewers to understand the video, but not so detailed that it replaces watching the video.

Common structure:

```text
最近发现/本期解锁/<工具名>这次的能力真的很适合<场景>。
它最强的地方是<核心判断>，适合<目标用户>快速做出<结果>。
1️⃣ <功能>：<结果/价值>。
2️⃣ <功能>：<结果/价值>。
3️⃣ <功能>：<结果/价值>。
快去试试吧 / 欢迎和我一起学习 AI 时代的设计。
```

Voice:

- Professional but light.
- Like a designer sharing a real tool discovery.
- Focus on what the tool helps create, not on lengthy tutorials.
- Use first-person sparingly: `我发现`, `本期`, `这次`.
- It can include small enthusiasm: `真的太惊艳了`, `质感拉满`, `超高效`, `很适合`.

Emoji policy:

- Allowed: `1️⃣`, `2️⃣`, `3️⃣`, `✅`, `✨`, `🎬`, `💡`, `👇`.
- Use at most a few. Do not decorate every sentence.
- Prefer numbered emojis when summarizing features.

## Content Extraction

Before writing, extract:

```text
工具/模型名：
视频主题：
核心能力：
最值得讲的 2-4 个点：
目标用户：
最终效果：
个人判断：
需要避开的夸张说法：
```

For title generation, also extract:

```text
最适合标题的工具名：
最强结果词：
时间成本：
数字钩子：
目标场景：
是否需要“深度评测”语气：
```

If the input is a long script, do not summarize every scene. Compress it into:

- What this video teaches or demonstrates.
- Which tool/model abilities are visible.
- Why the result matters to creators.
- What viewers can try after watching.

## Feature Point Rules

Each feature point should be short and result-based:

Good:

- `1️⃣ 出镜玩法：把自己放进短剧、古装、广告等不同场景。`
- `2️⃣ 分镜成片：用分镜图控制画面节奏，快速做出完整视频。`
- `3️⃣ 视频续写：把 5 秒片段继续延长，让剧情更完整。`

Avoid:

- Long step-by-step instructions with too many UI details.
- Repeating the full script plot.
- Listing every tool setting.
- Writing like a press release.

## Xiaohongshu Body Template

```text
本期解锁 <工具/模型名> 的 <主题>。
这次最惊喜的是，它不只是生成画面，而是能帮创作者快速完成 <核心结果>。
1️⃣ <能力一>：<结果价值>。
2️⃣ <能力二>：<结果价值>。
3️⃣ <能力三>：<结果价值>。
如果你也在做 <场景/领域>，这个工作流很值得试试。欢迎和我一起学习 AI 时代的设计！
```

## Title Candidate Mix

When generating 3 to 5 titles, make the candidates different in angle:

1. **效率型**：突出 `30秒/40秒/1分钟` 和快速学会。
2. **结果型**：突出高级感、电影质感、可编辑、出片、成片。
3. **工具型**：突出工具/模型名和能力。
4. **评测型**：突出深度评测、几个功能、几种玩法。
5. **情绪型**：突出惊艳、太会拍了、一键复刻，但不要夸张虚假。

Example mix for an AI video topic:

```text
1. Seedance 2.0深度评测：8种出镜玩法
2. 1分钟看懂，AI视频出镜的8种打开方式
3. Seedance 2.0太会拍了！一键进入短剧现场
4. 8种AI视频玩法，设计师也能快速出片
```

## For Seedance / AI Video Topics

Common angles:

- 出镜玩法：本人进入短剧、古装、武打、舞蹈、合拍、广告等场景。
- 剧本成片：小说片段、脚本、大纲生成影视画面。
- 分镜成片：用分镜图控制镜头和节奏。
- 视频续写：延长已有片段，让剧情更完整。
- 视频编辑：替换角色、复刻场景、快速做出爆款变装或广告片。

Good title examples:

- `Seedance 2.0深度评测：8种出镜玩法`
- `1分钟看懂，AI视频出镜的8种打开方式`
- `Seedance 2.0太会拍了！一键进入短剧现场`
- `8种AI视频玩法，设计师也能快速出片`

## Quality Check

Before returning copy, check:

- Does the title sound like the user's historical titles?
- Is the body around 200 Chinese characters unless asked otherwise?
- Does the opening quickly explain the topic?
- Are the feature points useful and not too detailed?
- Does it avoid exaggerated promises like "全网第一", "永久免费", "必火"?
- Does it avoid fake claims not present in the user's input?
