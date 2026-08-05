import { Link } from "react-router-dom";
import { Construction } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Placeholder({ title }: { title: string }) {
  return (
    <div className="container flex min-h-[60vh] flex-col items-center justify-center py-24 text-center">
      <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-accent text-primary">
        <Construction size={28} />
      </div>
      <h1 className="text-3xl font-bold text-foreground sm:text-4xl">
        {title}
      </h1>
      <Button asChild className="mt-8 rounded-full px-6">
        <Link to="/">Back to home</Link>
      </Button>
    </div>
  );
}
