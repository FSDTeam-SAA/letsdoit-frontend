"use client";

import React, { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { useInspectorRegistration } from "@/components/provider/InspectorRegistrationProvider";
import { Button } from "@/components/ui/button";
import { CardContent } from "@/components/ui/card";
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
  "mb-1.5 block text-[16px] font-medium text-[#2A2A2A]";
const inputClass =
  "h-[48px] rounded-[6px] border border-[#5A5A5A] bg-white px-3 text-[12px] text-[#2b2b2b] placeholder:text-[#b5b5b5] focus-visible:ring-0 focus-visible:ring-offset-0";
const textareaClass =
  "min-h-[78px] rounded-[6px] border border-[#5A5A5A] bg-white px-3 py-2 text-[12px] text-[#2b2b2b] placeholder:text-[#b5b5b5] focus-visible:ring-0 focus-visible:ring-offset-0";
const checkboxLabelClass = "text-[16px] font-semibold text-[#2b2b2b]";
const helperTextClass = "mt-1 text-[14px] leading-[1.35] text-[#8a8a8a]";
const personalCardClass =
  "rounded-[12px] border border-[#e6e6e6] bg-white shadow-[0_10px_24px_rgba(0,0,0,0.08)]";
const personalInputClass =
  "!h-[48px] rounded-[7px] border border-[#5A5A5A] bg-white px-3 text-[12px] text-[#2b2b2b] placeholder:text-[#b8b8b8] focus-visible:ring-0 focus-visible:ring-offset-0";

// Must match backend enums exactly.
const CONTRACTOR_STATUS_OPTIONS = [
  "Independent Contractor",
  "Company Employee",
  "Self-Employed",
];
const AVAILABLE_HOURS_OPTIONS = [
  "Part-time (10-20 hours)",
  "Part-time (20-30 hours)",
  "Full-time (30+ hours)",
  "Flexible/As needed",
];
const CRIMINAL_BACKGROUND_OPTIONS = [
  "No criminal background",
  "Minor infractions only",
  "Will explain in interview",
];
const DRIVING_RECORD_OPTIONS = [
  "Clean driving record",
  "Minor violations only",
  "Will explain in interview",
];
const YEARS_OF_EXPERIENCE_OPTIONS = [
  "1-2 years",
  "3-5 years",
  "6-10 years",
  "11-15 years",
  "16+ years",
];
const SERVICE_AREA_OPTIONS = [
  "Minnesota",
  "Wisconsin",
  "Iowa",
  "North Dakota",
  "South Dakota",
];

type InspectorAddressForm = {
  streetAddress: string;
  city: string;
  state: string;
  postalCode: string;
};

type InspectorProfileForm = {
  yearsOfExperience: string;
  aseCertificationNumber: string;
  certificationsAndTraining: string;
  currentEmployer: string;
  contractorStatus: string;
  availableHoursPerWeek: string;
  preferredServiceAreas: string[];
  hasReliableTransportation: boolean;
  availableOnWeekends: boolean;
  criminalBackground: string;
  drivingRecord: string;
  professionalReferences: string;
  motivation: string;
  additionalSkills: string;
};

type InspectorRegisterPayload = {
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  password: string;
  address: {
    StreetAddress: string;
    city: string;
    state: string;
    postalCode: string;
  };
  inspectorProfile: {
    yearsOfExperience: string;
    aseCertificationNumber: string;
    certificationsAndTraining: string;
    currentEmployer: string;
    contractorStatus: string;
    availableHoursPerWeek: string;
    preferredServiceAreas: string[];
    hasReliableTransportation: boolean;
    availableOnWeekends: boolean;
    criminalBackground: string;
    drivingRecord: string;
    professionalReferences: string;
    motivation: string;
    additionalSkills: string;
  };
};

async function registerInspector(data: InspectorRegisterPayload) {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/register-inspector`,
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
    <div className="rounded-[12px] border border-[#E7E7E7] bg-white shadow-[0_2px_8px_rgba(0,0,0,0.06)]">
      <CardContent className="p-4 sm:p-5 ">
        <h3 className="mb-6 text-center text-[14px] font-semibold text-[#131313] sm:text-[24px]">
          Why Join Our Team?  
        </h3>

        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-x-6 sm:gap-y-4">
          {features.map((item, i) => {
            const Icon = item.icon;
            return (
              <div key={i} className="flex items-start gap-2">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#E7E7E7]">
                  <Icon className="h-3.5 w-3.5 text-[#131313]" strokeWidth={2.2} />
                </div>
                <div>
                  <p className="text-[16px] font-semibold leading-none text-[#131313]">
                    {item.title}
                  </p>
                  <p className="mt-1 text-[16px] leading-[1.35] text-[#424242]">
                    {item.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </CardContent>
    </div>
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
    <div className={cardClass}>
      <CardContent className="p-4 sm:p-5">
        <h3 className="mb-4 text-center text-[14px] font-semibold text-[#131313] sm:text-[24px]">
          Application Process
        </h3>

        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-x-6 sm:gap-y-4">
          {steps.map((step, i) => {
            const Icon = step.icon;
            return (
              <div key={i} className="flex items-center gap-2">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#f1f1f1]">
                  <Icon className="h-3.5 w-3.5 text-[#333333]" strokeWidth={2.2} />
                </div>
                <p className="text-[16px] font-semibold text-[#131313]">
                  {step.title}
                </p>
              </div>
            );
          })}
        </div>
      </CardContent>
    </div>
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
    <div className={cardClass}>
      <CardContent className="p-4 sm:p-5">
        <div className="mb-3 flex items-center gap-2">
          <div className="flex h-6 w-6 items-center justify-center rounded-full bg-[#f1f1f1] text-[#333333]">
            {icon}
          </div>
          <h2 className="text-[14px] font-semibold text-[#424242] sm:text-[24px]">
            {title}
          </h2>
        </div>
        {children}
      </CardContent>
    </div>
  );
}

export default function JobApplicationClone() {
  const router = useRouter();
  const { data: inspectorData, clearData } = useInspectorRegistration();
  console.log(inspectorData)
  const [address, setAddress] = useState<InspectorAddressForm>({
    streetAddress: "",
    city: "",
    state: "",
    postalCode: "",
  });
  const [profile, setProfile] = useState<InspectorProfileForm>({
    yearsOfExperience: "",
    aseCertificationNumber: "",
    certificationsAndTraining: "",
    currentEmployer: "",
    contractorStatus: "",
    availableHoursPerWeek: "",
    preferredServiceAreas: [],
    hasReliableTransportation: false,
    availableOnWeekends: false,
    criminalBackground: "",
    drivingRecord: "",
    professionalReferences: "",
    motivation: "",
    additionalSkills: "",
  });
  const [serviceAreaSelection, setServiceAreaSelection] = useState<
    string | undefined
  >(undefined);
  const [consentBackgroundCheck, setConsentBackgroundCheck] = useState(false);
  const [agreeTerms, setAgreeTerms] = useState(false);

  const mutation = useMutation({
    mutationFn: registerInspector,
    onSuccess: () => {
      toast.success("Application submitted", {
        description: "We will review your application and contact you soon.",
      });
      clearData();
      // router.push("/login");
    },
    onError: (error: Error) => {
      toast.error("Submission failed", {
        description: error.message || "Please try again later.",
      });
    },
  });

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const trimmedFirstName = inspectorData.firstName.trim();
    const trimmedLastName = inspectorData.lastName.trim();
    const trimmedEmail = inspectorData.email.trim();
    const trimmedPhone = inspectorData.phone.trim();
    const trimmedPassword = inspectorData.password.trim();

    if (
      !trimmedFirstName ||
      !trimmedLastName ||
      !trimmedEmail ||
      !trimmedPhone ||
      !trimmedPassword
    ) {
      toast.warning("Please complete inspector registration first.");
      router.push("/register");
      return;
    }

    const trimmedStreetAddress = address.streetAddress.trim();
    const trimmedCity = address.city.trim();
    const trimmedPostalCode = address.postalCode.trim();

    if (!trimmedStreetAddress) {
      toast.warning("Street address is required.");
      return;
    }

    if (!trimmedCity) {
      toast.warning("City is required.");
      return;
    }

    if (!address.state) {
      toast.warning("State is required.");
      return;
    }

    if (!trimmedPostalCode) {
      toast.warning("Postal code is required.");
      return;
    }

    if (!profile.yearsOfExperience) {
      toast.warning("Years of experience is required.");
      return;
    }

    if (!profile.contractorStatus) {
      toast.warning("Contractor status is required.");
      return;
    }

    if (!profile.availableHoursPerWeek) {
      toast.warning("Available hours per week is required.");
      return;
    }

    if (!profile.hasReliableTransportation) {
      toast.warning("Reliable transportation is required.");
      return;
    }

    if (!profile.criminalBackground) {
      toast.warning("Criminal background selection is required.");
      return;
    }

    if (!profile.drivingRecord) {
      toast.warning("Driving record selection is required.");
      return;
    }

    if (!profile.motivation.trim()) {
      toast.warning("Motivation is required.");
      return;
    }

    if (!consentBackgroundCheck || !agreeTerms) {
      toast.warning("Please accept the terms and background check consent.");
      return;
    }

    const preferredServiceAreas = profile.preferredServiceAreas.filter((area) =>
      SERVICE_AREA_OPTIONS.includes(area)
    );

    mutation.mutate({
      firstName: trimmedFirstName,
      lastName: trimmedLastName,
      phone: trimmedPhone,
      email: trimmedEmail,
      password: trimmedPassword,
      address: {
        StreetAddress: trimmedStreetAddress,
        city: trimmedCity,
        state: address.state,
        postalCode: trimmedPostalCode,
      },
      inspectorProfile: {
        yearsOfExperience: profile.yearsOfExperience,
        aseCertificationNumber: profile.aseCertificationNumber.trim(),
        certificationsAndTraining: profile.certificationsAndTraining.trim(),
        currentEmployer: profile.currentEmployer.trim(),
        contractorStatus: profile.contractorStatus,
        availableHoursPerWeek: profile.availableHoursPerWeek,
        preferredServiceAreas,
        hasReliableTransportation: profile.hasReliableTransportation,
        availableOnWeekends: profile.availableOnWeekends,
        criminalBackground: profile.criminalBackground,
        drivingRecord: profile.drivingRecord,
        professionalReferences: profile.professionalReferences.trim(),
        motivation: profile.motivation.trim(),
        additionalSkills: profile.additionalSkills.trim(),
      },
    });
  };

  return (
    <section className="min-h-screen bg-white px-4 py-8 sm:px-6 lg:px-4">
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
            <form onSubmit={handleSubmit} className="space-y-3 sm:space-y-4">
              {/* Personal Information */}
              <div className={personalCardClass}>
                <CardContent className="p-5 sm:p-6">
                  <div className="mb-4 flex items-center gap-2">
                    <div className="flex h-7 w-7 items-center justify-center rounded-full bg-[#f1f1f1] text-[#333333]">
                      <UserCircle2 className="h-4 w-4" />
                    </div>
                    <h2 className="text-[14px] font-semibold text-[#424242] sm:text-[24px]">
                      Personal Information
                    </h2>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <Label className={labelClass}>
                        Street Address <span className="text-[#2A2A2A] ">*</span>
                      </Label>
                      <Input
                        placeholder="Enter street address"
                        className={personalInputClass}
                        value={address.streetAddress}
                        onChange={(event) =>
                          setAddress((prev) => ({
                            ...prev,
                            streetAddress: event.target.value,
                          }))
                        }
                        disabled={mutation.isPending}
                      />
                    </div>

                    <div className="grid grid-cols-1 gap-3 md:grid-cols-3">
                      <div>
                        <Label className={labelClass}>
                          City <span className="text-black">*</span>
                        </Label>
                        <Input
                          placeholder="Enter city"
                          className={personalInputClass}
                          value={address.city}
                          onChange={(event) =>
                            setAddress((prev) => ({
                              ...prev,
                              city: event.target.value,
                            }))
                          }
                          disabled={mutation.isPending}
                        />
                      </div>

                      <div>
                        <Label className={`${labelClass} w-full`}>
                          State <span className="text-black">*</span>
                        </Label>
                        <Select
                          value={address.state}
                          onValueChange={(value) =>
                            setAddress((prev) => ({
                              ...prev,
                              state: value,
                            }))
                          }
                          disabled={mutation.isPending}
                        >
                          <SelectTrigger className={`${personalInputClass} !!h-[48px] w-full`}>
                            <SelectValue placeholder="Select state" />
                          </SelectTrigger>
                          <SelectContent className="!w-full bg-white">
                            <SelectItem value="Minnesota">Minnesota</SelectItem>
                            <SelectItem value="Texas">Texas</SelectItem>
                            <SelectItem value="California">California</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div>
                        <Label className={labelClass}>
                          ZIP Code <span className="text-black">*</span>
                        </Label>
                        <Input
                          placeholder="Enter postal code"
                          className={personalInputClass}
                          value={address.postalCode}
                          onChange={(event) =>
                            setAddress((prev) => ({
                              ...prev,
                              postalCode: event.target.value,
                            }))
                          }
                          disabled={mutation.isPending}
                        />
                      </div>
                    </div>
                  </div>
                </CardContent>
              </div>

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
                      <Select
                        value={profile.yearsOfExperience}
                        onValueChange={(value) =>
                          setProfile((prev) => ({
                            ...prev,
                            yearsOfExperience: value,
                          }))
                        }
                        disabled={mutation.isPending}
                      >
                        <SelectTrigger className={`${inputClass} !h-[48px] w-full`}>
                          <SelectValue placeholder="Select experience level" />
                        </SelectTrigger>
                        <SelectContent className="!w-full bg-white">
                          {YEARS_OF_EXPERIENCE_OPTIONS.map((option) => (
                            <SelectItem key={option} value={option}>
                              {option}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <Label className={labelClass}>ASE Certification Number</Label>
                      <Input
                        placeholder="Enter ASE Number if applicable"
                        className={inputClass}
                        value={profile.aseCertificationNumber}
                        onChange={(event) =>
                          setProfile((prev) => ({
                            ...prev,
                            aseCertificationNumber: event.target.value,
                          }))
                        }
                        disabled={mutation.isPending}
                      />
                    </div>
                  </div>

                  <div>
                    <Label className={labelClass}>Certifications & Training</Label>
                    <Textarea
                      placeholder="List any automotive certifications, training programs, or specialized skills..."
                      className={textareaClass}
                      value={profile.certificationsAndTraining}
                      onChange={(event) =>
                        setProfile((prev) => ({
                          ...prev,
                          certificationsAndTraining: event.target.value,
                        }))
                      }
                      disabled={mutation.isPending}
                    />
                  </div>

                  <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
                    <div>
                      <Label className={`${labelClass} `}>
                        Current/Most Recent Employer
                      </Label>
                      <Input
                        className={inputClass}
                        value={profile.currentEmployer}
                        onChange={(event) =>
                          setProfile((prev) => ({
                            ...prev,
                            currentEmployer: event.target.value,
                          }))
                        }
                        disabled={mutation.isPending}
                      />
                    </div>

                    <div>
                      <Label className={labelClass}>
                        Contractor Status <span className="text-black">*</span>
                      </Label>
                      <Select
                        value={profile.contractorStatus}
                        onValueChange={(value) =>
                          setProfile((prev) => ({
                            ...prev,
                            contractorStatus: value,
                          }))
                        }
                        disabled={mutation.isPending}
                      >
                        <SelectTrigger className={`${inputClass} !h-[48px] w-full`}>
                          <SelectValue placeholder="Select status" />
                        </SelectTrigger>
                        <SelectContent className="!w-full bg-white">
                          {CONTRACTOR_STATUS_OPTIONS.map((status) => (
                            <SelectItem key={status} value={status}>
                              {status}
                            </SelectItem>
                          ))}
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
                    <Select
                      value={profile.availableHoursPerWeek}
                      onValueChange={(value) =>
                        setProfile((prev) => ({
                          ...prev,
                          availableHoursPerWeek: value,
                        }))
                      }
                      disabled={mutation.isPending}
                    >
                      <SelectTrigger className={`${inputClass} !h-[48px] w-full`}>
                        <SelectValue placeholder="Select availability" />
                      </SelectTrigger>
                      <SelectContent className="!w-full bg-white">
                        {AVAILABLE_HOURS_OPTIONS.map((hours) => (
                          <SelectItem key={hours} value={hours}>
                            {hours}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label className={labelClass}>Preferred Service Areas</Label>
                    <Select
                      value={serviceAreaSelection}
                      onValueChange={(value) => {
                        setProfile((prev) => {
                          if (prev.preferredServiceAreas.includes(value)) {
                            return prev;
                          }
                          return {
                            ...prev,
                            preferredServiceAreas: [
                              ...prev.preferredServiceAreas,
                              value,
                            ],
                          };
                        });
                        setServiceAreaSelection(undefined);
                      }}
                      disabled={mutation.isPending}
                    >
                      <SelectTrigger className={`${inputClass} !h-[48px] w-full`}>
                        <SelectValue placeholder="Select service areas" />
                      </SelectTrigger>
                      <SelectContent className="!w-full bg-white">
                        {SERVICE_AREA_OPTIONS.map((area) => (
                          <SelectItem key={area} value={area}>
                            {area}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>

                    {profile.preferredServiceAreas.length > 0 && (
                      <div className="mt-2 flex flex-wrap gap-2">
                        {profile.preferredServiceAreas.map((area) => (
                          <button
                            key={area}
                            type="button"
                            onClick={() =>
                              setProfile((prev) => ({
                                ...prev,
                                preferredServiceAreas:
                                  prev.preferredServiceAreas.filter(
                                    (item) => item !== area
                                  ),
                              }))
                            }
                            className="rounded-full border border-[#d9d9d9] bg-white px-3 py-1 text-[12px] text-[#2b2b2b] hover:border-[#bdbdbd]"
                          >
                            {area}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>

                  <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
                    <div className="flex items-start gap-3">
                      <Checkbox
                        id="transport"
                        className="mt-0.5 border-black"
                        checked={profile.hasReliableTransportation}
                        onCheckedChange={(checked) =>
                          setProfile((prev) => ({
                            ...prev,
                            hasReliableTransportation: checked === true,
                          }))
                        }
                        disabled={mutation.isPending}
                      />
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
                      <Checkbox
                        id="weekend"
                        className="mt-0.5 border-black"
                        checked={profile.availableOnWeekends}
                        onCheckedChange={(checked) =>
                          setProfile((prev) => ({
                            ...prev,
                            availableOnWeekends: checked === true,
                          }))
                        }
                        disabled={mutation.isPending}
                      />
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
                    <Select
                      value={profile.criminalBackground}
                      onValueChange={(value) =>
                        setProfile((prev) => ({
                          ...prev,
                          criminalBackground: value,
                        }))
                      }
                      disabled={mutation.isPending}
                    >
                      <SelectTrigger className={`${inputClass} !h-[48px] w-full`}>
                        <SelectValue placeholder="Select option" />
                      </SelectTrigger>
                      <SelectContent className="!w-full bg-white">
                        {CRIMINAL_BACKGROUND_OPTIONS.map((option) => (
                          <SelectItem key={option} value={option}>
                            {option}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label className={labelClass}>
                      Driving Record <span className="text-black">*</span>
                    </Label>
                    <Select
                      value={profile.drivingRecord}
                      onValueChange={(value) =>
                        setProfile((prev) => ({
                          ...prev,
                          drivingRecord: value,
                        }))
                      }
                      disabled={mutation.isPending}
                    >
                      <SelectTrigger className={`${inputClass} !h-[48px] w-full`}>
                        <SelectValue placeholder="Select option" />
                      </SelectTrigger>
                      <SelectContent className="!w-full bg-white">
                        {DRIVING_RECORD_OPTIONS.map((option) => (
                          <SelectItem key={option} value={option}>
                            {option}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label className={labelClass}>Professional References</Label>
                    <Textarea
                      placeholder="Please provide 2-3 professional references (name, title, company, phone number)..."
                      className={textareaClass}
                      value={profile.professionalReferences}
                      onChange={(event) =>
                        setProfile((prev) => ({
                          ...prev,
                          professionalReferences: event.target.value,
                        }))
                      }
                      disabled={mutation.isPending}
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
                      placeholder="Share why you’re interested in this role..."
                      className={textareaClass}
                      value={profile.motivation}
                      onChange={(event) =>
                        setProfile((prev) => ({
                          ...prev,
                          motivation: event.target.value,
                        }))
                      }
                      disabled={mutation.isPending}
                    />
                  </div>

                  <div>
                    <Label className={labelClass}>Additional Skills or Experience</Label>
                    <Textarea
                      placeholder="Any other relevant skills, experience, or information you’d like to share."
                      className={textareaClass}
                      value={profile.additionalSkills}
                      onChange={(event) =>
                        setProfile((prev) => ({
                          ...prev,
                          additionalSkills: event.target.value,
                        }))
                      }
                      disabled={mutation.isPending}
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
                      checked={consentBackgroundCheck}
                      onCheckedChange={(checked) =>
                        setConsentBackgroundCheck(checked === true)
                      }
                      disabled={mutation.isPending}
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
                    <Checkbox
                      id="terms-check"
                      className="mt-0.5 border-black"
                      checked={agreeTerms}
                      onCheckedChange={(checked) => setAgreeTerms(checked === true)}
                      disabled={mutation.isPending}
                    />
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

                  <div className="rounded-[8px] bg-[#E6F0E6] px-4 py-3">
                    <div className="flex items-start gap-3">
                      <CircleAlert className="mt-0.5 h-4 w-4 text-[#5d6d5f]" />
                      <div>
                        <p className="text-[16px] font-semibold text-[#4d5a4e]">
                          Important:
                        </p>
                        <p className="mt-1 text-[14px] leading-[1.45] text-[#98a198]">
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
              <Button
                type="submit"
                disabled={mutation.isPending}
                className="h-9 w-full rounded-[6px] bg-[#f4c21a] text-[12px] font-semibold text-[#1d1d1d] shadow-[0_2px_6px_rgba(0,0,0,0.08)] hover:bg-[#e4b40f] disabled:cursor-not-allowed disabled:opacity-70"
              >
                <Send className="mr-2 h-3.5 w-3.5" />
                {mutation.isPending ? "Submitting..." : "Submit Application"}
              </Button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
