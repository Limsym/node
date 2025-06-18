export async function POST(request) {
  const body = await request.json();
  const userMessage = body.message;

  const openaiRes = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `process_env_OPENAI_API_KEY`
    },
    body: JSON.stringify({
      model: "gpt-3.5-turbo", // 或 "gpt-4" 如果你有权限
      messages: [
        { role: "system", content: "你是一位温和聪明的AI助理，正在协助冷世聪。" },
        { role: "user", content: userMessage }
      ],
      temperature: 0.7
    })
  });

  const data = await openaiRes.json();
  const reply = data.choices?.[0]?.message?.content ?? "GPT 没有返回内容。";

  return new Response(JSON.stringify({ reply }), {
    headers: { "Content-Type": "application/json" }
  });
}
