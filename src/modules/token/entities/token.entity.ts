import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "src/modules/user/entities/user.entity";
import { databaseConfig } from "src/config/database.config";

@Entity(databaseConfig.table.token)
export class Token {
  @PrimaryGeneratedColumn()
  id: number;

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
}
