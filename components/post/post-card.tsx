import { Post } from "@/types/database";
import Image from "next/image";
import Link from "next/link";
import PostContent from "./post-content";
import getDicitionary from "@/lib/getDictionary";

interface PostProps {
  post: Post;
  layout?: "vertical" | "horizontal";
  reverse?: boolean;
  locale: string;
}

const PostCard = ({
  post,
  layout = "horizontal",
  reverse = false,
  locale,
}: PostProps) => {
  return (
    <Link
      className={`@container ${
        layout === "horizontal"
          ? "grid items-center grid-cols-1 md:grid-cols-2 gap-10 "
          : "space-y-10"
      }  `}
      href={`/${locale}/post/${post.slug}`}
    >
      {/* Post image */}
      <Image
        className={`rounded-md w-full object-cover object-center h-full max-h-[300px] ${
          reverse ? "md:order-last" : ""
        }`}
        src={`${process.env.NEXT_PUBLIC_ASSETS_URL}${post.image}?key=optimised`}
        width={600}
        height={300}
        alt={post.title}
      />
      {/* Post Content */}
      <PostContent post={post} locale={locale} />
    </Link>
  );
};

export default PostCard;
