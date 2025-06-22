import { Column, CreateDateColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "src/modules/user/entities/user.entity";

export class AuthHistory {
  @PrimaryGeneratedColumn()
  id: number;

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
}
