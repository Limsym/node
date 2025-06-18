export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const name = searchParams.get('name') || '冷世聪';

  return new Response(
    JSON.stringify({ message: `你好，${name}！` }),
    { headers: { 'Content-Type': 'application/json' } }
  );
}
