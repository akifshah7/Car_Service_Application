import { useState } from "react";
import { sendOTP } from "../auth.service";
import EnterOtp from "./EnterOtp";
import { loginConfirmation } from "../states/loginConfirmation.atom";
import { useSetAtom } from "jotai";

const Login = () => {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [showOtpInput, setShowOtpInput] = useState(false);
  const setLoginConfirmationResult = useSetAtom(loginConfirmation);

  const handleLogin = () => {
    sendOTP(phoneNumber, (val) => {
      setLoginConfirmationResult(val);
    })
      .then(() => {
        setShowOtpInput(true);
      })
      .catch((error) => {
        console.error("Error sending OTP:", error);
      });
  };

  return (
    <div className="h-[calc(100vh-4rem)] w-full bg-gray-100 flex items-center justify-center px-6">
      <div id="recaptcha-container"></div>
      {!showOtpInput ? (
        <div className="card bg-white shadow-lg rounded-xl w-full px-4 py-12">
          <div className="flex flex-col items-center gap-y-4">
            <h1 className="text-2xl font-bold">Welcome</h1>
            <p className="">Enter your mobile number to continue</p>
            <input
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              className="input rounded-md h-16 w-full text-xl focus:outline-none focus:ring-0 focus:border-blue-400 focus:border-2"
            />
            <button
              onClick={handleLogin}
              className="btn bg-blue-500 rounded-full text-white font-semibold text-xl w-full h-16"
            >
              Send OTP
            </button>
          </div>
        </div>
      ) : (
        <EnterOtp />
      )}
    </div>
  );
};

export default Login;
