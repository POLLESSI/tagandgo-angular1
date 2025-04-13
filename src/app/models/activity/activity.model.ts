import { DateTime } from 'luxon';
import { UserModel } from '../user/user.model';

export interface ActivityModel {
  id: number;
  name: string;
  address: string;
  startDate: DateTime;
  endDate: DateTime;
  description: string;
  additionalInformation: string;
  location: string;
  active: Boolean;
  organizers: Array<UserModel>
}
