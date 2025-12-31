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

  const [selectedCategory, setSelectedCategory] = useState("All");
  const [currentPage, SetCurrentPage] = useState(1);
  const projectPerPage = 10;

  //Get unique categories
  const categories = [
    "All",
    ...new Set(projects.map((project) => project.category)),
  ];

  console.log(categories);

  // Filter project based  on the category
  const filteredProjects =
    selectedCategory === "All"
      ? projects
      : projects.filter((project) => project.category === selectedCategory);

  //Calculate total Pages
  const totalPages = Math.ceil(filteredProjects.length / projectPerPage);

  //Get Current Page Project
  const indexOfLast = currentPage * projectPerPage;
  const indexOfFirst = indexOfLast - projectPerPage;
  const currentProjects = filteredProjects.slice(indexOfFirst, indexOfLast);

  return (
    <>
      <h2 className="text-3xl font-bold text-white mb-8 ">Projects</h2>
      <div className="flex flex-wrap gap-2 mb-8">
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => {
              setSelectedCategory(category);
              SetCurrentPage(1);
            }}
            className={` cursor-pointer px-3 py-1 rounded text-sm ${
              selectedCategory === category
                ? "bg-blue-600 text-white"
                : "bg-gray-700 text-gray-200"
            } `}
          >
            {category}
          </button>
        ))}
      </div>
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
