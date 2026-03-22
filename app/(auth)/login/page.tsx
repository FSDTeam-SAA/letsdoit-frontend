// 'use client';
// import { Eye, EyeOff } from "lucide-react";
// import Image from "next/image";
// import { useState } from "react";

// export default function LoginPage() {
//   const [showPassword, setShowPassword] = useState(false);

//   return (
//     <section className="min-h-screen bg-[#f3f3f3]">
//       <div className="mx-auto grid min-h-screen  grid-cols-1 lg:grid-cols-2">
//         <div className="hidden lg:block h-screen">
//           <Image
//             src="/auth.png"
//             alt="Login side"
//             className="h-full w-full object-cover"
//           />
//         </div>

//         <div className="flex items-center justify-center px-4 py-10 sm:px-6 md:px-10 lg:px-14">
//           <div className="w-full max-w-[520px]">
//             <div className="mx-auto w-full max-w-[430px]">
//               <h1 className="text-center text-[34px] font-semibold leading-tight text-[#131313] sm:text-[42px] lg:text-[40px]">
//                 Welcome Back!
//               </h1>

//               <p className="mt-2 text-center text-[12px] text-[#7a7a7a] sm:text-[13px]">
//                 Enter to get unlimited data & information
//               </p>

//               <form className="mt-10 space-y-5">
//                 <div>
//                   <label className="mb-2 block text-base font-medium text-[#1f1f1f]">
//                     Email <span className="text-[#b94b2e]">*</span>
//                   </label>
//                   <input
//                     type="email"
//                     placeholder="Enter your mail address..."
//                     className="h-[48px] w-full rounded-[5px] border border-[#6C6C6C] bg-transparent px-4 text-sm outline-none placeholder:text-[#9a9a9a] focus:border-[#8f8f8f]"
//                   />
//                 </div>

//                 <div>
//                   <label className="mb-2 block text-base font-medium text-[#1f1f1f]">
//                     Password <span className="text-[#b94b2e]">*</span>
//                   </label>

//                   <div className="relative">
//                     <input
//                       type={showPassword ? "text" : "password"}
//                       placeholder="Enter Password..."
//                       className="h-[48px] w-full rounded-[5px] border border-[#6C6C6C] bg-transparent px-4 pr-11 text-sm outline-none placeholder:text-[#9a9a9a] focus:border-[#8f8f8f]"
//                     />
//                     <button
//                       type="button"
//                       onClick={() => setShowPassword((prev) => !prev)}
//                       className="absolute right-3 top-1/2 -translate-y-1/2 text-[#9b9b9b]"
//                     >
//                       {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
//                     </button>
//                   </div>
//                 </div>

//                 <div className="flex items-center justify-between gap-3">
//                   <label className="flex items-center gap-2 text-[11px] text-[#1f1f1f] sm:text-[12px]">
//                     <input
//                       type="checkbox"
//                       className="h-3.5 w-3.5 accent-[#1d4f73]"
//                     />
//                     <span>Remember Me</span>
//                   </label>

//                   <a
//                     href="#"
//                     className="text-[11px] text-[#b87646] hover:underline sm:text-[12px]"
//                   >
//                     Forgot Password?
//                   </a>
//                 </div>

//                 <button
//                   type="submit"
//                   className="h-[44px] w-full rounded-[5px] bg-[#FBBF24] text-sm font-medium text-[#1a1a1a] transition hover:brightness-95"
//                 >
//                   Sign In
//                 </button>

//                 <p className="text-center text-[11px] text-[#1f1f1f] sm:text-[12px]">
//                   Don&apos;t have an account?{" "}
//                   <a href="#" className="text-[#1d4f73] underline">
//                     Register Here
//                   </a>
//                 </p>
//               </form>
//             </div>
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// }




"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Eye, EyeOff } from "lucide-react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";

