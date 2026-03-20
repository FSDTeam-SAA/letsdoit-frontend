"use client";

import Image from "next/image";
import { useRef, useState } from "react";
import type { ChangeEvent, ClipboardEvent, KeyboardEvent } from "react";

const OTP_LENGTH = 6;

export default function OtpVerificationPage() {
  const [otp, setOtp] = useState<string[]>(
    Array.from({ length: OTP_LENGTH }, () => "")
  );
  const inputRefs = useRef<Array<HTMLInputElement | null>>([]);

  const setOtpAt = (index: number, value: string) => {
    setOtp((prev) => {
      const next = [...prev];
      next[index] = value;
      return next;
    });
  };

  const focusInput = (index: number) => {
    const target = inputRefs.current[index];
    if (target) {
      target.focus();
      target.select();
    }
  };

  const fillFrom = (startIndex: number, digits: string) => {
    if (!digits) return;

    setOtp((prev) => {
      const next = [...prev];
      for (let i = 0; i < digits.length && startIndex + i < OTP_LENGTH; i += 1) {
        next[startIndex + i] = digits[i];
      }
      return next;
    });

    const nextIndex = Math.min(startIndex + digits.length, OTP_LENGTH - 1);
    focusInput(nextIndex);
  };

  const handleChange = (index: number) => (event: ChangeEvent<HTMLInputElement>) => {
    const raw = event.target.value;
    if (raw === "") {
      setOtpAt(index, "");
      return;
    }

    const digits = raw.replace(/\D/g, "");
    if (!digits) return;

    fillFrom(index, digits);
  };

  const handleKeyDown = (index: number) => (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Backspace") {
      if (event.currentTarget.value) {
        setOtpAt(index, "");
        return;
      }

      if (index > 0) {
        setOtpAt(index - 1, "");
        focusInput(index - 1);
      }
      return;
    }

    if (event.key === "ArrowLeft" && index > 0) {
      event.preventDefault();
      focusInput(index - 1);
    }

    if (event.key === "ArrowRight" && index < OTP_LENGTH - 1) {
      event.preventDefault();
      focusInput(index + 1);
    }
  };

  const handlePaste = (index: number) => (event: ClipboardEvent<HTMLInputElement>) => {
    event.preventDefault();
    const digits = event.clipboardData.getData("text").replace(/\D/g, "");
    if (!digits) return;

    if (digits.length >= OTP_LENGTH) {
      fillFrom(0, digits.slice(0, OTP_LENGTH));
      return;
    }

    fillFrom(index, digits);
  };

  return (
    <section className="min-h-screen bg-[#f3f3f3]">
      <div className="mx-auto grid min-h-screen grid-cols-1 lg:grid-cols-2">
        <div className="relative hidden h-screen lg:block">
          <Image
            src="/auth.png"
            alt="Workers in factory"
            fill
            priority
            className="object-cover"
          />
        </div>

        <div className="flex items-center justify-center px-4 py-10 sm:px-6 md:px-10 lg:px-14">
          <div className="w-full max-w-[420px] text-center">
            <h1 className="text-[32px] font-semibold leading-tight text-[#2d2d2d] sm:text-[40px]">
              Enter OTP
            </h1>

            <p className="mx-auto mt-3 max-w-[320px] text-[14px] leading-6 text-[#6b6b6b] sm:text-[15px]">
              An OTP has been sent to your email address please verify it below
            </p>

            <div className="mt-8 flex items-center justify-center gap-3 sm:gap-4">
              {otp.map((value, index) => (
                <input
                  key={index}
                  ref={(el) => {
                    inputRefs.current[index] = el;
                  }}
                  type="text"
                  inputMode="numeric"
                  pattern="[0-9]*"
                  maxLength={1}
                  autoComplete={index === 0 ? "one-time-code" : "off"}
                  value={value}
                  onChange={handleChange(index)}
                  onKeyDown={handleKeyDown(index)}
                  onPaste={handlePaste(index)}
                  onFocus={(event) => event.currentTarget.select()}
                  aria-label={`OTP digit ${index + 1}`}
                  className="h-[52px] w-[52px] rounded-[6px] border border-[#8d8d8d] bg-transparent text-center text-[28px] font-medium text-[#3b3b3b] outline-none focus:border-[#1d4f73] sm:h-[58px] sm:w-[58px]"
                />
              ))}
            </div>

            <p className="mt-4 text-[14px] text-[#2d2d2d]">
              Didn&apos;t Receive OTP?{" "}
              <button
                type="button"
                className="font-semibold text-[#c65b1b] transition hover:underline"
              >
                Resend OTP
              </button>
            </p>

            <button
              type="button"
              className="mt-5 h-[44px] w-full rounded-[5px] bg-[#FBBF24] text-[14px] font-medium text-[#1a1a1a] transition hover:brightness-95 sm:text-[15px]"
            >
              Verify
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
