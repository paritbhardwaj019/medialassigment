import { ALL_POSTS } from "@/constants";
import { PostCard } from "./_components/post-card";

export default function () {
  return (
    <main className="w-full max-w-screen-lg mx-auto py-10 h-full">
      <h1 className="text-2xl font-medium">All Posts</h1>
      <div className="grid grid-cols-3 gap-4 mt-6">
        {ALL_POSTS.map((el) => (
          <PostCard key={el.id} {...el} />
        ))}
      </div>
    </main>
  );
}
