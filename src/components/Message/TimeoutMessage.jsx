import { Button } from "@primereact/ui/button";
import { Dialog } from "@primereact/ui/dialog";
import { useEffect, useRef, useState } from "react";
import useStore from "../../context/mode/store";
import { useShallow } from "zustand/react/shallow";
import { useTranslation } from "react-i18next";

const TimeoutMessage = () => {
  const [visible, setVisible] = useState(false);
  const timeoutId = useRef(null);
  const { caosMode, updateMode } = useStore(useShallow((state) => state));
  const [position] = useState("top-right");
  const { t } = useTranslation("message");

  const OnClick = () => {
    setVisible(false);
    updateMode(false);
  };

  const footerContent = (
    <div>
      <Button onClick={OnClick} autoFocus>
        <i className="pi pi-angle-double-right" />
        Resume
      </Button>
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
      <Dialog.Root
        open={visible}
        position={position}
        style={{ width: "20vw" }}
        onOpenChange={() => {
          if (!visible) return;
          setVisible(false);
        }}
        draggable={false}
        resizable={false}
      >
        <Dialog.Content>
          <p className="m-0">{t("timeout-message")}</p>
        </Dialog.Content>
        <Dialog.Footer>{footerContent}</Dialog.Footer>
      </Dialog.Root>
    );
};

export default TimeoutMessage;
