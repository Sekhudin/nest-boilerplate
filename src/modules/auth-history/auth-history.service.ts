import { EntityManager } from "typeorm";
import { Injectable } from "@nestjs/common";
import { BaseService } from "src/shared/base/base.service";
import { ContextService } from "src/shared/modules/global/context/context.service";
import { User } from "src/modules/user/entities/user.entity";
import { AuthHistory } from "./entities/auth-history.entity";
import { AuthHistoryRepository } from "./auth-history.repository";

@Injectable()
export class AuthHistoryService extends BaseService {
  constructor(
    private readonly authHistoryRepository: AuthHistoryRepository,
    private readonly contextService: ContextService,
  ) {
    super();
  }

  recordSignUp(user: User, entityManager?: EntityManager) {
    const repository = this.getRepository(AuthHistory, this.authHistoryRepository, entityManager);
    const userAgent = this.contextService.getUserAgent();
    const newRecord = repository.create({ user, action: "SIGNUP" });
    newRecord.ipAddress = userAgent.ip;
    newRecord.userAgentString = userAgent.userAgent;
    newRecord.deviceId = this.contextService.getDeviceId();
    newRecord.device = userAgent.device;
    newRecord.osName = userAgent.os.name;
    newRecord.osVersion = userAgent.os.version;
    newRecord.browserName = userAgent.browser.name;
    newRecord.browserVersion = userAgent.browser.version;
    return repository.save(newRecord);
  }

  recordSignIn(user: User, entityManager?: EntityManager) {
    const repository = this.getRepository(AuthHistory, this.authHistoryRepository, entityManager);
    const userAgent = this.contextService.getUserAgent();
    const newRecord = repository.create({ user, action: "SIGNIN" });
    newRecord.ipAddress = userAgent.ip;
    newRecord.userAgentString = userAgent.userAgent;
    newRecord.deviceId = this.contextService.getDeviceId();
    newRecord.device = userAgent.device;
    newRecord.osName = userAgent.os.name;
    newRecord.osVersion = userAgent.os.version;
    newRecord.browserName = userAgent.browser.name;
    newRecord.browserVersion = userAgent.browser.version;
    return repository.save(newRecord);
  }
}
