import * as Router from "koa-router";
import { getRepository } from "typeorm";
import { Project } from "../entity/Project";
import { Group } from "../entity/Group";

const router = new Router({ prefix: "/projects" });

router.post("/save", async (ctx, next) => {
  const projectRepo = getRepository(Project);
  const groupRepo = getRepository(Group);

  const group = await groupRepo.findOne({ id: ctx.request.body.groupId });

  const project = await projectRepo.save({
    ...ctx.request.body,
    group
  });
  ctx.body = project.id;
});

router.get("/", async (ctx, next) => {
  // check user can get projects only from own group
  const projectRepo = getRepository(Project);
  const project = await projectRepo.find({ ...ctx.request.query });
  ctx.body = project;
});

export default router;
