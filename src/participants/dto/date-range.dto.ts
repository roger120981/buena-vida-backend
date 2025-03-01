import { IsString, IsDateString } from 'class-validator';

export class DateRangeDto {
  @IsDateString({}, { message: 'startDate must be a valid date string (YYYY-MM-DD)' })
  startDate: string;

  @IsDateString({}, { message: 'endDate must be a valid date string (YYYY-MM-DD)' })
  endDate: string;
}