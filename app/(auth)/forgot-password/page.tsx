"use client";

import Image from "next/image";
import Link from "next/link";

export default function ForgotPasswordPage() {
  return (
    <section className="min-h-screen  w-full">
 

      <div className="w-full grid h-screen grid-cols-1 px-3 pb-3 sm:px-0 sm:pb-4 lg:grid-cols-2">
        {/* Left Image */}
        <div className="relative hidden h-screen  lg:block ">
          <Image
            src="/auth.png"
            alt="Automotive inspection"
            fill
            priority
            className="object-cover"
          />
        </div>

        {/* Right Content */}
        <div className="flex items-center justify-center bg-[#f7f7f7] px-4 py-10 sm:px-8 md:px-10 lg:px-0">
          <div className="w-full max-w-[420px]">
            <h1 className="text-center text-[34px] font-semibold leading-tight text-[#252525] sm:text-[42px] lg:text-[40px]">
              Forget Password
            </h1>

            <p className="mx-auto mt-3 max-w-[360px] text-center text-[12px] leading-6 text-[#9E9E9E] sm:text-[16px]">
              Please enter the email address linked to your account. We’ll send
              a one-time password (OTP) to your email for verification.
            </p>

            <form className="mt-8 sm:mt-10">
              <div>
                <label className="mb-2 block text-base font-medium text-[##2A2A2A]">
                  Email <span className="text-[#b84f36]">*</span>
                </label>

                <input
                  type="email"
                  placeholder="Enter your mail address..."
                  className="h-[48px] w-full rounded-[5px] border border-[#6C6C6C] bg-transparent px-4 text-sm text-[#222] outline-none transition placeholder:text-[#9b9b9b] focus:border-[#8f8f8f]"
                />
              </div>

              <button
                type="submit"
                className="mt-5 h-[44px] w-full rounded-[5px] bg-[#FBBF24] text-sm font-medium text-[#1a1a1a] transition hover:brightness-95"
              >
                Send OTP
              </button>

              <p className="mt-4 text-center text-[12px] text-[#8d8d8d] sm:text-[13px]">
                Back to{" "}
                <Link href="#" className="font-medium text-[#244a73] underline">
                  Log in
                </Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}