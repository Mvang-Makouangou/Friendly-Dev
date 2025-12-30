import { useLoaderData } from "react-router";
import type { Route } from "./+types";
import type { Project } from "~/type";
import ProjectCard from "~/component/ProjectCard";
import { useState } from "react";
import Pagination from "~/component/Pagination";

export async function loader({
  request,
}: Route.LoaderArgs): Promise<{ projects: Project[] }> {
  const res = await fetch("http://localhost:8000/projects");
  const data = await res.json();
  return { projects: data };
}

const ProjectsPage = ({ loaderData }: Route.ComponentProps) => {
  const { projects } = loaderData as { projects: Project[] };

  const [currentPage, SetCurrentPage] = useState(1);
  const projectPerPage = 2;

  //Calculate total Pages
  const totalPages = Math.ceil(projects.length / projectPerPage);

  //Get Current Page Project
  const indexOfLast = currentPage * projectPerPage;
  const indexOfFirst = indexOfLast - projectPerPage;
  const currentProjects = projects.slice(indexOfFirst, indexOfLast);

  return (
    <>
      <h2 className="text-3xl font-bold text-white mb-8 ">Projects</h2>
      <div className="grid gap-6 sm:grid-cols-2 ">
        {currentProjects.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>
      <Pagination
        totalPages={totalPages}
        currentPage={currentPage}
        onPageChange={SetCurrentPage}
      />
    </>
  );
};

export default ProjectsPage;
