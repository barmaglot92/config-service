import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  BaseEntity
} from "typeorm";
import { Project } from "./Project";
import { MaxLength } from "class-validator";
import { User } from "./User";

@Entity()
export class Group extends BaseEntity {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @OneToMany(type => User, user => user.group)
  users: User[];

  @Column({ unique: true })
  @MaxLength(100)
  name: string;

  @OneToMany(type => Project, project => project.group)
  projects: Project[];
}
