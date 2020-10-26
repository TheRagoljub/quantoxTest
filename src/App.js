import './App.css';
import AddEditCard from './components/AddCard';
import MyCards from './components/MyCards';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom'; 

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path='/cards/add' >
          <AddEditCard />
        </Route>
        <Route path='/cards/:id/edit' component={AddEditCard}>
          <AddEditCard />
        </Route>
        <Route path='/cards' >
          <MyCards />
        </Route>
        <Redirect from='/' to='/cards' />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
