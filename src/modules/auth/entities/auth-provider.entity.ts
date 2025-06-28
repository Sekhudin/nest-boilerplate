import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
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
}
