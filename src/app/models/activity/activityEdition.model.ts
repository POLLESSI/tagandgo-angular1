import { DateTime } from 'luxon';

export interface ActivityEditionModel {
  id: number;
  name: string;
  address: string;
  startDate: DateTime;
  endDate: DateTime;
  description: string;
  additionalInformation: string;
  location: string;
}
