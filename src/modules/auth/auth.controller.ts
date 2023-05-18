import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthLoginDTO, SignUpUserInput } from './auth.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('sign-in')
  signIn(@Body() payload: AuthLoginDTO) {
    const { email, password } = payload;
    return this.authService.signIn(email, password);
  }

  @Post('sign-up')
  signUp(@Body() payload: SignUpUserInput) {
    return this.authService.signUp(payload);
  }
}
