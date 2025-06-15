import { Injectable } from "@nestjs/common";
import { CookieService } from "src/shared/modules/global/context/cookie.service";
import { CreateAuthDto } from "./dto/create-auth.dto";
import { UpdateAuthDto } from "./dto/update-auth.dto";

@Injectable()
export class AuthService {
  constructor(private readonly cookieService: CookieService) {
    console.log("INSTANCE AuthService");
  }

  create(createAuthDto: CreateAuthDto) {
    this.cookieService.setRefreshToken("CONTOH_REFRESH_TOKEN");
    return "This action adds a new auth";
  }

  findAll() {
    const token = this.cookieService.getRefreshToken();
    console.log("TOKEN", token);
    return `This action returns all auth`;
  }

  findOne(id: number) {
    return `This action returns a #${id} auth`;
  }

  update(id: number, updateAuthDto: UpdateAuthDto) {
    return `This action updates a #${id} auth`;
  }

  remove() {
    this.cookieService.clearRefreshToken();
    return `This action removes a # auth`;
  }
}
