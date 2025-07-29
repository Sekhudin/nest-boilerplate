import "express";
import type { Request } from "express";
import type { Claims } from "src/shared/dto/claims.dto";
import type { UserAgent } from "src/utils/ua";

declare module "express" {
  interface Request {
    requestId: string;
    deviceId: string;
    userAgent: UserAgent;
    user?: Claims;
  }

  interface NextFunction {
    (): void;
    (error?: any): void;
  }

  type Middleware = (req: Request, res: Response, next: NextFunction) => void;
}
