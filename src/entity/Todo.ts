import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { User } from "../entity/User.js";
import { Relation } from "typeorm";



@Entity()
export class Todo {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({type: "varchar"})
  title!: string;

  @Column({ type: "text", nullable: true })
  description?: string;

  @Column({ type: "boolean", default: false })
  completed!: boolean;

  @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
  createdAt!: Date;

  @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP", onUpdate: "CURRENT_TIMESTAMP" })
  updatedAt!: Date;
@ManyToOne(() => User, user => user.todos)
  user!: Relation<User>;
}