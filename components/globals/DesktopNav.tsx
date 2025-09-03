
"use client";
import useNavigation from '@/hooks/useNavigation'
import Image from "next/image";
import Link from "next/link";
import { ShoppingCart, ArrowRight } from "lucide-react";

export default function DesktopNav() {
    const navLinks = useNavigation()
    return (
        <header className="w-full bg-[#FEFFFE]  fixed top-0 left-0 z-50 mb-24 py-5 shadow-lg">
            <nav className="mx-auto flex max-w-7xl justify-between items-center px-6 min-h-[56px]">

                <Link href="/">
                    <Image
                        src="/editedlogo.png"
                        alt="Smegear Logo"
                        width={150}
                        height={150}
                        priority
                    />
                </Link>


                <ul className="hidden gap-6 lg:flex items-center">
                    {navLinks.map((item) => (
                        <li key={item.href}>
                            <Link
                                href={item.href}
                                className={`${item.isActive ? "border-b-2 border-b-[#060855] relative font-medium text-smegear-secondary transition-colors duration-200 hover:text-smegear-primary uppercase text-[15px]" : "uppercase link-underline text-smegear-secondary text-[15px] font-medium"}`}
                            >
                                {item.name}
                            </Link>
                        </li>
                    ))}



                    <li>
                        <Link
                            href="/contact"
                            className="flex font-medium items-center gap-2 rounded-lg bg-smegear-secondary px-6 py-4 text-white transition hover:opacity-90 text-[15px] uppercase"
                        >
                            Contact&nbsp;Us
                            <ArrowRight size={20} className=' font-semibold' />
                        </Link>
                    </li>
                </ul>
            </nav>
        </header>
    );
}