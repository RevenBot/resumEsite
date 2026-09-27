import { Route, Switch } from "wouter";
import Overlay from "./components/Overlay/Overlay";
import Background from "./components/background/Background";
import Test from "./components/Test/Test";
import HomePage from "./components/HomePage";
import HomePage2D from "./components/HomePage2D";
import pages from "./components/Frames/index";
import { useMemo } from "react";

export const App = () => {
  const pagesroutes = useMemo(() => pages, []);

  return (
    <>
      <Overlay />
      <Switch>
        <Route path="/" component={HomePage} />
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
