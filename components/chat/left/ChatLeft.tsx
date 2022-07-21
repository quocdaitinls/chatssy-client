import {sassClasses} from "utils";
import styles from "./ChatLeft.module.scss";
import {Groups} from "./Groups";
import {LeftHeader} from "./LeftHeader";
import {Search} from "./Search";

const cl = sassClasses(styles);

export const ChatLeft = () => {
  return (
    <div className={cl("ChatLeft")}>
      <LeftHeader />
      <Search />
      <Groups />
    </div>
  );
};
