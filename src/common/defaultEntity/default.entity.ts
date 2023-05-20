import { Column, Entity } from 'typeorm';

@Entity()
export class DefaultEntity {
  @Column({ primary: true, type: 'uuid', generated: 'uuid' })
  id: string;

  @Column({ default: new Date() })
  createdAt: Date;

  @Column({ default: new Date() })
  updatedAt: Date;
}
