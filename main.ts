import {
  pathParse,
  Req,
  Res,
  Router,
  WebApp,
} from "https://deno.land/x/denorest@v2.0/mod.ts";

const app = new WebApp();
const router = new Router();

app.allowMoreExp(true);

// set default headers
router.use((_, res: Res) => {
  res.headers = {
    "Content-Type": "text/html",
  };
});

// home router
router.all("/", async (_, res: Res) => {
  res.reply = await Deno.readTextFile("index.html");
});

// set content-type
const setContentType = (req: Req, res: Res) => {
  const p = req.url?.pathname.split(".");
  if (p) {
    if (p[p.length - 1] === "css") {
      res.headers = {
        "Content-Type": "text/css",
      };
    } else if (p[p.length - 1] === "js") {
      res.headers = {
        "Content-Type": "application/javascript",
      };
    }
  }
};

// static file
router.all("/:dir/:file", async (req: Req, res: Res) => {
  const p = pathParse(req);
  let text = "";
  try {
    text = await Deno.readTextFile(p.params.dir + "/" + p.params.file);
  } catch (_e) {
    console.log("File Not Found");
  }
  res.reply = text;
}, [setContentType]);

app.set(router);
app.listen(3001);
