import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { ErrorCode } from "src/shared/enums/error-code.enum";
import { z } from "src/utils/validation";
import { databaseConfig } from "src/config/database.config";
import { UserAuth } from "./user-auth.entity";

@Entity(databaseConfig.TABLES.AUTH_PROVIDER)
export class AuthProvider {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ type: "varchar", length: 30, unique: true })
  name: "LOCAL" | "GOOGLE" | "GITHUB";

  @Column()
  description: string;

  @OneToMany(() => UserAuth, (userAuth) => userAuth.provider)
  userAuths: UserAuth[];

  static get dto() {
    return z.object({
      id: z.uuidv4(ErrorCode.STRING_INVALID_UUID),
      name: z.enum(["LOCAL", "GOOGLE", "GITHUB"], ErrorCode.ENUM_INVALID),
      description: z.string(ErrorCode.STRING_INVALID),
      get userAuths() {
        return z.array(UserAuth.dto);
      },
    });
  }
}
