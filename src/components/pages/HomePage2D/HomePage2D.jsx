import Hero from "./Hero";
import AboutSection from "./AboutSection";
import SkillsSection from "./SkillsSection";
import ProjectsSection from "./ProjectsSection";
import ContactSection from "./ContactSection";
import "./HomePage2D.css";

const HomePage2D = () => {
  return (
    <div className="homepage-2d flex flex-column min-h-screen surface-ground text-color">
      <Hero />
      <AboutSection />
      <SkillsSection />
      <ProjectsSection />
      <ContactSection />
    </div>
  );
};

export default HomePage2D;
