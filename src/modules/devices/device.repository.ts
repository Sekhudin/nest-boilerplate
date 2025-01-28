import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Device } from "./entities/device.entity";

@Injectable()
export class DeviceRepository extends Repository<Device> {
  constructor(
    @InjectRepository(Device)
    protected repository: Repository<Device>,
  ) {
    super(repository.target, repository.manager, repository.queryRunner);
  }
}
