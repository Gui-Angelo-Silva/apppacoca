import type React from "react"
import type { Metadata } from "next"
import { GeistSans } from "geist/font/sans"
import { GeistMono } from "geist/font/mono"
import { Analytics } from "@vercel/analytics/next"
import "./globals.css"
import { AppSidebar } from "@/components/layout/app-sidebar"
import { SidebarProvider, SidebarInset, SidebarTrigger } from "@/components/ui/sidebar"
import { Separator } from "@/components/ui/separator"
import { Suspense } from "react"

export const metadata: Metadata = {
  title: "Sabor real",
  description: "Sistema de gerenciamento de pedidos da sabor real",
  generator: "v0.app",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="pt-BR">
      <body className={`font-sans ${GeistSans.variable} ${GeistMono.variable}`}>
        <SidebarProvider>
          <Suspense fallback={<div>Loading...</div>}>
            <AppSidebar />
            <SidebarInset>
              <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
                <SidebarTrigger className="-ml-1" />
                <Separator orientation="vertical" className="mr-2 h-4" />
                <div className="flex items-center gap-2">
                  <h2 className="text-lg font-semibold">Sistema de gestão de pedidos</h2>
                </div>
              </header>
              <main className="flex flex-1 flex-col gap-4 p-4 md:p-6">{children}</main>
            </SidebarInset>
          </Suspense>
        </SidebarProvider>
        <Analytics />
      </body>
    </html>
  )
}
