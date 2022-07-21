import styles from "./Groups.module.scss";
import {ChatroomGroup} from "./ChatroomGroup";
import {allChatrooms, pinnedChatrooms} from "./data";
import {VerticalScrollableView} from "components/shared/VerticalScrollableView";
import {sassClasses} from "utils";

const cl = sassClasses(styles);

export const Groups = () => {
  return (
    <div className={cl("Groups")}>
      <VerticalScrollableView>
        <ChatroomGroup {...pinnedChatrooms} />
        <ChatroomGroup {...allChatrooms} />
      </VerticalScrollableView>
    </div>
  );
};
