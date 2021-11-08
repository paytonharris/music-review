import React from 'react';
import logo from './logo.svg';
import { AlbumSearch } from './features/albumSearch/AlbumSearch';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <AlbumSearch />
      </header>
    </div>
  );
}

export default App;
