import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from "typeorm";
import { Exclude } from "class-transformer";
import { Device } from "src/modules/devices/entities/device.entity";
import { AuthProvider } from "src/modules/auth-providers/entities/auth-provider.entity";
import { TableName } from "src/configs/database.config";

@Entity({ name: TableName.user })
export class User {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ unique: true })
  username: string;

  @Column({ unique: true })
  email: string;

  @Column()
  @Exclude()
  password: string;

  @OneToMany(() => Device, (device) => device.user)
  @Exclude()
  devices: Device[];

  @OneToMany(() => AuthProvider, (provider) => provider.user)
  @Exclude()
  authProviders: AuthProvider[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
