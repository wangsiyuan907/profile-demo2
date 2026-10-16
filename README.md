# Demo4 portfolio deployment

This repository deploys the Demo4 portfolio to the existing Cloudflare Worker
`profile-demo2` and the custom domain `portfolio.siyuan.design`.

- Public site files are in `site/`.
- Images and videos are kept at their original quality; deployment does not
  transcode or recompress them.
- The 74 MB file `asset/flora/process-final-white.mp4` exceeds the Workers
  static-asset per-file limit, so it is stored losslessly in the existing R2
  bucket at `demo4/asset/flora/process-final-white.mp4` and streamed by
  `worker.js` with byte-range support.
- Internal QA screenshots, MasterGo references, and project guidance documents
  are intentionally excluded from the public site.

Deploy with:

```sh
npx wrangler deploy
```
