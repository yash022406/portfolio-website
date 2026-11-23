"use client";

import { ThemeProvider as NextThemesProvider } from "next-themes";
import type * as React from "react";

// next-themes injects an inline <script> to set the theme before paint.
// React 19 warns when it encounters that <script> during client renders, so
// on the client we mark it as non-executable (it already ran from the SSR HTML;
// the element has suppressHydrationWarning, so the attribute change is safe).
const scriptProps =
  typeof window === "undefined"
    ? undefined
    : ({ type: "application/json" } as const);

export function ThemeProvider({
  children,
  ...props
}: React.ComponentProps<typeof NextThemesProvider>): React.JSX.Element {
  return (
    <NextThemesProvider scriptProps={scriptProps} {...props}>
      {children}
    </NextThemesProvider>
  );
}
