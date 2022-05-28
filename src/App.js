import {useEffect, useState} from 'react';
import Forecast from "./components/Forecast/Forecast";
import React from "react";
import './App.css'
import Logo from './components/Logo/Logo';


function App() {
  const [gif, setGif] = useState();
  
  return (
    <div className="App">
      <header className="App-header" style={{backgroundImage: `url(${gif})`}}>
        <h1>React Weather App</h1>
      </header>
      <main>
        <Forecast setGif={setGif} />
      </main>
      <footer>
        Page created by Kirill Selivanov
      </footer>
    </div>
  );
}

export default App;
