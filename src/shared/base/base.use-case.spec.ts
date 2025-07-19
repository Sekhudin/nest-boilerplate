import { BaseUseCase } from "./base.use-case";

class ExampleUseCase implements BaseUseCase<boolean, boolean> {
  async execute(inputDto: boolean): Promise<boolean> {
    return inputDto;
  }
}

class DummyUseCase extends BaseUseCase<string, string> {
  async execute(inputDto: string): Promise<string> {
    return inputDto.toUpperCase();
  }
}

describe("BaseUseCase", () => {
  it("should return output when executing", async () => {
    const exampleUseCase = new ExampleUseCase();

    expect(await exampleUseCase.execute(true)).toBe(true);
    expect(await exampleUseCase.execute(false)).toBe(false);
  });

  it("should compile and execute", async () => {
    const useCase = new DummyUseCase();
    const result = await useCase.execute("test");
    expect(result).toBe("TEST");
  });
});
