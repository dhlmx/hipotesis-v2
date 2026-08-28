import { Apex } from '../../models/math/apex';

export interface IColor {
  id: number;
  name: string;
  apexes: Apex[];
}
