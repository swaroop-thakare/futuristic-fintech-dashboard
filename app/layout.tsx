import type React from "react"
import type { Metadata } from "next"
import { GeistSans } from "geist/font/sans"
import { GeistMono } from "geist/font/mono"
import { Analytics } from "@vercel/analytics/next"
import "./globals.css"
import { RoleProvider } from "@/components/role-context"
import { Sidebar } from "@/components/sidebar"
import { TopBar } from "@/components/topbar"
import { Suspense } from "react"
import { ThemeProvider } from "@/components/theme-provider"

export const metadata: Metadata = {
  title: "v0 App",
  description: "Created with v0",
  generator: "v0.app",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="dark antialiased" suppressHydrationWarning>
      <body
        className={`font-sans ${GeistSans.variable} ${GeistMono.variable} bg-background text-foreground selection:bg-primary/20 selection:text-primary-foreground`}
      >
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false} forcedTheme="dark">
          <RoleProvider>
            <Suspense fallback={<div>Loading...</div>}>
              <div className="min-h-screen flex cyber-grid">
                <Sidebar />
                <div className="flex-1 flex flex-col">
                  <TopBar />
                  <main className="flex-1">
                    <div className="mx-auto max-w-7xl p-4 md:p-6 lg:p-8">
                      <div className="bg-glass rounded-[var(--radius-lg)] neon-border cy-glow">
                        <div className="p-4 md:p-6">{children}</div>
                      </div>
                    </div>
                  </main>
                </div>
              </div>
            </Suspense>
          </RoleProvider>
        </ThemeProvider>
        <Analytics />
      </body>
    </html>
  )
}
