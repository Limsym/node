'use client';

import { useState } from "react";

export default function HelloPage() {
  const [message, setMessage] = useState("");
  const [reply, setReply] = useState("");
  const [raw, setRaw] = useState(null); // ✅ 新增

  async function handleSubmit(e) {
    e.preventDefault();
    setReply("思考中...");
    setRaw(null);

    const res = await fetch("/api/chat", {
      method: "POST",
      body: JSON.stringify({ message }),
      headers: { "Content-Type": "application/json" }
    });

    const data = await res.json();
    setReply(data.reply);
    setRaw(data.raw); // ✅ 新增
  }

  return (
    <div style={{ padding: "2rem" }}>
      <h1>Hello GPT</h1>
      <form onSubmit={handleSubmit}>
        <input
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="输入你的问题..."
          style={{ width: "300px" }}
        />
        <button type="submit">发送</button>
      </form>

      <h3>GPT 回复：</h3>
      <pre>{reply}</pre>

      {raw && (
        <>
          <h3>🔍 GPT 原始响应（调试用）：</h3>
          <pre style={{ backgroundColor: "#f0f0f0", padding: "1rem", overflowX: "auto", maxHeight: "300px" }}>
            {JSON.stringify(raw, null, 2)}
          </pre>
        </>
      )}
    </div>
  );
}
