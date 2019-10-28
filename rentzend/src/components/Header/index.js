import React from "react";
import styled from "styled-components";

import { Flex, H1 } from "../index";

const CustomizedHeader = styled(Flex)`
  height: 100px;
  background-color: #05386b;
  margin-bottom: 100px;
`;

const Header = () => {
  return (
    <CustomizedHeader alignItems="center" justifyContent="center">
      <H1>RentZend Form</H1>
    </CustomizedHeader>
  );
};

export default Header;
