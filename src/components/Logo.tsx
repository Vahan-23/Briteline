import Image from "next/image";
import Link from "next/link";

type LogoProps = {
  className?: string;
  priority?: boolean;
};

export function Logo({ className = "h-12 md:h-14", priority = false }: LogoProps) {
  return (
    <Link href="/" className="inline-flex shrink-0 items-center rounded-sm">
      <Image
        src="/images/logo-trimmed.png"
        alt="Briteline Ltd"
        width={368}
        height={239}
        priority={priority}
        className={`${className} w-auto`}
      />
    </Link>
  );
}
