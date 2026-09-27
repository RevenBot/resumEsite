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
      className="flex align-items-center justify-content-center min-h-screen surface-900 text-white px-4 py-6"
    >
      <div className="text-center max-w-3xl">
        <h1 className="text-5xl md:text-7xl font-bold mb-4 leading-tight">
          {t("heroTitle")}
        </h1>
        <p className="text-xl md:text-2xl mb-6 text-300">
          {t("heroSubtitle")}
        </p>
        <div className="flex flex-column md:flex-row gap-3 justify-content-center">
          <button
            type="button"
            className="p-button p-component p-button-lg p-button-outlined text-white border-white"
            onClick={scrollToAbout}
          >
            <i className="pi pi-arrow-down mr-2"></i>
            {t("heroCtaAbout")}
          </button>
          <Link
            href="/?force=3d"
            className="p-button p-component p-button-lg p-button-raised text-white bg-purple-600 border-purple-600 hover:bg-purple-700 hover:border-purple-700"
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
