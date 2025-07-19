export abstract class BaseUseCase<InputDto = void, Result = void> {
  abstract execute(inputDto: InputDto): Promise<Result>;
}
