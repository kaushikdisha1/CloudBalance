import React from 'react'
import { useNavigate } from "react-router-dom";
import successIcon from "../../../images/green_tick_check.svg";


const SubmitPage = () => {
    const navigate = useNavigate();

  const goToStart = () => {
    navigate("/dashboard/Onboarding", { replace: true });
  };
  return (
    <div>
       <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center px-4 text-center">
      <div className="max-w-xl w-full">
        <img
          src={successIcon}
          alt="Success"
          className="mx-auto mb-6 h-16 w-16 rounded-full shadow-sm"
        />
        <h2 className="text-2xl md:text-3xl font-semibold text-gray-800 mb-2">
          Thank You For CUR Access!
        </h2>
        <p className="text-gray-600 mb-6">
          If you have additional accounts to onboard, please click&nbsp;
          <span
            onClick={goToStart}
            className="text-blue-600 underline font-medium cursor-pointer"
          >
            Onboard
          </span>{" "}
          to proceed.
        </p>

        <footer className="text-xs text-gray-400 mt-20">
          Cloud Balance 2025 | All Rights Reserved &nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
          <a href="#" className="text-gray-500">Contact Us</a>
        </footer>
      </div>
    </div>
    </div>
  )
}

export default SubmitPage
