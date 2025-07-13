import { Injectable } from "@nestjs/common";
import { BaseService } from "src/shared/base/base.service";
import { AuthHistoryRepository } from "src/modules/auth/repositories/auth-history.repository";

@Injectable()
export class AuthHistoryService extends BaseService {
  constructor(private readonly authHistoryRepository: AuthHistoryRepository) {
    super();
  }
}
