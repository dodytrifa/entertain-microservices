import './App.css';
import Home from './pages/Home'
import Favorite from './pages/Favorite'
import AddMovie from './pages/AddMovie'
import UpdateMovie from './pages/UpdateMovie'
import Nav from './components/Navigation'
import {Switch, Route} from 'react-router-dom'
import { ApolloProvider } from '@apollo/client'
import client from './config/index'


function App() {
  return (
    <ApolloProvider client={client}>
      <div className="App">
        <Nav/ >
        <Switch>
          <Route exact path='/'>
            <Home />
            </Route>
        </Switch>
        <Switch>
          <Route path='/addmovie'>
            <AddMovie />
            </Route>
        </Switch>
        <Switch>
          <Route path='/updatemovie/:id'>
            <UpdateMovie />
            </Route>
        </Switch>
        <Switch>
          <Route path='/favorite'>
            <Favorite />
          </Route>
        </Switch>
      </div>
    </ApolloProvider>
  );
}

export default App;
