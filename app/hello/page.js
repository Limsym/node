'use client'
import { useState } from 'react';

export default function HelloPage() {
  const [input, setInput] = useState('');
  const [reply, setReply] = useState('');

  const askGPT = async () => {
    const res = await fetch('/api/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message: input })
    });

    const data = await res.json();
    setReply(data.reply);
  };

  return (
    <div style={{ padding: '2rem', fontFamily: 'sans-serif' }}>
      <h1>与 GPT 对话</h1>
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="请输入你的问题"
        style={{ width: '60%', padding: '0.5rem', marginRight: '1rem' }}
      />
      <button onClick={askGPT}>发送</button>
      <p style={{ marginTop: '1rem' }}>AI 回复：{reply}</p>
    </div>
  );
}
