import fetch from 'isomorphic-unfetch';

export async function postDiscordWebhook({
  url,
  content,
}: {
  url: string;
  content: string;
}): Promise<boolean> {
  const response = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ content }),
  });
  return response.ok;
}
