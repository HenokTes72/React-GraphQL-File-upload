import * as Yup from "yup";

const phoneRegExp = /^\(([1-9]{3})\)\s?([0-9]{3})-([0-9]{4})\b/;

const ApplyJobSchema = Yup.object().shape({
  name: Yup.string()
    .min(2, "Too Short!")
    .max(50, "Too Long!")
    .required("Required"),
  email: Yup.string()
    .email("Invalid email")
    .required("Required"),
  phonenumber: Yup.string()
    .matches(phoneRegExp, "Phone number is not valid")
    .required("Required"),
  address: Yup.string().required("Required"),
  zipcode: Yup.string().required("Required")
});

export default ApplyJobSchema;
