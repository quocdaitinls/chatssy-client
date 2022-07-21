import {useEffect, useRef, useState} from "react";
import {buildClassName} from "utils";

const CLOSE_DURATION = 350;

export type ClassNamesOptions = {
  open: string;
  close: string;
};

export const useShowTransition = (
  openState: boolean,
  classNames: ClassNamesOptions,
  onCloseTransitionEnd?: () => void
) => {
  const [isOpen, setIsOpen] = useState(!openState);

  useEffect(() => {
    setIsOpen(openState);

    if (!openState) {
      setTimeout(() => {
        if (onCloseTransitionEnd) onCloseTransitionEnd();
      }, CLOSE_DURATION);
    }
  }, [openState, onCloseTransitionEnd]);

  return isOpen ? classNames.open : classNames.close;
};
