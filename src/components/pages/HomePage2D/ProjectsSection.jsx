import { useTranslation } from "react-i18next";
import pages from "../../../data/pages";

const projectPages = pages.filter((page) => page.bookType === "book");

const projectImages = {
  "project-memories": "/img/projects/memories/home.png",
  "project-wordlesolver": "/img/projects/wordle-solver/main.png",
  "project-resume": "/img/projects/resume/frame.png",
};

const ProjectsSection = () => {
  const { t } = useTranslation("pages");

  return (
    <section
      id="projects"
      className="flex flex-column align-items-center justify-content-center m-3 p-5 border-round surface-card border-1 border-300"
      style={{ minHeight: "60vh" }}
    >
      <div className="flex flex-column align-items-center gap-4 max-w-4xl w-full">
        <h2 className="text-4xl font-bold m-0">{t("projectsTitle")}</h2>
        <div className="flex flex-column gap-4 w-full">
          {projectPages.map((project) => (
            <div
              key={project.id}
              className="flex flex-column md:flex-row gap-3 surface-100 border-round border-1 border-300 p-3"
            >
              {projectImages[project.stringLocalize] && (
                <img
                  src={projectImages[project.stringLocalize]}
                  alt={project.name}
                  className="border-round w-full md:w-15rem h-10rem"
                  style={{ objectFit: "cover" }}
                />
              )}
              <div className="flex flex-column gap-2 flex-1">
                <h3 className="text-xl font-semibold m-0">{project.name}</h3>
                <p className="text-600 m-0 line-height-3">{t(project.stringLocalize)}</p>
                <a
                  href={project.linkButton}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex align-items-center gap-2 no-underline text-primary hover:text-primary-300 transition-duration-200 mt-auto"
                >
                  <i className="pi pi-github" />
                  <span>View on GitHub</span>
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;
