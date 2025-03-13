"use client";

import Footer from "@/app/comps/footer";
import Navbar from "@/app/comps/header";
import { usePathname } from "next/navigation";

export default function ConditionalLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const pagesWithoutHeader = ['/', '/forgot-password'];
  const showHeader = !pagesWithoutHeader.includes(pathname);

  return (
    <>
      {showHeader && <Navbar /> }
      <main>{children}</main>
      {showHeader && <Footer />}

    </>
  );
}