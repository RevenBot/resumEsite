import { useState } from "react";
import { Select } from "@primereact/ui/select";
import { useTranslation } from "react-i18next";

const ThemeSwitcher = () => {
  const [iconClassName, setIconClassName] = useState("pi-moon");
  const [theme, setTheme] = useState("dark");

  const { i18n } = useTranslation();
  const [selectedLang, setSelectedLang] = useState(i18n.language);

  const changeMyTheme = () => {
    const newTheme = theme === "dark" ? "light" : "dark";
    document.documentElement.classList.toggle("my-app-dark");
    setTheme(newTheme);
    setIconClassName((prevClasName) =>
      prevClasName === "pi-moon" ? "pi-sun" : "pi-moon",
    );
  };

  const langOptions = i18n.languages.map((lang) => ({
    label: lang,
    value: lang,
  }));

  return (
    <div className="absolute top-0 right-0 flex xl:align-items-center lg:align-items-center align-items-end justify-content-end text-primary z-2 xl:flex-row lg:flex-row flex-column">
      <div className="">
        <Select.Root
          value={selectedLang}
          options={langOptions}
          optionLabel="label"
          optionValue="value"
          onValueChange={(e) => {
            setSelectedLang(e.value);
            i18n.changeLanguage(e.value);
          }}
          pt={{
            trigger: {
              style: { background: " var(--highlight-bg)" },
            },
            popup: {
              style: { background: " var(--highlight-bg)" },
            },
          }}
        >
          <Select.Trigger className="w-full md:w-14rem">
            <Select.Value placeholder="Select language" />
          </Select.Trigger>
          <Select.Portal>
            <Select.Positioner>
              <Select.Popup>
                <Select.List />
              </Select.Popup>
            </Select.Positioner>
          </Select.Portal>
        </Select.Root>
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
