import React from 'react';
import Amplify from 'aws-amplify';
import aws_exports from './aws-exports';
import { AlbumSearch } from './features/albumSearch/AlbumSearch';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from 'react-router-dom';
import './App.css';
import { AlbumReview } from './features/albumReview/AlbumReview';
import { SignUp } from './features/signUp/SignUp';

Amplify.configure(aws_exports);

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
          <Route path="/SignUp" element={<SignUp />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
