import { IPhpDateTime } from './php/iphp-datetime';

export interface IDaily {
  dailyId: number;
  remark: string;
  createdAt: IPhpDateTime;
  updatedAt: IPhpDateTime;
  deletedAt: IPhpDateTime;
  isActive: boolean;
}
