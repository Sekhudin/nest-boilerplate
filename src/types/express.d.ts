import "express";
import type { Response } from "express";
import type { Claims } from "src/shared/dto/claims.dto";

declare module "express" {
  interface Request {
    user?: Claims;
  }

  interface RequestWithResponse extends Request {
    res?: Response;
  }

  type NextFunction = () => void;
  type Middleware = (req: Request, res: Response, next: NextFunction) => void;
  type InjectResponseMiddleware = (req: RequestWithResponse, res: Response, next: NextFunction) => void;
}
