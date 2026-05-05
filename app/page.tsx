"use client";

import { FormEvent, useMemo, useState } from "react";

type GenerateResult = {
  titles: string[];
  post: string;
  styleName: string;
  coverPrompt: string;
  imageUrl: string | null;
  imageModelUsed: string | null;
  attempts: Array<{ model: string; ok: boolean; error?: string }>;
  textWarning?: string;
};

const defaultScript =
  "我做了一个 AI App 新功能演示，能把普通产品截图一键变成可发布的高质感广告图。想做一组小红书封面和发布文案，重点突出：普通截图也能一键变大片，适合设计师、电商运营和内容创作者。";

export default function Page() {
  const [apiKey, setApiKey] = useState("");
  const [baseUrl, setBaseUrl] = useState("https://linkapi.ai/v1");
  const [script, setScript] = useState(defaultScript);
  const [textModel, setTextModel] = useState("gpt-4o-mini");
  const [imageModel, setImageModel] = useState("gpt-image-2");
  const [fallbackModel, setFallbackModel] = useState("gpt-image-2-c");
  const [faceFile, setFaceFile] = useState<File | null>(null);
  const [scriptFileName, setScriptFileName] = useState("");
  const [result, setResult] = useState<GenerateResult | null>(null);
  const [message, setMessage] = useState("等待输入脚本和 API key。");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const canSubmit = useMemo(() => {
    return apiKey.trim().length > 0 && script.trim().length > 20 && !loading;
  }, [apiKey, script, loading]);

  async function onScriptFile(file: File | null) {
    if (!file) return;
    setScriptFileName(file.name);
    const text = await file.text();
    setScript(text);
  }

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setError("");
    setResult(null);
    setMessage("正在提炼脚本、匹配风格并生成封面。");

    const form = new FormData();
    form.set("apiKey", apiKey.trim());
    form.set("baseUrl", baseUrl.trim());
    form.set("script", script.trim());
    form.set("textModel", textModel.trim());
    form.set("imageModel", imageModel.trim());
    form.set("fallbackImageModel", fallbackModel.trim());
    if (faceFile) form.set("faceImage", faceFile);

    try {
      const response = await fetch("/api/generate", {
        method: "POST",
        body: form
      });
      const payload = await response.json();
      if (!response.ok) {
        throw new Error(payload.error || "生成失败");
      }
      setResult(payload);
      setMessage("生成完成。API key 只用于本次请求，服务端不会保存。");
    } catch (err) {
      setError(err instanceof Error ? err.message : "生成失败");
      setMessage("生成未完成。");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="shell">
      <div className="workspace">
        <form className="panel controls" onSubmit={submit}>
          <div className="brand">
            <div>
              <h1>Cover and Copy</h1>
              <p>上传脚本，生成小红书文案和 3:4 封面。API key 只在本次请求中使用。</p>
            </div>
            <span className="status-pill">API Key 模式</span>
          </div>

          <div className="field">
            <label htmlFor="apiKey">API key</label>
            <input
              id="apiKey"
              className="input"
              type="password"
              value={apiKey}
              onChange={(event) => setApiKey(event.target.value)}
              placeholder="sk-..."
              autoComplete="off"
            />
            <small>不要使用公共共享 key。线上请求由服务端转发，不写入数据库。</small>
          </div>

          <div className="field">
            <label htmlFor="baseUrl">API base URL</label>
            <input
              id="baseUrl"
              className="input"
              value={baseUrl}
              onChange={(event) => setBaseUrl(event.target.value)}
            />
          </div>

          <div className="grid-2">
            <div className="field">
              <label htmlFor="imageModel">封面模型</label>
              <input
                id="imageModel"
                className="input"
                value={imageModel}
                onChange={(event) => setImageModel(event.target.value)}
              />
            </div>
            <div className="field">
              <label htmlFor="fallbackModel">备用模型</label>
              <input
                id="fallbackModel"
                className="input"
                value={fallbackModel}
                onChange={(event) => setFallbackModel(event.target.value)}
              />
            </div>
          </div>

          <div className="field">
            <label htmlFor="textModel">文案模型</label>
            <input
              id="textModel"
              className="input"
              value={textModel}
              onChange={(event) => setTextModel(event.target.value)}
            />
          </div>

          <div className="field">
            <label htmlFor="scriptFile">上传脚本文件</label>
            <div className="file-box">
              <input
                id="scriptFile"
                type="file"
                accept=".txt,.md,.text"
                onChange={(event) => onScriptFile(event.target.files?.[0] || null)}
              />
              {scriptFileName ? <small>已载入：{scriptFileName}</small> : null}
            </div>
          </div>

          <div className="field">
            <label htmlFor="script">脚本内容</label>
            <textarea
              id="script"
              className="textarea"
              value={script}
              onChange={(event) => setScript(event.target.value)}
            />
          </div>

          <div className="field">
            <label htmlFor="faceImage">人脸参考图</label>
            <div className="file-box">
              <input
                id="faceImage"
                type="file"
                accept="image/png,image/jpeg,image/webp"
                onChange={(event) => setFaceFile(event.target.files?.[0] || null)}
              />
              <small>可选。上传后会走图片编辑接口；不上传则生成不锁定真人身份的封面。</small>
            </div>
          </div>

          <button className="primary" type="submit" disabled={!canSubmit}>
            {loading ? "生成中" : "生成文案和封面"}
          </button>
        </form>

        <section className="panel results">
          <div className="result-head">
            <h2>结果</h2>
            {result?.imageModelUsed ? <span className="status-pill">{result.imageModelUsed}</span> : null}
          </div>

          <div className={`message ${error ? "error" : result?.textWarning ? "warn" : ""}`}>
            {error || result?.textWarning || message}
          </div>

          <div className="output-grid">
            <div className="cover-frame">
              {result?.imageUrl ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={result.imageUrl} alt="生成封面" />
              ) : (
                <span className="empty-cover">封面将在这里显示</span>
              )}
            </div>

            <div className="copy-block">
              <div className="copy-section">
                <h3>标题候选</h3>
                {result?.titles?.length ? (
                  <ul>
                    {result.titles.map((title) => (
                      <li key={title}>{title}</li>
                    ))}
                  </ul>
                ) : (
                  <p>暂无标题。</p>
                )}
              </div>

              <div className="copy-section">
                <h3>小红书正文</h3>
                <p>{result?.post || "暂无正文。"}</p>
              </div>

              <div className="copy-section">
                <h3>封面提示词</h3>
                <p>{result?.coverPrompt || "暂无提示词。"}</p>
              </div>

              {result?.attempts?.length ? (
                <div className="copy-section">
                  <h3>模型尝试</h3>
                  <ul>
                    {result.attempts.map((attempt) => (
                      <li key={attempt.model}>
                        {attempt.model}：{attempt.ok ? "成功" : attempt.error || "失败"}
                      </li>
                    ))}
                  </ul>
                </div>
              ) : null}

              <p className="meta">API key 不会写入页面状态以外的位置；刷新页面后需要重新输入。</p>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
