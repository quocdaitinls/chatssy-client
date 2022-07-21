import React, {useCallback, useState} from "react";
import {VPP} from "utils";

export type AbleUndefined<T> = T | undefined;

export const useContextMenuHandlers = () => {
  const [isContextMenuOpen, setIsContextMenuOpen] = useState(false);
  const [contextMenuPosition, setContextMenuPosition] =
    useState<AbleUndefined<VPP>>(undefined);

  const onContextMenu = useCallback(
    (ev: React.MouseEvent) => {
      ev.preventDefault();

      if (contextMenuPosition) return;

      setIsContextMenuOpen(true);
      setContextMenuPosition(VPP.createClickVPP(ev));
    },
    [contextMenuPosition]
  );

  const closeContextMenu = useCallback(() => {
    setIsContextMenuOpen(false);
  }, []);

  const clearContextMenuPosition = useCallback(() => {
    setContextMenuPosition(undefined);
  }, []);

  return {
    isContextMenuOpen,
    contextMenuPosition,
    onContextMenu,
    closeContextMenu,
    clearContextMenuPosition,
  };
};
