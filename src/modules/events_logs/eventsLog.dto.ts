export class CreateEventLogDTO {
  userId: string;
  wasCanceled: boolean;
  wasNotified: boolean;
  startTime: Date;
  eventId: string;
}

export class UpdateEventLogDTO {
  notificationSendAt: Date;
}
