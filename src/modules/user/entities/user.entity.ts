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
import { z, zr } from "src/utils/validation";
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

  @Column({ default: false })
  isEmailVerified: boolean;

  @Column({ nullable: true, length: 128 })
  emailVerificationToken: string;

  @Column({ type: "timestamp", nullable: true })
  emailVerificationTokenExpiresAt: Date;

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

  static get dto() {
    return z.object({
      id: z.uuidv4(),
      email: z.email(),
      password: zr.password(),
      isActive: z.boolean(),
      isEmailVerified: z.boolean(),
      emailVerificationToken: z.string().length(6),
      emailVerificationTokenExpiresAt: z.date(),
      get role() {
        return Role.dto;
      },
      get authMethods() {
        return z.array(UserAuth.dto);
      },
      get authHistories() {
        return z.array(AuthHistory.dto);
      },
      get tokens() {
        return z.array(Token.dto);
      },
      timestamp: z.date(),
      updatedAt: z.date(),
    });
  }
}
