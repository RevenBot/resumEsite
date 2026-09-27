import { Link, useLocation } from "wouter";
import { useTranslation } from "react-i18next";

const ModeToggle = () => {
  const [location] = useLocation();
  const { t } = useTranslation("pages");

  const is2D = location === "/2d";
  const targetPath = is2D ? "/?force=3d" : "/2d";
  const label = is2D ? t("toggle3d") : t("toggle2d");

  return (
    <div className="mode-toggle">
      <Link href={targetPath} className="mode-toggle__button" aria-label={label}>
        {label}
      </Link>
    </div>
  );
};

export default ModeToggle;
