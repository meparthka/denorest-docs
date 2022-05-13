/** @jsx h */
/// <reference no-default-lib="true"/>
/// <reference lib="dom" />
/// <reference lib="dom.asynciterable" />
/// <reference lib="deno.ns" />

import {
  pathParse,
  Router,
  WebApp,
} from "https://deno.land/x/denorest@v1.0beta/mod.js";
import { h, renderSSR } from "https://deno.land/x/nano_jsx@v0.0.20/mod.ts";
import App from "./view/home.jsx";

const app = new WebApp();
const router = new Router();

app.allowMoreExp(true);

// set default headers
app.headers({
  "Content-Type": "text/html",
});

// home router
router.all("/", async (req, res) => {
  const html = renderSSR(<App />);
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
