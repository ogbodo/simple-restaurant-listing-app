import React from 'react';
import 'semantic-ui-css/semantic.min.css'; //Import styles for semantic UI
import './App.css'; //Imports my own css file

//components
import RestaurantList from './components/RestaurantList';

function App() {
  return (
    <div className="App">
      <RestaurantList />
    </div>
  );
}

export default App;
