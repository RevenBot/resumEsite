import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import { useEffect, useRef, useState } from "react";
import useStore from "../../context/mode/store";
import { useTranslation } from "react-i18next";

const TimeoutMessage = () => {
  const [visible, setVisible] = useState(false);
  const timeoutId = useRef(null);
  const { caosMode, updateMode } = useStore((state) => state);
  const [position] = useState("top-right");
  const { t } = useTranslation("message");

  const OnClick = () => {
    setVisible(false);
    updateMode(false);
  };

  const footerContent = (
    <div>
      <Button
        label="Resume"
        icon="pi pi-angle-double-right"
        onClick={OnClick}
        autoFocus
      />
    </div>
  );

  useEffect(() => {
    if (caosMode) {
      timeoutId.current = setTimeout(() => {
        setVisible(true);
      }, 10000);
    }
    return () => clearTimeout(timeoutId);
  }, [timeoutId, caosMode]); // Empty dependency array ensures the effect runs only once

  if (caosMode)
    return (
      <Dialog
        visible={visible}
        position={position}
        style={{ width: "20vw" }}
        onHide={() => {
          if (!visible) return;
          setVisible(false);
        }}
        draggable={false}
        resizable={false}
        footer={footerContent}
      >
        <p className="m-0">{t("timeout-message")}</p>
      </Dialog>
    );
};

export default TimeoutMessage;
