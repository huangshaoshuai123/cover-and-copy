import { NextResponse } from "next/server";

export const runtime = "nodejs";
export const maxDuration = 300;

type CopyResult = {
  titles: string[];
  post: string;
  warning?: string;
};

type ImageAttempt = {
  model: string;
  ok: boolean;
  error?: string;
};

const styleDocs = [
  {
    id: "tech-product-launch",
    name: "科技产品发布风",
    keywords: ["AI", "App", "模型", "产品", "功能", "发布", "工具", "软件", "截图"],
    prompt:
      "发布会级产品摄影构图，清晰屏幕、悬浮界面、实体设备或产品卡片作为核心视觉物；冷白、石墨黑、浅灰、深蓝灰，电光青或暖橙小面积点缀；主光清楚，人物脸部明亮，玻璃、亚克力、清晰屏幕和卡片 UI。"
  },
  {
    id: "clean-knowledge-creator",
    name: "清爽知识博主风",
    keywords: ["教程", "方法", "步骤", "效率", "工作流", "指南", "技巧"],
    prompt:
      "明亮知识博主工作区，标题清楚压顶，屏幕、白板、便签或软件面板作为核心视觉物；暖白、浅灰、清透蓝和亮黄点缀，人物像讲解者。"
  },
  {
    id: "dramatic-before-after",
    name: "夸张对比冲击风",
    keywords: ["对比", "前后", "普通", "高级", "反差", "测评", "升级"],
    prompt:
      "左右或上下对比构图，普通效果和高级效果形成强反差；红色用于错误或普通结果，绿色或黄色用于高级结果，少量对勾、叉号和箭头。"
  },
  {
    id: "cinematic-blockbuster",
    name: "电影感大片风",
    keywords: ["视频", "短剧", "电影", "角色", "穿越", "剧情", "大片"],
    prompt:
      "电影海报式构图，前中后景明确，片场灯、电影帧或故事场景作为核心视觉物；电影蓝、暖橙、暗红综合色，人物脸部有可辨认主光。"
  },
  {
    id: "real-workspace-documentary",
    name: "真实场景纪实风",
    keywords: ["亲测", "真实", "体验", "办公", "现场", "我试了"],
    prompt:
      "真实创作现场和工作台，电脑、手机、纸张和屏幕构成工作流痕迹；自然窗光、桌面灯或屏幕光，画面真实但有商业封面排版。"
  }
];

function normalizeBaseUrl(value: string) {
  const cleaned = (value || "https://linkapi.ai/v1").trim().replace(/\/+$/, "");
  return cleaned.endsWith("/v1") ? cleaned : `${cleaned}/v1`;
}

function pickStyle(script: string) {
  const text = script.toLowerCase();
  let best = styleDocs[0];
  let bestScore = -1;
  for (const style of styleDocs) {
    const score = style.keywords.reduce((total, keyword) => {
      return total + (text.includes(keyword.toLowerCase()) ? 1 : 0);
    }, 0);
    if (score > bestScore) {
      best = style;
      bestScore = score;
    }
  }
  return best;
}

function localCopy(script: string, styleName: string): CopyResult {
  const compact = script.replace(/\s+/g, " ").trim();
  const hook = compact.slice(0, 64);
  return {
    titles: ["AI广告图", "截图变大片", "这个功能真省事"],
    post: `这次试了一个很适合内容创作者和运营的 AI 工作流。\n\n核心就是把普通素材快速变成能直接发布的封面/广告图，不用从 0 搭版式，也不用反复调光影。\n\n我会先看原始脚本里的卖点，再抓一个最容易被理解的视觉钩子，最后用封面把结果做得更明确：观众一眼知道它解决什么问题。\n\n适合用在小红书封面、电商素材、产品功能演示和短视频首帧。${hook ? `\n\n这条内容的重点：${hook}` : ""}`,
    warning: `文案模型调用失败，已用本地规则生成文案。封面风格仍按「${styleName}」处理。`
  };
}

async function generateCopy({
  apiKey,
  baseUrl,
  model,
  script,
  styleName
}: {
  apiKey: string;
  baseUrl: string;
  model: string;
  script: string;
  styleName: string;
}): Promise<CopyResult> {
  try {
    const response = await fetch(`${baseUrl}/chat/completions`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        model,
        temperature: 0.7,
        messages: [
          {
            role: "system",
            content:
              "你是中文短视频封面和小红书文案助手。只返回 JSON，字段为 titles: string[] 和 post: string。标题要短，正文约 200 字。"
          },
          {
            role: "user",
            content: `脚本：${script}\n自动匹配封面风格：${styleName}\n请生成 5 个小红书标题候选和一段正文。`
          }
        ]
      }),
      signal: AbortSignal.timeout(45000)
    });
    if (!response.ok) {
      throw new Error(await response.text());
    }
    const payload = await response.json();
    const content = payload.choices?.[0]?.message?.content || "";
    const jsonText = content.match(/\{[\s\S]*\}/)?.[0] || content;
    const parsed = JSON.parse(jsonText);
    return {
      titles: Array.isArray(parsed.titles) ? parsed.titles.slice(0, 5) : [],
      post: String(parsed.post || "").trim()
    };
  } catch {
    return localCopy(script, styleName);
  }
}

