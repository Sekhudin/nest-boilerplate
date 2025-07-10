import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
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
    return z.object({
      id: z.uuidv4(),
      name: z.string().min(1).toUpperCase(),
      description: z.string().toLowerCase(),
      get users() {
        return z.array(User.dto);
      },
      timestamp: z.date(),
    });
  }
}
