import "./globals.css";
import { Inter } from "next/font/google";
import toast, { Toaster } from "react-hot-toast";

import Navigation from "@/components/navigation/navigation";
import Footer from "@/components/navigation/footer";
import { Metadata } from "next";
import getDicitionary from "@/lib/getDictionary";
import siteConfig from "@/config/site";

const inter = Inter({ subsets: ["latin"] });

export const generateMetadata = async ({
  params: { lang },
}: {
  params: { lang: string };
}) => {
  // Get the current language
  const dictionary = await getDicitionary(lang);

  return {
    title: {
      template: "%s | " + siteConfig.siteName,
      default: siteConfig.siteName,
    },
    description: dictionary.footer.description,
    openGraph: {
      title: siteConfig.siteName,
      description: siteConfig.description,
      url: `${process.env.NEXT_PUBLIC_SITE_URL}/${lang}`,
      siteName: siteConfig.siteName,
      images: [
        {
          url: `https://${process.env.NEXT_PUBLIC_SITE_URL}/opengraph-image.jpg`,
          width: 1200,
          height: 628,
        },
      ],
      locale: lang,
      type: "website",
    },
    alternates: {
      canonical: `${process.env.NEXT_PUBLIC_SITE_URL}`,
      languages: {
        "en-US": `${process.env.NEXT_PUBLIC_SITE_URL}/en`,
        "fr-FR": `${process.env.NEXT_PUBLIC_SITE_URL}/fr`,
      },
    },
  };
};

export default function RootLayout({
  children,
  params: { lang },
}: {
  children: React.ReactNode;
  params: { lang: string };
}) {
  return (
    <html lang={lang}>
      <body className={inter.className}>
        <Toaster />
        <Navigation locale={lang} />
        <div className="pt-10 min-h-[calc(100vh-300px)]">{children}</div>
        <Footer locale={lang} />
      </body>
    </html>
  );
}
