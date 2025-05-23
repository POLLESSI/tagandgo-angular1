import { DateTime } from 'luxon';

export interface ActivityCreationModel {
  name: string;
  address: string;
  startDate: DateTime;
  endDate: DateTime;
  description: string;
  additionalInformation: string;
  location: string;
}
