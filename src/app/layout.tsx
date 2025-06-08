import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/ui/app-sidebar";
import QueryProvider from "@/components/layouts/queryProvider";

export const metadata: Metadata = {
  title: "MealMaster",
  description: "Recipe Management System",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html>
      <body>
        <SidebarProvider>
          <AppSidebar />
          <main>
            <SidebarTrigger />
            <QueryProvider>{children}</QueryProvider>
          </main>
        </SidebarProvider>
      </body>
    </html>
  );
}
