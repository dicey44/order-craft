"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Package, LayoutDashboard, ClipboardList } from "lucide-react";

export default function Navbar() {
    const pathname = usePathname();

    const navLinks = [
        {
            href: "/",
            label: "Dashboard",
            icon: LayoutDashboard,
        },
        {
            href: "/orders",
            label: "All Orders",
            icon: ClipboardList,
        },
    ];

    return (
        <header className="sticky top-0 z-50 w-full border-b border-slate-200 bg-white">
            <nav
                aria-label="Main navigation"
                className="mx-auto flex max-w-7xl flex-col gap-4 px-6 py-4 sm:flex-row sm:items-center sm:justify-between"
            >
                <Link
                    href="/"
                    className="flex w-fit items-center gap-3 rounded-md focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-blue-600"
                >
                    <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-600 text-white">
                        <Package size={22} strokeWidth={2} aria-hidden="true" />
                    </span>

                    <span className="text-xl font-bold tracking-tight text-slate-900">
                        Order<span className="text-blue-600">Craft</span>
                    </span>
                </Link>

                <div className="flex items-center gap-2">
                    {navLinks.map(({ href, label, icon: Icon }) => {
                        const isActive =
                            href === "/"
                                ? pathname === "/"
                                : pathname === href || pathname.startsWith(`${href}/`);

                        return (
                            <Link
                                key={href}
                                href={href}
                                aria-current={isActive ? "page" : undefined}
                                className={`flex items-center gap-2 rounded-lg px-4 py-2.5 text-sm font-medium transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 ${
                                    isActive
                                        ? "bg-blue-50 text-blue-700"
                                        : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
                                }`}
                            >
                                <Icon size={18} strokeWidth={2} aria-hidden="true" />
                                {label}
                            </Link>
                        );
                    })}
                </div>
            </nav>
        </header>
    );
}
