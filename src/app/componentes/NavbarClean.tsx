"use client";
import { useState, useEffect, useMemo, useCallback } from "react";
import { usePathname, useRouter } from "next/navigation";
import Logo from "./Logo";
import NavLinks from "./NavLinks";
import { UI_CONSTANTS } from "@/lib/constants";

const MENU_ID = "primary-navigation";
const MENU_CLASSES = {
    base: "md:flex md:items-center md:gap-4 md:flex-row md:static md:bg-transparent md:p-0",
    mobileOpen: "flex absolute top-16 left-0 w-full flex-col bg-red-600 p-4 gap-4 shadow-lg",
    mobileClosed: "hidden",
} as const;

export const NavbarClean = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [isMounted, setIsMounted] = useState(false);

    const pathname = usePathname();
    const router = useRouter();

    useEffect(() => {
        setIsMounted(true);
    }, []);

    // Memoize menu classes
    const menuClasses = useMemo(() => {
        const { base, mobileOpen, mobileClosed } = MENU_CLASSES;
        return `${isOpen ? mobileOpen : mobileClosed} ${base}`;
    }, [isOpen]);

    // Memoize close handler
    const handleClose = useCallback(() => {
        setIsOpen(false);
    }, []);

    // Memoize toggle handler
    const handleToggle = useCallback(() => {
        setIsOpen(prev => !prev);
    }, []);

    useEffect(() => {
        const onKey = (e: KeyboardEvent) => {
            if (e.key === "Escape" && isOpen) handleClose();
        };

        if (isOpen) {
            // Focus first link when menu opens
            setTimeout(() => {
                const first = document.querySelector<HTMLAnchorElement>(`#${MENU_ID} a`);
                first?.focus();
            }, UI_CONSTANTS.FOCUS_DELAY_MS);
        }

        document.addEventListener("keydown", onKey);
        return () => document.removeEventListener("keydown", onKey);
    }, [isOpen, handleClose]);

    const goToMenu = useCallback(() => {
        try {
            if (pathname === "/menu") {
                const el = document.getElementById("menu-all");
                if (el) {
                    el.scrollIntoView({ behavior: UI_CONSTANTS.SCROLL_BEHAVIOR, block: "start" });
                    return;
                }
            }
            router.push("/menu#menu-all");
        } catch (err) {
            console.error("Navigation error:", err);
            window.location.href = "/menu#menu-all";
        }
    }, [pathname, router]);

    return (
        <nav className="bg-red-600 text-white p-3 sticky top-0 z-50 shadow" role="navigation" aria-label="Main navigation">
            <div className="w-full flex items-center justify-between px-0">
                <div className="flex items-center gap-3">
                    <Logo showText={false} />
                </div>

                <div className="flex items-center gap-4">
                    <button
                        className="hidden md:inline-flex items-center px-3 py-1 rounded bg-white/10 hover:bg-white/20 text-sm transition-colors focus:ring-2 focus:ring-white/50 focus:outline-none"
                        onClick={goToMenu}
                        aria-label="Ir al menú de productos"
                    >
                        Menú
                    </button>

                    <button
                        className="md:hidden p-2 rounded focus:ring-2 focus:ring-white/50 focus:outline-none transition-transform hover:scale-110"
                        onClick={handleToggle}
                        aria-label={isOpen ? "Cerrar menú de navegación" : "Abrir menú de navegación"}
                        aria-controls={MENU_ID}
                        aria-expanded={isOpen}
                    >
                        <div className="w-6 h-5 relative flex flex-col justify-between">
                            <span className={`w-full h-0.5 bg-white block transition-transform ${isOpen ? "rotate-45 translate-y-2" : ""}`} />
                            <span className={`w-full h-0.5 bg-white block transition-opacity ${isOpen ? "opacity-0" : ""}`} />
                            <span className={`w-full h-0.5 bg-white block transition-transform ${isOpen ? "-rotate-45 -translate-y-2" : ""}`} />
                        </div>
                    </button>

                    <nav id={MENU_ID} className={menuClasses} onClick={handleClose} aria-label="Menú principal">
                        {isMounted && <NavLinks onClick={handleClose} />}
                    </nav>
                </div>
            </div>
        </nav>
    );
};
