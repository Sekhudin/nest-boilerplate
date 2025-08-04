import { MetadataDto } from "src/shared/dto/metadata.dto";

export abstract class BaseCollectionResponse<T> {
  data: T[];
  meta: MetadataDto;

  static from(data: unknown[], meta: MetadataDto): BaseCollectionResponse<unknown> {
    throw new Error("static method from() not implemented yet");
  }
}
