import { Expose } from "class-transformer";

export abstract class BaseCollectionResponse<T> {
  @Expose()
  items: T[];

  @Expose()
  meta?: Metadata;

  static from(items: unknown[], meta?: Metadata): BaseCollectionResponse<unknown> {
    throw new Error("static method from() not implemented yet");
  }
}
