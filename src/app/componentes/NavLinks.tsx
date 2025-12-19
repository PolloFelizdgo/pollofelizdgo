"use client";
import Link from "next/link";
import React from "react";

export default function NavLinks({ onClick }: { onClick?: () => void }) {
  // linkCls: clase base para enlaces del navbar (ubicado en src/app/componentes/NavLinks.tsx)
  const linkCls = "block px-3 py-2 rounded hover:bg-red-500 transition-colors text-white";

  return (
    <ul className="flex flex-col md:flex-row md:items-center md:gap-4 md:flex">
      <li>
        <Link href="/" className={linkCls} onClick={onClick}>
          Inicio
        </Link>
      </li>
      <li>
        <Link href="/about" className={linkCls} onClick={onClick}>
          Acerca
        </Link>
      </li>
      <li>
        <Link href="/sucursales" className={linkCls} onClick={onClick}>
          Sucursales
        </Link>
      </li>
      <li>
        <Link href="/contact" className={linkCls} onClick={onClick}>
          Contacto
        </Link>
      </li>
      <li>
        <Link href="/bolsa-de-trabajo" className={linkCls} onClick={onClick}>
          Bolsa de Trabajo
        </Link>
      </li>
      <li>
        <a href="https://facturacion.galasistemas.com/" target="_blank" rel="noopener noreferrer" className={linkCls} onClick={onClick}>
          Facturación
        </a>
      </li>
    </ul>
  );
}
