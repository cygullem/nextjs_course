"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

export const Navigation = () => {
    const pathname = usePathname();

    return (
        <nav>
            <Link href="/" className={pathname === "/" ? "font-bolf mr-4" : "text-blue-500 mr-4"}>
                Home
            </Link>
            <Link href="/about" className={pathname === "/about" ? "font-bolf mr-4" : "text-blue-500 mr-4"}>
                About
            </Link>
            <Link href="/products/1" className={
                    pathname.startsWith("/products/1")
                    ? "font-bolf mr-4"
                    : "text-blue-500 mr-4"
                }
            >
                Product 1
            </Link>
            <Link href="/users-client" className={pathname === "/users-client" ? "font-bolf mr-4" : "text-blue-500 mr-4"}>
                Client rendering
            </Link>
            <Link href="/users-server" className={pathname === "/users-server" ? "font-bolf mr-4" : "text-blue-500 mr-4"}>
                Server rendering
            </Link>
        </nav>
    )
}