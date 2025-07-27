import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { ErrorCode } from "src/shared/enums/error-code.enum";
import { User } from "src/modules/user/entities/user.entity";
import { z } from "src/utils/validation";
import { databaseConfig } from "src/config/database.config";

@Entity(databaseConfig.TABLES.ROLE)
export class Role {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ unique: true })
  name: string;

  @Column()
  description: string;

  @OneToMany(() => User, (user) => user.role)
  users: User[];

  @CreateDateColumn()
  timestamp: Date;

  static get dto() {
    return Role.plainDto.extend({
      users: z.array(User.plainDto),
    });
  }

  static get plainDto() {
    return z.object({
      id: z.uuidv4(ErrorCode.STRING_INVALID_UUID),
      name: z.string(ErrorCode.STRING_INVALID).min(1, ErrorCode.STRING_EMPTY).toUpperCase(),
      description: z.string(ErrorCode.STRING_INVALID).toLowerCase(),
      timestamp: z.date(ErrorCode.DATE_INVALID),
    });
  }
}
