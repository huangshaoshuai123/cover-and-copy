# Style System

Use this reference to choose a cover style. Do not default to retro unless the topic actually calls for it. If the user specifies a style, follow the user unless it conflicts with safety or the face-reference constraints.

## Global Style Rules

- The style must serve the topic, not decorate it.
- Keep the same identity reference across all styles.
- Title, person, core object, and background must feel designed as one cover.
- Use real materials, plausible light sources, lens choices, layout, and typography to create quality.
- Avoid generic blue-purple tech glow, cyber neon, HUD overlays, data streams, particle explosions, energy rings, and metal title effects unless the user explicitly asks and the topic truly needs them.
- Avoid one-note palettes. Choose a dominant palette plus a contrasting accent.
- Success reference images are useful for hierarchy and commercial impact; they are not mandatory style defaults.

## Built-In Styles

### 1. 复古商业海报风

Best for: 千禧年、怀旧、短剧、娱乐向、强叙事、街区或片场感。

Visual grammar: 粗海报标题、旧招牌、胶片颗粒、真实灯箱、雨后反光、纸张磨损、暖色片场光。

Avoid: Every AI tool cover becoming a nostalgic street scene.

### 2. 科技产品发布风

Best for: AI App、新模型、新功能、产品发布、工具能力展示。

Visual grammar: 精准产品摄影、清晰屏幕、发布会级构图、干净空间、玻璃/亚克力/磨砂材质、克制环境光、清晰功能焦点。

Avoid: 蓝紫光束、科幻舱、HUD、数据雨、抽象 AI 大脑。

### 3. 高级杂志封面风

Best for: 趋势分析、深度评测、人物观点、设计判断、商业观察。

Visual grammar: 大面积留白或稳定版心、强人像、编辑部标题、质感纸面、克制色彩、少量高级道具。

Avoid: 过多贴纸、过度综艺化、夸张表情。

### 4. 真实场景纪实风

Best for: 体验、实测、生活化工具使用、真实办公/创作过程。

Visual grammar: 真实桌面、自然光、手持设备、电脑屏幕、工作流痕迹、轻微抓拍感但商业化排版。

Avoid: 棚拍假感、纯背景、没有使用场景的产品悬浮。

### 5. 电影感大片风

Best for: 穿越、剧情、未来感、强视觉结果、AI 视频或短剧主题。

Visual grammar: 明确场景、镜头纵深、电影灯光、前中后景、雾气或反光可少量使用，标题像片名海报。

Avoid: 失控粒子、廉价爆炸、魔法阵式光效。

### 6. 清爽知识博主风

Best for: 教程、方法论、工作流、效率工具、设计技巧。

Visual grammar: 清晰标题、屏幕或白板、步骤感但不复杂、干净桌面、明亮色彩、信息分区明确。

Avoid: 变成 PPT 截图或密密麻麻的流程图。

### 7. 夸张综艺冲击风

Best for: 反差测评、吐槽、惊喜发现、强情绪标题、强对比结果。

Visual grammar: 大表情、大道具、对勾/叉号、前后对比、明亮撞色、贴纸标题、强透视。

Avoid: 表情失真、五官跑偏、低质感网红海报。

### 8. 极简产品图风

Best for: 单一产品、App 页面、功能亮点、模型能力需要被清楚看见。

Visual grammar: 一个主产品、一个清晰结果、少量标题、干净背景、材质和阴影建立高级感。

Avoid: 空到没有点击信息，或像普通电商白底图。

## Selection Heuristics

- If the input emphasizes "上线、新功能、模型接入、里程碑", prefer 科技产品发布风 or 极简产品图风.
- If the input emphasizes "1 分钟学会、工作流、3 招", prefer 清爽知识博主风.
- If the input emphasizes "电影质感、短剧、穿越、角色出演", prefer 电影感大片风.
- If the input emphasizes "千禧年、怀旧、街区、复古", prefer 复古商业海报风.
- If the input emphasizes "深度评测、趋势判断、观点", prefer 高级杂志封面风.
- If the input emphasizes "亲测、体验、我发现", prefer 真实场景纪实风.
- If the input emphasizes "太惊艳、反差、普通 vs 高级", prefer 夸张综艺冲击风.

## Style Output

After choosing a style, define:

```text
风格名称：
选择理由：
主色调：
强调色：
标题字体质感：
光线：
核心材质：
背景世界：
避免元素：
```
