import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  BaseEntity
} from "typeorm";
import { MaxLength } from "class-validator";
import { Group } from "./Group";

@Entity()
export class User extends BaseEntity {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @OneToMany(type => Group, group => group.users)
  group: Group;

  @Column({ unique: true })
  @MaxLength(100)
  name: string;
}
