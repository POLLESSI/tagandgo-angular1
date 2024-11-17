import { DateTime } from 'luxon';

export interface ActivityModel {
  Id: number;
  Name: string;
  Address: string;
  StartDate: DateTime;
  EndDate: DateTime;
  Description: string;
  AdditionalInformation: string;
  Location: string;
  Active: Boolean;
}
