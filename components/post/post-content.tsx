import getDicitionary from "@/lib/getDictionary";
import { getReadingTime, getRelativeDate } from "@/lib/helpers";
import { Post } from "@/types/database";
import { ArrowRight, ShieldCheck } from "lucide-react";

interface PostContentProps {
  post: Post;
  isPostPage?: boolean;
  locale: string;
}

const PostContent = async ({
  post,
  isPostPage = false,
  locale,
}: PostContentProps) => {
  const dictionary = await getDicitionary(locale);

  return (
    <div className="space-y-2">
      {/* Tags */}
      <div
        className={` flex gap-2 flex-wrap items-center text-neutral-400 ${
          isPostPage ? "text-sm" : "@md:text-sm text-xs"
        }`}
      >
        <div
          className={`font-medium ${
            post.category.title === "Programming"
              ? "text-green-500"
              : "text-red-500"
          }`}
        >
          {post.category.title.toLocaleUpperCase()}
        </div>
        <div className="w-2 h-2 rounded-full bg-neutral-200" />
        <div>{`${post.author.first_name}`}</div>
        {/* Admin Badge */}
        <div className="bg-purple-950/70 text-white rounded-md py-2 px-3 flex items-center w-50 gap-1">
          <ShieldCheck size={17} /> {dictionary.buttons.Adminstrator}
        </div>
        <div className="w-2 h-2 rounded-full bg-neutral-200" />
        <div>{getReadingTime(post.body, locale)}</div>
        <div className="w-2 h-2 rounded-full bg-neutral-200" />
        <div>{getRelativeDate(post.date_created, locale)}</div>
      </div>
      {/* Title */}
      <h2
        className={`${
          isPostPage
            ? "text-2xl md:text-3xl lg:text-4xl font-bold"
            : "@lg:text-3xl text-xl md:text-2xl font-medium"
        } `}
      >
        {post.title}
      </h2>
      {/* Body */}
      <p className="text-base @lg:text-lg text-neutral-600 leading-snug">
        {post.description}
      </p>
      {!isPostPage && (
        <div className="flex items-center gap-2 pt-3">
          {dictionary.buttons.readMore} <ArrowRight size={14} />
        </div>
      )}
    </div>
  );
};

export default PostContent;
