import type { Route } from "./+types/index";
import FeaturedProjects from "~/components/FeaturedProjects";
import AboutPreview from "~/components/AboutPreview";
import type {
  Project,
  StrapiPost,
  StrapiProject,
  StrapiResponse,
} from "~/type";
import type { Post } from "~/type";
import LatestPosts from "~/components/LatestPost";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "The Friendly Dev | Welcome" },
    { name: "slug", content: "Custom Website developement!" },
  ];
}

// export async function loader({
//   request,
// }: Route.LoaderArgs): Promise<{ projects: Project[]; posts: Post[] }> {
//   const url = new URL(request.url);

//   const [projectsRes, postRes] = await Promise.all([
//     fetch(
//       `${import.meta.env.VITE_API_URL}/projects?filters[featured][$eq]=true&populate=*`,
//     ),
//     fetch(`${import.meta.env.VITE_API_URL}/posts?sort[0]=date:desc&populate=*`),
//   ]);

//   if (!projectsRes.ok || !postRes.ok) {
//     throw new Error("Failed to fetch projects or posts");
//   }

//   const projectJson: StrapiResponse<StrapiProject> = await projectsRes.json();
//   const postJson: StrapiResponse<StrapiPost> = await postRes.json();

//   const projects = projectJson.data.map((item) => ({
//     id: item.id,
//     documentId: item.documentId,
//     title: item.title,
//     description: item.description,
//     image: item.image?.url ? `${item.image.url}` : "/images/no-image.png",
//     url: item.url,
//     date: item.date,
//     category: item.category,
//     featured: item.featured,
//   }));

//   const posts = postJson.data.map((item) => ({
//     id: item.id,
//     title: item.title,
//     slug: item.slug,
//     excerpt: item.excerpt,
//     body: item.body,
//     image: item.image?.url ? `${item.image.url}` : "/images/no-image.png",
//     date: item.date,
//   }));

//   return { projects, posts };
// }

export async function loader(): Promise<{
  projects: Project[];
  posts: Post[];
}> {
  try {
    const API_URL = process.env.API_URL || import.meta.env.VITE_API_URL;

    const [projectsRes, postRes] = await Promise.all([
      fetch(`${API_URL}/projects?filters[featured][$eq]=true&populate=*`),
      fetch(`${API_URL}/posts?sort[0]=date:desc&populate=*`),
    ]);

    const projectJson: StrapiResponse<StrapiProject> = projectsRes.ok
      ? await projectsRes.json()
      : { data: [] };

    const postJson: StrapiResponse<StrapiPost> = postRes.ok
      ? await postRes.json()
      : { data: [] };

    const projects: Project[] = Array.isArray(projectJson.data)
      ? projectJson.data.map((item: StrapiProject) => ({
          id: item.id,
          documentId: item.documentId,
          title: item.title,
          description: item.description,
          image: item.image?.url ?? "/images/no-image.png",
          url: item.url,
          date: item.date,
          category: item.category,
          featured: item.featured,
        }))
      : [];

    const posts: Post[] = Array.isArray(postJson.data)
      ? postJson.data.map((item: StrapiPost) => ({
          id: item.id,
          title: item.title,
          slug: item.slug,
          excerpt: item.excerpt,
          body: item.body,
          image: item.image?.url ?? "/images/no-image.png",
          date: item.date,
        }))
      : [];

    return { projects, posts };
  } catch (error) {
    console.error("Home loader error:", error);
    return { projects: [], posts: [] };
  }
}

const HomePage = ({ loaderData }: Route.ComponentProps) => {
  const { projects, posts } = loaderData;

  console.log(projects, posts);

  return (
    <>
      <FeaturedProjects projects={projects} count={2} />
      <AboutPreview />
      <LatestPosts posts={posts} />
    </>
  );
};

export default HomePage;
