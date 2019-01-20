import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  BaseEntity,
  ManyToMany,
  ManyToOne,
  JoinColumn,
  JoinTable
} from "typeorm";
import { MaxLength } from "class-validator";
import { Group } from "./Group";

@Entity()
export class User extends BaseEntity {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @ManyToMany(type => Group, group => group.users)
  @JoinTable()
  groups: Group[];

  @Column({ unique: true })
  @MaxLength(100)
  name: string;
}
