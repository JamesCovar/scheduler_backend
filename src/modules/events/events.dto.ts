import { Field, InputType } from '@nestjs/graphql';
import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsDate, IsInt, IsNumber, IsOptional, IsString } from 'class-validator';

export class GetEventsDto {
  @ApiProperty()
  @Transform((payload) => parseInt(payload.value))
  @IsNumber()
  offset: number;

  @ApiProperty()
  @Transform((payload) => parseInt(payload.value))
  @IsNumber()
  first: number;

  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  @Field({ nullable: true })
  title?: string;

  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  @Field({ nullable: true })
  description?: string;

  @ApiProperty({ required: false })
  @IsDate()
  @IsOptional()
  @Field({ nullable: true })
  start_time?: Date;

  @ApiProperty({ required: false })
  @IsDate()
  @IsOptional()
  @Field({ nullable: true })
  end_time?: Date;

  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  @Field({ nullable: true })
  location?: string;
}

@InputType()
export class CreateEventInput {
  @ApiProperty()
  @IsString()
  @Field()
  title: string;

  @ApiProperty()
  @IsString()
  @Field({ nullable: true })
  description?: string;

  @ApiProperty()
  @Transform((payload) => new Date(payload.value))
  @IsDate()
  @Field()
  start_time: Date;

  @ApiProperty()
  @Transform((payload) => new Date(payload.value))
  @IsDate()
  @Field()
  end_time: Date;

  @ApiProperty()
  @IsString()
  @Field({ nullable: true })
  location?: string;
}

@InputType()
export class UpdateEventInput {
  @ApiProperty({ nullable: true })
  @IsString()
  @IsOptional()
  @Field()
  title?: string;

  @ApiProperty({ nullable: true })
  @IsString()
  @IsOptional()
  @Field({ nullable: true })
  description?: string;

  @ApiProperty({ nullable: true })
  @Transform((payload) => new Date(payload.value))
  @IsDate()
  @IsOptional()
  @Field({ nullable: true })
  start_time?: Date;

  @ApiProperty({ nullable: true })
  @Transform((payload) => new Date(payload.value))
  @IsDate()
  @IsOptional()
  @Field({ nullable: true })
  end_time?: Date;

  @ApiProperty({ nullable: true })
  @IsString()
  @IsOptional()
  @Field({ nullable: true })
  location?: string;
}
