import {
  pathParse,
  Router,
  WebApp,
} from "https://deno.land/x/denorest@v1.0beta/mod.js";

const app = new WebApp();
const router = new Router();

app.allowMoreExp(true);

// set default headers
app.headers({
  "Content-Type": "text/html",
});

// home router
router.all("/", async (req, res) => {
  const html = await Deno.readTextFile("index.html");
  res.reply = html;
});

// static file
router.all("/:dir/:file", async (req, res) => {
  const p = pathParse(req);
  let text = "";
  try {
    text = await Deno.readTextFile(p.params.dir + "/" + p.params.file);
  } catch (_e) {}
  res.reply = text;
});

app.set(router);
app.listen(3001);