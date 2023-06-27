"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

const LangSwitcher = ({ locale }: { locale: string }) => {
  const targetLanguage = locale === "en" ? "fr" : "en";
  const pathname = usePathname();
  const redirectTarget = () => {
    if (!pathname) return "/";
    const segments = pathname.split("/");
    segments[1] = targetLanguage;
    return segments.join("/");
  };

  return (
    <Link
      className="font-semibold flex  items-center gap-1"
      locale={targetLanguage}
      href={redirectTarget()}
    >
      {targetLanguage === "en" ? "Français" : "English"}
    </Link>
  );
};

export default LangSwitcher;
