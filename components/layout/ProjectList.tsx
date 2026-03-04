import React, { useEffect, useState } from "react";
import ProjectCard from "../ProjectCard";
import arcoeResidencesLogo from "@/public/project-logo/ar-logo-white.png";
import arAerialView from "@/public/ar-aerial.png";
import ScrollReveal from "../ui/ScrollReveal";
import { developmentStage } from "@/lib/types";
import ProjectListSkeleton from "./skeleton/ProjectListSkeleton";
import Link from "next/link";

function ProjectList() {
  const [loading, setLoading] = useState(true);
  const [projects, setProjects] = useState([]);

  const fetchProjects = async () => {
    try {
      const response = await fetch("/api/projects");
      const data = await response.json();
      console.log("Projects fetched successfully:", data);
      setProjects(data);
    } catch (error) {
      console.error("Error fetching projects:", error);
      setProjects([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  const accentColor = {
    blue: "bg-linear-to-t from-primary to-blue-950",
    yellow: "bg-linear-to-t from-secondary to-yellow-600",
    amber: "bg-linear-to-t from-amber-800 to-amber-950",
    orange: "bg-linear-to-t from-orange-600 to-orange-950",
    green: "bg-linear-to-t from-green-600 to-green-950",
    purple: "bg-linear-to-t from-purple-600 to-purple-950",
    red: "bg-linear-to-t from-red-600 to-red-950",
    pink: "bg-linear-to-t from-pink-600 to-pink-950",
    brown: "bg-linear-to-t from-brown-600 to-brown-950",
    gray: "bg-linear-to-t from-gray-600 to-gray-950",
    black: "bg-linear-to-t from-black to-black-950",
    white: "bg-linear-to-t from-white to-white-950",
  };

  if (loading) {
    return <ProjectListSkeleton />;
  }

  return (
    <ScrollReveal className="w-full">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 items-center justify-center gap-4 w-full ">
        {projects.map((project: any) => (
          <Link key={project.id} href={`/projects/${project.id}`}>
            <ProjectCard
              projectImage={arAerialView}
              projectName={project.projectName}
              projectLocation={project.location}
              projectStatus={
                developmentStage[project.stage as keyof typeof developmentStage]
              }
              projectLogo={arcoeResidencesLogo}
              projectAccent={accentColor[project.accentColor as keyof typeof accentColor] ?? accentColor.blue}
            />
          </Link>
        ))}
      </div>
    </ScrollReveal>
  );
}

export default ProjectList;
