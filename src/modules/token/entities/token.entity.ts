import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
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
      id: z.uuidv4(),
      token: z.string().max(512),
      ipAddress: z.string(),
      userAgentString: z.string(),
      revoked: z.boolean(),
      get user() {
        return User.dto;
      },
      createdAt: z.date(),
    });
  }
}
