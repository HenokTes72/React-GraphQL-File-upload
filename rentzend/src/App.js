import React, { useState } from "react";
import { Header, Divider } from "components";
import styled from "styled-components";
import Form from "screens/Form";
import UserList from "screens/UserList";
// import View from "screens/View";

const AppWrapper = styled.div`
  background-color: white;
`;

function App() {
  const [userCreated, setUserCreated] = useState(false);
  return (
    <AppWrapper>
      <Header />
      <Form setUserCreated={setUserCreated} />
      <Divider />
      <UserList userCreated={userCreated} setUserCreated={setUserCreated} />
    </AppWrapper>
  );
}

export default App;
