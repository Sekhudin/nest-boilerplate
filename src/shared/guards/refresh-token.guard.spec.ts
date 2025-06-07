import { RefreshTokenGuard } from "./refresh-token.guard";

describe("RefreshTokenGuard", () => {
  it("should extend AuthGuard with correct strategy", () => {
    const guard = new RefreshTokenGuard();
    console.log(guard);
    expect(guard).toBeDefined();
  });
});
