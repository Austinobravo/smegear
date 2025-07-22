"use client"

import * as React from "react";
import Link from "next/link";
import Image from "next/image";
import { AlignJustify } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import useNavigation from "@/hooks/useNavigation";

export default function MobileNav() {
  const navLinks = useNavigation();
  const [open, setOpen] = React.useState(false);

  return (
    <div className="flex items-center justify-between w-full px-4 py-4 lg:hidden">
      {/* Logo */}
      <Link href="/" onClick={() => setOpen(false)}>
        <Image src="/editedlogo.png" width={140} height={140} alt="Logo" priority />
        <span className="sr-only">Home</span>
      </Link>


      <Sheet open={open} onOpenChange={setOpen}>
        <SheetTrigger asChild>
          <Button variant="ghost" size="icon" className="p-2 bg-smegear-secondary text-white ">
            <AlignJustify className="size-7" />
            <span className="sr-only">Open menu</span>
          </Button>
        </SheetTrigger>

        <SheetContent
          side="right"
          className="flex flex-col space-y-8 pt-10 w-[60%] sm:w-2/5 overflow-y-auto bg-white"
        >

          <SheetHeader>
            <SheetTitle className="sr-only">Main navigation</SheetTitle>
          </SheetHeader>


          <nav className="flex flex-col gap-6 text-lg px-4">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className={`${link.isActive
                    ? "text-talentpro-brown font-bold"
                    : "hover:font-semibold"
                  } transition-colors duration-300`}
              >
                {link.name}
              </Link>
            ))}
          </nav>


          {/* <div className="mt-auto flex flex-col gap-4 px-4">
            <Link href="/sign-in" onClick={() => setOpen(false)}>
              <Button variant="outline" className="w-full rounded-full !shadow-none">
                Sign in
              </Button>
            </Link>

            <Link href="/sign-up" onClick={() => setOpen(false)}>
              <Button className="w-full bg-talentpro-brown rounded-full">
                Get Started
              </Button>
            </Link>
          </div> */}
        </SheetContent>
      </Sheet>
    </div>
  );
}
