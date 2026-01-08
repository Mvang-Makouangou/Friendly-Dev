import type { PostMeta } from "~/type";
import type { Route } from "./+types";

export async function loader({
  request,
}: Route.LoaderArgs): Promise<{ posts: PostMeta }> {
  const url = new URL("/posts-meta.json", request.url);
  const res = await fetch(url.href);

  if (!res.ok) throw new Error("Failed to fetch data");

  const data = await res.json();

  return { posts: data };
}

const BlogPage = ({ loaderData }: Route.ComponentProps) => {
  const { posts } = loaderData;

  console.log(posts);
  return (
    <>
      <h1 className="text-3xl font-bold text-white mb-8">Blog Page Of MACK</h1>
    </>
  );
};

export default BlogPage;
