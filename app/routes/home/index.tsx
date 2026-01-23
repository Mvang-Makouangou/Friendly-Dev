import { useEffect } from "react";
import type { Route } from "./+types/index";
import FeaturedProjects from "~/components/FeaturedProjects";
import AboutPreview from "~/components/AboutPreview";
import type { Project, StrapiProject, StrapiResponse } from "~/type";
import type { PostMeta } from "~/type";
import LatestPosts from "~/components/LatestPost";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "The Friendly Dev | Welcome" },
    { name: "description", content: "Custom Website developement!" },
  ];
}

export async function loader({
  request,
}: Route.LoaderArgs): Promise<{ projects: Project[]; posts: PostMeta[] }> {
  const url = new URL(request.url);

  const [projectsRes, postRes] = await Promise.all([
    fetch(
      `${import.meta.env.VITE_API_URL}/projects?filters[featured][$eq]=true&populate=*`,
    ),
    fetch(new URL("posts-meta.json", url)),
  ]);

  if (!projectsRes.ok || !postRes.ok) {
    throw new Error("Failed to fetch projects or posts");
  }

  // const [projectsJson, posts] = await Promise.all([
  //   projectsRes.json(),
  //   postRes.json(),
  // ]);

  const projectJson: StrapiResponse<StrapiProject> = await projectsRes.json();
  const postJson = await postRes.json();

  const projects = projectJson.data.map((item) => ({
    id: item.id,
    documentId: item.documentId,
    title: item.title,
    description: item.description,
    image: item.image?.url
      ? `${import.meta.env.VITE_STRAPI_URL}${item.image.url}`
      : "/images/no-image.png",
    url: item.url,
    date: item.date,
    category: item.category,
    featured: item.featured,
  }));

  // const projects: Project[] = (projectsJson.data ?? []).map((item: any) => ({
  //   id: item.id,
  //   documentId: item.documentId,
  //   title: item.title,
  //   description: item.description,
  //   image: item.image?.url
  //     ? `${import.meta.env.VITE_STRAPI_URL}${item.image.url}`
  //     : "/images/no-image.png",
  //   url: item.url,
  //   date: item.date,
  //   category: item.category,
  //   featured: item.featured,
  // }));

  return { projects, posts: postJson };
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
