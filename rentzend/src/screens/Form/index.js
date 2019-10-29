import React from "react";
import { Button, message } from "antd";
import { Formik, Form } from "formik";
import styled from "styled-components";
import { useMutation } from "@apollo/react-hooks";
import PropTypes from "prop-types";

import ApplyJobSchema from "validation_schemas/form";
import { CREATE_USER_MUTATION } from "graphql_schemas";

import {
  Flex,
  FormIcon,
  Divider,
  Upload,
  PhotoUpload,
  P,
  MyInput
} from "components";

const Wrapper = styled(Flex)`
  margin-bottom: 25px;
`;

const FormWrapper = styled.div`
  border: 1px solid #ccc;
  width: 450px;
  border-radius: 10px;
  padding: 25px;
`;

const MyButton = styled(Button)`
  height: 50px;
  margin-bottom: 10px;
  background-color: #053563;
  color: white;
  width: 100%;

  &:hover {
    background-color: #fff;
  }
`;

const MyForm = ({ setUserCreated }) => {
  const [createUser] = useMutation(CREATE_USER_MUTATION);
  // const apolloClient = useApolloClient();

  const onFormSubmit = async (
    { name, email, phonenumber, address, zipcode, picture, document },
    setFieldValue
  ) => {
    const data = {
      name,
      email,
      phonenumber,
      address,
      zipcode,
      picture,
      document
    };

    console.log(data);

    try {
      const {
        data: {
          createUser: { id }
        }
      } = await createUser({ variables: data });

      message.success("Form uploaded successefully");
      setUserCreated(true);

      resetFields(setFieldValue);

      console.log("id: ", id);
    } catch (e) {
      message.error("Select a file for upload");
      console.log("ERR: ", e.message);
    }
  };

  const initialValues = {
    name: "",
    email: "",
    phonenumber: "",
    address: "",
    zipcode: "",
    picture: "",
    document: ""
  };

  const resetFields = setFieldValue => {
    setFieldValue("name", "");
    setFieldValue("email", "");
    setFieldValue("phonenumber", "");
    setFieldValue("address", "");
    setFieldValue("zipcode", "");
  };

  return (
    <Wrapper justifyContent="center">
      <FormWrapper>
        <Formik
          enableReinitialize
          initialValues={initialValues}
          validationSchema={ApplyJobSchema}
        >
          {({ values, errors, handleChange, setFieldValue, isValid }) => {
            return (
              <Form onSubmit={() => console.log("hello")}>
                <MyInput
                  value={values.name || ""}
                  name="name"
                  error={errors["name"]}
                  hasError={errors.hasOwnProperty("name")}
                  onChange={handleChange}
                  placeholder="Name"
                  prefix={<FormIcon type="user" />}
                />

                <MyInput
                  value={values.email || ""}
                  name="email"
                  error={errors["email"]}
                  onChange={handleChange}
                  placeholder="Email"
                  prefix={<FormIcon type="mail" />}
                />

                <MyInput
                  value={values.phonenumber || ""}
                  name="phonenumber"
                  error={errors["phonenumber"]}
                  onChange={handleChange}
                  placeholder="Phone Number"
                  prefix={<FormIcon type="mobile" />}
                />

                <MyInput
                  value={values.address || ""}
                  name="address"
                  error={errors["address"]}
                  onChange={handleChange}
                  placeholder="Address"
                  prefix={<FormIcon type="environment" />}
                />

                <MyInput
                  name="zipcode"
                  value={values.zipcode || ""}
                  error={errors["zipcode"]}
                  onChange={handleChange}
                  placeholder="Zip Code"
                  prefix={<FormIcon type="environment" />}
                />

                <Divider />
                <PhotoUpload onPictureChange={setFieldValue} />
                <Upload onDocumentChange={setFieldValue}>
                  Upload Document
                </Upload>
                <MyButton
                  onClick={() => onFormSubmit(values, setFieldValue)}
                  disabled={!isValid}
                  type="submit"
                >
                  <P>Submit</P>
                </MyButton>
              </Form>
            );
          }}
        </Formik>
      </FormWrapper>
    </Wrapper>
  );
};

MyForm.propTypes = {
  setUserCreated: PropTypes.func.isRequired
};

export default MyForm;
