// app/api/chat/route.js

export async function POST(request) {
  const body = await request.json();
  const userMessage = body.message;

  const apiKey = process.env.OPENAI_API_KEY;

  // 🔧 调试模式 fallback
  if (!apiKey) {
    console.warn("⚠️ OPENAI_API_KEY not set. Using mock reply.");
    return Response.json({
      reply: `测试模式开启：你输入的是“${userMessage}”`
    });
  }

  try {
    const openaiRes = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${apiKey}`
      },
      body: JSON.stringify({
        model: "gpt-3.5-turbo",
        messages: [
          {
            role: "system",
            content: "你是冷世聪的数字分身，是一位温和、理性、有结构感的 AI 助手。"
          },
          {
            role: "user",
            content: userMessage
          }
        ],
        temperature: 0.7
      })
    });

    const data = await openaiRes.json();

    // 🧪 无论环境，都打印出来 GPT 的原始响应内容
    console.log("🧠 OpenAI 返回内容:", JSON.stringify(data, null, 2));
    
    // ✅ 安全提取 reply 内容
    const reply = data?.choices?.[0]?.message?.content ?? "⚠️ GPT 没有返回内容。";
    
    return Response.json({ reply });

    

  } catch (error) {
    console.error("🔥 GPT 请求出错：", error);
    return Response.json({
      reply: "❌ 与 GPT 通信失败，请检查网络或配置。"
    });
  }
}
