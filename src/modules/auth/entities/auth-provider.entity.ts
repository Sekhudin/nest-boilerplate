import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { databaseConfig } from "src/config/database.config";
import { UserAuth } from "./user-auth.entity";

@Entity(databaseConfig.table.authProvider)
export class AuthProvider {
  @PrimaryGeneratedColumn("uuid")
  id: number;

  @Column({ unique: true })
  name: "LOCAL" | "GOOGLE" | "GITHUB";

  @OneToMany(() => UserAuth, (userAuth) => userAuth.provider)
  userAuths: UserAuth[];
}
