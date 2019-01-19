import { Column, Entity, PrimaryGeneratedColumn, BaseEntity } from "typeorm";

@Entity()
export class Configuration extends BaseEntity {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column("text")
  json: string;

  @Column()
  projectId: string;

  @Column()
  envId: string;
}
