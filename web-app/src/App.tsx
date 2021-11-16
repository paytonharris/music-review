import React from 'react';
import { AlbumSearch } from './features/albumSearch/AlbumSearch';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from 'react-router-dom';
import './App.css';
import { AlbumReview } from './features/albumReview/AlbumReview';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route
            path="/"
            element={
              <div className="App-header">
                <AlbumSearch />
              </div>
            }
          />
          <Route path="/album/:albumId" element={<AlbumReview />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