export default function LoginPage() {
  const router = useRouter();

  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const savedEmail = localStorage.getItem("savedEmail");
    const savedPassword = localStorage.getItem("savedPassword");

    if (savedEmail && savedPassword) {
      setEmail(savedEmail);
      setPassword(savedPassword);
      setRememberMe(true);
    }
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!email.trim()) {
      toast.error("Email is required");
      return;
    }

    if (!password.trim()) {
      toast.error("Password is required");
      return;
    }

    try {
      setLoading(true);

      const result = await signIn("credentials", {
        redirect: false,
        email,
        password,
      });

      if (!result) {
        toast.error("Something went wrong. Please try again.");
        return;
      }

      if (result.error) {
        if (result.error === "admin_only") {
          toast.error("Only admin users can sign in.");
        } else {
          toast.error("Invalid email or password");
        }
        return;
      }

      if (rememberMe) {
        localStorage.setItem("savedEmail", email);
        localStorage.setItem("savedPassword", password);
      } else {
        localStorage.removeItem("savedEmail");
        localStorage.removeItem("savedPassword");
      }

      toast.success("Login successful");
      router.replace("/");
    } catch (error) {
      console.error("Login error:", error);
      toast.error("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="min-h-screen bg-[#f3f3f3]">
      <div className="mx-auto grid min-h-screen grid-cols-1 lg:grid-cols-2">
        <div className="hidden h-screen lg:block">
          <Image
            src="/auth.png"
            alt="Login side"
            width={1200}
            height={1200}
            className="h-full w-full object-cover"
            priority
          />
        </div>

        <div className="flex items-center justify-center px-4 py-10 sm:px-6 md:px-10 lg:px-14">
          <div className="w-full max-w-[520px]">
            <div className="mx-auto w-full max-w-[430px]">
              <h1 className="text-center text-[34px] font-semibold leading-tight text-[#131313] sm:text-[42px] lg:text-[40px]">
                Welcome Back!
              </h1>

              <p className="mt-2 text-center text-[12px] text-[#7a7a7a] sm:text-[13px]">
                Enter to get unlimited data &amp; information
              </p>

              <form onSubmit={handleSubmit} className="mt-10 space-y-5">
                <div>
                  <label className="mb-2 block text-base font-medium text-[#1f1f1f]">
                    Email <span className="text-[#b94b2e]">*</span>
                  </label>
                  <input
                    type="email"
                    placeholder="Enter your mail address..."
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="h-[48px] w-full rounded-[5px] border border-[#6C6C6C] bg-transparent px-4 text-sm outline-none placeholder:text-[#9a9a9a] focus:border-[#8f8f8f]"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-base font-medium text-[#1f1f1f]">
                    Password <span className="text-[#b94b2e]">*</span>
                  </label>

                  <div className="relative">
                    <input
                      type={showPassword ? "text" : "password"}
                      placeholder="Enter Password..."
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="h-[48px] w-full rounded-[5px] border border-[#6C6C6C] bg-transparent px-4 pr-11 text-sm outline-none placeholder:text-[#9a9a9a] focus:border-[#8f8f8f]"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword((prev) => !prev)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-[#9b9b9b]"
                    >
                      {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                  </div>
                </div>

                <div className="flex items-center justify-between gap-3">
                  <label className="flex items-center gap-2 text-[11px] text-[#1f1f1f] sm:text-[12px]">
                    <input
                      type="checkbox"
                      checked={rememberMe}
                      onChange={(e) => setRememberMe(e.target.checked)}
                      className="h-3.5 w-3.5 accent-[#1d4f73]"
                    />
                    <span>Remember Me</span>
                  </label>

                  <Link
                    href="/forgot-password"
                    className="text-[11px] text-[#b87646] hover:underline sm:text-[12px]"
                  >
                    Forgot Password?
                  </Link>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="h-[44px] w-full rounded-[5px] bg-[#FBBF24] text-sm font-medium text-[#1a1a1a] transition hover:brightness-95 disabled:cursor-not-allowed disabled:opacity-70"
                >
                  {loading ? "Signing In..." : "Sign In"}
                </button>

                <p className="text-center text-[11px] text-[#1f1f1f] sm:text-[12px]">
                  Don&apos;t have an account?{" "}
                  <Link href="/register" className="text-[#1d4f73] underline">
                    Register Here
                  </Link>
                </p>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}