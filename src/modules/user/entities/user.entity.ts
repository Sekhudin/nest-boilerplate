import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { ErrorCode } from "src/shared/enums/error-code.enum";
import { AuthHistory } from "src/modules/auth-history/entities/auth-history.entity";
import { Otp } from "src/modules/otp/entities/otp.entity";
import { Role } from "src/modules/role/entities/role.entity";
import { Token } from "src/modules/token/entities/token.entity";
import { UserAuth } from "src/modules/user-auth/entities/user-auth.entity";
import { z } from "src/utils/validation";
import { databaseConfig } from "src/config/database.config";

@Entity(databaseConfig.TABLES.USER)
export class User {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ unique: true })
  email: string;

  @Column({ default: false })
  isActive: boolean;

  @Column({ default: false })
  isEmailVerified: boolean;

  @ManyToMany(() => Role, (role) => role.users)
  @JoinTable({ name: databaseConfig.JOIN_TABLES.USER_ROLE })
  role: Role[];

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
    return User.plainDto.extend({
      role: z.array(Role.plainDto),
      authMethod: UserAuth.plainDto,
      tokens: z.array(AuthHistory.plainDto),
      otps: z.array(Otp.plainDto),
    });
  }

  static get plainDto() {
    return z.object({
      id: z.uuidv4(ErrorCode.STRING_INVALID_UUID),
      email: z.email(ErrorCode.STRING_INVALID_EMAIL),
      isActive: z.boolean(ErrorCode.BOOLEAN_INVALID),
      isEmailVerified: z.boolean(ErrorCode.BOOLEAN_INVALID),
      timestamp: z.date(ErrorCode.DATE_INVALID),
      updatedAt: z.date(ErrorCode.DATE_INVALID),
    });
  }
}
