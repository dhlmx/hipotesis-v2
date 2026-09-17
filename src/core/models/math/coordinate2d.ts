export class Coordinate2D {
  private readonly _x: number;
  private readonly _y: number;

  constructor(x: number = 0, y: number = 0) {
    this._x = x;
    this._y = y;
  }

  public get x(): number { return this._x; }
  public get y(): number { return this._y; }


  public distanceTo(coordinate: Coordinate2D): number {
    return Math.sqrt(Math.pow(coordinate.x - this.x, 2) + Math.pow(coordinate.y - this.y, 2));
  }
}
