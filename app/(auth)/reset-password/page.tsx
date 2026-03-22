"use client";

import { Eye, EyeOff } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

export default function NewPasswordPage() {
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  return (
    <section className="min-h-screen bg-[#f3f3f3]">
      <div className="mx-auto grid min-h-screen grid-cols-1 lg:grid-cols-2">
        <div className="hidden h-screen lg:block">
          <Image
            src="/auth.png"
            alt="Reset password side"
            width={1000}
            height={1000}
            className="h-full w-full object-cover"
          />
        </div>

        <div className="flex items-center justify-center px-4 py-10 sm:px-6 md:px-10 lg:px-14">
          <div className="w-full max-w-[520px]">
            <div className="mx-auto w-full max-w-[430px]">
              <h1 className="text-center text-[34px] font-semibold leading-tight text-[#131313] sm:text-[42px] lg:text-[40px]">
                New Password
              </h1>

              <p className="mt-2 text-center text-[12px] text-[#7a7a7a] sm:text-[13px]">
                Please create your new password
              </p>

              <form className="mt-10 space-y-5">
                <div>
                  <label className="mb-2 block text-base font-medium text-[#1f1f1f]">
                    New Password <span className="text-[#b94b2e]">*</span>
                  </label>
                  <div className="relative">
                    <input
                      type={showNewPassword ? "text" : "password"}
                      placeholder="Enter Password..."
                      className="h-[48px] w-full rounded-[5px] border border-[#6C6C6C] bg-transparent px-4 pr-11 text-sm outline-none placeholder:text-[#9a9a9a] focus:border-[#8f8f8f]"
                    />
                    <button
                      type="button"
                      onClick={() => setShowNewPassword((prev) => !prev)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-[#9b9b9b]"
                    >
                      {showNewPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                  </div>
                </div>

                <div>
                  <label className="mb-2 block text-base font-medium text-[#1f1f1f]">
                    Re-enter Password <span className="text-[#b94b2e]">*</span>
                  </label>
                  <div className="relative">
                    <input
                      type={showConfirmPassword ? "text" : "password"}
                      placeholder="Enter Password..."
                      className="h-[48px] w-full rounded-[5px] border border-[#6C6C6C] bg-transparent px-4 pr-11 text-sm outline-none placeholder:text-[#9a9a9a] focus:border-[#8f8f8f]"
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword((prev) => !prev)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-[#9b9b9b]"
                    >
                      {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                  </div>
                </div>

                <button
                  type="submit"
                  className="h-[44px] w-full rounded-[5px] bg-[#FBBF24] text-sm font-medium text-[#1a1a1a] transition hover:brightness-95"
                >
                  Continue
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
