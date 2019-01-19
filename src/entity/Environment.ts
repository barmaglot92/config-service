import {
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
  OneToOne,
  Column,
  ManyToMany,
  BaseEntity
} from "typeorm";
import { Project } from "./Project";
import { Configuration } from "./Configuration";

@Entity()
export class Environment extends BaseEntity {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  name: string;

  @ManyToOne(type => Project, project => project.envs)
  project: Project;
}
