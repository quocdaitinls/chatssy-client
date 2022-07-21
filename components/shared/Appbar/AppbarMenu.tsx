import {Menu, MenuButton, MenuList} from "@chakra-ui/react";
import React from "react";
import {AppbarIcon, AppbarIconProps} from "./AppbarIcon";

export type AppbarMenuProps = AppbarIconProps & {};

export const AppbarMenu: React.FC<AppbarMenuProps> = (props) => {
  return (
    <Menu>
      <MenuButton as={} />
      <MenuList></MenuList>
    </Menu>
  );
};
