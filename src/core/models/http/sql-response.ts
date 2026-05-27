import { ISqlResponse } from '../../interfaces/sql/isql-response';

export class SqlResponse implements ISqlResponse {
  affectedRows: number;
  lastIdentityId: number;

  constructor(source?: ISqlResponse) {
    if (source) {
      this.affectedRows = source.affectedRows;
      this.lastIdentityId = source?.lastIdentityId || 0;
    } else {
      this.affectedRows = -1;
      this.lastIdentityId = -1;
    }
  }

  isSuccessfulCreation = (): boolean => this.affectedRows === 1 && this.lastIdentityId > 0;

  isSuccessfulDeletion = (): boolean => this.affectedRows === 1 && this.lastIdentityId === 0;

  isSuccessfulUpdate = (): boolean => this.affectedRows ===1 && this.lastIdentityId === 0;
}
