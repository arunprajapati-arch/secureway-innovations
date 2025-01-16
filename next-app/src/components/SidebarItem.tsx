"use client"
import { usePathname, useRouter } from "next/navigation";
import React from "react";

export const SidebarItem = ({ href, title, icon }: { href: string; title: string; icon: React.ReactNode }) => {
    const router = useRouter();
    const pathname = usePathname()
    const selected = pathname === href

    return <div className={`flex items-center justify-start gap-4  ${selected ? "text-[#3cc47d]" : "text-slate-500"} cursor-pointer  `} onClick={() => {
        router.push(href);
    }}>
        <div className="">
            {icon}
        </div>
        <div className={`font-bold ${selected ? "text-[#3cc47d]" : "text-slate-500"}`}>
            {title}
        </div>
    </div>
}