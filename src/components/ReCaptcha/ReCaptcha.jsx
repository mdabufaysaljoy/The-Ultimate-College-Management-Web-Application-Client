import { useEffect, useState } from "react";
import {
  loadCaptchaEnginge,
  validateCaptcha,
  LoadCanvasTemplate,
} from "react-simple-captcha";

const ReCaptcha = ({onValidate}) => {
  const [captchaText, setCaptchaText] = useState("");

    const handleCaptchaChange = (liveCaptchaText) => {
        setCaptchaText(liveCaptchaText);
        if (liveCaptchaText.length === 6) {
       if (validateCaptcha(liveCaptchaText)) {
         onValidate(true);
       } else {
         onValidate(false);
         setCaptchaText("");
       }
   }
    }

  useEffect(() => {
    loadCaptchaEnginge(6);
  }, []);
  return (
    <div>
      <LoadCanvasTemplate reloadText="↻ Reload"></LoadCanvasTemplate>
      <div className="flex flex-col gap-2 ">
        <label htmlFor="recaptcha" className="text-white">
          Captcha:<span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          className="border p-2 border-white text-white outline-none rounded-md"
          value={captchaText}
          onChange={(e) => handleCaptchaChange(e.target.value)}
          id="recaptcha"
        />
    
      </div>
    </div>
  );
};

export default ReCaptcha;
