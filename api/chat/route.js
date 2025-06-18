export async function POST(req) {
  try {
    const { message } = await req.json();

    const payload = {
      model: "gpt-3.5-turbo", // 或 "gpt-4" 你有哪个 key 就写哪个
      messages: [
        { role: "system", content: "You are a helpful assistant." },
        { role: "user", content: message }
      ],
      temperature: 0.7
    };

    // 发起 OpenAI 请求
    const openaiRes = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${process.env.OPENAI_API_KEY}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify(payload)
    });

    const data = await openaiRes.json();

    // 打印调试日志
    console.log("🎯 请求体 payload:", JSON.stringify(payload, null, 2));
    console.log("📩 GPT 响应:", JSON.stringify(data, null, 2));

    const replyContent = data?.choices?.[0]?.message?.content;

    return new Response(JSON.stringify({
      reply: replyContent ?? "GPT 没有返回内容。",
      raw: data
    }), {
      headers: { "Content-Type": "application/json" }
    });

  } catch (error) {
    console.error("❌ 错误:", error);
    return new Response(JSON.stringify({
      reply: "请求失败，请检查后端日志。",
      error: String(error)
    }), {
      status: 500,
      headers: { "Content-Type": "application/json" }
    });
  }
}
