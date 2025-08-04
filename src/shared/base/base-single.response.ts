import { MetadataDto } from "src/shared/dto/metadata.dto";

export abstract class BaseSingleResponse<T> {
  data: T;
  meta: MetadataDto;

  static from(data: unknown, meta: MetadataDto): BaseSingleResponse<unknown> {
    throw new Error("static method from() not implemented yet");
  }
}