function buildCoverPrompt(script: string, style: (typeof styleDocs)[number], copy: CopyResult, hasFace: boolean) {
  const mainTitle = copy.titles[0] || "AI广告图";
  const subtitle = copy.titles[1] || "一键变大片";
  const identity = hasFace
    ? "第一张输入图片是人物身份锚点，必须保持同一本人脸，三张候选都要清晰出现本人脸。"
    : "不使用真人身份锚点，可以生成讲解者、产品界面或结果画面，但不要使用真实公众人物。";
  return [
    "生成 1 张 3:4 竖版短视频封面，高点击感、强层级、移动端一眼可读。",
    identity,
    `主题脚本：${script}`,
    `主标题：${mainTitle}`,
    `副标题：${subtitle}`,
    `自动匹配风格：${style.name}。${style.prompt}`,
    "画面重点：标题最大，人物或产品第二，核心道具第三，背景最后。核心视觉物要直接解释脚本卖点。",
    "避免假 logo、水印、二维码、不可读小字、过多 UI 卡片、陌生人脸、金属字和蓝紫科技泛光。"
  ].join("\n");
}

async function callImageApi({
  apiKey,
  baseUrl,
  model,
  prompt,
  faceImage
}: {
  apiKey: string;
  baseUrl: string;
  model: string;
  prompt: string;
  faceImage: File | null;
}) {
  const endpoint = faceImage ? `${baseUrl}/images/edits` : `${baseUrl}/images/generations`;
  const body = new FormData();
  body.set("model", model);
  body.set("prompt", prompt);
  body.set("size", "1024x1536");
  body.set("quality", "low");
  body.set("n", "1");
  body.set("output_format", "png");
  if (faceImage) {
    body.set("image", faceImage, faceImage.name || "face.png");
  }

  const response = await fetch(endpoint, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`
    },
    body,
    signal: AbortSignal.timeout(150000)
  });

  if (!response.ok) {
    throw new Error((await response.text()).slice(0, 700));
  }

  const payload = await response.json();
  const first = payload.data?.[0];
  if (first?.b64_json) {
    return `data:image/png;base64,${first.b64_json}`;
  }
  if (first?.url) {
    return first.url;
  }
  throw new Error("图片接口没有返回 b64_json 或 url。");
}

export async function POST(request: Request) {
  try {
    const form = await request.formData();
    const apiKey = String(form.get("apiKey") || "").trim();
    const script = String(form.get("script") || "").trim();
    const baseUrl = normalizeBaseUrl(String(form.get("baseUrl") || ""));
    const textModel = String(form.get("textModel") || "gpt-4o-mini").trim();
    const imageModel = String(form.get("imageModel") || "gpt-image-2").trim();
    const fallbackImageModel = String(form.get("fallbackImageModel") || "gpt-image-2-c").trim();
    const faceValue = form.get("faceImage");
    const faceImage = faceValue instanceof File && faceValue.size > 0 ? faceValue : null;

    if (!apiKey) {
      return NextResponse.json({ error: "缺少 API key。" }, { status: 400 });
    }
    if (script.length < 20) {
      return NextResponse.json({ error: "脚本内容太短。" }, { status: 400 });
    }

    const style = pickStyle(script);
    const copy = await generateCopy({ apiKey, baseUrl, model: textModel, script, styleName: style.name });
    const coverPrompt = buildCoverPrompt(script, style, copy, Boolean(faceImage));
    const models = [imageModel, fallbackImageModel].filter(Boolean);
    const uniqueModels = Array.from(new Set(models));
    const attempts: ImageAttempt[] = [];
    let imageUrl: string | null = null;
    let imageModelUsed: string | null = null;

    for (const model of uniqueModels) {
      try {
        imageUrl = await callImageApi({ apiKey, baseUrl, model, prompt: coverPrompt, faceImage });
        imageModelUsed = model;
        attempts.push({ model, ok: true });
        break;
      } catch (error) {
        attempts.push({
          model,
          ok: false,
          error: error instanceof Error ? error.message : "调用失败"
        });
      }
    }

    if (!imageUrl) {
      return NextResponse.json(
        {
          error: "封面生成失败。",
          attempts,
          titles: copy.titles,
          post: copy.post,
          textWarning: copy.warning
        },
        { status: 502 }
      );
    }

    return NextResponse.json({
      titles: copy.titles,
      post: copy.post,
      styleName: style.name,
      coverPrompt,
      imageUrl,
      imageModelUsed,
      attempts,
      textWarning: copy.warning
    });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "请求处理失败。" },
      { status: 500 }
    );
  }
}
