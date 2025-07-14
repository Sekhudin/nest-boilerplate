import { Column, CreateDateColumn, Entity, ManyToOne, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "src/modules/user/entities/user.entity";
import { z } from "src/utils/validation";
import { databaseConfig } from "src/config/database.config";
import { AuthProvider } from "./auth-provider.entity";

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
    return z.object({
      id: z.uuidv4(),
      get user() {
        return User.dto;
      },
      get provider() {
        return AuthProvider.dto;
      },
      providerUserId: z.string(),
      passwordHash: z.string().optional(),
      createdAt: z.date(),
    });
  }
}
