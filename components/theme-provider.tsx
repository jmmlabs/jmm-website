"use client"
import { ThemeProvider as NextThemesProvider } from "next-themes"
import type { ThemeProviderProps } from "next-themes"

export function ThemeProvider({
  children,
}: Omit<ThemeProviderProps, "attribute" | "defaultTheme" | "disableSystemTheme">) {
  return (
    <NextThemesProvider
      attribute="class"
      defaultTheme="dark"
      forcedTheme="dark"
      enableSystem={false}
      disableSystemTheme
    >
      {children}
    </NextThemesProvider>
  )
}
