import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { ErrorCode } from "src/shared/enums/error-code.enum";
import { User } from "src/modules/user/entities/user.entity";
import { z } from "src/utils/validation";
import { databaseConfig } from "src/config/database.config";

@Entity(databaseConfig.TABLES.TOKEN)
export class Token {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ length: 512 })
  token: string;

  @Column()
  ipAddress: string;

  @Column()
  userAgentString: string;

  @Column({ default: false })
  revoked: boolean;

  @ManyToOne(() => User, (user) => user.tokens)
  user: User;

  @CreateDateColumn()
  createdAt: Date;

  static get dto() {
    return z.object({
      id: z.uuidv4(ErrorCode.STRING_INVALID_UUID),
      token: z.string(ErrorCode.STRING_INVALID).max(512, ErrorCode.STRING_TOO_LONG),
      ipAddress: z.string(ErrorCode.STRING_INVALID),
      userAgentString: z.string(ErrorCode.STRING_INVALID),
      revoked: z.boolean(ErrorCode.BOOLEAN_INVALID),
      get user() {
        return User.dto;
      },
      createdAt: z.date(ErrorCode.DATE_INVALID),
    });
  }
}
