import { useLoaderData } from "react-router";
import type { Route } from "./+types";

export async function loader({ request }: Route.LoaderArgs): Promise<any> {
  const res = await fetch("http://localhost:8000/projects");
  const data = await res.json();
  return { projects: data };
}

const ProjectsPage = ({ loaderData }: Route.ComponentProps) => {
  const { projects } = loaderData;
  console.log(projects);
  return (
    <>
      <h1 className="text-3xl font-bold text-white mb-8 ">Project Page</h1>
    </>
  );
};

export default ProjectsPage;
