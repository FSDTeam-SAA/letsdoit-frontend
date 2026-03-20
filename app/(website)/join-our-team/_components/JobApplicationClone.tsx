"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import {
  BadgeDollarSign,
  BriefcaseBusiness,
  CheckCircle2,
  CircleAlert,
  Clock3,
  FileText,
  MapPin,
  Send,
  Shield,
  PhoneCall,
  UserCircle2,
} from "lucide-react";

const cardClass =
  "rounded-[12px] border !border-[#E7E7E7] bg-white shadow-[0_2px_8px_rgba(0,0,0,0.06)]";
const labelClass =
  "mb-1.5 block text-[11px] font-semibold text-[#2b2b2b] sm:text-[12px]";
const inputClass =
  "h-9 rounded-[6px] border border-[#d9d9d9] bg-white px-3 text-[12px] text-[#2b2b2b] placeholder:text-[#b5b5b5] focus-visible:ring-0 focus-visible:ring-offset-0";
const textareaClass =
  "min-h-[78px] rounded-[6px] border border-[#d9d9d9] bg-white px-3 py-2 text-[12px] text-[#2b2b2b] placeholder:text-[#b5b5b5] focus-visible:ring-0 focus-visible:ring-offset-0";
const checkboxLabelClass = "text-[12px] font-semibold text-[#2b2b2b]";
const helperTextClass = "mt-1 text-[11px] leading-[1.35] text-[#8a8a8a]";

