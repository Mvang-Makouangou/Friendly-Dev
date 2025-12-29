import type { Project } from "~/type";
import type { Route } from "./+types";

export async function clientLoader({
  request,
  params,
}: Route.ClientLoaderArgs): Promise<Project> {
  const res = await fetch(`http://localhost:8000/projects/${params.id}`);

  if (!res.ok) throw new Response("Project not Found", { status: 404 });

  const project: Project = await res.json();

  return project;
}

export function HydrateFallback() {
  return <div>Loading...</div>;
}

const ProjectDetailPage = ({ loaderData }: Route.ComponentProps) => {
  const project = loaderData;
  console.log(project);
  return (
    <>
      <div>Projec</div>
    </>
  );
};

export default ProjectDetailPage;
