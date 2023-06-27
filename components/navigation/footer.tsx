import siteConfig from "@/config/site";
import PaddingContainer from "../layout/padding-container";
import Link from "next/link";
import SocialLink from "../elements/social-link";
import getDicitionary from "@/lib/getDictionary";

const Footer = async ({ locale }: { locale: string }) => {
  const dictionary = await getDicitionary(locale);

  return (
    <div className="py-8 mt-10 border-t">
      <PaddingContainer>
        <div>
          <h2 className="text-3xl font-bold">{siteConfig.siteName}</h2>
          <p className="max-w-md mt-2 text-neutral-700 text-lg">
            {dictionary.footer.description}
          </p>
        </div>

        {/* Socials and etc... */}
        <div className="flex flex-wrap justify-between gap-4 mt-6">
          <div>
            <div className="font-medium text-lg">#sharetheknowledge</div>
            <div className="flex items-center gap-3 text-neutral-600 mt-2">
              <SocialLink
                platform="twitter"
                link={siteConfig.socialLinks.twitter}
              />
              <SocialLink
                platform="instagram"
                link={siteConfig.socialLinks.instagram}
              />
              <SocialLink
                platform="github"
                link={siteConfig.socialLinks.github}
              />
              <SocialLink
                platform="linkedin"
                link={siteConfig.socialLinks.linkedin}
              />
              <SocialLink
                platform="youtube"
                link={siteConfig.socialLinks.youtube}
              />
            </div>
          </div>
          <div>
            <div className="text-sm text-neutral-400">{dictionary.footer.CurrentlyAtText}</div>
            <div className="bg-white shadow-lg rounded-md py-2 px-3 flex items-center gap-2">
              <div className="bg-emerald-400 rounded-full w-2  h-2" />
              {siteConfig.currentlyAt}
            </div>
          </div>
        </div>
        {/* Bottom Part */}
        <div className="border-t py-3 flex items-center gap-4 flex-wrap justify-between mt-16">
          <div className="text-sm text-neutral-400">
            {dictionary.footer.rightsText} {new Date().getFullYear()}
          </div>
          <div className="text-sm">
            {dictionary.footer.creatorText}{" "}
            <Link
              className="underline underline-offset-4 text-blue-500"
              href={siteConfig.socialLinks.instagram}
            >
              @Fiston
            </Link>
          </div>
        </div>
      </PaddingContainer>
    </div>
  );
};

export default Footer;
