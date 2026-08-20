export default {
  async fetch(request, env) {
    const url = new URL(request.url);

    if (url.pathname.startsWith('/assets/')) {
      const key = decodeURIComponent(url.pathname.slice('/assets/'.length));
      const object = await env.PORTFOLIO_ASSETS.get(key);

      if (object) {
        const headers = new Headers();
        object.writeHttpMetadata(headers);
        headers.set('etag', object.httpEtag);
        headers.set('cache-control', 'public, max-age=31536000, immutable');
        return new Response(object.body, { headers });
      }
    }

    return env.ASSETS.fetch(request);
  }
};
