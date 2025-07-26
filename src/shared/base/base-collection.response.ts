export abstract class BaseCollectionResponse<T> {
  data: T[];
  meta?: Metadata;

  static from(data: unknown[], meta?: Metadata): BaseCollectionResponse<unknown> {
    throw new Error("static method from() not implemented yet");
  }
}
