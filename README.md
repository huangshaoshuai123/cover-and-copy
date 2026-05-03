# 封面和文案

`封面和文案` 是一个用于 Codex 的本地 skill，用中文文案生成 3 张 3:4 竖版短视频封面图。

## 在 Codex 里使用

这个仓库不是独立网页应用，也不是命令行工具；它的目标使用环境是 OpenAI Codex 的 skill 系统。

在 Codex 中安装或放置到 skills 目录后，可以通过下面的方式触发：

```text
使用封面和文案技能
```

然后粘贴中文文案，skill 会按规则生成 3 张封面。

## 发布流程

这个仓库用于发布 Codex skill 本身。更新流程是：

1. 修改 `SKILL.md`、`README.md` 或素材文件。
2. 在本地 Git 仓库提交改动。
3. 推送到 GitHub 仓库。
4. 在 Codex 的 skills 目录中安装或同步这个仓库后使用。

## 能力范围

- 根据中文文案提炼短视频封面主钩子。
- 默认生成 3 张 3:4 竖版封面。
- 默认使用 `assets/face/default-face.png` 作为人脸参考图。
- 强制要求把人脸图作为真实图片输入传给生图模型，不能只在提示词里写图片路径。
- 默认让人物保持参考图长相和发型，并优化为自信的笑容。
- 参考 `assets/style-references/` 下的成功封面质感，避免廉价金属字和科技感光效。

## 目录结构

```text
.
├── SKILL.md
├── README.md
├── agents/
│   └── openai.yaml
└── assets/
    ├── face/
    │   └── default-face.png
    └── style-references/
        ├── ai-short-drama-cover.png
        ├── web-design-cover.png
        └── world-model-cover.png
```

## 注意事项

`assets/face/default-face.png` 是默认人脸参考图。如果要发布为公开仓库，请先确认这张图片可以公开；否则建议保持私有仓库，或替换成你允许公开的人脸参考图。
