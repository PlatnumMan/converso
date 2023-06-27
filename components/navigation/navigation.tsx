import Link from "next/link";

import PaddingContainer from "../layout/padding-container";
import getDicitionary from "@/lib/getDictionary";
import LangSwitcher from "./lang-switcher";

const Navigation = async ({ locale }: { locale: string }) => {
  const dictionary = await getDicitionary(locale);
  return (
    <div className="border-b shadow-md sticky top-0 z-[999] left-0 right-0 bg-white bg-opacity-50 backdrop-blur-md">
      <PaddingContainer>
        <div className="py-5 flex items-center justify-between">
          <Link className="font-bold text-lg" href={`/${locale}`}>
            Converso
          </Link>
          {/* Categories Links */}
          <nav>
            <ul className="flex items-center gap-4 text-neutral-600">
              <li>
                <LangSwitcher locale={locale} />
              </li>
              <li>
                <Link href={`/${locale}/programming`}>
                  {dictionary.navigation.links.programming}
                </Link>
              </li>
              <li>
                <Link href={`/${locale}/experiences`}>
                  {dictionary.navigation.links.experience}
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      </PaddingContainer>
    </div>
  );
};

export default Navigation;
