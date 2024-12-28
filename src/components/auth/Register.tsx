"use client";
import React, { useState } from "react";

function Register() {
  const [rollno, setRollno] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(""); // To store error messages

  // Function to handle OTP verification
  const handleVerify = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError(""); // Reset any previous errors

    try {
      const res = await fetch("http://localhost:3000/api/verify", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ roll_number: rollno }),
      });

      // Ensure the response is ok (200 status)
      if (res.status != 200) {
        setOtpSent(true);
        console.log("Failed to send OTP");
      }

      console.log(res.status);

    } catch (error) {
      console.error("Error during OTP verification:", error);
      setError(error.message || "An error occurred while sending OTP");
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check if passwords match before submitting
    if (password !== confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    setIsLoading(true);

    try {
      const formData = {
        roll_number: rollno,
        username: e.target.username.value,
        password: password,
        confirmpassword: confirmPassword,
        otp: otp,
      };

      // Call your API to submit the form (with OTP)
      const res = await fetch("http://localhost:3000/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (data.success) {
        alert("Registration successful!");
        // You can redirect or clear the form, etc.
      } else {
        throw new Error(data.message || "Registration failed");
      }
    } catch (error) {
      console.error("Error during registration:", error);
      setError(error.message || "An error occurred during registration");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-hero-gradient">
      <div className="flex justify-center items-center h-screen">
        <div className="bg-white p-8 rounded-lg shadow-2xl w-96">
          <h2 className="text-2xl font-bold mb-8">Register</h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label
                htmlFor="username"
                className="block text-sm font-medium text-gray-700"
              >
                Username
              </label>
              <input
                type="text"
                id="username"
                name="username"
                className="mt-1 p-2 w-full border border-gray-300 rounded-md"
                required
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="rollno"
                className="block text-sm font-medium text-gray-700"
              >
                Roll Number
              </label>
              <div className="flex items-center gap-5">
                <input
                  type="text"
                  id="rollno"
                  name="rollno"
                  className="mt-1 p-2 w-full border border-gray-300 rounded-md"
                  value={rollno}
                  onChange={(e) => setRollno(e.target.value)}
                  required
                />
                <button
                  type="button"
                  className="bg-green-400 py-2 px-3 rounded-md hover:opacity-80 transition-all"
                  onClick={handleVerify}
                  disabled={isLoading}
                >
                  {isLoading ? "Verifying..." : otpSent ? "OTP Sent" : "Verify"}
                </button>
              </div>
            </div>
            {(
              <div>
                <label
                  htmlFor="otp"
                  className="block text-sm font-medium text-gray-700"
                >
                  OTP
                </label>
                <input
                  type="text"
                  id="otp"
                  name="otp"
                  className="mt-1 p-2 w-full border border-gray-300 rounded-md"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  required
                />
              </div>
            )}
            <div className="mb-4">
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700"
              >
                Password
              </label>
              <input
                type="password"
                id="password"
                name="password"
                className="mt-1 p-2 w-full border border-gray-300 rounded-md"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="confirmPassword"
                className="block text-sm font-medium text-gray-700"
              >
                Confirm Password
              </label>
              <input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                className="mt-1 p-2 w-full border border-gray-300 rounded-md"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
            </div>
            {error && (
              <div className="text-red-500 text-sm mb-4">
                <p>{error}</p>
              </div>
            )}
            <button
              type="submit"
              className="w-full bg-blue-500 text-white p-2 rounded-md"
              //disabled={isLoading || !otpSent}
            >
              Register
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Register;
