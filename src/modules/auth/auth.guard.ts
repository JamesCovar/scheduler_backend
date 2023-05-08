import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { AuthGuard } from '@nestjs/passport';

import { Observable } from 'rxjs';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  //More information about -> https://docs.nestjs.com/graphql/other-features#execution-context
  getRequest(context: ExecutionContext) {
    //Convert GqlContext to Passport
    const ctx = GqlExecutionContext.create(context);
    return ctx.getContext().req;
  }
}
