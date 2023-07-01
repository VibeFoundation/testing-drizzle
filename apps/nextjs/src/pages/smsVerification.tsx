import React, { useState } from "react";
import { type NextPage } from "next";
import Image from "next/image";
import OtpInput from "react-otp-input";

const smsVerification: NextPage = () => {
  const [otp, setOtp] = useState("");
  return (
    <div className="m-auto flex h-screen w-screen max-w-7xl flex-wrap justify-center gap-5 p-5">
      <div className="flex flex-col  justify-center ">
        <div className="mr-au mb-1.5  text-3xl font-semibold text-black">
          SMS Verification
        </div>
        <div className="mb-11 max-w-lg text-xs text-black">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Incidunt
          molestiae omnis explicabo voluptas. Sed, facilis obcaecati?
          Praesentium qui quo delectus facere, tempore officiis ipsum expedita,
          assumenda blanditiis sapiente iure iusto?
        </div>
        <Image
          src="/imgs/sample-img.jpg"
          alt="Login Image"
          width={321}
          height={223}
          className="mx-auto"
        />
      </div>

      <form
        action="submit"
        className="mt-4 flex flex-col items-start justify-center gap-2"
      >
        <div className="flex flex-col gap-2 self-center">
          <label htmlFor="" className="text-base">
            Please enter verification code
          </label>
          <OtpInput
            inputStyle={`h-[50px] !w-[50px] rounded-md border-[0.5px] border-solid border-[#14224A] mx-auto`}
            value={otp}
            onChange={setOtp}
            numInputs={4}
            renderSeparator={<span>-</span>}
            renderInput={(props) => <input {...props} />}
          />
        </div>
        <button
          type="submit"
          className="mt-11 h-[50px] w-[321px] rounded-md border-none bg-[#14224A] text-[18px] font-bold text-white"
        >
          submit
        </button>
      </form>
    </div>
  );
};

export default smsVerification;
