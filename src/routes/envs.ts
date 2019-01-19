import * as Router from "koa-router";
import { getRepository } from "typeorm";
import { Environment } from "../entity/Environment";

const router = new Router({ prefix: "/envs" });

router.post("/save", async (ctx, next) => {
  const envRepo = getRepository(Environment);
  const env = await envRepo.save(ctx.request.body);
  ctx.body = env.id;
});

router.get("/", async (ctx, next) => {
  const envRepo = getRepository(Environment);
  const env = await envRepo.find({ ...ctx.request.query });
  ctx.body = env;
});

export default router;
