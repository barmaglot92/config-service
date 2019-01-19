import "reflect-metadata";
import { createConnection } from "typeorm";
import * as Koa from "koa";
import * as bodyParser from "koa-bodyparser";
import groupsRouter from "./routes/groups";
import projectsRouter from "./routes/projects";
import envsRouter from "./routes/envs";
import usersRouter from "./routes/users";

var app = new Koa();
app.use(bodyParser());

app.use(async (ctx, next) => {
  try {
    await next();
  } catch (err) {
    ctx.status = err.statusCode || err.status || 500;
    if (ctx.status === 500) {
      console.error(err);
      return;
    }
    ctx.body = {
      statusCode: ctx.status,
      message: err.message,
      error: err.error
    };
  }
});

createConnection()
  .then(async connection => {
    app.listen(3000);
    console.log("listening on port 3000");
  })
  .catch(error => console.log(error));

app.use(groupsRouter.routes()).use(groupsRouter.allowedMethods());
app.use(projectsRouter.routes()).use(projectsRouter.allowedMethods());
app.use(envsRouter.routes()).use(envsRouter.allowedMethods());
app.use(usersRouter.routes()).use(usersRouter.allowedMethods());
