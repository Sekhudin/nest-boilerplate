import { INestApplication } from "@nestjs/common";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
import { BaseConfig } from "./base.config";

class SwaggerConfig extends BaseConfig {
  constructor() {
    super();
  }

  private readonly builder = new DocumentBuilder();

  buildConfig() {
    return this.builder
      .setTitle(`${this.env.APP_NAME} - API Documentation`)
      .setVersion("1")
      .setDescription(`This API offers [brief purpose] with versioning for compatibility.`)
      .addBearerAuth()
      .build();
  }

  setup(app: INestApplication) {
    const document = SwaggerModule.createDocument(app, this.buildConfig());
    SwaggerModule.setup(this.swaggerPath, app, document, {
      jsonDocumentUrl: `${this.swaggerPath}/json`,
      yamlDocumentUrl: `${this.swaggerPath}/yaml`,
    });
  }

  private get swaggerPath(): string {
    return this.env.APP_API_DOCS_PATH || "/api/docs";
  }
}

export const swaggerConfig = SwaggerConfig.getInstance();
