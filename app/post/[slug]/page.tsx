import { Post } from "@/app/_components/post";
import { getPostFromSlug } from "@/lib/getPostFromSlug";
import { Metadata } from "next";

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const slug = params.slug;

  const post = getPostFromSlug(slug);

  if (!post) return {};

  const openGraphImageUrl =
    process.env.NEXT_PUBLIC_SITE_URL +
    "/api/opengraph-image" +
    `?slug=${post.slug}`;

  return {
    title: post.title,
    description: post.content,
    authors: [{ name: post.author }],
    openGraph: {
      title: post.title,
      description: post.content.slice(0, 120),
      type: "article",
      url: process.env.NEXT_PUBLIC_SITE_URL + "/post/" + post.slug,
      images: [
        {
          url: openGraphImageUrl,
          width: 1200,
          height: 630,
          alt: post.title,
        },
      ],
    },
    twitter: {
      title: post.title,
      description: post.content.slice(0, 120),
      images: [openGraphImageUrl],
    },
  };
}

export default function PostPage() {
  return <Post />;
}
