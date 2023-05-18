import { ResponseObject } from 'src/common/dto/response/response.object';

export class ChangedCellphonerResp extends ResponseObject {
  data: {
    userId: string;
    cellphone: string;
    verified: boolean;
  };
}
