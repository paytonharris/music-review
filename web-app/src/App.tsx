import React, { useEffect } from 'react';
import Amplify, { Hub, Auth } from 'aws-amplify';
import aws_exports from './aws-exports';
import { AlbumSearch } from './features/albumSearch/AlbumSearch';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from 'react-router-dom';
import { useAppDispatch } from './app/hooks';
import { setUserInfo } from './authSlice';
import './App.css';
import { AlbumReview } from './features/albumReview/AlbumReview';
import { SignUp } from './features/signUp/SignUp';
import { SignIn } from './features/signIn/SignIn';
import { Verify } from './features/verify/Verify';

Amplify.configure(aws_exports);

function App() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    refreshUserInfo();
    Hub.listen('auth', listener);
  }, [])

  const listener = (data: any) => {
    console.log(`${data.payload?.event} event`);
    refreshUserInfo();
  }

  const refreshUserInfo = async () => {
    try {
      const userInfo = await Auth.currentUserInfo()
      
      dispatch(setUserInfo({
        status: 'success',
        email: userInfo?.attributes?.email,
        name: userInfo?.attributes?.name,
        id: userInfo?.attributes?.sub,
      }));
    }
    catch (error) {
      dispatch(setUserInfo({ status: 'failure' }));
    }
  }

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
