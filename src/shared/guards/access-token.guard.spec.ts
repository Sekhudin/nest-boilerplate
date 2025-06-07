import { AccessTokenGuard } from "./access-token.guard";

describe("AccessTokenGuard", () => {
  it("should be defined and extend AuthGuard", () => {
    const guard = new AccessTokenGuard();
    expect(guard).toBeDefined();
  });
});
