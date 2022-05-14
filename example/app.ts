import {
  bodyParse,
  Req,
  Res,
  Router,
  WebApp,
} from "https://deno.land/x/denorest@v2.0/mod.ts";
import birdRouter from "./birds.ts";

const app = new WebApp();
app.headers({
  "Content-Type": "text/html",
});

// create router
const router = new Router();

// define the home page route
// GET method route
router.get("/", (req: Req, res: Res) => {
  res.reply = {
    page: "Home",
    method: "GET",
  };
});

// POST method route
router.post("/", async (req: Req, res: Res) => {
  // using bodyParse() function
  const body = await bodyParse(req);
  console.log(body);
  res.reply = {
    page: "Home",
    method: "POST",
  };
});

// define the about page route
router.all("/about", (_req: Req, res: Res) => {
  res.reply = {
    page: "About",
  };
});

router.pre("/:birdName", birdRouter);

// assign router
app.set(router);

app.listen(8080);
