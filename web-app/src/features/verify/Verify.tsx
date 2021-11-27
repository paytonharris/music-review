import React, { useState } from 'react';
import { Link, useNavigate } from "react-router-dom";
import { useAppSelector } from '../../app/hooks';
import { Auth, API } from "aws-amplify";
import {
  selectLoginEmail,
} from '../signUp/signUpSlice';
import styles from './Verify.module.css';
import { createUser } from '../../graphql/mutations';

type VerificationState = 'initial' | 'loading' | 'succeeded' | 'failed';

export function Verify() {
  const loginEmail = useAppSelector(selectLoginEmail) || '';
  const [code, setCode] = useState('');
  const [email, setEmail] = useState(loginEmail);
  const [verificationState, setVerificationState] = useState<VerificationState>('initial');

  let navigate = useNavigate()

  const confirmSignUp = async (email: string, code: string) => {
    setVerificationState('loading');
    try {
      await Auth.confirmSignUp(email, code);

      addUserToUsersTable()

      setVerificationState('succeeded');
    } catch (error) {
      setVerificationState('failed');
      console.error('error confirming sign up', error);
    }
  }

  const addUserToUsersTable = async () => {
    try {
      const user = await Auth.currentUserInfo()
  
      const userID = user?.attributes?.sub;
      const name = user?.attributes?.name;

      if (userID && name) {
        await API.graphql({
          query: createUser,
          variables: { input: {
            name: name,
            userID: userID,
            joinDate: (new Date()).toISOString()
          } },
          authMode: "AMAZON_COGNITO_USER_POOLS"
        })
        console.log("User created successfully!");
      }
      else {
        console.log("could not create user. UserID and name did not exist.")
      }
    } catch (error) {
      console.log("Error creating user", error);
    }
  }

  const handleCodeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCode(event.target.value);
  }

  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  }

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    
    if (code.length > 0 && email.length > 0) {
      confirmSignUp(email, code);
    }
    else {
      // show an error that there's empty boxes.
    }
  }

  if (verificationState === 'succeeded') { // show a success message and then navigate home
    setTimeout(() => {
      navigate('/');
    }, 1000);

    return (
      <div>
        <h2>Success!</h2>
      </div>
    )
  }
  else {
    return (
      <div>
        <Link to="/">Back</Link>
        <form onSubmit={handleSubmit}>
          <p>Email</p>
          <input
            type="text"
            value={email}
            onChange={handleEmailChange}
          />
          <p>Verification Code</p>
          <input
            type="text"
            value={code}
            onChange={handleCodeChange}
          />
          <input value='Verify' type='submit' />
        </form>
        <p>{verificationState}</p>
      </div>
    );
  }
}
