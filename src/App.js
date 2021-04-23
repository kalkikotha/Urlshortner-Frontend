import './App.css'
import Login from "./components/login"
import Home from './components/dashboard';
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect
} from "react-router-dom";

function App() {
  return (
    <Router>
      <Switch>
        <Redirect from="/" to="/login" exact={true}/>
        <Route path="/login" component={Login} exact={true}></Route>
        <Route path="/dashboard/:id" component={Home} exact={true}></Route>
      </Switch>
    </Router>
  )
}

export default App;
