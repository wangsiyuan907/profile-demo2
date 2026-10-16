const LARGE_VIDEO_PATH = "/asset/flora/process-final-white.mp4";
const LARGE_VIDEO_KEY = "demo4/asset/flora/process-final-white.mp4";

function parseRange(rangeHeader, size) {
  if (!rangeHeader || !rangeHeader.startsWith("bytes=")) return null;

  const [startText, endText] = rangeHeader.slice(6).split("-", 2);
  if (!startText && !endText) return null;

  if (!startText) {
    const suffixLength = Number(endText);
    if (!Number.isFinite(suffixLength) || suffixLength <= 0) return null;
    const length = Math.min(suffixLength, size);
    return { offset: size - length, length };
  }

  const offset = Number(startText);
  if (!Number.isFinite(offset) || offset < 0 || offset >= size) return null;

  const requestedEnd = endText ? Number(endText) : size - 1;
  if (!Number.isFinite(requestedEnd) || requestedEnd < offset) return null;
  const end = Math.min(requestedEnd, size - 1);
  return { offset, length: end - offset + 1 };
}

async function serveLargeVideo(request, env) {
  const head = await env.PORTFOLIO_ASSETS.head(LARGE_VIDEO_KEY);
  if (!head) return new Response("Not found", { status: 404 });

  const range = parseRange(request.headers.get("range"), head.size);
  const object = await env.PORTFOLIO_ASSETS.get(
    LARGE_VIDEO_KEY,
    range ? { range } : undefined,
  );
  if (!object) return new Response("Not found", { status: 404 });

  const headers = new Headers();
  object.writeHttpMetadata(headers);
  headers.set("accept-ranges", "bytes");
  headers.set("cache-control", "public, max-age=31536000, immutable");
  headers.set("etag", object.httpEtag);

  let status = 200;
  if (range) {
    const end = range.offset + range.length - 1;
    headers.set("content-range", `bytes ${range.offset}-${end}/${head.size}`);
    headers.set("content-length", String(range.length));
    status = 206;
  } else {
    headers.set("content-length", String(head.size));
  }

  return new Response(request.method === "HEAD" ? null : object.body, {
    status,
    headers,
  });
}

export default {
  async fetch(request, env) {
    const url = new URL(request.url);

    if (url.pathname === LARGE_VIDEO_PATH) {
      return serveLargeVideo(request, env);
    }

    return env.ASSETS.fetch(request);
  },
};
