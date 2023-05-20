import { DefaultEntity } from 'src/common/defaultEntity/default.entity';
import { AfterUpdate, Column, Entity, JoinColumn, OneToOne } from 'typeorm';
import { Event } from '../events/event.entity';

@Entity()
export class EventsLogs extends DefaultEntity {
  @Column({ nullable: false })
  userId: string;

  @Column()
  wasCanceled: boolean;

  @Column({ default: false })
  wasNotified: boolean;

  @Column({ nullable: true })
  notificationSendAt: Date;

  @Column()
  startTime: Date;

  @Column()
  eventId: string;

  @OneToOne(() => Event)
  @JoinColumn({ name: 'eventId' })
  event: Event;
}
