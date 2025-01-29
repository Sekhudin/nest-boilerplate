import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
} from "typeorm";
import { User } from "src/modules/users/entities/user.entity";
import { TableName } from "src/configs/database.config";

@Entity({ name: TableName.device })
export class Device {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  name: string;

  @Column()
  type: string;

  @Column()
  os: string;

  @Column({ nullable: true })
  ip: string | null;

  @Column({ nullable: true })
  browser: string | null;

  @Column({ nullable: true })
  location: string | null;

  @Column({ default: false })
  isTrusted: boolean;

  @Column({ nullable: true, type: "timestamp" })
  lastActiveAt: Date | null;

  @ManyToOne(() => User, (user) => user)
  user: User;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
