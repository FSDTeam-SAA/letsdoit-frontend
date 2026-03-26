"use client";
import Link from "next/link";
import { Menu } from "lucide-react";
import { usePathname } from "next/navigation";
import { useEffect, useMemo, useRef, useState } from "react";

import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetClose,
} from "@/components/ui/sheet";
import { signOut, useSession } from "next-auth/react";
import Image from "next/image";

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
  const session = useSession();
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const userMenuRef = useRef<HTMLDivElement | null>(null);

  const isLoggedIn = session?.status === "authenticated";
  const role = session?.data?.user?.role;
  const userName = session?.data?.user?.name ?? "Account";
  const userImage = session?.data?.user?.image ?? "";
  const initials = useMemo(() => {
    const parts = userName.split(" ").filter(Boolean);
    const letters = parts.slice(0, 2).map((part) => part[0]?.toUpperCase() ?? "");
    return letters.join("") || "U";
  }, [userName]);
  const isInspector = role === "INSPECTOR";
  const isUser = role === "USER";

  useEffect(() => {
    if (!isUserMenuOpen) {
      return;
    }

    const handleOutsideClick = (event: MouseEvent) => {
      if (!userMenuRef.current) return;
      if (!userMenuRef.current.contains(event.target as Node)) {
        setIsUserMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);
    return () => document.removeEventListener("mousedown", handleOutsideClick);
  }, [isUserMenuOpen]);

  const dropdownLinks = useMemo(() => {
    if (isUser) {
      return [
        { label: "Join Our Team", href: "/join-our-team" },
        { label: "Inspection Request", href: "/quote" },
      ];
    }

    if (isInspector) {
      return [{ label: "Profile", href: "/profile" }];
    }

    if (isLoggedIn) {
      return [{ label: "Profile", href: "/profile" }];
    }

    return [];
  }, [isInspector, isLoggedIn, isUser]);

  const showPublicJoin = !isLoggedIn;

  const isActive = (href: string) => {
    if (href === "/") {
      return pathname === "/";
    }

    return pathname === href || pathname.startsWith(`${href}/`);
  };

  return (
    <header className="w-full bg-[#FFFFFF] sticky top-0 z-50">
      <div className="mx-auto flex h-[72px] container items-center justify-between px-4 sm:px-6 lg:px-4 xl:px-0">
        {/* Left: Logo */}
        <Link href="/" className="flex shrink-0 items-center gap-3 lg:gap-2 xl:gap-3">
          <div className="flex h-[34px] w-[34px] items-center justify-center rounded-[4px] bg-[#FBBF24] lg:h-[30px] lg:w-[30px] xl:h-[58px] xl:w-[58px]">
            <span className="text-[18px] font-bold leading-none text-[#131313] lg:text-[16px] xl:text-[32px]">
              AI
            </span>
          </div>

          <div className="leading-tight">
            <h2 className="text-[15px] font-bold uppercase tracking-[0.02em] text-[#131313] lg:text-[13px] xl:text-[20px]">
              AUTO INTEL
            </h2>
            <p className="text-[11px] font-medium text-[#424242] lg:text-[10px] xl:text-[16px]">
              Pre-Purchase Inspection Experts
            </p>
          </div>
        </Link>

        {/* Center: Desktop Nav */}
        <nav className="hidden items-center gap-8 lg:flex lg:gap-3 xl:gap-8">
          {navLinks.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              aria-current={isActive(item.href) ? "page" : undefined}
              className={`whitespace-nowrap text-[18px] font-medium transition hover:text-[#F4BE18] lg:text-[13px] xl:text-[18px] ${
                isActive(item.href) ? "text-[#F4BE18]" : "text-[#131313]"
              }`}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        {/* Right: Desktop Buttons */}
        <div className="hidden items-center gap-4 lg:flex lg:gap-2 xl:gap-4">
          {!isLoggedIn && (
            <>
              {showPublicJoin && (
                <Button
                  asChild
                  variant="outline"
                  className="h-[48px] rounded-full border-[#FBBF24] bg-transparent px-[55px] text-[16px] font-blod text-[#1E3A8A] hover:bg-[#fff7db] lg:h-[38px] lg:px-3 lg:text-[13px] xl:h-[48px] xl:px-[55px] xl:text-[16px]"
                >
                  <Link href="/join-our-team">Join Our Team</Link>
                </Button>
              )}

              <Button
                asChild
                className="h-[48px] rounded-full bg-[#FBBF24] px-6 text-[16px] font-blod text-[#1E3A8A] shadow-none hover:bg-[#e2ae11] lg:h-[38px] lg:px-3 lg:text-[13px] xl:h-[48px] xl:px-6 xl:text-[16px]"
              >
                <Link href="/login">Login</Link>
              </Button>
            </>
          )}

          {isLoggedIn && (
            <div className="relative" ref={userMenuRef}>
              <button
                type="button"
                aria-haspopup="menu"
                aria-expanded={isUserMenuOpen}
                onClick={() => setIsUserMenuOpen((open) => !open)}
                className="flex h-12 w-12 items-center justify-center rounded-full border border-[#FBBF24] bg-white text-[16px] font-semibold text-[#1E3A8A] shadow-sm transition hover:bg-[#fff7db]"
              >
                {userImage ? (
                  <Image
                    src={userImage}
                    alt={userName}
                    width={1000}
                    height={1000}
                    className="h-full w-full rounded-full object-cover"
                  />
                ) : (
                  <span>{initials}</span>
                )}
              </button>

              {isUserMenuOpen && (
                <div
                  role="menu"
                  className="absolute right-0 mt-3 w-56 rounded-2xl border border-[#F4E3A0] bg-white p-3 shadow-xl"
                >
                  <div className="flex flex-col gap-2">
                    {dropdownLinks.map((item) => (
                      <Link
                        key={item.label}
                        href={item.href}
                        onClick={() => setIsUserMenuOpen(false)}
                        className="rounded-full border border-[#FBBF24] px-4 py-2 text-center text-[14px] font-semibold text-[#1E3A8A] transition hover:bg-[#fff7db]"
                      >
                        {item.label}
                      </Link>
                    ))}

                    <button
                      type="button"
                      onClick={() => signOut()}
                      className="rounded-full bg-[#FBBF24] px-4 py-2 text-[14px] font-semibold text-[#1E3A8A] transition hover:bg-[#e2ae11]"
                    >
                      Log Out
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}
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
                    {!isLoggedIn && (
                      <>
                        {showPublicJoin && (
                          <SheetClose asChild>
                            <Button
                              asChild
                              variant="outline"
                              className="h-11 rounded-full border-[#E0A800] bg-transparent text-[14px] font-semibold text-[#1B2B5B] hover:bg-[#fff7db]"
                            >
                              <Link href="/join-our-team">Join Our Team</Link>
                            </Button>
                          </SheetClose>
                        )}

                        <SheetClose asChild>
                          <Button
                            asChild
                            className="h-11 rounded-full bg-[#F4BE18] text-[14px] font-semibold text-[#111111] shadow-none hover:bg-[#e2ae11]"
                          >
                            <Link href="/login">Login</Link>
                          </Button>
                        </SheetClose>
                      </>
                    )}

                    {isLoggedIn && (
                      <>
                        {dropdownLinks.map((item) => (
                          <SheetClose asChild key={item.label}>
                            <Button
                              asChild
                              variant="outline"
                              className="h-11 rounded-full border-[#E0A800] bg-transparent text-[14px] font-semibold text-[#1B2B5B] hover:bg-[#fff7db]"
                            >
                              <Link href={item.href}>{item.label}</Link>
                            </Button>
                          </SheetClose>
                        ))}

                        <SheetClose asChild>
                          <Button
                            type="button"
                            onClick={() => signOut()}
                            className="h-11 rounded-full bg-[#F4BE18] text-[14px] font-semibold text-[#111111] shadow-none hover:bg-[#e2ae11]"
                          >
                            Log Out
                          </Button>
                        </SheetClose>
                      </>
                    )}
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
