import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";

export default function Logo({ className }: { className?: string }) {
  return (
    <Link to="/" className={cn("flex items-center gap-2", className)}>
      <svg
        width="24"
        height="32"
        viewBox="0 0 24 32"
        fill="none"
        aria-hidden="true"
        className="shrink-0"
      >
        <path
          d="M12 1 21 6.2v19.6L12 31 3 25.8V6.2L12 1Z"
          fill="#1264E8"
        />
        <path
          d="M12 6.6 17.3 9.7v11.8L12 24.6l-5.3-3.1V9.7L12 6.6Z"
          fill="white"
        />
        <path
          d="m12 9.3 3.2 1.9v5.2L12 18.3l-3.2-1.9v-5.2L12 9.3Z"
          fill="#1264E8"
        />
      </svg>
      <span className="font-black text-[21px] leading-none tracking-[-0.04em] text-black">
        AMLBot
      </span>
    </Link>
  );
}
