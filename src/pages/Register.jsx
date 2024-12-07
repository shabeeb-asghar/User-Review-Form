import React, { useState } from "react";
import FormSection from "../components/Register/FormSection";
import BackgroundSection from "../components/Register/BackgroundSection";

const Register = () => {
  const [formType, setFormType] = useState("signup"); // Toggle between signup and login

  return (
    <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center p-5">
      <div className="container row">
        {/* Left Form Section */}
        <div className="col-lg-6">
          <FormSection formType={formType} setFormType={setFormType} />
        </div>

        {/* Right Background Section */}
        <div className="col-lg-6">
          <BackgroundSection />
        </div>
      </div>
    </div>
  );
};

export default Register;