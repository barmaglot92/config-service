import * as Router from "koa-router";
import { getRepository } from "typeorm";
import { Group } from "../entity/Group";
import { validate } from "class-validator";
import * as Boom from "boom";
import { boomError, internalError } from "../utils";

const router = new Router({ prefix: "/groups" });

router.post("/save", async ctx => {
  const group = new Group();
  Object.assign(group, ctx.request.body);

  const errors = await validate(group);

  if (errors.length > 0) {
    throw boomError(Boom.badRequest(errors));
  }

  const existedGroup = await Group.find({ name: group.name });
  if (existedGroup.length > 0) {
    throw boomError(Boom.conflict(`User "${group.name}" already exists`));
  }

  try {
    const savedGroup = await group.save();
    ctx.body = savedGroup;
  } catch (err) {
    throw internalError(ctx, err);
  }
});

router.get("/", async ctx => {
  const groupRepo = getRepository(Group);
  const group = await groupRepo.find({ ...ctx.request.query });
  ctx.body = group;
});

export default router;
