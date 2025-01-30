import type { INestApplication } from "@nestjs/common";
import { SwaggerModule, DocumentBuilder } from "@nestjs/swagger";
import * as env from "./env.config";

export const swaggerSetup = (app: INestApplication) => {
  const config = new DocumentBuilder();
  config.setTitle(env.APP_NAME.concat(" - ", "API Documentations"));
  config.setDescription(`This API offers [brief purpose] with versioning for compatibility.`);
  config.setVersion("1.0");
  config.addBearerAuth();

  const document = SwaggerModule.createDocument(app, config.build());
  SwaggerModule.setup(env.API_DOCS_URL, app, document, {
    jsonDocumentUrl: env.API_DOCS_URL.concat("/json"),
    yamlDocumentUrl: env.API_DOCS_URL.concat("/yaml"),
  });
};
