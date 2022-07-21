import {Avatar, IconButton} from "@chakra-ui/react";
// import {IconButton} from "@chatssy-ui";
import {IconButtonProps} from "@chatssy-ui";
import {GetChakraProps} from "components/shared/ChakraTypes";
import {ChatRightSide, useChatCtx} from "contexts/ChatContext";
import React from "react";
import {IconType} from "react-icons";
import {AiFillPushpin} from "react-icons/ai";
import {IoSearch} from "react-icons/io5";
import {TbDotsVertical} from "react-icons/tb";
import {sassClasses} from "utils/buildClassName";
import styles from "./CenterHeader.module.scss";

const cl = sassClasses(styles);

type ChakraIconButtonProps = GetChakraProps<"button", IconButtonProps>;

type UtilIconProps = Omit<ChakraIconButtonProps, "icon"> & {
  icon: IconType;
};

const UtilIcon: React.FC<UtilIconProps> = ({icon: Icon, ...props}) => {
  return (
    <IconButton
      className={cl("util-icon-btn")}
      aria-label=''
      variant='ghost'
      icon={<Icon className={cl("util-icon")} {...props} />}
    />
  );
};

export const CenterHeader = () => {
  const {handleOpenSide} = useChatCtx();

  return (
    <div className={cl("CenterHeader")}>
      <div
        className={cl("chat-info")}
        onClick={() => handleOpenSide(ChatRightSide.PROFILE)}
      >
        <Avatar className={cl("chat-avatar")} />
        <p className={cl("chat-name")}>Name of Chatroom</p>
      </div>
      <div className={cl("chat-util")}>
        <UtilIcon icon={AiFillPushpin} />
        <UtilIcon
          icon={IoSearch}
          onClick={() => handleOpenSide(ChatRightSide.SEARCH)}
        />
        <UtilIcon icon={TbDotsVertical} />
      </div>
    </div>
  );
};
