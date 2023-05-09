import { Injectable } from '@nestjs/common';
import * as AWS from 'aws-sdk';
import e from 'express';

@Injectable()
export class SmsSenderService {
  sendSMS(phoneNumber: string, message: string) {
    const payload = {
      Message: message,
      PhoneNumber: phoneNumber,
    };

    new AWS.SNS({ apiVersion: '2010-03-31' })
      .publish(payload)
      .promise()
      .then((message) => {
        console.log('message sent');
      })
      .catch((err) => {
        console.log('Error sending sms: ', err);
        return err;
      });
  }
}
