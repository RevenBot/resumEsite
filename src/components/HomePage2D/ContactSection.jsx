import { useTranslation } from "react-i18next";

const ContactSection = () => {
  const { t } = useTranslation("pages");

  const contacts = [
    {
      label: "LinkedIn",
      href: "https://www.linkedin.com/in/kevin-de-jesus-sinchi-soto",
      icon: "pi-linkedin",
    },
    {
      label: "GitHub",
      href: "https://github.com/RevenBot",
      icon: "pi-github",
    },
    {
      label: "revenbot@proton.me",
      href: "mailto:revenbot@proton.me",
      icon: "pi-envelope",
    },
  ];

  return (
    <section
      id="contact"
      className="flex flex-column align-items-center justify-content-center m-3 p-5 border-round surface-card border-1 border-300"
      style={{ minHeight: "60vh" }}
    >
      <div className="flex flex-column align-items-center gap-3 max-w-3xl w-full text-center">
        <h2 className="text-4xl font-bold m-0">{t("contactTitle")}</h2>
        <p className="text-xl text-600 m-0">{t("contacts")}</p>
        <div className="flex flex-wrap justify-content-center gap-3 mt-3">
          {contacts.map((contact) => (
            <a
              key={contact.label}
              href={contact.href}
              target="_blank"
              rel="noopener noreferrer"
              className="flex align-items-center gap-2 p-3 border-round surface-100 border-1 border-300 no-underline text-color hover:surface-200 transition-duration-200"
            >
              <i className={`pi ${contact.icon} text-xl`}></i>
              <span className="text-lg">{contact.label}</span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
