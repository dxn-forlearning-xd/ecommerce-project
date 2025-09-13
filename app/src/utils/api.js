export async function fetchWithTimeoutAndFallback(
  remoteUrl,
  { timeout = 5000 } = {}
) {
  const controller = new AbortController();
  const id = setTimeout(() => controller.abort(), timeout);

  try {
    const res = await fetch(remoteUrl, { signal: controller.signal });
    clearTimeout(id);
    if (!res.ok) throw new Error('Network error');
    return await res.json();
  } catch (err) {
    clearTimeout(id);
    console.warn('Remote fetch failed, fallback to local JSON', err);
    const res = await fetch('/products-fallback.json');
    return await res.json();
  }
}
