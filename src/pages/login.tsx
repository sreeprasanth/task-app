import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import apiClient from "../apiClient";
import { useEffect, useState } from "react";
import { Toast } from "primereact/toast";
import { Link } from "react-router-dom";

const Login = () => {
  const toast = React.useRef() as React.MutableRefObject<Toast>;

  const [tok, setTok]: any = useState(0);
  const [email, setEmail]: any = useState("");

  const [error, setError]: any = useState(0);
  const token = localStorage.getItem("token");

  const validationSchemaEmail = Yup.object({
    email: Yup.string().email("Invalid email").required("Email is required"),
  });
  const validationSchema = Yup.object({
    email: Yup.string().email("Invalid email").required("Email is required"),
    password: Yup.string().required("Password is required"),
  });
  const handleLogout = () => {
    localStorage.removeItem("token");
    setTok(0);
    setEmail("");
  };

  const handleShare = async (values: any) => {
    console.log("val", values);
    try {
      const response = await apiClient.post("/share", values);
      toast.current.show({
        severity: "success",
        summary: "Successful",
        detail: "Password Shared sucessfully",
        life: 3000,
      });
    } catch (error) {
      console.error(error);
    }
  };
  const handleSubmit = async (values: any) => {
    try {
      const response = await apiClient.post("/login", values);
      localStorage.setItem("token", response.data);
      setTok(1);
      setEmail(values.email);
      toast.current.show({
        severity: "success",
        summary: "Successful",
        detail: "Login sucess",
        life: 3000,
      });
    } catch (error) {
      setError(error);
      console.error(error);
      toast.current.show({
        severity: "error",
        summary: "Error",
        detail: "Login failed",

        life: 3000,
      });
    }
  };
  useEffect(() => {
    if (token) {
      setTok(1);
    }
    if (!token) {
      setTok(0);
    }
  }, []);
  console.log("em", email, tok);
  if (tok === 0) {
    return (
      <div>
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
            </div>
          </div>
        </>
        <div className="min-h-full flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
          <div className="max-w-md w-full space-y-8">
            <div>
              <h6 className="text-[#657491]">Login</h6>
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
    );
  } else {
    return (
      <>
        <>
          <Toast ref={toast} />

          <div className="max-w-8xl mx-auto px-6">
            <div className="relative flex items-center justify-between  flex-col lg:flex-row md:flex-row  lg:h-16 md:h-16">
              <div className="flex-1 flex items-center  justify-center sm:items-stretch sm:justify-start">
                {/* <div className="flex-shrink-0 flex items-center">
                <Link to="/">
                  <button className="flex-shrink-0 flex items-center bg-white text-[#127FBD] border-[#127FBD] ml-2">
                    Home
                  </button>
                </Link>
              </div>
            </div> */}
                <div className="flex-1 flex items-center justify-end sm:items-stretch sm:justify-end">
                  {/* <div className="flex-shrink-0 flex items-center text-[#657491]">
                Already have an account?
              </div> */}
                  <button
                    className="flex-shrink-0 flex items-center bg-white text-[#127FBD] border-[#127FBD] ml-2"
                    onClick={handleLogout}
                  >
                    Logout
                  </button>
                </div>
              </div>
            </div>
          </div>
        </>
        <div>
          <div className="min-h-full flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md w-full space-y-8">
              <div>
                <h6 className="text-[#657491]">
                  Welcome , You can share password by enter email and click
                  share button then an email will send
                </h6>
              </div>
              <Formik
                initialValues={{ email: "", emailTo: email }}
                validationSchema={validationSchemaEmail}
                // onSubmit={handleShare}
                onSubmit={(values: any, { setSubmitting }) => {
                  handleShare({
                    ...values,
                    emailBy: email,
                  });
                }}
              >
                <div>
                  <Form>
                    <div className="flex flex-col justify-center bg-blue-200 p-4">
                      <div className="px-4 sm:px-0">
                        <div className="grid grid-cols-6 gap-6">
                          <div className="col-span-6 ">
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
      </>
      // <div>
      //   <button onClick={handleLogout}>Logout</button>

      //   <div className="bg-red-300">
      //     <h1>Share password</h1>
      //     <Formik
      //       initialValues={{ email: "", emailTo: email }}
      //       validationSchema={validationSchemaEmail}
      //       // onSubmit={handleShare}
      //       onSubmit={(values: any, { setSubmitting }) => {
      //         handleShare({
      //           ...values,
      //           emailBy: email,
      //         });
      //       }}
      //     >
      //       <Form>
      //         <div>
      //           <label htmlFor="email">Email:</label>
      //           <Field type="email" id="email" name="email" />
      //           <ErrorMessage name="email" component="div" />
      //         </div>

      //         <button type="submit">sub</button>
      //       </Form>
      //     </Formik>
      //   </div>
      // </div>
    );
  }
};

export default Login;
