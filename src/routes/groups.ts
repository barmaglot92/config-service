import * as Router from "koa-router";
import { getRepository } from "typeorm";
import { Group } from "../entity/Group";

const router = new Router({ prefix: "/groups" });

router.post("/save", async (ctx, next) => {
  const groupRepo = getRepository(Group);
  const group = await groupRepo.save(ctx.request.body);
  ctx.body = group.id;
});

router.get("/", async (ctx, next) => {
  const groupRepo = getRepository(Group);
  const group = await groupRepo.find({ ...ctx.request.query });
  ctx.body = group;
});

export default router;
