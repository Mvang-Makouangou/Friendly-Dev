import FeaturedProjects from "~/component/FeaturedProject";
import type { Route } from "./+types/index";
import type { Project } from "~/type";
import AboutPreview from "~/component/AboutPreview";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "The Friendly Dev | welcome" },
    { name: "description", content: "Custom website developp" },
  ];
}

export async function loader({
  request,
}: Route.LoaderArgs): Promise<{ projects: Project[] }> {
  const res = await fetch(`${import.meta.env.VITE_API_URL}/projects`);
  const data = await res.json();
  return { projects: data };
}

export default function HomePage({ loaderData }: Route.ComponentProps) {
  const { projects } = loaderData as { projects: Project[] };

  return (
    <>
      <FeaturedProjects projects={projects} count={2} />
      <AboutPreview />
    </>
  );
}
