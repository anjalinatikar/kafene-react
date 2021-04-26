import './App.css';
import Login from './Pages/Login'
import { BrowserRouter as Router,Route, Switch, Redirect } from 'react-router-dom';
import Landing from './Pages/Landing'
import Topbar from './Components/Topbar'

function App() {
  return (
      <Router>
          <Topbar  />
          <Switch>
            <Route exact path = "/:user/landing" component = {Landing}/>
            <Route exact  path  = "/"  component  = {Login} />
          </Switch>
      </Router>
  );
}

export default App;
