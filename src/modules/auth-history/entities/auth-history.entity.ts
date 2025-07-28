import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { ErrorCode } from "src/shared/enums/error-code.enum";
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

  @Column()
  deviceId: string;

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
    return AuthHistory.plainDto.extend({
      user: User.plainDto,
    });
  }

  static get plainDto() {
    return z.object({
      id: z.uuidv4(ErrorCode.STRING_INVALID_UUID),
      ipAddress: z.string(ErrorCode.STRING_INVALID),
      userAgentString: z.string(ErrorCode.STRING_INVALID).trim(),
      device: z.string(ErrorCode.STRING_INVALID),
      browserName: z.string(ErrorCode.STRING_INVALID),
      browserVersion: z.string(ErrorCode.STRING_INVALID),
      osName: z.string(ErrorCode.STRING_INVALID),
      osVersion: z.string(ErrorCode.STRING_INVALID),
      action: z.enum(["SIGNUP", "SIGN_IN", "SIGNOUT", "REFRESH"], ErrorCode.ENUM_INVALID),
      timestamp: z.date(ErrorCode.STRING_INVALID),
    });
  }
}
