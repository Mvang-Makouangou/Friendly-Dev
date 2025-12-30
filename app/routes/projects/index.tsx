import { useLoaderData } from "react-router";
import type { Route } from "./+types";
import type { Project } from "~/type";
import ProjectCard from "~/component/ProjectCard";
import { useState } from "react";

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

  // Pagination Button Render
  const renderPagination = () => (
    <div className="flex justify-center gap-2 mt-8 ">
      {Array.from({ length: totalPages }, (_, idx) => (
        <button
          key={idx + 1}
          className={`px-3 py-1 cursor-pointer rounded ${currentPage === idx + 1 ? "bg-blue-600 text-white" : "bg-gray-700 text-gray-200"}`}
          onClick={() => SetCurrentPage(idx + 1)}
        >
          {idx + 1}
        </button>
      ))}
    </div>
  );

  return (
    <>
      <h2 className="text-3xl font-bold text-white mb-8 ">Projects</h2>
      <div className="grid gap-6 sm:grid-cols-2 ">
        {currentProjects.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>
      {totalPages > 1 && renderPagination()}
    </>
  );
};

export default ProjectsPage;
