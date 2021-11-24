import React, { useState } from 'react';
import { Link, useNavigate } from "react-router-dom";
import { useAppSelector } from '../../app/hooks';
import { Auth } from "aws-amplify";
import {
  selectLoginEmail,
} from '../signUp/signUpSlice';
import styles from './Verify.module.css';

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

      setVerificationState('succeeded');
    } catch (error) {
      setVerificationState('failed');
      console.error('error confirming sign up', error);
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
