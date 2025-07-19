import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { ErrorCode } from "src/shared/enums/error-code.enum";
import { User } from "src/modules/user/entities/user.entity";
import { z } from "src/utils/validation";
import { databaseConfig } from "src/config/database.config";

@Entity(databaseConfig.TABLES.OTP)
export class Otp {
  @PrimaryGeneratedColumn("uuid")
  token: string;

  @ManyToOne(() => User)
  user: User;

  @Column()
  hashOtp: string;

  @Column({ type: "varchar", length: 30 })
  purpose: "EMAIL_VERIFICATION" | "PASSWORD_RESET" | "SIGNIN";

  @Column({ default: false })
  isUsed: boolean;

  @Column({ type: "timestamp" })
  expiresAt: Date;

  @CreateDateColumn()
  createdAt: Date;

  static get dto() {
    return z.object({
      token: z.uuidv4(ErrorCode.STRING_INVALID_UUID),
      get user() {
        return User.dto;
      },
      hashOtp: z.string(ErrorCode.STRING_INVALID),
      purpose: z.enum(["EMAIL_VERIFICATION", "PASSWORD_RESET", "SIGNIN"], ErrorCode.ENUM_INVALID),
      isUsed: z.boolean(ErrorCode.BOOLEAN_INVALID),
      expiresAt: z.date(ErrorCode.DATE_INVALID),
      createdAt: z.date(ErrorCode.DATE_INVALID),
    });
  }
}
