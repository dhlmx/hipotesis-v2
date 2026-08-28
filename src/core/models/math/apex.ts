import { IApex } from '../../interfaces/math/iapex';

export class Apex {

  id = 0;
  alias = '';
  name = '';
  blackList: string[] = [];

  constructor(source?: IApex) {
    if (source) {
      this.id = source.id;
      this.alias = source.alias;
      this.name = source.name;
      this.blackList = source.blackList;
    }
  }

  inBlackList = (alias: string): boolean => {
    return this.blackList.findIndex(blackAlias => blackAlias === alias) >= 0;
  }
}
