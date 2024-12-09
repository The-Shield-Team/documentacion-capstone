import { ReactNode } from "react";
import { BottomNav } from "../molecules/BottomNav";
import { PWAPrompt } from "../PWAPrompt";
import { Header } from "../molecules/Header";

interface RootLayoutProps {
  children: ReactNode;
  showNav?: boolean;
}

export function RootLayout({ children, showNav = true }: RootLayoutProps) {
  return (
    <div className="bg-background text-foreground min-h-screen">
      {showNav && <Header />}
      <main className="pb-24 pb-safe">{children}</main>
      {showNav && <BottomNav />}
      {showNav && <PWAPrompt />}
    </div>
  );
}
