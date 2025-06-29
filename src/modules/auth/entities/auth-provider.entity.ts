import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { z } from "src/utils/validation";
import { databaseConfig } from "src/config/database.config";
import { UserAuth } from "./user-auth.entity";

@Entity(databaseConfig.table.authProvider)
export class AuthProvider {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ unique: true })
  name: "LOCAL" | "GOOGLE" | "GITHUB";

  @Column()
  description: string;

  @OneToMany(() => UserAuth, (userAuth) => userAuth.provider)
  userAuths: UserAuth[];

  static get dto() {
    return z.object({
      id: z.uuidv4(),
      name: z.enum(["LOCAL", "GOOGLE", "GITHUB"]),
      description: z.string(),
      get userAuths() {
        return z.array(UserAuth.dto);
      },
    });
  }
}
