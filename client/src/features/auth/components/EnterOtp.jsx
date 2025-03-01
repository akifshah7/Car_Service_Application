import { useState } from "react";
import OtpInput from "react-otp-input";
import { verifyOTP } from "../auth.service";
import { useAtomValue } from "jotai";
import { loginConfirmation } from "../states/loginConfirmation.atom";

const EnterOtp = () => {
  const [otp, setOtp] = useState("");
  const confirmationResult = useAtomValue(loginConfirmation);

  const handleSubmit = () => {
    setTimeout(() => {
      verifyOTP({ otp: otp, confirmationResult: confirmationResult });
    }, 2000); // Delays execution by 2 seconds (2000ms)
  };

  return (
    <div className="h-[calc(100vh-4rem)] w-full bg-gray-100 flex items-center justify-center px-4">
      <div className="card bg-white shadow-lg rounded-xl w-full px-4 py-12">
        <div className="flex flex-col items-center gap-y-4">
          <h1 className="text-xl font-bold">Verify OTP</h1>
          <p className="mt-4 text-gray-400">
            Enter the code sent to {'+91 9810994561'}
          </p>
          <OtpInput
            value={otp}
            onChange={setOtp}
            numInputs={6}
            containerStyle="mt-2"
            inputStyle="border-1 !w-full h-12 !mx-1 rounded-lg"
            renderInput={(props) => <input {...props} />}
          />
          <button
            onClick={handleSubmit}
            className="bg-blue-500 btn w-full h-16 rounded-full text-white font-semibold text-xl"
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
};

export default EnterOtp;
