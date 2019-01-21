import * as Router from "koa-router";
import { getRepository } from "typeorm";
import { Group } from "../entity/Group";
import { validate } from "class-validator";
import * as Boom from "boom";
import { User } from "../entity/User";
import { boomError, internalError } from "../utils";
import { In } from "typeorm";

const router = new Router({ prefix: "/users" });

router.post("/save", async ctx => {
  const user = new User();
  const { body } = ctx.request;
  Object.assign(user, body);

  const errors = await validate(user);

  if (errors.length > 0) {
    throw boomError(Boom.badRequest(errors));
  }

  const existedUser = await User.find({ name: user.name });
  if (existedUser.length > 0) {
    throw boomError(Boom.conflict(`User "${user.name}" already exists`));
  }

  try {
    const groups = await Group.find({ name: In("test") });

    ctx.body = groups;
    // const savedUser = await user.save();
    // ctx.body = savedUser;
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
