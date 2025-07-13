import { HandlebarsAdapter } from "@nestjs-modules/mailer/dist/adapters/handlebars.adapter";
import { mock } from "jest-mock-extended";

export const getFreshHandlebarsAdapterMock = () => {
  const adapter = mock<HandlebarsAdapter>();
  return adapter;
};
