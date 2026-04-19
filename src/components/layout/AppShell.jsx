import { useState } from "react";
import OfflineBanner from "../ui/OfflineBanner";
import { useMediaQuery } from "../ui/useMediaQuery";
import MobileNav from "./MobileNav";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";

export default function AppShell({ children }) {
  const [open, setOpen] = useState(false);
  const isTabletOrMobile = useMediaQuery("(max-width: 1279px)");
  const isMobile = useMediaQuery("(max-width: 767px)");

  return (
    <div className="app-shell">
      <OfflineBanner />
      <Navbar onOpenSidebar={() => setOpen(true)} />

      <div className="relative flex h-[calc(100dvh-64px)] overflow-hidden">
        {!isTabletOrMobile && <Sidebar compact={false} />}

        {isTabletOrMobile && open && (
          <div className="fixed inset-0 z-50 flex">
            <div className="w-[280px] max-w-[85vw]">
              <Sidebar compact={false} />
            </div>
            <button
              className="flex-1 bg-black/50"
              onClick={() => setOpen(false)}
              aria-label="Close sidebar"
            />
          </div>
        )}

        <main
          className={`flex-1 overflow-auto p-3 md:p-6 ${isMobile ? "pb-20" : "pb-6"}`}
        >
          {children}
        </main>
      </div>

      <MobileNav />
    </div>
  );
}
