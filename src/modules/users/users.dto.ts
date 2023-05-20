import { ApiProperty } from '@nestjs/swagger';
import { IsPhoneNumber, IsString } from 'class-validator';
import { ResponseObject } from 'src/common/dto/response/response.object';

export class ChangedCellphonerResp extends ResponseObject {
  data: {
    userId: string;
    cellphone: string;
    verified: boolean;
  };
}

export class ChangePhoneInput {
  @ApiProperty()
  @IsPhoneNumber('MX')
  cellphone: string;
}

export class VerifyPhoneInput {
  @ApiProperty()
  @IsString()
  verifyCode: string;
}
