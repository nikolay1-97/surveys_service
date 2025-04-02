import { createParamDecorator, ExecutionContext } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";

export const UserId = createParamDecorator (
    (data: unknown, ctx: ExecutionContext) => {
        const request = ctx.switchToHttp().getRequest();
        return request['user'].id
    }
)