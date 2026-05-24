// Interfaces & Models
import { IMindMap } from '../interfaces/mind-maps/imind-map';
import { IMindMapCategory } from '../interfaces/mind-maps/imind-map-category';
import { ISelect } from '../interfaces/iselect';

// Selects
export const categoriesToISelect = (source: IMindMapCategory[]): ISelect[] => {
  return source.map(item => ({ label: item.category, value: item.categoryId, inactive: false }));
},

mindMapsToISelect = (source: IMindMap[]): ISelect[] => {
  return source.map(item => ({ label: `${item.title} - ${item.subtitle}`, value: item.mindMapId, inactive: false }));
};
