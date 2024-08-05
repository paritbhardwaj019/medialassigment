"use client";

import { getPostFromSlug } from "@/lib/getPostFromSlug";
import { useParams, useRouter } from "next/navigation";
import { Tag } from "./tag";

export const Post = () => {
  const router = useRouter();

  const { slug } = useParams<{
    slug: string;
  }>();

  const post = getPostFromSlug(slug);

  if (!post) router.push("/");

  return (
    <main className="w-full max-w-screen-lg mx-auto py-10 h-full">
      <button
        className="border rounded-lg py-1 px-4 mb-6 hover:bg-gray-200/10"
        onClick={() => router.push("/")}
      >
        Back
      </button>

      <h1 className="text-5xl font-semibold">{post?.title}</h1>
      <hr className="my-6" />
      <p className="font-light">{post?.content}</p>
      <hr className="my-6" />
      <div className="flex items-center gap-2 flex-wrap mt-4">
        {post?.tags.map((el, index) => (
          <Tag key={index} tag={el} />
        ))}
      </div>
      <p className="text-xs mt-4">
        By <span className="underline ">{post?.author}</span>
      </p>
    </main>
  );
};
