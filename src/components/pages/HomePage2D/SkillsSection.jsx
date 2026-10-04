import { useTranslation } from "react-i18next";

const skillCategories = [
  {
    label: "Frontend",
    skills: [
      { id: "html", name: "HTML" },
      { id: "css", name: "CSS" },
      { id: "javascript", name: "JavaScript" },
      { id: "react", name: "React" },
      { id: "blazor", name: "Blazor" },
    ],
  },
  {
    label: "Backend",
    skills: [
      { id: "cs", name: "C#" },
      { id: "python", name: "Python" },
      { id: "dotnet", name: ".NET" },
      { id: "django", name: "Django" },
      { id: "graphql", name: "GraphQL" },
      { id: "restapi", name: "REST API" },
    ],
  },
  {
    label: "Database",
    skills: [
      { id: "mysql", name: "MySQL" },
      { id: "postgresql", name: "PostgreSQL" },
    ],
  },
];

const SkillsSection = () => {
  const { t } = useTranslation("pages");

  return (
    <section
      id="skills"
      className="flex flex-column align-items-center justify-content-center m-3 p-5 border-round surface-card border-1 border-300"
      style={{ minHeight: "60vh" }}
    >
      <div className="flex flex-column align-items-center gap-4 max-w-4xl w-full">
        <h2 className="text-4xl font-bold m-0">{t("skillsTitle")}</h2>
        <p className="text-xl text-600 m-0 text-center line-height-3">{t("skills")}</p>
        <div className="flex flex-column gap-4 w-full">
          {skillCategories.map((category) => (
            <div key={category.label} className="flex flex-column gap-2">
              <h3 className="text-xl font-semibold m-0 text-500">{category.label}</h3>
              <div className="flex flex-wrap gap-2">
                {category.skills.map((skill) => (
                  <div
                    key={skill.id}
                    className="flex align-items-center gap-2 surface-100 border-round border-1 border-300 px-3 py-2"
                  >
                    <img
                      src={`https://skillicons.dev/icons?i=${skill.id}`}
                      alt={skill.name}
                      className="w-2rem h-2rem"
                      style={{ objectFit: "contain" }}
                    />
                    <span className="text-sm font-medium">{skill.name}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SkillsSection;
