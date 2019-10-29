import React from "react";
import styled from "styled-components";

import { Flex, P } from "components";
import { domain } from "utils/config";

const StyledP = styled(P)`
  margin-bottom: 5px;
`;

const Wrapper = styled(Flex)`
  max-width: 450px;
  height: 150px;
  border: 1px solid #ccc;
  margin-bottom: 10px;
  padding-right: 10px;
`;

const Image = styled.img`
  height: 100%;
  width: 200px;
  margin-right: 30px;
  border
`;

const UserProfile = styled(Flex)`
  max-width: 200px;
`;

const User = ({ user: { id, name, address, picture, document } }) => {
  const serverPath = `${domain}/${id}`;

  return (
    <Wrapper>
      <Image src={`${serverPath}-${picture}`} alt="logo of the user" />

      <UserProfile flexDirection="column" justifyContent="center">
        <StyledP> {name} </StyledP>
        <StyledP> {address} </StyledP>
        <StyledP>
          <a
            rel="noopener noreferrer"
            target="_blank"
            href={`${serverPath}-${picture}`}
          >
            Picture
          </a>
        </StyledP>
        <StyledP>
          <a
            rel="noopener noreferrer"
            target="_blank"
            href={`${serverPath}-${document}`}
          >
            Document
          </a>
        </StyledP>
      </UserProfile>
    </Wrapper>
  );
};

export default User;
