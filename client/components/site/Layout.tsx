import { Outlet } from "react-router-dom";
import { MessageCircle } from "lucide-react";
import Header from "./Header";
import Footer from "./Footer";

export default function Layout() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
      <a
        href="https://t.me/amlbot"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Open support chat"
        className="fixed bottom-5 right-5 z-40 flex h-12 w-12 items-center justify-center rounded-full bg-[#2f4657] text-white shadow-lg transition-transform hover:scale-105"
      >
        <MessageCircle size={22} />
      </a>
    </div>
  );
}
