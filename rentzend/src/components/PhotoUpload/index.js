import React from "react";
import styled from "styled-components";
import { Upload, Button } from "antd";

import { FormIcon } from "components";

const Wrapper = styled.div`
  margin-bottom: 20px;
`;

const MyUpload = ({ onPictureChange }) => {
  const handleUpload = info => {
    onPictureChange("picture", info);

    return false;
  };
  // const onChange = ({
  //   target: {
  //     files: [file]
  //   }
  // }) => {
  //   onPictureChange("picture", file);
  // };

  return (
    <Wrapper>
      <Upload accept="image/*" beforeUpload={handleUpload}>
        <Button>
          <FormIcon type="upload" /> Upload Photo
        </Button>
      </Upload>
      {/* <input type="file" required onChange={onChange} /> */}
    </Wrapper>
  );
};

export default MyUpload;
