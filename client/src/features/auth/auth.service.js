import { RecaptchaVerifier, signInWithPhoneNumber, signOut } from "firebase/auth";
import { auth } from "../../firebase";

export const sendOTP = async (phoneNumber, setConfirmationResult) => {
    try {
        const recaptchaVerifier = new RecaptchaVerifier(
            auth,
            "recaptcha-container",
            {
                size: "invisible",
                callback: () => {
                    // reCAPTCHA solved, allow signInWithPhoneNumber.
                },
            }
        );
		const confirmationResult = await signInWithPhoneNumber(auth, `+91${phoneNumber}`, recaptchaVerifier);
        setConfirmationResult(confirmationResult);
        recaptchaVerifier.clear();
        const recaptchaDiv = document.getElementById("recaptcha-container");
        recaptchaDiv?.remove();
    } catch (err) {
        console.log("otp not sent", err);
        const recaptchaDiv = document.getElementById("recaptcha-container");
        recaptchaDiv?.remove();
    }
};

export const verifyOTP = ({ otp, confirmationResult }) => {
    if (!confirmationResult) {
      console.error("No confirmation result found.");
      return;
    }
  
    confirmationResult
      .confirm(otp)
      .then((userCredential) => {
        return userCredential.user.getIdToken();
      })
      .then((idToken) => {
        console.log(idToken);
        localStorage.setItem("firebaseToken", idToken);
        window.location.href = "/car-selection";
      })
      .catch((error) => {
        console.error("OTP Verification Error:", error);
      });
  };

  export const signOutUser = async () => {
    await signOut(auth);
    localStorage.clear();
  };
  
