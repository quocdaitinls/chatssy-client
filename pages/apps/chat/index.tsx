import {ChatApp} from "components/chat/ChatApp";
import {AppPageWithAppbarLayout} from "components/shared/AppPageWithAppbarLayout";
import {ChatProvider} from "contexts/ChatContext";
import {GetServerSideProps} from "next";
import {useRouter} from "next/router";
import {NextPageWithLayout} from "types";

type ChatPageProps = {
  initialData: any;
};

const ChatPage: NextPageWithLayout<ChatPageProps> = ({initialData}) => {
  return (
    <ChatProvider>
      <ChatApp />
    </ChatProvider>
  );
};

ChatPage.getLayout = AppPageWithAppbarLayout;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const {id} = context.query;

  console.log(
    "Fetch data for chatroom with provided id and return to props for page."
  );

  return {
    props: {
      initialData: {},
    },
  };
};

export default ChatPage;
