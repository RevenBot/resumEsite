import { useTranslation } from "react-i18next";
import { Link } from "wouter";

const Hero = () => {
  const { t } = useTranslation("pages");

  const scrollToAbout = () => {
    document.getElementById("about")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      id="hero"
      className="flex align-items-center justify-content-center min-h-screen surface-ground text-color px-4 py-6"
    >
      <div className="text-center max-w-3xl">
        <h1 className="text-5xl md:text-7xl font-bold mb-4 leading-tight">
          {t("heroTitle")}
        </h1>
        <p className="text-xl md:text-2xl mb-6 text-color-secondary">
          {t("heroSubtitle")}
        </p>
        <div className="flex flex-column md:flex-row gap-3 justify-content-center">
          <button
            type="button"
            className="p-button p-component p-button-lg p-button-outlined"
            onClick={scrollToAbout}
          >
            <i className="pi pi-arrow-down mr-2"></i>
            {t("heroCtaAbout")}
          </button>
          <Link
            href="/?force=3d"
            className="p-button p-component p-button-lg p-button-raised"
          >
            <i className="pi pi-compass mr-2"></i>
            {t("heroCta3d")}
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Hero;
