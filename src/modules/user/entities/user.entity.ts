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
import { Otp } from "src/modules/otp/entities/otp.entity";
import { Role } from "src/modules/role/entities/role.entity";
import { Token } from "src/modules/token/entities/token.entity";
import { z, zr } from "src/utils/validation";
import { databaseConfig } from "src/config/database.config";

@Entity(databaseConfig.TABLES.USER)
export class User {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ unique: true })
  email: string;

  @Column({ default: true })
  isActive: boolean;

  @Column({ default: false })
  isEmailVerified: boolean;

  @ManyToOne(() => Role)
  role: Role;

  @OneToMany(() => UserAuth, (auth) => auth.user)
  authMethods: UserAuth[];

  @OneToMany(() => AuthHistory, (authHistory) => authHistory.user)
  authHistories: AuthHistory[];

  @OneToMany(() => Token, (token) => token.user)
  tokens: Token[];

  @OneToMany(() => Otp, (otp) => otp.user)
  otpd: Otp[];

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
      get otps() {
        return z.array(Otp.dto);
      },
      timestamp: z.date(),
      updatedAt: z.date(),
    });
  }
}
