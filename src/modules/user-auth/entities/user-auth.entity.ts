import { Column, CreateDateColumn, Entity, ManyToOne, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { ErrorCode } from "src/shared/enums/error-code.enum";
import { AuthProvider } from "src/modules/auth-provider/entities/auth-provider.entity";
import { User } from "src/modules/user/entities/user.entity";
import { z } from "src/utils/validation";
import { databaseConfig } from "src/config/database.config";

@Entity(databaseConfig.TABLES.USER_AUTH)
export class UserAuth {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  /**
   * @description e.g. Google ID, email
   */
  @Column()
  providerUserId: string;

  /**
   * @description only for LOCAL
   */
  @Column({ default: "" })
  passwordHash: string;

  @OneToOne(() => User, (user) => user.authMethod)
  user: User;

  @ManyToOne(() => AuthProvider, (provider) => provider.userAuths)
  provider: AuthProvider;

  @CreateDateColumn()
  createdAt: Date;

  static get dto() {
    return UserAuth.plainDto.extend({
      user: User.plainDto,
      provider: AuthProvider.plainDto,
    });
  }

  static get plainDto() {
    return z.object({
      id: z.uuidv4(ErrorCode.STRING_INVALID_UUID),
      providerUserId: z.string(ErrorCode.STRING_INVALID),
      passwordHash: z.string(ErrorCode.STRING_INVALID).optional(),
      createdAt: z.date(ErrorCode.DATE_INVALID),
    });
  }
}
