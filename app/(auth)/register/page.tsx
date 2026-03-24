"use client";

import { useState, type ChangeEvent, type FormEvent } from "react";
import { Eye, EyeOff } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { useInspectorRegistration } from "@/components/provider/InspectorRegistrationProvider";

type Role = "user" | "inspector";

type RegisterPayload = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
};

async function registerUser(data: RegisterPayload) {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/register`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    }
  );

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(
      errorData.message || `Server responded with status ${response.status}`
    );
  }

  return response.json();
}

export default function RegisterPage() {
  const router = useRouter();
  const { setData: setInspectorData } = useInspectorRegistration();
  const [role, setRole] = useState<Role>("user");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const leftImage = "/auth.png";

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

  const mutation = useMutation({
    mutationFn: registerUser,
    onSuccess: () => {
      toast.success("Registration successful", {
        description: "You can now log in with your new account.",
      });
      router.push("/login");
    },
    onError: (error: Error) => {
      toast.error("Registration failed", {
        description: error.message || "Please try again later.",
      });
    },
  });

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const trimmedFirstName = firstName.trim();
    const trimmedLastName = lastName.trim();
    const trimmedEmail = email.trim();
    const trimmedPhone = phone.trim();

    if (!trimmedFirstName) {
      toast.warning("First name is required.");
      return;
    }

    if (!trimmedLastName) {
      toast.warning("Last name is required.");
      return;
    }

    if (!trimmedEmail) {
      toast.warning("Email is required.");
      return;
    }

    if (role === "inspector" && !trimmedPhone) {
      toast.warning("Phone number is required.");
      return;
    }

    if (!password.trim()) {
      toast.warning("Password is required.");
      return;
    }

    if (password !== confirmPassword) {
      toast.warning("Passwords do not match.");
      return;
    }

    if (role === "inspector") {
      setInspectorData({
        firstName: trimmedFirstName,
        lastName: trimmedLastName,
        email: trimmedEmail,
        phone: trimmedPhone,
        password: password.trim(),
      });
      router.push("/join-our-team");
      return;
    }

    mutation.mutate({
      firstName: trimmedFirstName,
      lastName: trimmedLastName,
      email: trimmedEmail,
      password: password.trim(),
    });
  };

  return (
    <section className="min-h-screen bg-[#f3f3f3]">
      <div className="mx-auto grid min-h-screen w-full grid-cols-1 lg:grid-cols-2">
        {/* Left Image */}
        <div className="hidden lg:block lg:sticky lg:top-0 lg:h-screen">
          <Image
            src={leftImage}
            alt="Registration illustration"
            width={1000}
            height={1000}
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

            <form onSubmit={handleSubmit} className="space-y-4">
              <InputField
                label="First Name"
                placeholder="Enter your name..."
                value={firstName}
                onChange={(event) => setFirstName(event.target.value)}
                disabled={mutation.isPending}
                autoComplete="given-name"
              />
              <InputField
                label="Last Name"
                placeholder="Enter your name..."
                value={lastName}
                onChange={(event) => setLastName(event.target.value)}
                disabled={mutation.isPending}
                autoComplete="family-name"
              />
              <InputField
                label="Email"
                type="email"
                placeholder="Enter your mail address..."
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                disabled={mutation.isPending}
                autoComplete="email"
              />

              {role === "inspector" && (
                <InputField
                  label="Phone No"
                  type="tel"
                  placeholder="Enter your number..."
                  value={phone}
                  onChange={(event) => setPhone(event.target.value)}
                  disabled={mutation.isPending}
                  autoComplete="tel"
                />
              )}

              <PasswordField
                label="Password"
                placeholder="Enter Password..."
                visible={showPassword}
                onToggle={() => setShowPassword(!showPassword)}
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                disabled={mutation.isPending}
                autoComplete="new-password"
              />

              <PasswordField
                label="Confirm Password"
                placeholder="Enter Password..."
                visible={showConfirmPassword}
                onToggle={() => setShowConfirmPassword(!showConfirmPassword)}
                value={confirmPassword}
                onChange={(event) => setConfirmPassword(event.target.value)}
                disabled={mutation.isPending}
                autoComplete="new-password"
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
                disabled={mutation.isPending}
                className="mt-2 h-12 w-full rounded-md bg-[#f2b91b] text-sm font-medium text-[#1a1a1a] transition hover:brightness-95 disabled:cursor-not-allowed disabled:opacity-70"
              >
                {mutation.isPending
                  ? "Creating..."
                  : role === "user"
                  ? "Create Account"
                  : "Continue"}
              </button>

              <p className="pt-2 text-center text-[12px] text-[#333] sm:text-sm">
                Don’t have an account?{" "}
                <Link href="/login" className="text-[#1f4d73] underline">
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

function InputField({
  label,
  placeholder,
  type = "text",
  value,
  onChange,
  disabled,
  autoComplete,
}: {
  label: string;
  placeholder: string;
  type?: string;
  value: string;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  disabled?: boolean;
  autoComplete?: string;
}) {
  return (
    <div>
      <label className="mb-2 block text-sm font-medium text-[#1f1f1f]">
        {label} <span className="text-[#b14d2d]">*</span>
      </label>
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        disabled={disabled}
        autoComplete={autoComplete}
        className="h-12 w-full rounded-md border border-[#bdbdbd] bg-transparent px-4 text-sm outline-none transition placeholder:text-[#9b9b9b] focus:border-[#999] disabled:cursor-not-allowed disabled:opacity-70"
      />
    </div>
  );
}

function PasswordField({
  label,
  placeholder,
  visible,
  onToggle,
  value,
  onChange,
  disabled,
  autoComplete,
}: {
  label: string;
  placeholder: string;
  visible: boolean;
  onToggle: () => void;
  value: string;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  disabled?: boolean;
  autoComplete?: string;
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
          value={value}
          onChange={onChange}
          disabled={disabled}
          autoComplete={autoComplete}
          className="h-12 w-full rounded-md border border-[#bdbdbd] bg-transparent px-4 pr-12 text-sm outline-none transition placeholder:text-[#9b9b9b] focus:border-[#999] disabled:cursor-not-allowed disabled:opacity-70"
        />

        <button
          type="button"
          onClick={onToggle}
          disabled={disabled}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-[#9b9b9b] disabled:cursor-not-allowed"
        >
          {visible ? <EyeOff size={18} /> : <Eye size={18} />}
        </button>
      </div>
    </div>
  );
}
