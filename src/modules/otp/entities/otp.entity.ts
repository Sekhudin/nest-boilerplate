import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "src/modules/user/entities/user.entity";
import { z } from "src/utils/validation";
import { databaseConfig } from "src/config/database.config";

@Entity(databaseConfig.table.otp)
export class Otp {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @ManyToOne(() => User)
  user: User;

  @Column({ length: 6 })
  code: string;

  @Column({ type: "enum", enum: ["EMAIL_VERIFICATION", "PASSWORD_RESET", "LOGIN"] })
  purpose: "EMAIL_VERIFICATION" | "PASSWORD_RESET" | "LOGIN";

  @Column({ default: false })
  isUsed: boolean;

  @Column({ type: "timestamp" })
  expiresAt: Date;

  @CreateDateColumn()
  createdAt: Date;

  static get dto() {
    return z.object({
      id: z.uuidv4(),
      get user() {
        return User.dto;
      },
      code: z.string().length(6),
      purpose: z.enum(["EMAIL_VERIFICATION", "PASSWORD_RESET", "LOGIN"]),
      isUsed: z.boolean(),
      expiresAt: z.date(),
      createdAt: z.date(),
    });
  }
}
