import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="">
      <>
        <div className="max-w-8xl mx-auto px-6">
          <div className="relative flex items-center justify-between  flex-col lg:flex-row md:flex-row  lg:h-16 md:h-16">
            <div className="flex-1 flex items-center  justify-center sm:items-stretch sm:justify-start">
              <div className="flex-shrink-0 flex items-center">
                <Link to="/login">
                  <button className="flex-shrink-0 flex items-center bg-white text-[#127FBD] border-[#127FBD] ml-2">
                    Login
                  </button>
                </Link>
              </div>
            </div>
            <div className="flex-1 flex items-center justify-end sm:items-stretch sm:justify-end">
              <Link to="/signup">
                <button className="flex-shrink-0 flex items-center bg-white text-[#127FBD] border-[#127FBD] ml-2">
                  Signup
                </button>
              </Link>
            </div>
          </div>
        </div>
      </>

      <div className="">
        <div className="min-h-full flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
          <div className="max-w-md w-full space-y-8">
            <div>
              <h6 className="text-[#657491]">Welcome to Home page</h6>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
