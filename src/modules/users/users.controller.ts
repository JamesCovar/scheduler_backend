import {
  Body,
  Controller,
  Param,
  Post,
  Put,
  Req,
  UseGuards,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import {
  ChangePhoneInput,
  ChangedCellphonerResp,
  VerifyPhoneInput,
} from './users.dto';
import { JwtAuthGuard } from '../auth/auth.guard';

@ApiTags('users')
@Controller('users')
export class UsersController {
  constructor(readonly usersService: UsersService) {}
  @Put('/phone/change')
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  async changePhone(
    @Body() payload: ChangePhoneInput,
    @Req() req: any,
  ): Promise<ChangedCellphonerResp> {
    const { userId } = req.user;
    return this.usersService.changePhoneNumber(userId, payload.cellphone);
  }

  @Post('/phone/verify')
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  async verifyPhone(@Body() payload: VerifyPhoneInput, @Req() req: any) {
    const { userId } = req.user;
    return this.usersService.verifyPhoneNumber(userId, payload.verifyCode);
  }
}
