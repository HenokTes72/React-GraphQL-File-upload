import React from "react";
import styled from "styled-components";

import { Flex, P } from "components";
import { domain } from "utils/config";

const StyledP = styled(P)`
  margin-bottom: 6px;
`;

const Wrapper = styled(Flex)`
  max-width: 500px;
  height: 120px;
  border: 1px solid #ccc;
  margin-bottom: 10px;
  padding-right: 10px;
`;

const Image = styled.img`
  height: 120px;
  width: 150px;
`;

const UserProfile = styled(Flex)``;

const User = ({ user: { id, name, address, picture, document } }) => {
  const serverPath = `${domain}/${id}`;

  return (
    <Wrapper justifyContent="space-between">
      <Image src={`${serverPath}-${picture}`} alt="logo of the user" />

      <UserProfile flexDirection="column" justifyContent="center">
        <StyledP> {name} </StyledP>
        <StyledP> {address} </StyledP>
        <StyledP>
          <a
            rel="noopener noreferrer"
            target="_blank"
            href={`${serverPath}-${document}`}
          >
            Get document
          </a>
        </StyledP>
        <StyledP>
          <a
            rel="noopener noreferrer"
            target="_blank"
            href={`${serverPath}-${picture}`}
          >
            Get picture
          </a>
        </StyledP>
      </UserProfile>
    </Wrapper>
  );
};

export default User;
