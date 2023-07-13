// Signup.js
import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import apiClient from "../apiClient";
import { Button } from "primereact/button";
import { Link } from "react-router-dom";
import { Toast } from "primereact/toast";
import { useNavigate } from "react-router-dom";
const Signup = () => {
  const toast = React.useRef() as React.MutableRefObject<Toast>;
  const navigate = useNavigate();
  const validationSchema = Yup.object({
    name: Yup.string().required("Name is required"),
    email: Yup.string().email("Invalid email").required("Email is required"),
    password: Yup.string().required("Password is required"),
  });
  // const history = useHistory();
  const handleSubmit = async (values: any) => {
    try {
      const response = await apiClient.post("/users", values);
      console.log(response.data);
      toast.current.show({
        severity: "success",
        summary: "Successful",
        detail: "Signup sucess",
        life: 3000,
      });
      setTimeout(() => navigate("/"), 1000);
    } catch (error) {
      console.error(error);
      toast.current.show({
        severity: "error",
        summary: "Error",
        detail: "Signup failed",

        life: 3000,
      });
    }
  };
  return (
    <div className="">
      <Toast ref={toast} />

      <>
        <div className="max-w-8xl mx-auto px-6">
          <div className="relative flex items-center justify-between  flex-col lg:flex-row md:flex-row  lg:h-16 md:h-16">
            <div className="flex-1 flex items-center  justify-center sm:items-stretch sm:justify-start">
              <div className="flex-shrink-0 flex items-center">
                <Link to="/">
                  <button className="flex-shrink-0 flex items-center bg-white text-[#127FBD] border-[#127FBD] ml-2">
                    Home
                  </button>
                </Link>
              </div>
            </div>
            <div className="flex-1 flex items-center justify-end sm:items-stretch sm:justify-end">
              <div className="flex-shrink-0 flex items-center text-[#657491]">
                Already have an account?
              </div>
              <Link to="/login">
                <button className="flex-shrink-0 flex items-center bg-white text-[#127FBD] border-[#127FBD] ml-2">
                  Login
                </button>
              </Link>
            </div>
          </div>
        </div>
      </>
      <div>
        <div className="min-h-full flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
          <div className="max-w-md w-full space-y-8">
            <div>
              <h6 className="text-[#657491]">Create an account</h6>
            </div>
            <Formik
              initialValues={{ name: "", email: "", password: "" }}
              validationSchema={validationSchema}
              onSubmit={handleSubmit}
            >
              <div>
                <Form>
                  <div className="flex flex-col justify-center bg-blue-200 p-4">
                    <div className="px-4 sm:px-0">
                      <div className="grid grid-cols-6 gap-6">
                        <div className="col-span-6 ">
                          <label htmlFor="name">Name:</label>
                          <Field
                            type="text"
                            id="name"
                            name="name"
                            className="mt-1 w-full h-10 shadow-sm sm:text-sm border-gray-300 rounded-md"
                          />
                          <ErrorMessage name="name" component="div" />
                          <div className="col-span-6 ">
                            <label htmlFor="email">Email:</label>
                            <Field
                              type="email"
                              id="email"
                              name="email"
                              className="mt-1 w-full h-10 shadow-sm sm:text-sm border-gray-300 rounded-md"
                            />
                            <ErrorMessage name="email" component="div" />
                          </div>
                          <div className="col-span-6 ">
                            <label htmlFor="password">Password:</label>
                            <Field
                              type="password"
                              id="password"
                              name="password"
                              className="mt-1 w-full h-10 shadow-sm sm:text-sm border-gray-300 rounded-md"
                            />
                            <ErrorMessage name="password" component="div" />
                          </div>
                          <button
                            type="submit"
                            className="w-full bg-[#127FBD] text-white mt-4 rounded-md h-[40px]"
                          >
                            Submit
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </Form>
              </div>
            </Formik>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
