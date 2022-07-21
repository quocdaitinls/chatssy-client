import {useChatCtx} from "contexts/ChatContext";
import {sassClasses} from "utils/buildClassName";
import {CenterHeader} from "./CenterHeader";
import styles from "./ChatCenter.module.scss";
import {MessageInput} from "./MessageInput";
import {MessagesView} from "./MessagesView";

const cl = sassClasses(styles);

export const ChatCenter = () => {
  const {openRightSide} = useChatCtx();

  return (
    <div className={cl(["ChatCenter", openRightSide ? "" : "expanded"])}>
      <CenterHeader />
      <MessagesView />
      <MessageInput />
    </div>
  );
};
