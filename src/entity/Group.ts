import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  BaseEntity,
  ManyToMany
} from "typeorm";
import { Project } from "./Project";
import { MaxLength } from "class-validator";
import { User } from "./User";

@Entity()
export class Group extends BaseEntity {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @ManyToMany(type => User, user => user.groups)
  users: User[];

  @Column({ unique: true })
  @MaxLength(100)
  name: string;

  @OneToMany(type => Project, project => project.group)
  projects: Project[];
}
