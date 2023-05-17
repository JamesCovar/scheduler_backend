import { Field, ObjectType } from '@nestjs/graphql';
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
  cellphone: string;
}
