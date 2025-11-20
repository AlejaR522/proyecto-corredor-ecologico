import { cn } from "@/lib/utils";
import Image from "next/image";

export function Logo({ className }: { className?: string }) {
  return (
    <Image
      src="/logo.svg"
      alt="Logo corredor ecológico"
      width={80}
      height={80}
      priority
      className={cn("h-auto w-10 object-cover", className)}
    />
  );
}
