import { IPhpDateTime } from './php/iphp-datetime';

export interface ISqlFile {
  fileId: number;
  name: string;
  type: string;
  size: number;
  data: File;
  uploadedAt: IPhpDateTime;
  isActive: boolean;
}
