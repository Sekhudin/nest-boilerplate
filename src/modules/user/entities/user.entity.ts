import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { AuthHistory } from "src/modules/auth/entities/auth-history.entity";
import { UserAuth } from "src/modules/auth/entities/user-auth.entity";
import { Role } from "src/modules/role/entities/role.entity";
import { Token } from "src/modules/token/entities/token.entity";
import { databaseConfig } from "src/config/database.config";

@Entity(databaseConfig.table.user)
export class User {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ unique: true })
  email: string;

  @Column({ nullable: true })
  password: string;

  @Column({ default: true })
  isActive: boolean;

  @ManyToOne(() => Role)
  role: Role;

  @OneToMany(() => UserAuth, (auth) => auth.user)
  authMethods: UserAuth[];

  @OneToMany(() => AuthHistory, (authHistory) => authHistory.user)
  authHistories: AuthHistory[];

  @OneToMany(() => Token, (token) => token.user)
  tokens: Token[];

  @CreateDateColumn()
  timestamp: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
