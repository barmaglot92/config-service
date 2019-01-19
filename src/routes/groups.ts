import * as Router from "koa-router";
import { getRepository } from "typeorm";
import { Group } from "../entity/Group";
import { validate } from "class-validator";
import * as Boom from "boom";

const router = new Router({ prefix: "/groups" });

router.post("/save", async ctx => {
  const group = new Group();
  Object.assign(group, ctx.request.body);

  const errors = await validate(group);

  if (errors.length > 0) {
    ctx.body = Boom.badRequest(errors);
    return;
  }

  const existedGroup = await Group.find({ name: group.name });
  if (existedGroup.length > 0) {
    ctx.body = Boom.conflict(`Group "${group.name}" already exists`);
    return;
  }

  try {
    const savedGroup = await group.save();
    ctx.body = savedGroup;
  } catch (err) {
    ctx.body = Boom.internal(err.detail);
  }
});

router.get("/", async ctx => {
  const groupRepo = getRepository(Group);
  const group = await groupRepo.find({ ...ctx.request.query });
  ctx.body = group;
});

export default router;