function TopFeatureCard() {
  const features = [
    {
      icon: BadgeDollarSign,
      title: "Competitive Pay",
      desc: "Competitive compensation package",
    },
    {
      icon: MapPin,
      title: "Mobile Work",
      desc: "Travel throughout Minnesota",
    },
    {
      icon: Clock3,
      title: "Flexible Schedule",
      desc: "Choose your own hours",
    },
    {
      icon: UserCircle2,
      title: "Professional Growth",
      desc: "Ongoing training opportunities",    
    },
  ];

  return (
    <Card className="rounded-[12px] border border-[#E7E7E7] bg-white shadow-[0_2px_8px_rgba(0,0,0,0.06)]">
      <CardContent className="p-4 sm:p-5 ">
        <h3 className="mb-4 text-center text-[14px] font-semibold text-[#2b2b2b] sm:text-[15px]">
          Why Join Our Team? 
        </h3>

        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-x-6 sm:gap-y-4">
          {features.map((item, i) => {
            const Icon = item.icon;
            return (
              <div key={i} className="flex items-start gap-2">
                <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#f1f1f1]">
                  <Icon className="h-3.5 w-3.5 text-[#333333]" strokeWidth={2.2} />
                </div>
                <div>
                  <p className="text-[12px] font-semibold leading-none text-[#2b2b2b]">
                    {item.title}
                  </p>
                  <p className="mt-1 text-[11px] leading-[1.35] text-[#7a7a7a]">
                    {item.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}

function ProcessCard() {
  const steps = [
    { icon: Send, title: "Submit Application" },
    { icon: PhoneCall, title: "Phone Interview" },
    { icon: Shield, title: "Background Check" },
    { icon: CheckCircle2, title: "Training & Onboarding" },
  ];

  return (
    <Card className={cardClass}>
      <CardContent className="p-4 sm:p-5">
        <h3 className="mb-4 text-center text-[14px] font-semibold text-[#2b2b2b] sm:text-[15px]">
          Application Process
        </h3>

        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-x-6 sm:gap-y-4">
          {steps.map((step, i) => {
            const Icon = step.icon;
            return (
              <div key={i} className="flex items-center gap-2">
                <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#f1f1f1]">
                  <Icon className="h-3.5 w-3.5 text-[#333333]" strokeWidth={2.2} />
                </div>
                <p className="text-[12px] font-semibold text-[#2b2b2b]">
                  {step.title}
                </p>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}

function SectionCard({
  icon,
  title,
  children,
}: {
  icon: React.ReactNode;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <Card className={cardClass}>
      <CardContent className="p-4 sm:p-5">
        <div className="mb-3 flex items-center gap-2">
          <div className="flex h-6 w-6 items-center justify-center rounded-full bg-[#f1f1f1] text-[#333333]">
            {icon}
          </div>
          <h2 className="text-[14px] font-semibold text-[#2b2b2b] sm:text-[15px]">
            {title}
          </h2>
        </div>
        {children}
      </CardContent>
    </Card>
  );
}

export default function JobApplicationClone() {
  return (
    <section className="min-h-screen bg-white px-4 py-8 sm:px-6 lg:px-0">
      <div className="container mx-auto">
        {/* Top cards */}
        <div className="mx-auto grid max-w-[1260px] grid-cols-1 gap-3 lg:grid-cols-[1fr_1fr] lg:gap-4">
          <TopFeatureCard />
          <ProcessCard />
        </div>

        {/* Form wrapper */}
        <div className="relative mx-auto mt-6 max-w-[1200px]">
          <div
            aria-hidden="true"
            className="absolute inset-0  "
          />
          <div className="relative z-10 p-4 sm:p-6">
            <div className="space-y-3 sm:space-y-4">
              {/* Personal Information */}
              <SectionCard
                icon={<UserCircle2 className="h-4 w-4" />}
                title="Personal Information"
              >
                <div className="space-y-3">
                  <div>
                    <Label className={labelClass}>
                      Street Address <span className="text-black">*</span>
                    </Label>
                    <Input placeholder="Enter Your First Name" className={inputClass} />
                  </div>

                  <div className="grid grid-cols-1 gap-3 md:grid-cols-3">
                    <div>
                      <Label className={labelClass}>
                        City <span className="text-black">*</span>
                      </Label>
                      <Input placeholder="2025" className={inputClass} />
                    </div>

                    <div>
                      <Label className={labelClass}>
                        State <span className="text-black">*</span>
                      </Label>
                      <Select>
                        <SelectTrigger className={inputClass}>
                          <SelectValue placeholder="Minnesota" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="minnesota">Minnesota</SelectItem>
                          <SelectItem value="texas">Texas</SelectItem>
                          <SelectItem value="california">California</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <Label className={labelClass}>
                        ZIP Code <span className="text-black">*</span>
                      </Label>
                      <Input className={inputClass} />
                    </div>
                  </div>
                </div>
              </SectionCard>

              {/* Professional Experience */}
              <SectionCard
                icon={<BriefcaseBusiness className="h-4 w-4" />}
                title="Professional Experience"
              >
                <div className="space-y-3">
                  <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
                    <div>
                      <Label className={labelClass}>
                        Years of Automotive Experience{" "}
                        <span className="text-black">*</span>
                      </Label>
                      <Select>
                        <SelectTrigger className={inputClass}>
                          <SelectValue placeholder="Select experience level" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="1">1 year</SelectItem>
                          <SelectItem value="2">2 years</SelectItem>
                          <SelectItem value="3">3+ years</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <Label className={labelClass}>ASE Certification Number</Label>
                      <Input
                        placeholder="Enter ASE Number if applicable"
                        className={inputClass}
                      />
                    </div>
                  </div>

                  <div>
                    <Label className={labelClass}>Certifications & Training</Label>
                    <Textarea
                      placeholder="List any automotive certifications, training programs, or specialized skills..."
                      className={textareaClass}
                    />
                  </div>

                  <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
                    <div>
                      <Label className={labelClass}>
                        Current/Most Recent Employer
                      </Label>
                      <Input className={inputClass} />
                    </div>

                    <div>
                      <Label className={labelClass}>
                        Contractor Status <span className="text-black">*</span>
                      </Label>
                      <Select>
                        <SelectTrigger className={inputClass}>
                          <SelectValue placeholder="Select status" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="full-time">Full-time</SelectItem>
                          <SelectItem value="part-time">Part-time</SelectItem>
                          <SelectItem value="contract">Contract</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>
              </SectionCard>

              {/* Availability */}
              <SectionCard
                icon={<Clock3 className="h-4 w-4" />}
                title="Availability & Preferences"
              >
                <div className="space-y-3">
                  <div>
                    <Label className={labelClass}>
                      Available Hours per Week <span className="text-black">*</span>
                    </Label>
                    <Select>
                      <SelectTrigger className={inputClass}>
                        <SelectValue placeholder="Select availability" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="10-20">10-20 hours</SelectItem>
                        <SelectItem value="20-30">20-30 hours</SelectItem>
                        <SelectItem value="30-40">30-40 hours</SelectItem>
                        <SelectItem value="40+">40+ hours</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label className={labelClass}>Preferred Service Areas</Label>
                    <Textarea
                      placeholder="List cities, counties, or regions where you prefer to work..."
                      className={textareaClass}
                    />
                  </div>

                  <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
                    <div className="flex items-start gap-3">
                      <Checkbox id="transport" className="mt-0.5 border-black" />
                      <div>
                        <Label htmlFor="transport" className={checkboxLabelClass}>
                          I have reliable transportation <span>*</span>
                        </Label>
                        <p className={helperTextClass}>
                          You&apos;ll need to travel to vehicle locations throughout
                          Minnesota
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <Checkbox id="weekend" className="mt-0.5 border-black" />
                      <div>
                        <Label htmlFor="weekend" className={checkboxLabelClass}>
                          Available for weekend inspections
                        </Label>
                        <p className={helperTextClass}>
                          Weekend availability increases earning potential
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </SectionCard>

              {/* Background */}
              <SectionCard
                icon={<Shield className="h-4 w-4" />}
                title="Background Information"
              >
                <div className="space-y-3">
                  <div>
                    <Label className={labelClass}>
                      Criminal Background <span className="text-black">*</span>
                    </Label>
                    <Select>
                      <SelectTrigger className={inputClass}>
                        <SelectValue placeholder="Select option" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="yes">Yes</SelectItem>
                        <SelectItem value="no">No</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label className={labelClass}>
                      Driving Record <span className="text-black">*</span>
                    </Label>
                    <Select>
                      <SelectTrigger className={inputClass}>
                        <SelectValue placeholder="Select option" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="clean">Clean</SelectItem>
                        <SelectItem value="minor">Minor Issues</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label className={labelClass}>Professional References</Label>
                    <Textarea
                      placeholder="Please provide 2-3 professional references (name, title, company, phone number)..."
                      className={textareaClass}
                    />
                  </div>
                </div>
              </SectionCard>

              {/* Additional Information */}
              <SectionCard
                icon={<FileText className="h-4 w-4" />}
                title="Additional Information"
              >
                <div className="space-y-3">
                  <div>
                    <Label className={labelClass}>
                      Why are you interested in this position?{" "}
                      <span className="text-black">*</span>
                    </Label>
                    <Textarea
                      placeholder="Please provide 2-3 professional references (name, title, company, phone number)..."
                      className={textareaClass}
                    />
                  </div>

                  <div>
                    <Label className={labelClass}>Additional Skills or Experience</Label>
                    <Textarea
                      placeholder="Any other relevant skills, experience, or information you’d like to share."
                      className={textareaClass}
                    />
                  </div>
                </div>
              </SectionCard>

              {/* Terms */}
              <SectionCard
                icon={<FileText className="h-4 w-4" />}
                title="Terms & Conditions"
              >
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <Checkbox
                      id="background-check"
                      className="mt-0.5 border-black"
                    />
                    <div>
                      <Label
                        htmlFor="background-check"
                        className={checkboxLabelClass}
                      >
                        I consent to background check and verification{" "}
                        <span>*</span>
                      </Label>
                      <p className={helperTextClass}>
                        Background checks are required for all inspector positions to
                        ensure customer safety and trust
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <Checkbox id="terms-check" className="mt-0.5 border-black" />
                    <div>
                      <Label htmlFor="terms-check" className={checkboxLabelClass}>
                        I agree to the terms and conditions <span>*</span>
                      </Label>
                      <p className={helperTextClass}>
                        By checking this box, you agree to our contractor terms,
                        confidentiality requirements, and professional standards. Read
                        full terms
                      </p>
                    </div>
                  </div>

                  <div className="rounded-[8px] bg-[#eef5ec] px-4 py-3">
                    <div className="flex items-start gap-3">
                      <CircleAlert className="mt-0.5 h-4 w-4 text-[#5d6d5f]" />
                      <div>
                        <p className="text-[12px] font-semibold text-[#4d5a4e]">
                          Important:
                        </p>
                        <p className="mt-1 text-[11px] leading-[1.45] text-[#98a198]">
                          All information provided will be verified during the
                          application process. False information may result in
                          disqualification from contractor consideration.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </SectionCard>

              {/* Submit */}
              <Button className="h-9 w-full rounded-[6px] bg-[#f4c21a] text-[12px] font-semibold text-[#1d1d1d] shadow-[0_2px_6px_rgba(0,0,0,0.08)] hover:bg-[#e4b40f]">
                <Send className="mr-2 h-3.5 w-3.5" />
                Submit Application
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
