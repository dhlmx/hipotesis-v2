import { IMindMap } from '../interfaces/mind-maps/imind-map';
import { IPhpDateTime } from '../interfaces/php/iphp-datetime';

export const IMIND_MAP_CATEGORY_DEFAULT = {
  categoryId: 0,
  category: ''
},

IMIND_MAP_DEFAULT = {
  mindMapId: 0,
  title: '',
  subtitle: '',
  author: '',
  jpg: '',
  png: '',
  svg: '',
  pdf: '',
  createdAt: {} as IPhpDateTime,
  updatedAt: {} as IPhpDateTime,
  deletedAt: {} as IPhpDateTime,
  isActive: false
} as IMindMap;
