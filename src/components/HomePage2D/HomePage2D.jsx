import Hero from "./Hero";

const HomePage2D = () => {
  const sections = [
    { id: "about", label: "About" },
    { id: "skills", label: "Skills" },
    { id: "projects", label: "Projects" },
    { id: "contact", label: "Contact" },
  ];

  return (
    <div className="homepage-2d flex flex-column min-h-screen surface-ground text-color">
      <Hero />
      {sections.map((section) => (
        <section
          key={section.id}
          id={section.id}
          className="flex align-items-center justify-content-center m-3 p-5 border-round surface-card border-1 border-300"
          style={{ minHeight: "60vh" }}
        >
          <h2 className="text-4xl font-bold m-0">{section.label}</h2>
        </section>
      ))}
    </div>
  );
};

export default HomePage2D;
