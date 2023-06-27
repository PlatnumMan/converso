import CtaCard from "@/components/elements/cta-card";
import PaddingContainer from "@/components/layout/padding-container";
import PostCard from "@/components/post/post-card";
import PostList from "@/components/post/post-list.";
import directus from "@/lib/directus";
import getDicitionary from "@/lib/getDictionary";
import { notFound } from "next/navigation";

export default async function Home({
  params,
}: {
  params: {
    lang: string;
  };
}) {
  const locale = params.lang || "en";

  const getAllPosts = async () => {
    try {
      const posts = await directus.items("post").readByQuery({
        fields: [
          "*",
          "author.id",
          "author.first_name",
          "author.last_name",
          "category.id",
          "category.title",
          "category.translations.*",
          "translations.*",
        ],
      });

      if (locale === "en") {
        return posts.data;
      } else {
        const localisedPost = posts.data?.map((post) => {
          return {
            ...post,
            title: post.translations[0].title,
            description: post.translations[0].description,
            body: post.translations[0].body,
            category: {
              id: post.category,
              title: post.category.translations[0].title,
            },
          };
        });
        return localisedPost;
      }
    } catch (error) {
      console.error(error);
      throw new Error("Failed to get posts");
    }
  };

  const posts = await getAllPosts();

  if (!posts) {
    notFound();
  }

  const dictionary = await getDicitionary(locale);

  return (
    <PaddingContainer>
      <main className="h-auto space-y-10">
        <PostCard post={posts[0]} locale={locale} />
        <PostList
          locale={locale}
          posts={posts.filter((_post, index) => index > 0 && index < 3)}
        />
        <CtaCard dictionary={dictionary} />
        <PostCard reverse post={posts[3]} locale={locale} />
        <PostList
          locale={locale}
          posts={posts.filter((_post, index) => index > 3 && index < 6)}
        />
      </main>
    </PaddingContainer>
  );
}
