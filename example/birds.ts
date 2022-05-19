import { Req, Res, Router } from "https://deno.land/x/denorest@v2.1/mod.ts";

// create router
const router = new Router();

const auth = (req: Req, res: Res) => {
  const auth = true;
  if (auth) {
    req.state.auth = true;
  } else {
    res.reply = {
      massage: "Please login",
    };
  }
};

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
}, [auth]);

export default router;
