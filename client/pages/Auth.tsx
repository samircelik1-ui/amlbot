import { FormEvent, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ArrowRight, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import Logo from "@/components/site/Logo";

export default function Auth({ mode }: { mode: "login" | "signup" }) {
  const navigate = useNavigate();
  const isSignup = mode === "signup";
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError("");

    const storedAccount = localStorage.getItem("amlbot-demo-account");
    const account = storedAccount as string | null;

    if (!isSignup && account !== email.trim().toLowerCase()) {
      setError("We couldn't find an account registered with this email address. Please create an account before signing in.");
      return;
    }

    if (isSignup) {
      localStorage.setItem(
        "amlbot-demo-account",
        email.trim().toLowerCase(),
      );
      localStorage.setItem("amlbot-demo-user", JSON.stringify({ email: email.trim().toLowerCase(), name }));
    } else if (!localStorage.getItem("amlbot-demo-user")) {
      localStorage.setItem("amlbot-demo-user", JSON.stringify({ email: email.trim().toLowerCase() }));
    }

    window.dispatchEvent(new Event("amlbot-auth-changed"));
    navigate("/");
  };

  return (
    <div className="min-h-[70vh] bg-gradient-to-b from-[#eaf4ff] to-background px-4 py-16 sm:py-24">
      <div className="mx-auto max-w-md">
        <div className="mb-8 flex justify-center">
          <Logo />
        </div>
        <div className="rounded-3xl border border-white/80 bg-white p-7 shadow-xl sm:p-9">
          <div className="mb-7 flex items-start justify-between gap-4">
            <div>
              <h1 className="mt-2 text-2xl font-extrabold text-foreground">
                {isSignup ? "Create your account" : "Welcome back"}
              </h1>
              <p className="mt-2 text-sm text-muted-foreground">
                {isSignup ? "Start exploring AMLBot compliance tools." : "Sign in to continue to your AMLBot workspace."}
              </p>
            </div>
            <ShieldCheck className="shrink-0 text-primary" size={28} />
          </div>

          {submitted ? (
            <div className="rounded-2xl bg-emerald-50 p-5 text-sm text-emerald-700">
              {isSignup ? "Your account has been created successfully." : "Your account has been connected successfully."}
              <Button onClick={() => navigate("/")} className="mt-5 w-full rounded-full">
                Continue to homepage
              </Button>
            </div>
          ) : (
            <>
              {error && (
                <div className="mb-4 rounded-xl border border-amber-200 bg-amber-50 p-4 text-sm leading-relaxed text-amber-800">
                  <p className="font-semibold">Account not found</p>
                  <p className="mt-1">{error}</p>
                  <Link to="/create-account" className="mt-3 inline-block font-bold text-primary hover:underline">
                    Create an account
                  </Link>
                </div>
              )}
              <form onSubmit={handleSubmit} className="space-y-4">
              {isSignup && (
                <label className="block text-sm font-semibold text-foreground">
                  Full name
                  <input required value={name} onChange={(event) => setName(event.target.value)} className="mt-2 h-11 w-full rounded-xl border border-border px-3 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/15" />
                </label>
              )}
              <label className="block text-sm font-semibold text-foreground">
                Email address
                <input required type="email" value={email} onChange={(event) => setEmail(event.target.value)} className="mt-2 h-11 w-full rounded-xl border border-border px-3 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/15" />
              </label>
              <label className="block text-sm font-semibold text-foreground">
                Password
                <input required minLength={6} type="password" value={password} onChange={(event) => setPassword(event.target.value)} className="mt-2 h-11 w-full rounded-xl border border-border px-3 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/15" />
              </label>
              <Button type="submit" className="w-full rounded-full py-5">
                {isSignup ? "Create account" : "Log in"}
                <ArrowRight size={16} className="ml-2" />
              </Button>
            </form>
            </>
          )}

          <p className="mt-6 text-center text-sm text-muted-foreground">
            {isSignup ? "Already have an account?" : "Don't have an account?"}{" "}
            <Link to={isSignup ? "/login" : "/create-account"} className="font-semibold text-primary hover:underline">
              {isSignup ? "Log in" : "Create account"}
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
