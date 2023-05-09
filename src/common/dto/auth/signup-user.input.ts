import { Field, InputType } from '@nestjs/graphql';
import { IsAlpha, IsEmail, IsPhoneNumber, IsString } from 'class-validator';

@InputType()
export class SignUpUserInput {
  @Field(() => String)
  @IsAlpha()
  name: string;

  @Field(() => String)
  @IsEmail()
  email: string;

  @Field(() => String)
  @IsString()
  password: string;

  @Field(() => String)
  @IsPhoneNumber('MX')
  cellphone: string;
}
