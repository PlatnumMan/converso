import PaddingContainer from "@/components/layout/padding-container";
import PostList from "@/components/post/post-list.";
import siteConfig from "@/config/site";
import directus from "@/lib/directus";
import { Post } from "@/types/database";
import { notFound } from "next/navigation";
import { cache } from "react";

// Get categories
const getCategories = cache(async (categorySlug: string, locale: string) => {
  try {
    const category = await directus.items("category").readByQuery({
      filter: {
        slug: {
          _eq: categorySlug,
        },
      },
      fields: [
        "*",
        "translations.*",
        "posts.*",
        "posts.author.id",
        "posts.author.first_name",
        "posts.author.last_name",
        "posts.category.id",
        "posts.category.title",
        "posts.translations.*",
      ],
    });

    if (locale === "en") {
      return category?.data?.[0];
    } else {
      const fecthedCategory = category?.data?.[0];
      const localisedCategory = {
        ...fecthedCategory,
        title: fecthedCategory.translations[0].title,
        description: fecthedCategory.translations[0].description,
        posts: fecthedCategory.posts.map((post: any) => {
          return {
            ...post,
            title: post.translations[0].title,
            description: post.translations[0].description,
            body: post.translations[0].body,
            category: {
              ...post.category,
              title: fecthedCategory.translations[0].title,
              description: fecthedCategory.translations[0].description,
            },
          };
        }),
      };
      return localisedCategory;
    }
  } catch (error) {
    console.error(error);
    throw new Error("Something went wrong");
  }
});

// Generate Metadata Function
export const generateMetadata = async ({
  params: { category, lang },
}: {
  params: {
    category: string;
    lang: string;
  };
}) => {
  // Get Data from Directus
  const categoryData = await getCategories(category, lang);

  return {
    title: categoryData?.title,
    description: categoryData?.description,
    openGraph: {
      title: categoryData?.title,
      description: categoryData?.description,
      url: `${process.env.NEXT_PUBLIC_SITE_URL}/${lang}/${category}`,
      siteName: categoryData?.siteName,
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
      canonical: `${process.env.NEXT_PUBLIC_SITE_URL}/${category}`,
      languages: {
        "en-US": `${process.env.NEXT_PUBLIC_SITE_URL}/en/${category}`,
        "fr-FR": `${process.env.NEXT_PUBLIC_SITE_URL}/fr/${category}`,
      },
    },
  };
};

export const generateStaticParams = async () => {
  try {
    const categories = await directus.items("category").readByQuery({
      filter: {
        status: {
          _eq: "published",
        },
      },
      fields: ["slug"],
    });

    const params = categories?.data?.map((category) => {
      return {
        category: category.slug as string,
        lang: "en",
      };
    });

    const localisedParams = categories?.data?.map((category) => {
      return {
        category: category.slug as string,
        lang: "fr",
      };
    });

    const allParams = params?.concat(localisedParams ?? []);

    return allParams || [];
  } catch (error) {
    console.error(error);
    throw new Error("Failed to fetch categories");
  }
};

const Page = async ({
  params,
}: {
  params: {
    category: string;
    lang: string;
  };
}) => {
  const locale = params?.lang;
  const categorySlug = params?.category;

  const category = await getCategories(categorySlug, locale);

  if (!category) {
    return notFound();
  }

  const typeCorrectedCategory = category as unknown as {
    id: string;
    title: string;
    slug: string;
    description: string;
    posts: Post[];
  };

  return (
    <PaddingContainer>
      <div className="mb-10">
        <h1 className="text-4xl font-semibold">
          {typeCorrectedCategory?.title}
        </h1>
        <p className="text-lg text-neutral-600">
          {typeCorrectedCategory?.description}
        </p>
      </div>
      <PostList locale={locale} posts={typeCorrectedCategory.posts} />
    </PaddingContainer>
  );
};

export default Page;
