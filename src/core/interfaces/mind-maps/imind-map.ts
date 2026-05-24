import { IPhpDateTime } from '../php/iphp-datetime';

export interface IMindMap {
  categoryId: number;
  mindMapId: number;
  title: string;
  subtitle: string;
  author: string;
  jpg: string;
  png: string;
  svg: string;
  pdf: string;
  createdAt: IPhpDateTime;
  updatedAt: IPhpDateTime;
  deletedAt: IPhpDateTime;
  isActive: boolean;
}
