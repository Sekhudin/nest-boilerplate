import { ForbiddenException } from "@nestjs/common";
import type { ExecutionContext } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { RolesGuard } from "./roles.guard";

describe("RolesGuard", () => {
  let guard: RolesGuard;
  let reflector: Reflector;
  let context: ExecutionContext;

  beforeEach(() => {
    reflector = new Reflector();
    guard = new RolesGuard(reflector);

    context = {
      getHandler: jest.fn(),
      getClass: jest.fn(),
      switchToHttp: jest.fn().mockReturnValue({
        getRequest: jest.fn(),
      }),
    } as unknown as ExecutionContext;
  });

  it("should allow access if no roles required", () => {
    jest.spyOn(reflector, "getAllAndOverride").mockReturnValue(undefined);

    expect(guard.canActivate(context)).toBe(true);
    expect(reflector.getAllAndOverride).toHaveBeenCalled();
  });

  it("should throw ForbiddenException if user has no roles", () => {
    jest.spyOn(reflector, "getAllAndOverride").mockReturnValue(["admin"]);
    const req = { user: { roles: [] } };
    (context.switchToHttp().getRequest as jest.Mock).mockReturnValue(req);

    expect(() => guard.canActivate(context)).toThrow(ForbiddenException);
  });

  it("should throw ForbiddenException if user does not have required role", () => {
    jest.spyOn(reflector, "getAllAndOverride").mockReturnValue(["admin"]);
    const req = { user: { roles: ["user"] } };
    (context.switchToHttp().getRequest as jest.Mock).mockReturnValue(req);

    expect(() => guard.canActivate(context)).toThrow(ForbiddenException);
  });

  it("should allow access if user has required role", () => {
    jest.spyOn(reflector, "getAllAndOverride").mockReturnValue(["admin", "user"]);
    const req = { user: { roles: ["user"] } };
    (context.switchToHttp().getRequest as jest.Mock).mockReturnValue(req);

    expect(guard.canActivate(context)).toBe(true);
  });
});
