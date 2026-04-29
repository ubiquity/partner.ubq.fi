import { serveDir } from "jsr:@std/http/file-server";

const root = Deno.env.get("STATIC_DIR") ?? "out";

Deno.serve(async (req) => {
  const isHead = req.method === "HEAD";
  const request = isHead
    ? new Request(req.url, { method: "GET", headers: req.headers })
    : req;
  const response = await serveDir(request, { fsRoot: root, quiet: true });

  if (isHead) {
    return new Response(null, {
      status: response.status,
      headers: response.headers,
    });
  }

  return response;
});
