export class ParticipantEntity {
  id: number;
  name: string;
  gender: string;
  medicaidId: string;
  dob: Date;
  location: string;
  community: string;
  address: string;
  primaryPhone: string;
  secondaryPhone: string;
  isActive: boolean;
  locStartDate: Date;
  locEndDate: Date;
  pocStartDate: Date;
  pocEndDate: Date;
  units: number;
  hours: number;
  hdm: boolean;
  adhc: boolean;
  cmID: number;
  createdAt: Date;
  updatedAt: Date;
}