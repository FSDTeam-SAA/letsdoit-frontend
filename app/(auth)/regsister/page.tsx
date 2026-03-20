"use client";

import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import Image from "next/image";

type Role = "user" | "inspector";

export default function RegisterPage() {
  const [role, setRole] = useState<Role>("user");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const leftImage =
    "/auth.png";

  const roleContent = {
    user: {
      title: "Create an account",
      subtitle: "Welcome to Wellness Made Clear",
      buttonText: "Create Account",
    },
    inspector: {
      title: "Create an account",
      subtitle: "Welcome to Wellness Made Clear",
      buttonText: "Create Account",
    },
  };

  const current = roleContent[role];

  return (
    <section className="min-h-screen bg-[#f3f3f3]">
      <div className="mx-auto grid min-h-screen w-full grid-cols-1 lg:grid-cols-2">
        {/* Left Image */}
        <div className="hidden lg:block lg:sticky lg:top-0 lg:h-screen">
          <Image
            src={leftImage}
            alt="Registration illustration"
            className="h-screen w-full object-cover object-center"
          />
        </div>

        {/* Right Form */}
        <div className="flex min-h-screen items-start justify-center px-4 py-8 sm:px-6 lg:px-10">
          <div className="w-full max-w-[520px]">
            <p className="mb-2 text-center text-[12px] text-[#666] sm:text-sm">
              {current.subtitle}
            </p>

            <h1 className="mb-8 text-center text-[34px] font-semibold leading-tight text-[#1d1d1d] sm:text-[48px]">
              {current.title}
            </h1>

            {/* Register As */}
            <div className="mb-6">
              <label className="mb-3 block text-sm font-medium text-[#1f1f1f]">
                Register as A
              </label>

              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => setRole("user")}
                  className={`h-12 rounded-md border text-sm font-medium transition ${
                    role === "user"
                      ? "border-[#f2b91b] bg-[#f2b91b] text-black"
                      : "border-[#d6a51a] bg-white text-[#2a2a2a]"
                  }`}
                >
                  User
                </button>

                <button
                  type="button"
                  onClick={() => setRole("inspector")}
                  className={`h-12 rounded-md border text-sm font-medium transition ${
                    role === "inspector"
                      ? "border-[#f2b91b] bg-[#f2b91b] text-black"
                      : "border-[#d6a51a] bg-white text-[#2a2a2a]"
                  }`}
                >
                  Inspector
                </button>
              </div>
            </div>

            <form className="space-y-4">
              <InputField label="First Name" placeholder="Enter your name..." />
              <InputField label="Last Name" placeholder="Enter your name..." />
              <InputField
                label="Email"
                type="email"
                placeholder="Enter your mail address..."
              />

              {role === "inspector" && (
                <InputField
                  label="Phone No"
                  type="tel"
                  placeholder="Enter your number..."
                />
              )}

              <PasswordField
                label="Password"
                placeholder="Enter Password..."
                visible={showPassword}
                onToggle={() => setShowPassword(!showPassword)}
              />

              <PasswordField
                label="Confirm Password"
                placeholder="Enter Password..."
                visible={showConfirmPassword}
                onToggle={() => setShowConfirmPassword(!showConfirmPassword)}
              />

              <label className="flex items-start gap-2 pt-1 text-[12px] text-[#2f2f2f] sm:text-[13px]">
                <input
                  type="checkbox"
                  className="mt-0.5 h-4 w-4 rounded border-gray-300 accent-[#1f4d73]"
                />
                <span>
                  I agree to the{" "}
                  <a href="#" className="text-[#8a4d18] underline">
                    terms & conditions
                  </a>
                </span>
              </label>

              <button
                type="submit"
                className="mt-2 h-12 w-full rounded-md bg-[#f2b91b] text-sm font-medium text-[#1a1a1a] transition hover:brightness-95"
              >
                {role === "user" ? "Create Account" : "Continue"}
              </button>

              <p className="pt-2 text-center text-[12px] text-[#333] sm:text-sm">
                Don’t have an account?{" "}
                <a href="#" className="text-[#1f4d73] underline">
                  Log in
                </a>
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

function InputField({
  label,
  placeholder,
  type = "text",
}: {
  label: string;
  placeholder: string;
  type?: string;
}) {
  return (
    <div>
      <label className="mb-2 block text-sm font-medium text-[#1f1f1f]">
        {label} <span className="text-[#b14d2d]">*</span>
      </label>
      <input
        type={type}
        placeholder={placeholder}
        className="h-12 w-full rounded-md border border-[#bdbdbd] bg-transparent px-4 text-sm outline-none transition placeholder:text-[#9b9b9b] focus:border-[#999]"
      />
    </div>
  );
}

function PasswordField({
  label,
  placeholder,
  visible,
  onToggle,
}: {
  label: string;
  placeholder: string;
  visible: boolean;
  onToggle: () => void;
}) {
  return (
    <div>
      <label className="mb-2 block text-sm font-medium text-[#1f1f1f]">
        {label} <span className="text-[#b14d2d]">*</span>
      </label>

      <div className="relative">
        <input
          type={visible ? "text" : "password"}
          placeholder={placeholder}
          className="h-12 w-full rounded-md border border-[#bdbdbd] bg-transparent px-4 pr-12 text-sm outline-none transition placeholder:text-[#9b9b9b] focus:border-[#999]"
        />

        <button
          type="button"
          onClick={onToggle}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-[#9b9b9b]"
        >
          {visible ? <EyeOff size={18} /> : <Eye size={18} />}
        </button>
      </div>
    </div>
  );
}
