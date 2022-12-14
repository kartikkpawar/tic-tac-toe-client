import { BrowserRouter, Route, Switch } from "react-router-dom";
import Gamepage from "./Pages/Game/GamePage";
import Homepage from "./Pages/Home/HomePage";

const App = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={Homepage} />
        <Route exact path="/game/:gameId" component={Gamepage} />
      </Switch>
    </BrowserRouter>
  );
};

export default App;
