import { Field, InputType } from '@nestjs/graphql';
import { IsEmail, IsString } from 'class-validator';

@InputType()
export class AuthCredentials {
  @IsEmail()
  @Field()
  email: string;

  @IsString()
  @Field({ nullable: true })
  password?: string;
}
