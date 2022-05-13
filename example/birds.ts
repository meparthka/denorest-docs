import { Req, Res, Router } from "https://deno.land/x/denorest@v1.0/mod.ts";

// create router
const router = new Router();

// define the home page route
router.all("/", (req: Req, res: Res) => {
  res.reply = {
    page: "Birds Home",
  };
});

// define the about page route
router.all("/about", (req: Req, res: Res) => {
  res.reply = {
    page: "Birds About",
  };
});

export default router;
