"use client";
import React from "react";

// ThemeProvider stub: dark mode has been disabled. This passthrough keeps
// imports working but does not provide theme behavior.
export default function ThemeProvider({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
