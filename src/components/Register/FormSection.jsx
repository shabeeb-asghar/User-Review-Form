import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { registerUser, loginUser } from "../../features/auth/authSlice";

const FormSection = ({ formType, setFormType }) => {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "user", // Default role
  });

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (formType === "signup") {
      // Dispatch signup action
      dispatch(registerUser(formData));
    } else {
      // Dispatch login action
      dispatch(loginUser(formData));
    }
  };

  return (
    <div>
      <h2 className="text-4xl font-bold mb-5">
        {formType === "signup" ? "Create new account." : "Log In"}
      </h2>
      <p className="mb-5">
        {formType === "signup" ? "Already a Member? " : "New here? "}
        <span
          className="text-blue-500 cursor-pointer"
          onClick={() => setFormType(formType === "signup" ? "login" : "signup")}
        >
          {formType === "signup" ? "Log In" : "Sign Up"}
        </span>
      </p>
      <form className="space-y-4" onSubmit={handleSubmit}>
        {formType === "signup" && (
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            placeholder="Full name"
            className="w-full p-3 rounded bg-gray-800 text-gray-300"
            required
          />
        )}
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleInputChange}
          placeholder="Email"
          className="w-full p-3 rounded bg-gray-800 text-gray-300"
          required
        />
        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleInputChange}
          placeholder="Password"
          className="w-full p-3 rounded bg-gray-800 text-gray-300"
          required
        />
        {formType === "signup" && (
          <select
            name="role"
            value={formData.role}
            onChange={handleInputChange}
            className="w-full p-3 rounded bg-gray-800 text-gray-300"
            required
          >
            <option value="user">User</option>
            <option value="admin">Admin</option>
          </select>
        )}
        <button
          type="submit"
          className="w-full bg-blue-500 hover:bg-blue-600 text-white py-3 rounded"
        >
          {formType === "signup" ? "Create account" : "Log In"}
        </button>
      </form>
    </div>
  );
};

export default FormSection;