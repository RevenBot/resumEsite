import Hero from "./Hero";
import AboutSection from "./AboutSection";
import SkillsSection from "./SkillsSection";
import ContactSection from "./ContactSection";

const HomePage2D = () => {
  const sections = [
    { id: "projects", label: "Projects" },
  ];

  return (
    <div className="homepage-2d flex flex-column min-h-screen surface-ground text-color">
      <Hero />
      <AboutSection />
      <SkillsSection />
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
      <ContactSection />
    </div>
  );
};

export default HomePage2D;
