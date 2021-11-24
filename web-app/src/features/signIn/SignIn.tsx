import React, { useState } from 'react';
import { Link, useNavigate } from "react-router-dom";
import { useAppSelector, useAppDispatch } from '../../app/hooks';
import { Auth } from "aws-amplify";
import styles from './SignIn.module.css';

type SignInState = 'initial' | 'loading' | 'succeeded' | 'failed';

export function SignIn() {
  const dispatch = useAppDispatch();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [signInState, setSignInState] = useState<SignInState>('initial');

  let navigate = useNavigate()

  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  }

  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  }

  const signIn = async (email: string, password: string) => {
    setSignInState('loading');
    try {
      await Auth.signIn(email, password);

      setSignInState('succeeded');
    } catch (error) {
      setSignInState('failed');
      console.error('error confirming sign up', error);
    }
  }

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    
    if (email.length > 0 && password.length > 0) {
      signIn(email, password);
    }
    else {
      // show an error that there's empty boxes.
    }
  }

  if (signInState === 'succeeded') {
    navigate('/');
  }

  return (
    <div>
      <Link to="/">Back</Link>
      <p>Sign In</p>
      <form onSubmit={handleSubmit}>
        <p>Email</p>
        <input
          type="email"
          value={email}
          onChange={handleEmailChange}
        />
        <p>Password</p>
        <input
          type="password"
          value={password}
          onChange={handlePasswordChange}
        />
        <input value='Sign In' type='submit' />
      </form>
      <p>{signInState}</p>
    </div>
  );
}
