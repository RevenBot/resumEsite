import React, { useCallback, useEffect } from "react";
import {
  ReactTerminal,
  TerminalContext,
  TerminalContextProvider,
} from "react-terminal";
import useStore from "../../../context/mode/store";
import "./Terminal.css";
import Help from "./HelpCommand";
import ModeHelp from "./ModeHelp";
import InitCommand from "./InitCommand";
import GoToHelp from "./GoToHelp";
import { useLocation } from "wouter";
import TutoCommand from "./TutoCommand";
import { Accordion, AccordionTab } from "primereact/accordion";

function Terminal() {
  const { setBufferedContent, setTemporaryContent } =
    React.useContext(TerminalContext);

  const { updateMode, switchMode } = useStore((state) => state);

  const [, setLocation] = useLocation();

  const commands = {
    help: () => <Help />,
    mode: (mode) => {
      if (mode === "help") {
        return <ModeHelp />;
      }
      if (mode === "caos") {
        updateMode(true);
        return <>Set mode to caos</>;
      } else if (mode === "resume") {
        updateMode(false);
        return <>Set mode to resumE</>;
      } else {
        switchMode();
        return <>Switch mode</>;
      }
    },
    goto: (page) => {
      if (page === "help") {
        return <GoToHelp />;
      }
      if (page === "about-me") {
        setLocation("/page/about-me/");
        return <>goto about-me</>;
      } else if (page === "skills") {
        setLocation("/page/skills/");
        return <>goto skills</>;
      } else if (page === "contacts") {
        setLocation("/page/contacts/");
        return <>goto contacts</>;
      } else if (page === "index") {
        setLocation("/");
        return <>goto index</>;
      }
    },

    wait: async (timeout) => {
      setTemporaryContent("Waiting...");
      await new Promise((resolve) =>
        setTimeout(
          () => {
            resolve(void 0);
          },
          parseInt(timeout) * 10000,
        ),
      );
      return "Over!";
    },

    count_to: async (nb) => {
      setTemporaryContent("Counting...");
      nb = parseInt(nb);
      await Promise.all(
        new Array(nb).fill({}).map(
          (_, index) =>
            new Promise((resolve) => {
              const timer = setTimeout(() => {
                setBufferedContent((previous) => (
                  <>
                    {previous}
                    <span>{index + 1}</span>
                    {index + 1 < nb ? <br /> : ""}
                  </>
                ));
                clearTimeout(timer);
                resolve(void 0);
              }, index * 1000);
            }),
        ),
      );
      return (
        <>
          <br />
          Finished
        </>
      );
    },

    tuto: () => <TutoCommand />,
  };

  const init = useCallback(async () => {
    setBufferedContent(<InitCommand />);
  }, [setBufferedContent]);

  useEffect(() => {
    init();
  }, [init]);

  const welcomeMessage = (
    <span>
      {`Type "help" for all available commands.`} <br />
    </span>
  );

  return (
    <div className="absolute xl:top-0 xl:left-0 lg:top-0 lg:left-0 md:top-0 sm:top-0 top-0 sm:text-xs xl:w-4 lg:w-3 sm:w-12 w-12 z-1 h-15rem max-h-full">
      <Accordion activeIndex={0}>
        <AccordionTab contentStyle={{ padding: 0 }} header="Terminal">
          <div className="z-1 h-15rem max-h-full">
            <ReactTerminal
              showControlBar={false}
              showControlButtons={false}
              themes={{
                "my-custom-theme": {
                  themeBGColor: "var(--highlight-bg)",
                  themePromptColor: "var(--green-700)",
                  themeColor: "var(--highlight-text-color)",
                },
              }}
              theme="my-custom-theme"
              welcomeMessage={welcomeMessage}
              commands={commands}
              prompt={"➜"}
              defaultHandler={(command) => {
                return (
                  <div style={{ lineBreak: "anywhere" }}>
                    {command}: command not found
                  </div>
                );
              }}
            />
          </div>
        </AccordionTab>
      </Accordion>
    </div>
  );
}
export default function TerminalDemo() {
  return (
    <TerminalContextProvider>
      <Terminal />
    </TerminalContextProvider>
  );
}
