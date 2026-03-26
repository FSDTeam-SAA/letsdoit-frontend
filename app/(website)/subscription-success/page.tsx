import { CheckCircle, Home, Sparkles } from "lucide-react";
import Link from "next/link";

export default function SubscriptionSuccessPage() {
  return (
    <section className="min-h-screen bg-gradient-to-br from-green-50 via-white to-emerald-100 flex items-center justify-center px-4 py-10">
      <div className="w-full max-w-3xl">
        <div className="relative overflow-hidden rounded-3xl bg-white shadow-2xl border border-green-100">
          {/* Background Glow */}
          <div className="absolute -top-20 -left-20 h-52 w-52 rounded-full bg-green-200/40 blur-3xl animate-pulse" />
          <div className="absolute -bottom-20 -right-20 h-52 w-52 rounded-full bg-emerald-200/40 blur-3xl animate-pulse" />

          <div className="relative z-10 px-6 py-10 sm:px-10 sm:py-14 text-center">
            {/* Animated Success Icon */}
            <div className="mx-auto mb-6 flex h-24 w-24 items-center justify-center rounded-full bg-green-100 animate-bounce">
              <CheckCircle className="h-14 w-14 text-green-600" strokeWidth={2.2} />
            </div>

            {/* Badge */}
            <div className="inline-flex items-center gap-2 rounded-full bg-green-50 px-4 py-2 text-sm font-medium text-green-700 border border-green-200 mb-5">
              <Sparkles className="h-4 w-4" />
              Subscription Activated Successfully
            </div>

            {/* Heading */}
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-gray-900">
              Thank You for Subscribing!
            </h1>

            {/* Description */}
            <p className="mx-auto mt-4 max-w-2xl text-sm sm:text-base md:text-lg leading-7 text-gray-600">
              Your subscription has been confirmed successfully. You now have
              access to all premium features and updates. We’re excited to have
              you with us.
            </p>

            {/* Card Details */}
           

            {/* Buttons */}
            <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
          
              <Link href="/">
              <button className="inline-flex w-full sm:w-auto items-center justify-center gap-2 rounded-xl border border-gray-200 bg-white px-6 py-3 text-sm font-semibold text-gray-700 hover:bg-gray-50 transition duration-300 hover:scale-105">
                <Home className="h-4 w-4" />
                Back to Home
              </button>
              </Link>
            </div>

         
          </div>
        </div>
      </div>
    </section>
  );
}