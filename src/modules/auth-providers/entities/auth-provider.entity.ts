import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
} from "typeorm";
import { User } from "src/modules/users/entities/user.entity";
import { tableName } from "src/configs/database.config";

@Entity({ name: tableName.authProvider })
export class AuthProvider {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  provider: string;

  @Column()
  providerId: string;

  @Column({ default: null, nullable: true })
  accessToken: string;

  @Column({ default: null, nullable: true })
  refreshToken: string;

  @Column({ default: null, nullable: true, type: "timestamp" })
  expiresAt: Date;

  @ManyToOne(() => User, (user) => user)
  user: User;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
