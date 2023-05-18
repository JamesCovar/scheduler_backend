import { Field, ObjectType } from '@nestjs/graphql';
import { IsPhoneNumber } from 'class-validator';
import { Column, Entity } from 'typeorm';

@Entity({ name: 'users' })
export class User {
  @Column({ primary: true, type: 'uuid', generated: 'uuid' })
  user_id: string;

  @Column()
  name: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column()
  @IsPhoneNumber('MX')
  cellphone: string;

  @Column({ nullable: true })
  @IsPhoneNumber('MX')
  newCellphone: string;
}
