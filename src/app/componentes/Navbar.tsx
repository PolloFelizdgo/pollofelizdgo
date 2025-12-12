"use client";
import { useState, useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import Logo from "./Logo";
import NavLinks from "./NavLinks";

// Navbar component - Clean version without OrderForm (v2024-12-01)
export const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
    }, []);

    const menuId = "primary-navigation";
    const pathname = usePathname();
    const router = useRouter();

    const getMenuClasses = () => {
        // Simplified: no animation, only control visibility. Desktop shows flex, mobile shows when isOpen.
        const base = "md:flex md:items-center md:gap-4 md:flex-row md:static md:bg-transparent md:p-0";
        const mobileOpen = "flex absolute top-16 left-0 w-full flex-col bg-red-600 p-4 gap-4";
        const mobileClosed = "hidden";

        return `${isOpen ? mobileOpen : mobileClosed} ${base}`;
    };

    useEffect(() => {
        // close on Escape
        const onKey = (e: KeyboardEvent) => {
            if (e.key === "Escape" && isOpen) setIsOpen(false);
        };

        // when opening, focus first link inside menu
        if (isOpen) {
            setTimeout(() => {
                const first = document.querySelector<HTMLAnchorElement>(`#${menuId} a`);
                first?.focus();
            }, 50);
        }

        document.addEventListener("keydown", onKey);
        return () => document.removeEventListener("keydown", onKey);
    }, [isOpen]);

    // Handler for the Navbar 'Menú' button: navigate to /menu or scroll if already on the page
    const goToMenu = () => {
        try {
            if (pathname === "/menu") {
                const el = document.getElementById("menu-all");
                if (el) {
                    el.scrollIntoView({ behavior: "smooth", block: "start" });
                    return;
                }
            }
            router.push("/menu#menu-all");
        } catch (err) {
            window.location.href = "/menu#menu-all";
        }
    };

        // Header: componente Navbar ubicado en src/app/componentes/Navbar.tsx
        return (
            <nav className="bg-red-600 text-white p-3 sticky top-0 z-50 shadow" role="navigation" aria-label="Main navigation">
            {/* Use full-width container with no side gaps (px-0). */}
            <div className="w-full flex items-center justify-between px-0">
                <div className="flex items-center gap-3">
                    {/* Logo reducido y clicable (ir al inicio). Logo component: src/app/componentes/Logo.tsx */}
                    <Logo />
                </div>

                {/* Desktop & mobile menu (single render) */}
                <div className="flex items-center gap-4">
                    {/* Desktop-only: quick Menu button to open sucursal's menu */}
                    <button
                        className="hidden md:inline-flex items-center px-3 py-1 rounded bg-white/10 hover:bg-white/20 text-sm"
                        onClick={goToMenu}
                        aria-label="Ir al menú"
                    >
                        Menú
                    </button>

                    {/* Theme toggle removed - dark mode disabled */}

                    {/* Hamburger (mobile) */}
                    <button
                        className="md:hidden p-2"
                        onClick={() => setIsOpen(!isOpen)}
                        aria-label={isOpen ? "Cerrar menú" : "Abrir menú"}
                        aria-controls={menuId}
                        aria-expanded={isOpen}
                    >
                        <div className="w-6 h-5 relative flex flex-col justify-between">
                            <span className={`w-full h-0.5 bg-white block ${isOpen ? "rotate-45 translate-y-2" : ""}`} />
                            <span className={`w-full h-0.5 bg-white block ${isOpen ? "opacity-0" : ""}`} />
                            <span className={`w-full h-0.5 bg-white block ${isOpen ? "-rotate-45 -translate-y-2" : ""}`} />
                        </div>
                    </button>

                    {/* Links (single render) */}
                    <div id={menuId} className={getMenuClasses()} onClick={() => setIsOpen(false)}>
                        {isMounted && <NavLinks onClick={() => setIsOpen(false)} />}
                    </div>
                </div>
            </div>
        </nav>
    );
};
