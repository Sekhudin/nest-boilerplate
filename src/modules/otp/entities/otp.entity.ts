import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
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
      token: z.uuidv4({ error: "invalid token" }),
      get user() {
        return User.dto;
      },
      hashOtp: z.string(),
      purpose: z.enum(["EMAIL_VERIFICATION", "PASSWORD_RESET", "SIGNIN"]),
      isUsed: z.boolean(),
      expiresAt: z.date(),
      createdAt: z.date(),
    });
  }
}
