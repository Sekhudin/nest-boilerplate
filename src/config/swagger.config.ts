import { INestApplication } from "@nestjs/common";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
import { BaseConfig } from "./base.config";

class SwaggerConfig extends BaseConfig {
  private readonly _config: DocumentBuilder;

  constructor() {
    super();
    this._config = new DocumentBuilder();
  }

  setup(app: INestApplication) {
    this._config.setTitle(this.env.APP_NAME.concat(" - API Documentation"));
    this._config.setVersion("1");
    this._config.setDescription(`This API offers [brief purpose] with versioning for compatibility.`);
    this._config.addBearerAuth();
    const document = SwaggerModule.createDocument(app, this._config.build());
    SwaggerModule.setup(this.env.APP_API_DOCS_PATH, app, document, {
      jsonDocumentUrl: this.env.APP_API_DOCS_PATH.concat("/json"),
      yamlDocumentUrl: this.env.APP_API_DOCS_PATH.concat("/yaml"),
    });
  }
}

export const swaggerConfig = SwaggerConfig.getInstance();
