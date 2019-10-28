import React from "react";
import styled from "styled-components";
import { Button, Upload } from "antd";

import { FormIcon } from "components";

const Wrapper = styled.div`
  margin-bottom: 20px;
`;

const MyUpload = ({ children, onDocumentChange }) => {
  const handleUpload = info => {
    onDocumentChange("document", info);

    return false;
  };

  return (
    <Wrapper>
      <Upload
        accept=".xlsx,.xls,.doc, .docx,.ppt, .pptx,.txt,.pdf"
        beforeUpload={handleUpload}
      >
        <Button>
          <FormIcon type="upload" /> {children}
        </Button>
      </Upload>
    </Wrapper>
  );
};

export default MyUpload;
