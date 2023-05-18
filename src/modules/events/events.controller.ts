import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import { EventsService } from './events.service';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { JwtAuthGuard } from '../auth/auth.guard';
import { CreateEventInput, GetEventsDto, UpdateEventInput } from './events.dto';

@ApiTags('events')
@Controller('events')
export class EventsController {
  constructor(private eventsService: EventsService) {}

  @Get('')
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  async getEvents(@Req() req: any, @Query() queryPayload: GetEventsDto) {
    const { userId } = req.user;

    const pagination = {
      offset: queryPayload.offset,
      first: queryPayload.first,
    };

    const filter = {
      start_time: queryPayload.start_time,
      end_time: queryPayload.end_time,
      description: queryPayload.description,
      title: queryPayload.title,
      location: queryPayload.location,
    };
    return await this.eventsService.findAll(userId, pagination, filter);
  }

  @Get(':eventId')
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  async getEvent(@Req() req: any, @Param('eventId') eventId: string) {
    const { userId } = req.user;
    return await this.eventsService.findOne(userId, eventId);
  }

  @Post()
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  async createEvent(
    @Req() req: any,
    @Body() createEventInput: CreateEventInput,
  ) {
    const { userId } = req.user;
    return await this.eventsService.create(userId, createEventInput);
  }

  @Delete(':eventId')
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  async deleteEvent(@Req() req: any, @Param('eventId') eventId: string) {
    const { userId } = req.user;
    return await this.eventsService.delete(userId, eventId);
  }

  @Put(':eventId')
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  async updateEvent(
    @Req() req: any,
    @Param('eventId') eventId: string,
    @Body() updateEventInput: UpdateEventInput,
  ) {
    const { userId } = req.user;
    return await this.eventsService.update(userId, eventId, updateEventInput);
  }
}
