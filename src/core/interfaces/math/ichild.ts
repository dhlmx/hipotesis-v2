export interface IChild {
  name: string;
  value: number;
  type: string;
  level: string;
  children?: IChild[];
}
