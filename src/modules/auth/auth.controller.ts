import { Body, Controller, Delete, Get, Param, Patch, Post } from "@nestjs/common";
import { Auth } from "src/shared/decorators/method/auth.decorator";
import { Serialize } from "src/shared/decorators/method/serialize.decorator";
import { Validate } from "src/shared/decorators/method/validate.decorator";
import { AuthService } from "./auth.service";
import { CreateAuthDto } from "./dto/create-auth.dto";
import { UpdateAuthDto } from "./dto/update-auth.dto";

@Controller("auth")
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post()
  @Validate(CreateAuthDto, "body")
  @Serialize(CreateAuthDto)
  create(@Body() createAuthDto: CreateAuthDto) {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve([createAuthDto, createAuthDto, createAuthDto]);
      }, 4000);
    });
    return this.authService.create(createAuthDto);
  }

  @Get()
  @Serialize(CreateAuthDto)
  findAll() {
    const data = { sex: "sekhudin", hello: "sekhudin", age: 27, name: "sekhudin" };
    return [data, data, data];
  }

  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.authService.findOne(+id);
  }

  @Patch(":id")
  @Auth()
  update(@Param("id") id: string, @Body() updateAuthDto: UpdateAuthDto) {
    return this.authService.update(+id, updateAuthDto);
  }

  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.authService.remove(+id);
  }
}
