# Cover and Copy Web App

`Cover and Copy Web App` 是 Cover and Copy 的网站版。用户只需要粘贴脚本，就能生成小红书标题、正文和一张 3:4 竖版封面图。

线上地址：

```text
https://cover-and-copy-webapp.vercel.app
```

## 功能

- 粘贴中文脚本后，一次生成标题候选、小红书正文和封面图。
- 服务端自动调用文案模型，前端不展示、不收集用户 API key。
- 服务端优先使用 `gpt-image-2` 生成封面，失败后兜底使用 `gpt-image-2-c`。
- 页面默认已经放入固定人物面部参考图。
- 用户可以保留默认人脸、上传替换人脸，或删除人脸参考图。
- 默认封面尺寸为 `1024x1536`，适配 3:4 竖版短视频封面。
- 结果区会展示实际成功的图片模型和每个模型的尝试结果。

## 技术栈

- Next.js App Router
- React
- TypeScript
- Vercel
- LinkAPI / OpenAI 兼容接口

## 目录结构

```text
.
├── app/
│   ├── api/generate/route.ts
│   ├── globals.css
│   ├── layout.tsx
│   └── page.tsx
├── public/
│   └── default-face.png
├── .env.example
├── package.json
└── README.md
```

## 环境变量

本地开发时复制 `.env.example`：

```bash
cp .env.example .env.local
```

配置下面这些变量：

```bash
NEWAPI_API_KEY=replace_me
NEWAPI_BASE_URL=https://linkapi.ai/v1
COPY_TEXT_MODEL=gpt-5.5
COVER_IMAGE_MODEL=gpt-image-2
COVER_FALLBACK_IMAGE_MODEL=gpt-image-2-c
```

说明：

- `NEWAPI_API_KEY`：服务端使用的 API key。不要提交到 GitHub。
- `NEWAPI_BASE_URL`：兼容 OpenAI API 的服务地址，默认走 `https://linkapi.ai/v1`。
- `COPY_TEXT_MODEL`：文案模型，当前线上配置为 `gpt-5.5`。
- `COVER_IMAGE_MODEL`：主图片模型，优先使用 `gpt-image-2`。
- `COVER_FALLBACK_IMAGE_MODEL`：兜底图片模型，主模型失败时使用 `gpt-image-2-c`。

代码也兼容 `OPENAI_API_KEY` 和 `OPENAI_BASE_URL`，但网站部署建议统一使用上面的 `NEWAPI_*` 变量。

## 本地运行

安装依赖：

```bash
npm install
```

启动开发服务：

```bash
npm run dev
```

打开：

```text
http://localhost:3000
```

生产构建验证：

```bash
npm run build
```

## 生成流程

1. 前端提交脚本、可选人脸文件和人脸开关状态。
2. 后端读取服务端环境变量，不从前端接收 API key。
3. 后端调用文案模型生成标题和正文。
4. 后端根据脚本关键词自动匹配封面风格。
5. 如果用户保留默认人脸，后端读取 `public/default-face.png` 并作为图片编辑输入。
6. 如果用户上传新的人脸图，后端使用本次上传的人脸图。
7. 如果用户删除人脸参考图，后端改走无身份锚点的图片生成。
8. 后端优先调用 `gpt-image-2`；如果失败，再调用 `gpt-image-2-c`。
9. 前端展示封面、标题、正文、提示词和模型尝试结果。

## 默认人脸参考图

默认人脸图片位于：

```text
public/default-face.png
```

页面初始状态会显示这张图，并标记为“默认人脸参考图”。用户不做任何操作时，生成封面会默认使用这张图作为人物身份锚点。

如果要更换默认人脸，直接替换 `public/default-face.png`，保持文件名不变即可。

注意：如果这个仓库公开发布，请确认默认人脸图片有公开使用授权。否则应保持仓库私有，或替换成允许公开的人脸素材。

## Vercel 部署

项目已关联 Vercel，生产域名是：

```text
https://cover-and-copy-webapp.vercel.app
```

生产环境变量需要在 Vercel Project Settings 里配置，不要写入仓库：

```text
NEWAPI_API_KEY
NEWAPI_BASE_URL
COPY_TEXT_MODEL
COVER_IMAGE_MODEL
COVER_FALLBACK_IMAGE_MODEL
```

生产部署命令：

```bash
npm exec --yes vercel -- deploy --prod -y
```

## GitHub 分支

网站版代码在分支：

```text
codex/cover-copy-webapp
```

Skill 版仍保留在 `master` 分支。网站版和 skill 版的交付形态不同，不要把网站部署配置直接合并回 skill 版。

## 安全注意事项

- 不要把真实 API key 写入 README、`.env.example` 或前端代码。
- API key 只放在服务端环境变量里。
- 前端页面不提供 API key、Base URL、模型名输入框。
- 如果开放给别人使用，本质上是在让他们通过你的服务端额度生成内容；建议在正式公开前补充登录、限流、额度控制和日志审计。
- 默认人脸图属于身份素材，公开仓库前必须确认授权边界。

