import { IDaily } from '../interfaces/idaily';

export class Daily {
  dailyId: number;
  remark: string;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date;
  isActive: boolean;

  constructor(entity?: IDaily) {
    if (entity) {
      this.dailyId = entity.dailyId;
      this.remark = entity.remark;
      this.createdAt = new Date(entity.createdAt.date);
      this.updatedAt = new Date(entity.updatedAt.date);
      this.deletedAt = new Date(entity.deletedAt.date);
      this.isActive = entity.isActive;
    } else {
      this.dailyId = -1;
      this.remark = '';
      this.createdAt = new Date();
      this.updatedAt = new Date();
      this.deletedAt = new Date();
      this.isActive = false;
    }
  }
}
