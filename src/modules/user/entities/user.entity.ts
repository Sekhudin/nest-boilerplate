import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { ErrorCode } from "src/shared/enums/error-code.enum";
import { AuthHistory } from "src/modules/auth/entities/auth-history.entity";
import { UserAuth } from "src/modules/auth/entities/user-auth.entity";
import { Otp } from "src/modules/otp/entities/otp.entity";
import { Role } from "src/modules/role/entities/role.entity";
import { Token } from "src/modules/token/entities/token.entity";
import { z } from "src/utils/validation";
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

  @OneToOne(() => UserAuth, (userAuth) => userAuth.user)
  @JoinColumn()
  authMethod: UserAuth;

  @OneToMany(() => AuthHistory, (authHistory) => authHistory.user)
  authHistories: AuthHistory[];

  @OneToMany(() => Token, (token) => token.user)
  tokens: Token[];

  @OneToMany(() => Otp, (otp) => otp.user)
  otps: Otp[];

  @CreateDateColumn()
  timestamp: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  static get dto() {
    return z.object({
      id: z.uuidv4(ErrorCode.STRING_INVALID_UUID),
      email: z.email(ErrorCode.STRING_INVALID_EMAIL),
      isActive: z.boolean(ErrorCode.BOOLEAN_INVALID),
      isEmailVerified: z.boolean(ErrorCode.BOOLEAN_INVALID),
      get role() {
        return Role.dto;
      },
      get authMethod() {
        return UserAuth.dto;
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
      timestamp: z.date(ErrorCode.DATE_INVALID),
      updatedAt: z.date(ErrorCode.DATE_INVALID),
    });
  }
}
