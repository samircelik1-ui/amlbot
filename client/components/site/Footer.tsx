import { Link } from "react-router-dom";
import { Send, Linkedin, Twitter, Youtube } from "lucide-react";
import Logo from "./Logo";

const columns = [
  {
    title: "For business",
    links: [
      { label: "Transaction Monitoring", to: "/transaction-monitoring", action: "none" },
      { label: "KYT", to: "/kyt", action: "none" },
      { label: "KYC/KYB", to: "/kyc-kyb", action: "none" },
      { label: "AMLBot", to: "/amlbot", action: "none" },
      { label: "AML Training", to: "/aml-training", action: "none" },
      { label: "Consulting", to: "/consulting", action: "none" },
    ],
  },
  {
    title: "For personal use",
    links: [
      { label: "AML Chat Bot", to: "/aml-chat-bot", action: "chat" },
      { label: "Investigation", to: "/investigation", action: "chat" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About Us", to: "/about-us", action: "none" },
      { label: "Analysis", to: "/analysis", action: "none" },
      { label: "Certifications", to: "/certifications", action: "none" },
      { label: "Blog", to: "/blog", action: "none" },
      { label: "Press kit", to: "/press-kit", action: "none" },
      { label: "Careers", to: "/careers", action: "none" },
    ],
  },
];

const socials = [
  { label: "Telegram", href: "https://telegram.org", icon: Send },
  { label: "LinkedIn", href: "https://linkedin.com", icon: Linkedin },
  { label: "X", href: "https://x.com", icon: Twitter },
  { label: "YouTube", href: "https://youtube.com", icon: Youtube },
];

export default function Footer() {
  return (
    <footer className="bg-[#efefef] text-foreground">
      <div className="container py-16">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-[1.4fr_1fr_1fr_1fr_1fr]">
          <div className="space-y-6">
            <Logo className="text-foreground" />
            <div className="space-y-4 text-sm text-muted-foreground">
              <div>
                <p className="font-semibold text-foreground">Global:</p>
                <p>
                  Safelement Limited, Office 1111, Suite 1102, Lee Garden One,
                  33 Hysan Avenue, Causeway Bay, Hong Kong
                </p>
              </div>
              <div>
                <p className="font-semibold text-foreground">European Union:</p>
                <p>Safe3 UAB</p>
                <p>Registration code: 306141950</p>
                <p>Address: Vilnius, J. Jasinskio g. 16B, LT-03163</p>
              </div>
            </div>
            <div className="flex items-center gap-4 pt-1">
              <img
                src="https://amlbot.com/_next/static/media/iso-9001-black.58844294.svg"
                alt="ISO 9001:2015"
                className="h-14 w-14 object-contain"
              />
              <img
                src="https://amlbot.com/_next/static/media/iso-27001-black.bc4096c1.svg"
                alt="ISO 27001:2022"
                className="h-14 w-14 object-contain"
              />
            </div>
          </div>

          {columns.map((col) => (
            <div key={col.title}>
              <p className="mb-4 text-sm font-semibold text-foreground">
                {col.title}
              </p>
              <ul className="space-y-3">
                {col.links.map((link) => (
                  <li key={link.to}>
                    {link.action === "chat" ? (
                      <button
                        type="button"
                        onClick={() => window.dispatchEvent(new Event("amlbot-open-chat"))}
                        className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                      >
                        {link.label}
                      </button>
                    ) : link.action === "none" ? (
                      <span className="text-sm text-muted-foreground">{link.label}</span>
                    ) : (
                      <Link to={link.to} className="text-sm text-muted-foreground transition-colors hover:text-foreground">{link.label}</Link>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}

          <div>
            <p className="mb-4 text-sm font-semibold text-foreground">
              Social networks
            </p>
            <ul className="space-y-3">
              {socials.map((social) => (
                <li key={social.label}>
                  <a
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
                  >
                    <social.icon size={16} />
                    {social.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-4 border-t border-foreground/10 pt-8 text-sm text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} AMLBot</p>
          <div className="flex flex-wrap gap-6">
            <Link to="/support" className="hover:text-foreground">
              Support
            </Link>
            <Link to="/user-agreement" className="hover:text-foreground">
              User Agreement
            </Link>
            <Link to="/privacy-policy" className="hover:text-foreground">
              Privacy Policy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
