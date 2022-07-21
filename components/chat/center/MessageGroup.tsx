import React from "react";
import {sassClasses} from "utils";
import styles from "./MessageGroup.module.scss";
import {MessageTest, message_data} from "./messages";
import {Message} from "./Message";
import {Avatar} from "@chakra-ui/react";

const cl = sassClasses(styles);

export type MessageGroupProps = {
  data: MessageTest[];
};

export const MessageGroup: React.FC<MessageGroupProps> = ({data}) => {
  const isMyGroup = data[0].isMyMessage;

  return (
    <div
      className={cl(["MessageGroup", isMyGroup ? "my-group" : "your-group"])}
    >
      <div className={cl("content")}>
        <Avatar className={cl("avatar")} />
        <div className={cl("messages")}>
          {data.map((message) => (
            <Message key={message.id} data={message} />
          ))}
        </div>
      </div>
    </div>
  );
};
