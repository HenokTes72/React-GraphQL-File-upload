import React from "react";
import styled from "styled-components";
import { useQuery } from "@apollo/react-hooks";
import PropTypes from "prop-types";

import { Loading, P, User } from "components";
import { GET_USERS } from "graphql_schemas";

const Wrapper = styled.div`
  padding-left: 25px;
  padding-right: 25px;
`;

const LargeP = styled(P)`
  font-size: 30px;
  margin-bottom: 15px;
`;

const UserList = ({ userCreated, setUserCreated }) => {
  const { data, loading, error, refetch } = useQuery(GET_USERS);

  if (loading) return <Loading />;
  if (error) return <P>Error</P>;

  if (userCreated) {
    refetch();
    setUserCreated(false);
  }

  return (
    <Wrapper>
      <LargeP>Users</LargeP>
      {data.users &&
        data.users.map((user, index) => {
          return <User key={index} user={user} />;
        })}
      {data.users.length === 0 && <P>No user records found</P>}
    </Wrapper>
  );
};

UserList.propoTypes = {
  userCreated: PropTypes.bool.isRequired,
  setUserCreated: PropTypes.func.isRequired
};

export default UserList;
