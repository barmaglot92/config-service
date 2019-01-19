import "reflect-metadata";
import { createConnection } from "typeorm";
import * as Koa from "koa";
import * as bodyParser from "koa-bodyparser";
import groupsRouter from "./routes/groups";
import projectsRouter from "./routes/projects";
import envsRouter from "./routes/envs";

var app = new Koa();
app.use(bodyParser());

createConnection()
  .then(async connection => {
    console.log("Connection established");
    app.use(groupsRouter.routes()).use(groupsRouter.allowedMethods());
    app.use(projectsRouter.routes()).use(projectsRouter.allowedMethods());
    app.use(envsRouter.routes()).use(envsRouter.allowedMethods());
    app.listen(3000);
  })
  .catch(error => console.log(error));
