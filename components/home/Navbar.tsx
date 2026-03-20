"use client";
import Link from "next/link";
import { Menu } from "lucide-react";
import { usePathname } from "next/navigation";

import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetClose,
} from "@/components/ui/sheet";

const navLinks = [
  { label: "Home", href: "/" },
  { label: "Packages", href: "/packages" },
  { label: "Services Area", href: "/services-area" },
  { label: "About Us", href: "/about-us" },
  { label: "How It Works", href: "/how-it-work" },
  { label: "Sample Report", href: "/sample-report" },
];

export default function Navbar() {
  const pathname = usePathname();

  const isActive = (href: string) => {
    if (href === "/") {
      return pathname === "/";
    }

    return pathname === href || pathname.startsWith(`${href}/`);
  };

  return (
    <header className="w-full bg-[#FFFFFF] sticky top-0 z-50">
      <div className="mx-auto  flex h-[72px] container items-center justify-between px-4 sm:px-6 lg:px-0">
        {/* Left: Logo */}
        <Link href="/" className="flex items-center gap-3 shrink-0">
          <div className="flex h-[34px] w-[34px] items-center justify-center rounded-[4px] bg-[#F4BE18]">
            <span className="text-[18px] font-bold leading-none text-[#111111]">
              AI
            </span>
          </div>

          <div className="leading-tight">
            <h2 className="text-[15px] font-semibold uppercase tracking-[0.02em] text-[#111111]">
              AUTO INTEL
            </h2>
            <p className="text-[11px] font-medium text-[#5B5B5B]">
              Pre-Purchase Inspection Experts
            </p>
          </div>
        </Link>

        {/* Center: Desktop Nav */}
        <nav className="hidden items-center gap-8 lg:flex">
          {navLinks.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              aria-current={isActive(item.href) ? "page" : undefined}
              className={`text-[18px] font-medium transition hover:text-[#F4BE18] ${
                isActive(item.href) ? "text-[#F4BE18]" : "text-[#131313]"
              }`}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        {/* Right: Desktop Buttons */}
        <div className="hidden items-center gap-4 lg:flex">
          <Button
            asChild
            variant="outline"
            className="h-[48px] rounded-full border-[#FBBF24] bg-transparent px-[55px] text-[16px] font-blod text-[#1E3A8A] hover:bg-[#fff7db]"
          >
            <Link href="/join-our-team">Join Our Team</Link>
          </Button>

          <Button
            asChild
            className="h-[48px] rounded-full bg-[#FBBF24] px-6 text-[16px] font-blod text-[#1E3A8A] shadow-none hover:bg-[#e2ae11]"
          >
            <Link href="/inspection-request">Inspection Request</Link>
          </Button>
        </div>

        {/* Mobile Menu */}
        <div className="lg:hidden">
          <Sheet>
            <SheetTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="h-10 w-10 rounded-full"
                aria-label="Open menu"
              >
                <Menu className="h-6 w-6 text-[#111111]" />
              </Button>
            </SheetTrigger>

            <SheetContent side="right" className="w-[300px] border-l bg-white px-0">
              <div className="flex h-full flex-col">
                {/* Mobile Logo */}
                <div className="border-b px-5 py-4">
                  <Link href="/" className="flex items-center gap-3">
                    <div className="flex h-[34px] w-[34px] items-center justify-center rounded-[4px] bg-[#F4BE18]">
                      <span className="text-[18px] font-bold leading-none text-[#111111]">
                        AI
                      </span>
                    </div>

                    <div className="leading-tight">
                      <h2 className="text-[15px] font-semibold uppercase tracking-[0.02em] text-[#111111]">
                        AUTO INTEL
                      </h2>
                      <p className="text-[11px] font-medium text-[#5B5B5B]">
                        Pre-Purchase Inspection Experts
                      </p>
                    </div>
                  </Link>
                </div>

                {/* Mobile Links */}
                <div className="flex flex-1 flex-col px-5 py-5">
                  <nav className="flex flex-col gap-1">
                    {navLinks.map((item) => (
                      <SheetClose asChild key={item.label}>
                        <Link
                          href={item.href}
                          aria-current={isActive(item.href) ? "page" : undefined}
                          className={`rounded-md px-3 py-3 text-[15px] font-medium transition hover:bg-[#F8F8F8] hover:text-[#F4BE18] ${
                            isActive(item.href)
                              ? "text-[#F4BE18]"
                              : "text-[#222222]"
                          }`}
                        >
                          {item.label}
                        </Link>
                      </SheetClose>
                    ))}
                  </nav>

                  {/* Mobile Buttons */}
                  <div className="mt-6 flex flex-col gap-3">
                    <SheetClose asChild>
                      <Button
                        asChild
                        variant="outline"
                        className="h-11 rounded-full border-[#E0A800] bg-transparent text-[14px] font-semibold text-[#1B2B5B] hover:bg-[#fff7db]"
                      >
                        <Link href="/join-our-team">Join Our Team</Link>
                      </Button>
                    </SheetClose>

                    <SheetClose asChild>
                      <Button
                        asChild
                        className="h-11 rounded-full bg-[#F4BE18] text-[14px] font-semibold text-[#111111] shadow-none hover:bg-[#e2ae11]"
                      >
                        <Link href="/inspection-request">Inspection Request</Link>
                      </Button>
                    </SheetClose>
                  </div>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
