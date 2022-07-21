import {useEffect, useState} from "react";
import {VPP} from "utils";

const {max} = Math;

// Return caculated position of menu relative to trigger element inside root.
// Note: Calculate base on rootRef as origin
export const useContextMenuPosition = (
  anchor: VPP | undefined,
  getRoot: () => HTMLElement | null,
  getTrigger: () => HTMLElement | null,
  getMenu: () => HTMLElement | null
) => {
  const [menuPosition, setMenuPosition] = useState(new VPP(0, 0));

  useEffect(() => {
    let posX = 0,
      posY = 0;

    const root = getRoot();
    const trigger = getTrigger();
    const menu = getMenu();

    if (!anchor) return;
    if (!root || !trigger || !menu) return;

    const rootRect = root.getBoundingClientRect();
    const menuRect = {width: menu.offsetWidth, height: menu.offsetHeight};

    const anchorPos = anchor.convertOrigin(root);

    const AX = max(0, rootRect.width - menuRect.width);
    const AY = max(0, rootRect.height - menuRect.height);

    if (anchorPos.value.x < AX || AX == 0) posX = anchorPos.value.x;
    else if (AX > 0) posX = AX;

    if (anchorPos.value.y < AY || AY == 0) posY = anchorPos.value.y;
    else if (AY > 0) posY = AY;

    setMenuPosition(new VPP(posX, posY, root).convertOrigin(trigger));
  }, [anchor, getRoot, getTrigger, getMenu]);

  return menuPosition;
};
