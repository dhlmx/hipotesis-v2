export class Coordinate3D {
  private readonly _x: number;
  private readonly _y: number;
  private readonly _z: number;

  constructor(x: number = 0, y: number = 0, z: number = 0) {
    this._x = x;
    this._y = y;
    this._z = z;
  }

  public get x(): number { return this._x; }
  public get y(): number { return this._y; }
  public get z(): number { return this._z; }

  public distanceTo(coordinate: Coordinate3D): number {
    return Math.sqrt(Math.pow(coordinate.x - this.x, 2) + Math.pow(coordinate.y - this.y, 2) + Math.pow(coordinate.z - this.z, 2));
  }
}
