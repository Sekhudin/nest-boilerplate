import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "src/modules/user/entities/user.entity";
import { z } from "src/utils/validation";
import { databaseConfig } from "src/config/database.config";

@Entity(databaseConfig.TABLES.AUTH_HISTORY)
export class AuthHistory {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @ManyToOne(() => User)
  user: User;

  @Column()
  ipAddress: string;

  @Column({ type: "text" })
  userAgentString: string;

  @Column({ type: "varchar", length: 100 })
  device: string;

  @Column({ type: "varchar", length: 50 })
  browserName: string;

  @Column({ type: "varchar", length: 20 })
  browserVersion: string;

  @Column({ type: "varchar", length: 50 })
  osName: string;

  @Column({ type: "varchar", length: 20 })
  osVersion: string;

  @Column({ type: "varchar", length: 30 })
  action: "SIGNUP" | "SIGNIN" | "SIGNOUT" | "REFRESH";

  @CreateDateColumn()
  timestamp: Date;

  static get dto() {
    return z.object({
      id: z.uuidv4(),
      get user() {
        return User.dto;
      },
      ipAddress: z.string(),
      userAgentString: z.string().trim(),
      device: z.string(),
      browserName: z.string(),
      browserVersion: z.string(),
      osName: z.string(),
      osVersion: z.string(),
      action: z.enum(["SIGNUP", "SIGN_IN", "SIGNOUT", "REFRESH"]),
      timestamp: z.date(),
    });
  }
}
