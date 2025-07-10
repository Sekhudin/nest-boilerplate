import { Injectable } from "@nestjs/common";
import { AuthHistoryRepository } from "src/modules/auth/repositories/auth-history.repository";
import { BaseService } from "src/shared/base/base.service";

@Injectable()
export class AuthHistoryService extends BaseService {
  constructor(private readonly authHistoryRepository: AuthHistoryRepository) {
    super();
  }
}
