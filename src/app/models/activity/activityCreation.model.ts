import { DateTime } from 'luxon';

export interface ActivityCreationModel {
  Name: string;
  Address: string;
  StartDate: DateTime;
  EndDate: DateTime;
  Description: string;
  AdditionalInformation: string;
  Location: string;
}
