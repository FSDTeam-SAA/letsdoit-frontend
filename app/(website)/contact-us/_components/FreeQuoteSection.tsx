"use client";

import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { Mail, MapPin, Phone, Clock3, CheckCircle2, Send } from "lucide-react";

const contactItems = [
  {
    icon: Mail,
    title: "Email Address",
    value: "support@autointelinspect.com",
  },
  {
    icon: MapPin,
    title: "Location",
    value: "Minnesota + Major US Cities",
  },
  {
    icon: Phone,
    title: "Phone Number",
    value: "(406) 555-0120",
  },
  {
    icon: Clock3,
    title: "Business Hour",
    value: "Available 24/7 Email Support",
  },
];

const benefitItems = [
  {
    title: "Quick Response",
    description: "We respond to all inquiries within 24 hours, often much sooner.",
  },
  {
    title: "No Obligation",
    description: "Get your quote with no pressure or obligation to book.",
  },
  {
    title: "Expert Advice",
    description: "Our team can help you understand our comprehensive inspection service.",
  },
];

// ────────────────────────────────────────────────

async function submitContactForm(data: {
  name: string;
  email: string;
  phone: string;
  message: string;
}) {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/contact`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.message || `Server responded with status ${response.status}`);
  }

  return response.json(); 
}

export default function FreeQuoteSection() {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    message: "",
  });

  const mutation = useMutation({
    mutationFn: submitContactForm,
    onSuccess: () => {
      toast.success("Message sent successfully!", {
        description: "We'll get back to you soon.",
      });
      // Optional: reset form
      setFormData({ name: "", phone: "", email: "", message: "" });
    },
    onError: (error: Error) => {
      toast.error("Failed to send message", {
        description: error.message || "Please try again later.",
      });
    },
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Basic validation (you can make it more strict)
    if (!formData.name.trim() || !formData.email.trim() || !formData.phone.trim()) {
      toast.warning("Please fill in all required fields.");
      return;
    }

    mutation.mutate({
      name: formData.name.trim(),
      email: formData.email.trim(),
      phone: formData.phone.trim(),
      message: formData.message.trim(),
    });
  };

  return (
    <section className="w-full bg-[#f3f3f3] py-12 sm:py-14 md:py-16 lg:py-24">
      <div className="container mx-auto px-4 sm:px-6 lg:px-4">
        <div className="grid gap-10 lg:grid-cols-[1fr_1.2fr] lg:gap-8 xl:gap-12">
          {/* Left Content - unchanged */}
          <div className="max-w-[650px]">
            <h2 className="text-[30px] font-semibold leading-tight text-[#131313] sm:text-[38px] lg:text-[40px]">
              Get Your Free Quote
            </h2>

            <p className="mt-4 max-w-[470px] text-[14px] leading-7 text-[#424242] sm:text-[16px]">
              Fill out the form below with your vehicle information and
              we`&apos;ll provide you with a detailed quote and schedule your
              inspection.
            </p>

            <div className="mt-8 grid gap-x-6 gap-y-6 sm:grid-cols-2">
              {contactItems.map((item) => {
                const Icon = item.icon;
                return (
                  <div key={item.title} className="flex items-start gap-3">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#E7E7E7]">
                      <Icon className="h-4 w-4 text-[#4b4b4b]" strokeWidth={1.8} />
                    </div>
                    <div>
                      <h3 className="text-[16px] font-semibold leading-none text-[#131313]">
                        {item.title}
                      </h3>
                      <p className="mt-1 text-[16px] leading-5 text-[#424242]">
                        {item.value}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="mt-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
              {benefitItems.map((item) => (
                <div
                  key={item.title}
                  className="rounded-[14px] border border-[#dfdfdf] bg-white px-5 py-6 text-center shadow-[0_4px_14px_rgba(0,0,0,0.04)]"
                >
                  <div className="mx-auto flex h-11 w-11 items-center justify-center rounded-full bg-[#dff0df]">
                    <CheckCircle2 className="h-5 w-5 text-[#4f9a4f]" />
                  </div>
                  <h3 className="mt-4 text-[20px] font-medium leading-tight text-[#222222]">
                    {item.title}
                  </h3>
                  <p className="mt-3 text-[13px] leading-6 text-[#666666]">
                    {item.description}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Right Form */}
          <div className="rounded-[16px] bg-[#EFE9D8] p-5 sm:p-6 lg:p-7">
            <h2 className="text-[28px] font-medium leading-tight text-[#424242] sm:text-[32px]">
              Contact Information
            </h2>

            <form className="mt-6 space-y-5" onSubmit={handleSubmit}>
              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <label className="mb-2 block text-[14px] font-medium text-[#333333]">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Enter your full name"
                    required
                    className="h-12 w-full rounded-[6px] border border-[#9d998e] bg-transparent px-4 text-[14px] outline-none placeholder:text-[#8b8b8b] focus:ring-1 focus:ring-[#6e6a60]"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-[14px] font-medium text-[#333333]">
                    Phone Number *
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="e.g. +1234567890"
                    required
                    className="h-12 w-full rounded-[6px] border border-[#9d998e] bg-transparent px-4 text-[14px] outline-none placeholder:text-[#8b8b8b] focus:ring-1 focus:ring-[#6e6a60]"
                  />
                </div>
              </div>

              <div>
                <label className="mb-2 block text-[14px] font-medium text-[#333333]">
                  Email Address *
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Enter your email"
                  required
                  className="h-12 w-full rounded-[6px] border border-[#9d998e] bg-transparent px-4 text-[14px] outline-none placeholder:text-[#8b8b8b] focus:ring-1 focus:ring-[#6e6a60]"
                />
              </div>

              <div>
                <label className="mb-2 block text-[14px] font-medium text-[#333333]">
                  Your Message
                </label>
                <textarea
                  name="message"
                  rows={5}
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Tell us how we can help you..."
                  className="min-h-[130px] w-full rounded-[6px] border border-[#9d998e] bg-transparent px-4 py-3 text-[14px] outline-none placeholder:text-[#8b8b8b] focus:ring-1 focus:ring-[#6e6a60]"
                />
              </div>

              <button
                type="submit"
                disabled={mutation.isPending}
                className="flex h-12 w-full items-center justify-center gap-2 rounded-[6px] bg-[#FBBF24] px-5 text-[14px] font-semibold text-[#1f1f1f] transition hover:opacity-90 disabled:opacity-60 disabled:cursor-not-allowed"
              >
                <Send className="h-4 w-4" />
                {mutation.isPending ? "Sending..." : "Send Message"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}