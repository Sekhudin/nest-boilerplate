import { Injectable } from "@nestjs/common";
import { BaseService } from "src/shared/base/base.service";
import { TokenRepository } from "./token.repository";

@Injectable()
export class TokenService extends BaseService {
  constructor(private readonly tokenRepository: TokenRepository) {
    super();
  }
}
