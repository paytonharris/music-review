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
import { SignIn } from './features/signIn/SignIn';
import { Verify } from './features/verify/Verify';

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
          <Route path="/signup" element={<SignUp />} />
          <Route path="/login" element={<SignIn />} />
          <Route path="/verify" element={<Verify />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
