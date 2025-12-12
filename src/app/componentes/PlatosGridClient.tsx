"use client";
import dynamic from "next/dynamic";

const PlatosGrid = dynamic(() => import("./PlatosGrid"), { ssr: false });

export default PlatosGrid;
