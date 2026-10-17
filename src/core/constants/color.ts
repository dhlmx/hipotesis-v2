import { IColor } from '../interfaces/icolor';

type TColorName = 'Aqua'|'Black'|'Blue'|'Gray'|'Green'|'Fuchsia'|'Lime'|'Maroon'|'Navy'|'Olive'|'Orange'|'Purple'|'Red'|'Silver'|'Teal'|'White'|'Yellow';

export const COLORS: IColor[] = [
  { name: 'Black', hex: '#000000', rgb: [0, 0, 0] },
  { name: 'Gray', hex: '#808080', rgb: [128, 128, 128] },
  { name: 'Maroon', hex: '#800000', rgb: [128, 0, 0] },
  { name: 'Red', hex: '#FF0000', rgb: [255, 0, 0] },
  { name: 'Green', hex: '#008000', rgb: [0, 128, 0] },
  { name: 'Lime', hex: '#00FF00', rgb: [0, 255, 0] },
  { name: 'Olive', hex: '#808000', rgb: [128, 128, 0] },
  { name: 'Yellow', hex: '#FFFF00', rgb: [255, 255, 0] },
  { name: 'Navy', hex: '#000080', rgb: [0, 0, 128] },
  { name: 'Blue', hex: '#0000FF', rgb: [0, 0, 255] },
  { name: 'Purple', hex: '#800080', rgb: [128, 0, 128] },
  { name: 'Fuchsia', hex: '#FF00FF', rgb: [255, 0, 255] },
  { name: 'Teal', hex: '#008080', rgb: [0, 128, 128] },
  { name: 'Aqua', hex: '#00FFFF', rgb: [0, 255, 255] },
  { name: 'Silver', hex: '#C0C0C0', rgb: [192, 192, 192] },
  { name: 'Orange', hex: '#FFA500', rgb: [255, 165, 0] },
  { name: 'White', hex: '#FFFFFF', rgb: [255, 255, 255] },
],

getColor = (name: TColorName): string => COLORS.find(color => color.name === name)!.hex;
