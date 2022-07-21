import {isNumber} from "./checker";

export class Position {
  x: number;
  y: number;

  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
  }

  minus(b: Position) {
    return new Position(this.x - b.x, this.y - b.y);
  }

  plus(b: Position) {
    return new Position(this.x + b.x, this.y + b.y);
  }
}

// Viewport Position
export class VPP {
  _value: Position;
  _origin: HTMLElement | undefined;

  constructor(value: Position, origin?: HTMLElement);
  constructor(x: number, y: number, origin?: HTMLElement);
  constructor(
    arg1: Position | number,
    arg2?: HTMLElement | number,
    arg3?: HTMLElement
  ) {
    const [value, origin] = VPP.parseVPPConstructorArg(arg1, arg2, arg3);

    this._value = value;
    this._origin = origin;
  }

  private static parseVPPConstructorArg(
    arg1: Position | number,
    arg2?: HTMLElement | number,
    arg3?: HTMLElement
  ): [Position, HTMLElement | undefined] {
    if (isNumber(arg1) && isNumber(arg2)) {
      return [new Position(arg1, arg2), arg3];
    }
    return [arg1 as Position, arg2 as HTMLElement | undefined];
  }

  get value() {
    return this._value;
  }

  get origin() {
    return this._origin;
  }

  static getHTMLElementVPP(element: HTMLElement) {
    const {x, y} = element.getBoundingClientRect();
    return new VPP(x, y);
  }

  static createClickVPP(ev: React.MouseEvent, origin?: HTMLElement) {
    const click = new VPP(ev.clientX, ev.clientY);
    return click.convertOrigin(origin);
  }

  getOriginVPP() {
    if (this._origin) return VPP.getHTMLElementVPP(this._origin);
    return new VPP(0, 0);
  }

  getRelativeTo(root: VPP): Position {
    if (this._origin != root.origin) {
      const thisConvertedToSameOrigin = this.convertOrigin(root.origin);
      return thisConvertedToSameOrigin._value.minus(root.value);
    }

    return this._value.minus(root.value);
  }

  convertOrigin(newOrigin?: HTMLElement) {
    const oldOriginVPP = this.getOriginVPP();
    const newOriginVPP = newOrigin
      ? VPP.getHTMLElementVPP(newOrigin)
      : new VPP(0, 0);

    const oldOriginRelativeToNewOrigin =
      oldOriginVPP.getRelativeTo(newOriginVPP);
    const newValue = this._value.plus(oldOriginRelativeToNewOrigin);

    return new VPP(newValue, newOrigin);
  }
}
