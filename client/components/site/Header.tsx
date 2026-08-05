import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X } from "lucide-react";
import Logo from "./Logo";
import { Button } from "@/components/ui/button";

const navLinks = [
  { label: "Products", to: "/products" },
  { label: "Analysis", to: "/analysis" },
  { label: "FAQ", to: "/faq" },
  { label: "Blog", to: "/blog" },
  { label: "About Us", to: "/about-us" },
];

export default function Header() {
  const [open, setOpen] = useState(false);
  const [accountMenuOpen, setAccountMenuOpen] = useState(false);
  const [account, setAccount] = useState<{ name?: string; email: string } | null>(null);

  useEffect(() => {
    const refreshAccount = () => {
      const storedUser = localStorage.getItem("amlbot-demo-user");
      setAccount(storedUser ? JSON.parse(storedUser) as { name?: string; email: string } : null);
    };

    refreshAccount();
    window.addEventListener("amlbot-auth-changed", refreshAccount);
    return () => window.removeEventListener("amlbot-auth-changed", refreshAccount);
  }, []);

  const logOut = () => {
    localStorage.removeItem("amlbot-demo-user");
    localStorage.removeItem("amlbot-demo-account");
    setAccount(null);
    setAccountMenuOpen(false);
  };

  return (
    <header className="relative z-50 bg-[#eaf4ff]">
      <div className="container grid h-20 max-w-none grid-cols-[auto_1fr_auto] items-center rounded-none border-0 bg-transparent px-6 shadow-none sm:h-24 sm:px-7">
        <Logo />

        <nav className="hidden items-center justify-self-center gap-5 lg:flex">
          {navLinks.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              onClick={(event) => event.preventDefault()}
              aria-disabled="true"
              className="text-sm font-medium text-foreground/80 transition-colors hover:text-primary"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-3 lg:flex">
          {account ? (
            <div className="relative">
              <button
                type="button"
                onClick={() => setAccountMenuOpen((value) => !value)}
                className="flex items-center gap-2 rounded-full border border-slate-200 bg-white/80 px-3 py-2 text-sm font-semibold text-foreground"
                aria-expanded={accountMenuOpen}
              >
                <span className="flex h-7 w-7 items-center justify-center rounded-full bg-primary text-xs font-bold text-white">
                  {(account.name || account.email).slice(0, 1).toUpperCase()}
                </span>
                <span className="max-w-[130px] truncate">{account.name || account.email}</span>
                <span className="text-xs text-muted-foreground">⌄</span>
              </button>
              {accountMenuOpen && (
                <div className="absolute right-0 top-12 z-50 w-56 rounded-xl border border-slate-200 bg-white p-2 shadow-xl">
                  <p className="truncate px-3 py-2 text-xs text-muted-foreground">{account.email}</p>
                  <button type="button" onClick={logOut} className="w-full rounded-lg px-3 py-2 text-left text-sm font-semibold text-rose-600 hover:bg-rose-50">
                    Log out
                  </button>
                </div>
              )}
            </div>
          ) : (
            <>
              <Link to="/login" className="text-sm font-semibold text-foreground/80 transition-colors hover:text-primary">
                Log In
              </Link>
              <Button asChild className="rounded-full bg-black px-5 text-white hover:bg-slate-800">
                <Link to="/create-account">Create an account</Link>
              </Button>
            </>
          )}
          <span className="ml-2 text-xs font-medium text-foreground/80">EN⌄</span>
        </div>

        <button
          onClick={() => setOpen((v) => !v)}
          className="lg:hidden inline-flex items-center justify-center rounded-md p-2 text-foreground"
          aria-label="Toggle menu"
        >
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {open && (
        <div className="lg:hidden border-t border-border/60 bg-background">
          <nav className="container flex flex-col gap-1 py-4">
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                onClick={(event) => { event.preventDefault(); setOpen(false); }}
                aria-disabled="true"
                className="rounded-md px-2 py-2.5 text-sm font-medium text-foreground/80 hover:bg-accent hover:text-primary"
              >
                {link.label}
              </Link>
            ))}
            <div className="mt-2 flex flex-col gap-2 border-t border-border/60 pt-4">
              {account ? (
                <>
                  <p className="px-2 text-sm font-semibold text-foreground">{account.name || account.email}</p>
                  <p className="px-2 text-xs text-muted-foreground">{account.email}</p>
                  <button type="button" onClick={logOut} className="rounded-md px-2 py-2.5 text-left text-sm font-semibold text-rose-600 hover:bg-rose-50">
                    Log out
                  </button>
                </>
              ) : (
                <>
                  <Link to="/login" onClick={() => setOpen(false)} className="rounded-md px-2 py-2.5 text-sm font-semibold text-foreground/80 hover:text-primary">
                    Log In
                  </Link>
                  <Button asChild className="rounded-full bg-black text-white hover:bg-slate-800">
                    <Link to="/create-account" onClick={() => setOpen(false)}>
                      Create an account
                    </Link>
                  </Button>
                </>
              )}
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
