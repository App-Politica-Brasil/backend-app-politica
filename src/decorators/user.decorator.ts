import {
    createParamDecorator,
    ExecutionContext,
    NotFoundException,
} from '@nestjs/common';

export const User = createParamDecorator(
    (filter: string, ctx: ExecutionContext) => {
        const request = ctx.switchToHttp().getRequest();

        if (request.user) {
            if (filter) {
                return request.user[filter];
            } else {
                return request.user;
            }
        } else {
            throw new NotFoundException(
                'Usuario não encontrado, use o authGuard para obter o usuario',
            );
        }
    },
);
