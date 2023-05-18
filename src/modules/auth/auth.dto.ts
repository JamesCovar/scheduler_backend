import { Field, InputType } from '@nestjs/graphql';
import { ApiProperty } from '@nestjs/swagger';
import { IsAlpha, IsEmail, IsPhoneNumber, IsString } from 'class-validator';

export class AuthLoginDTO {
  @ApiProperty()
  email: string;

  @ApiProperty()
  password: string;
}

@InputType()
export class SignUpUserInput {
  @ApiProperty()
  @Field(() => String)
  @IsAlpha()
  name: string;

  @ApiProperty()
  @Field(() => String)
  @IsEmail()
  email: string;

  @ApiProperty()
  @Field(() => String)
  @IsString()
  password: string;

  @ApiProperty()
  @Field(() => String)
  @IsPhoneNumber('MX')
  cellphone: string;
}
