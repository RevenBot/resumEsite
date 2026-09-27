import { useContext, useState } from "react";
import { Dropdown } from "primereact/dropdown";
import { PrimeReactContext } from "primereact/api";
import { useTranslation } from "react-i18next";

const ThemeSwitcher = () => {
  const [iconClassName, setIconClassName] = useState("pi-moon");
  const [theme, setTheme] = useState("dark");
  const { changeTheme } = useContext(PrimeReactContext);

  const { i18n } = useTranslation();
  const [selectedLang, setSelectedLang] = useState(i18n.language);

  const changeMyTheme = () => {
    const newTheme = theme === "dark" ? "light" : "dark";
    changeTheme(
      `lara-${theme}-purple`,
      `lara-${newTheme}-purple`,
      "theme-link",
      () => setTheme(newTheme),
    );
    setIconClassName((prevClasName) =>
      prevClasName === "pi-moon" ? "pi-sun" : "pi-moon",
    );
  };

  return (
    <div className="absolute top-0 right-0 flex xl:align-items-center lg:align-items-center align-items-end justify-content-end text-primary z-2 xl:flex-row lg:flex-row flex-column">
      <div className="">
        <Dropdown
          value={selectedLang}
          onChange={(e) => {
            setSelectedLang(e.value);
            i18n.changeLanguage(e.value);
          }}
          options={i18n.languages}
          placeholder="Select language"
          className="w-full md:w-14rem"
          pt={{
            root: {
              style: { background: " var(--highlight-bg)" },
            },
            panel: {
              style: { background: " var(--highlight-bg)" },
            },
          }}
        />
      </div>
      <div className="w-4rem h-4rem font-bold p-4 border-round">
        <i
          onClick={changeMyTheme}
          className={`dark:text-white pi ${iconClassName}`}
        />
      </div>
    </div>
  );
};

export default ThemeSwitcher;
