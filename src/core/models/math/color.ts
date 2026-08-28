import { IColor } from '../../interfaces/math/icolor';
import { Apex } from './apex';

export class Color {
  id = 0;
  name = '';
  apexes: Apex[] = [];

  constructor(source?: IColor) {
    if (source) {
      this.id = source.id;
      this.name = source.name;
      this.apexes = source.apexes;
    }
  }

  inApexes = (externalApex: Apex): boolean => {
    const result = this.apexes.findIndex(innerApex => innerApex.alias === externalApex.alias) >= 0;

    // console.info('inApexes', result, externalApex.id, externalApex.alias);

    return result;
  }

  inSomeBlackList = (externalApex: Apex): boolean => {
    const result = this.apexes.some(innerApex => innerApex.inBlackList(externalApex.alias));

    // console.info('inSomeBlackList', result, externalApex.id, externalApex.alias);

    return result;
  }

  inApexBlackList = (externalApex: Apex): boolean => {
    const result = this.apexes.some(innerApex => externalApex.inBlackList(innerApex.alias));

    // console.info('inApexBlackList', result, externalApex.id, externalApex.alias);

    return result;
  }
}
