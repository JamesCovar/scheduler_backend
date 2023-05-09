import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { User } from '../users/users.entity';
import { AuthService } from './auth.service';
import { AuthCredentials } from 'src/common/dto/auth/auth-credentials.input';
import { SignUpUserInput } from 'src/common/dto/auth/signup-user.input';
import { BearerTokenInput } from 'src/common/dto/auth/token.object';
import { AuthObject } from 'src/common/dto/auth/responses/auth.object';

@Resolver(() => User)
export class AuthResolver {
  constructor(private authService: AuthService) {}

  @Mutation(() => AuthObject)
  signIn(
    @Args('authCredentials') authCredentials: AuthCredentials,
  ): Promise<AuthObject> {
    const { email, password } = authCredentials;
    return this.authService.signIn(email, password);
  }

  @Mutation(() => AuthObject)
  signUp(
    @Args('signUpUserInput') signUpUserInput: SignUpUserInput,
  ): Promise<AuthObject> {
    return this.authService.signUp(signUpUserInput);
  }
}
