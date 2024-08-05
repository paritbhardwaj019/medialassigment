import { ALL_POSTS } from "@/constants";

export const getPostFromSlug = (slug: string) => {
  const post = ALL_POSTS.find((el) => el.slug === slug);

  return post ? post : null;
};
