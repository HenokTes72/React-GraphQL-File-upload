import React from "react";
import styled from "styled-components";
import { Input } from "antd";

import { Error } from "../index";

const Wrapper = styled.div`
  margin-bottom: 15px;
`;

const StyledInput = styled(Input)`
  height: 35px;
  background-color: white;
`;

const MyInput = ({ error, ...rest }) => {
  return (
    <Wrapper>
      <StyledInput {...rest} />
      {error && <Error>{error}</Error>}
    </Wrapper>
  );
};

export default MyInput;
