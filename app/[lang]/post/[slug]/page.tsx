import { DUMMY_POSTS } from "@/DUMMY_DATA";
import CtaCard from "@/components/elements/cta-card";
import SocialLink from "@/components/elements/social-link";
import PaddingContainer from "@/components/layout/padding-container";
import PostBody from "@/components/post/post-body";
import PostHero from "@/components/post/post-hero";
import siteConfig from "@/config/site";
import directus from "@/lib/directus";
import getDicitionary from "@/lib/getDictionary";
import { notFound } from "next/navigation";
import { cache } from "react";

// Get all posts
export const getPostData = cache(async (postSlug: string, locale: string) => {
  try {
    const post = await directus.items("post").readByQuery({
      filter: {
        slug: {
          _eq: postSlug,
        },
      },
      fields: [
        "*",
        "category.id",
        "category.title",
        "author.id",
        "author.first_name",
        "author.last_name",
        "translations.*",
        "category.translations.*",
      ],
    });

    const postData = post?.data?.[0] || {};

    if (locale === "en") {
      return postData;
    } else {
      const localisedPostData = {
        ...postData,
        title: postData?.translations?.[0]?.title,
        description: postData?.translations?.[0]?.description,
        body: postData?.translations?.[0]?.body,
        category: {
          ...postData?.category,
          title: postData?.category?.translations?.[0]?.title,
          description: postData?.category?.translations?.[0]?.description,
          body: postData?.category?.translations?.[0]?.body,
        },
      };

      return localisedPostData;
    }
  } catch (error) {
    console.error(error);
    throw new Error("Failed to get post data");
  }
});

// Generate metdata function
export const generateMetadata = async ({
  params: { slug, lang },
}: {
  params: {
    slug: string;
    lang: string;
  };
}) => {
  // Get post data from directus
  const postData = await getPostData(slug, lang);

  return {
    title: postData?.title,
    description: postData?.description,
    openGraph: {
      title: postData?.title,
      description: postData?.description,
      url: `${process.env.NEXT_PUBLIC_SITE_URL}/${lang}/post/${slug}`,
      siteName: postData?.title,
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
      canonical: `${process.env.NEXT_PUBLIC_SITE_URL}/post/${slug}`,
      languages: {
        "en-US": `${process.env.NEXT_PUBLIC_SITE_URL}/en/post/${slug}`,
        "fr-FR": `${process.env.NEXT_PUBLIC_SITE_URL}/fr/post/${slug}`,
      },
    },
  };
};

// Generate Static Params
export const generateStaticParams = async () => {
  try {
    const posts = await directus.items("post").readByQuery({
      filter: {
        status: {
          _eq: "published",
        },
      },
      fields: ["slug"],
    });

    const params = posts?.data?.map((post) => {
      return {
        slug: post.slug,
        lang: "en",
      };
    });

    const localisedParams = posts?.data?.map((post) => {
      return {
        slug: post.slug,
        lang: "fr",
      };
    });

    const allParams = params?.concat(localisedParams ?? []);

    return allParams || [];
  } catch (error) {
    console.error(error);
    throw new Error("Failed to generate static params");
  }
};

const Page = async ({
  params,
}: {
  params: {
    slug: string;
    lang: string;
  };
}) => {
  const locale = params.lang || "en";
  const postSlug = params.slug;

  const post = await getPostData(postSlug, locale);

  // Structure data for Google Analytics
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post?.title,
    image: `${process.env.NEXT_PUBLIC_ASSETS_URL}${post?.image}`,
    author: `${post?.author?.first_name} ${post?.author?.last_name}`,
    genre: post?.category?.title,
    publisher: siteConfig.siteName,
    url: `${process.env.NEXT_PUBLIC_SITE_URL}/post/${postSlug}`,
    datePublished: new Date(post?.date_created).toISOString(),
    dateCreated: new Date(post?.date_created).toISOString(),
    dateModified: new Date(post?.date_updated).toISOString(),
    description: post?.description,
    articleBody: post?.body,
  };

  if (!post) {
    notFound();
  }

  const dictionary = await getDicitionary(locale);

  return (
    <PaddingContainer>
      {/* Add JSON-LD to your page */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      {/* Container */}
      <div className="space-y-10">
        {/* Post Hero */}
        <PostHero post={post} locale={locale} />
        {/* Post Body And Social share */}
        <div className="flex flex-col md:flex-row gap-10">
          <div className="relative">
            <div className="sticky top-20 flex md:flex-col items-center gap-5">
              <div className="font-medium hidden md:hidden">Share</div>
              <SocialLink
                isShareURL
                platform="twitter"
                link={`https://twitter.com/intent/tweet?url=${`${process.env.NEXT_PUBLIC_SITE_URL}/post/${post.slug}`}&title=${
                  post.title
                }`}
              />
              <SocialLink
                isShareURL
                platform="linkedin"
                link={`https://www.linkedin.com/shareArticle?mini=true&url=${`${process.env.NEXT_PUBLIC_SITE_URL}/post/${post.slug}`}`}
              />
              <SocialLink
                isShareURL
                platform="facebook"
                link={`https://www.facebook.com/sharer/sharer.php?u=${`${process.env.NEXT_PUBLIC_SITE_URL}/post/${post.slug}`}`}
              />
            </div>
          </div>

          <PostBody body={post.body} />
        </div>
        {/* CTA Card */}
        <CtaCard dictionary={dictionary} />
      </div>
    </PaddingContainer>
  );
};

export default Page;
