import * as Router from "koa-router";
import { getRepository } from "typeorm";
import { Group } from "../entity/Group";
import { validate } from "class-validator";
import * as Boom from "boom";
import { User } from "../entity/User";
import { boomError, internalError } from "../utils";

const router = new Router({ prefix: "/users" });

router.post("/save", async ctx => {
  const user = new User();
  Object.assign(user, ctx.request.body);

  const errors = await validate(user);

  if (errors.length > 0) {
    throw boomError(Boom.badRequest(errors));
  }

  const existedGroup = await Group.find({ name: user.name });
  if (existedGroup.length > 0) {
    throw boomError(Boom.conflict(`User "${user.name}" already exists`));
  }

  try {
    const savedUser = await user.save();
    ctx.body = savedUser;
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
