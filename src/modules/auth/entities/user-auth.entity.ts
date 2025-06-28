import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "src/modules/user/entities/user.entity";
import { databaseConfig } from "src/config/database.config";
import { AuthProvider } from "./auth-provider.entity";

@Entity(databaseConfig.table.userAuth)
export class UserAuth {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @ManyToOne(() => User, (user) => user.authMethods)
  user: User;

  @ManyToOne(() => AuthProvider, (provider) => provider.userAuths)
  provider: AuthProvider;

  /**
   * @description e.g. Google ID, email
   */
  @Column()
  providerUserId: string;

  /**
   * @description only for LOCAL
   */
  @Column({ nullable: true })
  passwordHash?: string;

  @CreateDateColumn()
  createdAt: Date;
}
