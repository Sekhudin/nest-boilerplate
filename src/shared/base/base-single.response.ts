export abstract class BaseSingleResponse<T> {
  data: T;
  meta?: Metadata;

  static from(data: unknown, meta?: Metadata): BaseSingleResponse<unknown> {
    throw new Error("static method from() not implemented yet");
  }
}
