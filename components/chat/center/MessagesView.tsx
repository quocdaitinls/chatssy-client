import {VerticalScrollableView} from "components/shared/VerticalScrollableView";
import React from "react";
import {createMessageGroups, message_data} from "./messages";
import {MessageGroup} from "./MessageGroup";
import styles from "./MessagesView.module.scss";
import {sassClasses} from "utils";
import {useChatCtx} from "contexts/ChatContext";

const cl = sassClasses(styles);

const groups = createMessageGroups(message_data);

export const MessagesView = () => {
  const {messagesViewRef} = useChatCtx();

  return (
    <div ref={messagesViewRef} className={cl("MessagesView")}>
      <VerticalScrollableView>
        {groups.map((group) => (
          <MessageGroup key={group[0].id} data={group} />
        ))}
      </VerticalScrollableView>
    </div>
  );
};
