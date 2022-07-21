import {isUndefined} from "./checker";
import {toArray} from "./toArray";

type Styles = {
  [key: string]: string;
};

type ClassName = string | undefined;

const filterClassName = (arrClassName: ClassName[]) =>
  arrClassName.filter((className) => !isUndefined(className)) as string[];

export const buildClassName = (className: ClassName | ClassName[]) => {
  const arrClassName = toArray(className);
  return filterClassName(arrClassName).join(" ");
};

export const buildSassClassName = (
  styles: Styles,
  className: ClassName | ClassName[]
) => {
  const arrClassName = toArray(className);
  return filterClassName(arrClassName)
    .map((className) => styles[className])
    .join(" ");
};

export class SassStyles {
  styles: Styles;

  constructor(styles: Styles) {
    this.styles = styles;
  }

  build(className: ClassName | ClassName[]) {
    return buildSassClassName(this.styles, className);
  }

  createBuilder() {
    return this.build.bind(this);
  }
}

export const sassClasses =
  (styles: Styles) =>
  (
    className: ClassName | ClassName[],
    otherClasses?: ClassName | ClassName[]
  ) =>
    buildClassName([
      buildSassClassName(styles, className),
      ...toArray(otherClasses),
    ]);
