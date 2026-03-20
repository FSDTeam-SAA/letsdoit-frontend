"use client";

import * as React from "react";
import { format } from "date-fns";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {  CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import { Send } from "lucide-react";

export default function FreeQuoteSection() {
  const [date, setDate] = React.useState<Date | undefined>(
    new Date(2025, 0, 14)
  );
  const [month, setMonth] = React.useState<Date>(
    new Date(2025, 0, 1)
  );

  return (
    <section className="w-full bg-[#f5f5f3] px-4 py-8 sm:px-6 sm:py-10 lg:px-8 lg:py-12">
      <div className="mx-auto container rounded-none  bg-[#f5f5f3] px-4 py-10 sm:px-6 md:px-8 lg:px-10 lg:py-14">
        {/* Heading */}
        <div className="mx-auto max-w-[760px] text-center">
          <h2 className="text-[34px] font-semibold leading-[1.15] tracking-[-0.02em] text-[#1d1d1d] sm:text-[42px] lg:text-[54px]">
            Get Your Free Quote
          </h2>

          <p className="mx-auto mt-5 max-w-[760px] text-[15px] leading-7 text-[#666666] sm:text-[16px]">
            Fill out the form below with your vehicle information and we&apos;ll provide you with
            a detailed quote and schedule your inspection.
          </p>
        </div>

        {/* Main container */}
        <div className="mx-auto mt-10 rounded-[22px] border border-[#e4e4e4] bg-white p-4 shadow-[0_10px_30px_rgba(0,0,0,0.10)] sm:p-6 lg:mt-14 lg:p-8">
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-[260px_minmax(0,1fr)] lg:gap-8 xl:grid-cols-[290px_minmax(0,1fr)]">
            {/* Left calendar */}
            <div className="h-fit w-full max-w-[310px] justify-self-center rounded-[14px] border bg-[#fbfbfb] shadow-[0_8px_24px_rgba(0,0,0,0.07)] lg:justify-self-start">
              <CardContent className="p-4">
                <Calendar
                  mode="single"
                  selected={date}
                  onSelect={(selected) => {
                    setDate(selected);
                    if (selected) setMonth(selected);
                  }}
                  month={month}
                  onMonthChange={setMonth}
                  captionLayout="dropdown"
                  fromDate={new Date(2020, 0, 1)}
                  toDate={new Date(2035, 11, 31)}
                  showOutsideDays={false}
                  className="w-full p-0"
                  classNames={{
                    months: "w-full",
                    month: "w-full space-y-3",
                    caption: "relative flex items-center justify-center pt-1",
                    caption_label:
                      "flex items-center gap-1 text-[16px] font-medium text-[#1f1f1f] [&>svg]:h-3.5 [&>svg]:w-3.5 [&>svg]:text-[#1f1f1f]",
                    nav: "absolute inset-x-0 top-0 flex items-center justify-between",
                    nav_button: cn(
                      "h-7 w-7 bg-transparent p-0 text-[#1f1f1f] hover:bg-transparent hover:text-black"
                    ),
                    nav_button_previous: "relative",
                    nav_button_next: "relative",
                    table: "w-full border-collapse",
                    head_row: "grid grid-cols-7",
                    head_cell:
                      "text-center text-[11px] font-medium text-[#4d4d4d]",
                    row: "mt-2 grid grid-cols-7",
                    cell: "relative flex h-8 items-center justify-center p-0 text-center",
                    day: cn(
                      "h-8 w-8 rounded-full p-0 text-[12px] font-normal text-[#1f1f1f] hover:bg-transparent aria-selected:opacity-100"
                    ),
                    day_selected:
                      "bg-[#f4bc18] text-black hover:bg-[#f4bc18] hover:text-black focus:bg-[#f4bc18] focus:text-black",
                    day_today: "font-semibold text-black",
                    day_outside: "text-[#b9b9b9] opacity-40",
                    day_disabled: "text-[#cfcfcf] opacity-50",
                    day_hidden: "invisible",
                  }}
                />

                <div className="mt-3 rounded-[10px] border border-[#ececec] bg-white px-3 py-2 text-center text-[12px] text-[#555]">
                  {date ? format(date, "MMMM d, yyyy") : "Select a date"}
                </div>
              </CardContent>
            </div>

            {/* Right form */}
            <div className="rounded-[18px] border border-[#dddddd] bg-[#fbfbfb] shadow-[0_8px_24px_rgba(0,0,0,0.06)]">
              <CardContent className="p-4 sm:p-6 lg:p-7">
                <h3 className="text-[32px] font-medium leading-none text-[#444444] sm:text-[40px]">
                  Vehicle Information
                </h3>

                <form
                  className="mt-8 space-y-5"
                  onSubmit={(e) => {
                    e.preventDefault();
                    console.log("Selected date:", date);
                  }}
                >
                  <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                    <div>
                      <label className="mb-2 block text-[16px] font-medium text-[#2c2c2c]">
                        Year <span className="text-[#2c2c2c]">*</span>
                      </label>
                      <Input
                        defaultValue="2025"
                        className="h-[48px] rounded-[8px] border border-[#9f9f9f] bg-white px-4 text-[14px] text-[#222] shadow-none placeholder:text-[#9a9a9a] focus-visible:ring-0 focus-visible:ring-offset-0"
                      />
                    </div>

                    <div>
                      <label className="mb-2 block text-[16px] font-medium text-[#2c2c2c]">
                        Make <span className="text-[#2c2c2c]">*</span>
                      </label>
                      <Input
                        defaultValue="HONDA"
                        className="h-[48px] rounded-[8px] border border-[#9f9f9f] bg-white px-4 text-[14px] uppercase text-[#6b6b6b] shadow-none placeholder:text-[#9a9a9a] focus-visible:ring-0 focus-visible:ring-offset-0"
                      />
                    </div>

                    <div>
                      <label className="mb-2 block text-[16px] font-medium text-[#2c2c2c]">
                        Model <span className="text-[#2c2c2c]">*</span>
                      </label>
                      <Input
                        defaultValue="Civic"
                        className="h-[48px] rounded-[8px] border border-[#9f9f9f] bg-white px-4 text-[14px] text-[#6b6b6b] shadow-none placeholder:text-[#9a9a9a] focus-visible:ring-0 focus-visible:ring-offset-0"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="mb-2 block text-[16px] font-medium text-[#2c2c2c]">
                      VIN (Optional)
                    </label>
                    <Input
                      placeholder="17- Characters VIN"
                      className="h-[48px] rounded-[8px] border border-[#9f9f9f] bg-white px-4 text-[14px] text-[#222] shadow-none placeholder:text-[#9a9a9a] focus-visible:ring-0 focus-visible:ring-offset-0"
                    />
                  </div>

                  <div>
                    <label className="mb-2 block text-[16px] font-medium text-[#2c2c2c]">
                      Vehicle Location <span className="text-[#2c2c2c]">*</span>
                    </label>
                    <Input
                      placeholder="City, State or Full Address"
                      className="h-[48px] rounded-[8px] border border-[#9f9f9f] bg-white px-4 text-[14px] text-[#222] shadow-none placeholder:text-[#9a9a9a] focus-visible:ring-0 focus-visible:ring-offset-0"
                    />
                  </div>

                  <div>
                    <label className="mb-2 block text-[16px] font-medium text-[#2c2c2c]">
                      You Message
                    </label>
                    <Textarea
                      placeholder="Tell us how we can help you"
                      className="min-h-[140px] rounded-[8px] border border-[#9f9f9f] bg-white px-4 py-4 text-[14px] text-[#222] shadow-none placeholder:text-[#9a9a9a] focus-visible:ring-0 focus-visible:ring-offset-0"
                    />
                  </div>

                  <Button
                    type="submit"
                    className="h-[50px] w-full rounded-[8px] bg-[#f4bc18] text-[16px] font-semibold text-[#1d1d1d] hover:bg-[#e6b010]"
                  >
                    <Send className="mr-2 h-4 w-4" />
                    Send
                  </Button>
                </form>
              </CardContent>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
