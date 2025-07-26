import { mockDeep } from "jest-mock-extended";

export const getFreshMetadataMock = () => {
  const metadata = mockDeep<Metadata>();
  return metadata;
};
