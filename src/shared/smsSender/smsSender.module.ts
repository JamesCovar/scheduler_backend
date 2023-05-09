import { Module } from '@nestjs/common';
import { SmsSenderService } from './smsSender.service';

@Module({
  imports: [],
  providers: [SmsSenderService],
})
export class SmsSenderModule {}
