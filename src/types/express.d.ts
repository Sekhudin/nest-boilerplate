import "express";
import type { Request } from "express";
import type { Claims } from "src/shared/dto/claims.dto";

declare module "express" {
  interface Request {
    requestId: string;
    deviceId: string;
    user: Claims;
  }

  interface Next {
    (): void;
    (error?: any): void;
  }

  type Middleware = (req: Request, res: Response, next: NextFunction) => void;
}
