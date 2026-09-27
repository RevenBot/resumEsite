import { useTranslation } from "react-i18next";

const AboutSection = () => {
  const { t } = useTranslation("pages");

  return (
    <section
      id="about"
      className="flex flex-column align-items-center justify-content-center m-3 p-5 border-round surface-card border-1 border-300"
      style={{ minHeight: "60vh" }}
    >
      <div className="flex flex-column md:flex-row align-items-center gap-4 max-w-4xl w-full">
        <div className="flex align-items-center justify-content-center surface-100 border-round-circle border-2 border-300" style={{ width: "150px", height: "150px", flexShrink: 0 }}>
          <i className="pi pi-user text-6xl text-500"></i>
        </div>
        <div className="flex flex-column gap-2 text-center md:text-left">
          <h2 className="text-4xl font-bold m-0">{t("aboutTitle")}</h2>
          <p className="text-xl text-600 m-0 line-height-3">{t("about-me")}</p>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
