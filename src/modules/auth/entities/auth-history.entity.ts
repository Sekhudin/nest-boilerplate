import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "src/modules/user/entities/user.entity";
import { z } from "src/utils/validation";
import { databaseConfig } from "src/config/database.config";

@Entity(databaseConfig.table.authHistory)
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

  @Column({ type: "enum", enum: ["LOGIN", "LOGOUT", "REFRESH"] })
  action: "LOGIN" | "LOGOUT" | "REFRESH";

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
      action: z.enum(["LOGIN", "LOGOUT", "REFRESH"]),
      timestamp: z.date(),
    });
  }
}
