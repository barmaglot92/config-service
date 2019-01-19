import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  ManyToMany
} from "typeorm";
import { Environment } from "./Environment";
import { Project } from "./Project";

@Entity()
export class Configuration {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column("text")
  json: string;

  @Column()
  projectId: string;

  @Column()
  envId: string;
}
