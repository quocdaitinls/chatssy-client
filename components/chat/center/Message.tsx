import {useChatCtx} from "contexts/ChatContext";
import {
  ClassNamesOptions,
  useContextMenuHandlers,
  useShowTransition,
  useVirtualBackdrop,
} from "hooks";
import {useContextMenuPosition} from "hooks/useContextMenuPosition";
import {useContextMenuStyle} from "hooks/useContextMenuStyle";
import React, {
  RefObject,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import {sassClasses, VPP} from "utils";
import styles from "./Message.module.scss";

const cl = sassClasses(styles);

export type MessageProps = {
  data: {
    id: string | number;
    message: string;
    time: Date;
    isMyMessage: boolean;
  };
};

export const Message: React.FC<MessageProps> = ({data}) => {
  const {message, time, isMyMessage} = data;
  const ref = useRef<HTMLDivElement>(null);

  const {
    isContextMenuOpen,
    contextMenuPosition,
    onContextMenu,
    closeContextMenu,
    clearContextMenuPosition,
  } = useContextMenuHandlers();

  return (
    <div
      className={cl(["Message", isMyMessage ? "my-message" : "your-message"])}
    >
      <div ref={ref} className={cl("bubble")} onContextMenu={onContextMenu}>
        <span>{message}</span>
        {contextMenuPosition && (
          <MessageContextMenu
            isContextOpen={isContextMenuOpen}
            triggerRef={ref}
            anchor={contextMenuPosition}
            clearContextMenuPosition={clearContextMenuPosition}
            closeContextMenu={closeContextMenu}
          />
        )}
      </div>
    </div>
  );
};

type MessageContextProps = {
  isContextOpen: boolean;
  anchor: VPP;
  triggerRef: RefObject<HTMLElement>;
  clearContextMenuPosition: () => void;
  closeContextMenu: () => void;
};

const MessageContextMenu: React.FC<MessageContextProps> = ({
  isContextOpen,
  anchor,
  triggerRef,
  clearContextMenuPosition,
  closeContextMenu,
}) => {
  const {messagesViewRef: rootRef} = useChatCtx();
  const menuRef = useRef<HTMLDivElement>(null);

  const transitionClassName = useShowTransition(
    isContextOpen,
    styles as ClassNamesOptions,
    clearContextMenuPosition
  );

  const menuStyle = useContextMenuStyle(anchor, rootRef, triggerRef, menuRef);

  useVirtualBackdrop(isContextOpen, menuRef, closeContextMenu);

  return (
    <div
      ref={menuRef}
      className={cl(["context-menu"], transitionClassName)}
      onClick={() => closeContextMenu()}
      style={menuStyle}
    >
      <div>Option 1</div>
      <div>Option 2</div>
      <div>Option 3</div>
      <div>Option 4</div>
    </div>
  );
};
