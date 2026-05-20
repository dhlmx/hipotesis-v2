export interface ISqlQueryParameters {
  table: string;
  fields?: string;
  isDistinct?: boolean;
  limit?: number;
  groupBy?: string;
  orderBy?: string;
  where?: string;
  having?: string;
}
