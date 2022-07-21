import React, {
  ComponentProps,
  PropsWithChildren,
  RefObject,
  useCallback,
} from "react";
import {AppliedStyle, applyStyle, getCss, sassClasses, VPP} from "utils";
import styles from "./Button.module.scss";

const cl = sassClasses(styles);

type ButtonProps = ComponentProps<"button"> & {
  rippleEffect?: boolean;
};

export const Button: React.FC<PropsWithChildren<ButtonProps>> = ({
  children,
  className,
  rippleEffect,
  ...props
}) => {
  const buttonRef = React.useRef<HTMLButtonElement>(null);

  const createHandleRippleEffect = useCallback(
    (buttonRef: RefObject<HTMLElement>) => {
      const button = buttonRef.current;

      if (!button) return () => {};

      const createRipple = (ev: React.MouseEvent) => {
        const clickVPP = VPP.createClickVPP(ev, button);

        let ripple = document.createElement("span");

        const style: AppliedStyle = {
          backgroundColor: getCss(button, "color"),
          left: `${clickVPP.value.x}px`,
          top: `${clickVPP.value.y}px`,
        };

        ripple.className = cl("ripple");
        applyStyle(ripple, style);

        return ripple;
      };

      const handleRippleEffect = (ev: React.MouseEvent) => {
        let ripple = createRipple(ev);
        button.appendChild(ripple);

        setTimeout(() => {
          ripple.remove();
        }, 1000);
      };

      return handleRippleEffect;
    },
    []
  );

  const handleClick = (ev: React.MouseEvent<HTMLButtonElement>) => {
    if (rippleEffect) createHandleRippleEffect(buttonRef)(ev);
    if (props?.onClick) props.onClick(ev);
  };

  return (
    <button
      ref={buttonRef}
      className={cl("Button", className)}
      {...props}
      onClick={handleClick}
    >
      {children}
    </button>
  );
};
