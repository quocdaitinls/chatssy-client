import {RefObject, useCallback} from "react";
import {VPP} from "utils";
import {useContextMenuPosition} from "./useContextMenuPosition";

export const useContextMenuStyle = (
  anchor: VPP,
  rootRef: RefObject<HTMLElement>,
  triggerRef: RefObject<HTMLElement>,
  menuRef: RefObject<HTMLElement>
) => {
  const getRootElement = useCallback(() => rootRef.current, [rootRef]);
  const getTriggerElement = useCallback(() => triggerRef.current, [triggerRef]);
  const getMenuElement = useCallback(() => menuRef.current, [menuRef]);

  const menuPosition = useContextMenuPosition(
    anchor,
    getRootElement,
    getTriggerElement,
    getMenuElement
  );
  const transformOrigin = anchor.getRelativeTo(menuPosition);

  return {
    left: `${menuPosition.value.x}px`,
    top: `${menuPosition.value.y}px`,
    transformOrigin: `${transformOrigin.x}px ${transformOrigin.y}px`,
  };
};
