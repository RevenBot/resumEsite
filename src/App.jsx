import { Route, Switch, useLocation } from "wouter";
import Overlay from "./components/Overlay/Overlay";
import Background from "./components/background/Background";
import Test from "./components/Test/Test";
import HomePage from "./components/HomePage";
import HomePage2D from "./components/HomePage2D";
import ModeToggle from "./components/HomePage2D/ModeToggle";
import pages from "./components/Frames/index";
import { useMemo } from "react";
import { useDevicePerformance } from "./hooks/useDevicePerformance";

const HomePageRoute = () => {
  const { tier } = useDevicePerformance();
  const [, setLocation] = useLocation();

  if (tier === "detecting") {
    return null;
  }

  const params = new URLSearchParams(window.location.search);
  if (params.get("force") === "3d") {
    return <HomePage />;
  }

  if (tier === "minimal" || tier === "low") {
    setLocation("/2d");
    return null;
  }

  return <HomePage />;
};

export const App = () => {
  const pagesroutes = useMemo(() => pages, []);

  return (
    <>
      <Overlay />
      <ModeToggle />
      <Switch>
        <Route path="/">
          <HomePageRoute />
        </Route>
        <Route path="/2d" component={HomePage2D} />

        {pagesroutes.map((item) => (
          <Route
            key={item.id}
            path={`/page/${item.relativeUrl}`}
            component={item.component}
          />
        ))}

        <Route path="/test/">
          <Test />
        </Route>
        <Route path="/test/:id">
          <Test />
        </Route>
        <Route path="/old/">
          <Background />
        </Route>

        <Route>404: No such page!</Route>
      </Switch>
    </>
  );
};

export default App;
