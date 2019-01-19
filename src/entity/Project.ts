import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  JoinTable,
  ManyToMany,
  JoinColumn,
  ManyToOne,
  BaseEntity
} from "typeorm";
import { Environment } from "./Environment";
import { Group } from "./Group";

@Entity()
export class Project extends BaseEntity {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @ManyToOne(type => Group, group => group.projects)
  group: Group;

  @Column()
  name: string;

  @OneToMany(type => Environment, environment => environment.project)
  envs: Environment[];
}
