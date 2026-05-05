# Cover and Copy

`Cover and Copy` 是一个用于 Codex 的本地 skill，可根据中文文案、视频脚本、大纲或文档内容生成高点击短视频封面和小红书配套文案，并支持多风格视觉适配、固定人脸身份参考、竖版 3:4 与横版 16:9/4:3 延展。

## 在 Codex 里使用

这个仓库不是独立网页应用，也不是命令行工具；它的目标使用环境是 OpenAI Codex 的 skill 系统。

在 Codex 中安装或放置到 skills 目录后，可以通过下面的方式触发：

```text
使用 Cover and Copy 技能
```

然后粘贴中文文案、视频脚本或大纲，skill 会按规则生成 3 张竖版封面；需要横版时，再基于竖版母版延展为同系列横版；需要发布文案时，会生成小红书标题和 200 字左右正文。

## 发布流程

这个仓库用于发布 Codex skill 本身。更新流程是：

1. 修改 `SKILL.md`、`README.md`、`references/` 或素材文件。
2. 在本地 Git 仓库提交改动。
3. 推送到 GitHub 仓库。
4. 在 Codex 的 skills 目录中安装或同步这个仓库后使用。

## 能力范围

- 根据中文文案、视频脚本、大纲或文档内容提炼短视频封面主钩子。
- 默认生成 3 张 3:4 竖版封面。
- 支持根据竖版母版延展生成 16:9 和 4:3 横版封面。
- 支持根据脚本、大纲或内容简报生成小红书标题和 200 字左右正文。
- 默认参考“设计师黄白”的历史表达风格：工具发现、能力判断、编号总结、轻推荐。
- 默认使用 `assets/face/default-face.png` 作为人脸身份参考图。
- 强制要求把人脸图作为真实图片输入传给生图模型，不能只在提示词里写图片路径。
- 默认让人物保持本人脸部辨识度，但根据主题调整表情、服装、动作、光线和场景。
- 提供 `scripts/face_edit_cover.py`，可把默认人脸图真实上传到后台图片编辑模型，不再依赖纯文本提示。
- 支持多种视觉风格，参考 `assets/style-references/` 下的成功封面层级和质感，但不默认绑定复古风。

## 目录结构

```text
.
├── SKILL.md
├── README.md
├── agents/
│   └── openai.yaml
├── assets/
│   ├── face/
│   │   └── default-face.png
│   └── style-references/
│       ├── ai-short-drama-cover.png
│       ├── web-design-cover.png
│       └── world-model-cover.png
├── scripts/
│   └── face_edit_cover.py
└── references/
    ├── content-brief.md
    ├── copywriting.md
    ├── cover-prompt-templates.md
    ├── face-edit-workflow.md
    ├── horizontal-adaptation.md
    └── style-system.md
```

## 注意事项

`assets/face/default-face.png` 是默认人脸参考图。如果要发布为公开仓库，请先确认这张图片可以公开；否则建议保持私有仓库，或替换成你允许公开的人脸参考图。

如果你要让 Codex 真的把这张脸上传给后台模型，不能只调用内置纯文本生图工具。推荐使用：

```bash
export CODEX_HOME="${CODEX_HOME:-$HOME/.codex}"
export OPENAI_API_KEY="你的 key"

python3 scripts/face_edit_cover.py \
  --prompt "生成 3:4 竖版短视频封面，保留第一张输入图片中的同一真人身份，圣诞毛毡风产品广告，高级商业质感，大标题“圣诞广告”，副标“10分钟 AI生成”" \
  --style-ref assets/style-references/ai-short-drama-cover.png \
  --out output/imagegen/christmas-cover.png
```

这个脚本会调用 `$CODEX_HOME/skills/.system/imagegen/scripts/image_gen.py edit`，并把 `assets/face/default-face.png` 作为第一张 `--image` 真正上传给 OpenAI 图片编辑接口。
