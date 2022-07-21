import {IconButton} from "@chakra-ui/react";
import React from "react";
import styles from "./LeftHeader.module.scss";
import {FaRegEdit} from "react-icons/fa";
import {sassClasses} from "utils";

const cl = sassClasses(styles);

export const LeftHeader = () => {
  return (
    <div className={cl("LeftHeader")}>
      <p className={cl("title")}>Messages</p>
      <IconButton
        aria-label='edit'
        variant='ghost'
        className={styles["icon-btn"]}
        icon={<FaRegEdit size='1.3rem' />}
      />
    </div>
  );
};
