import React, { useState } from 'react';
import { Link } from "react-router-dom";
import { useAppSelector, useAppDispatch } from '../../app/hooks';
import {
  signUp,
  selectSignUpState,
  selectUser,
} from './signUpSlice';
import styles from './SignUp.module.css';

export function SignUp() {
  const dispatch = useAppDispatch();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');

  const signUpState = useAppSelector(selectSignUpState);
  const user = useAppSelector(selectUser);

  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  }

  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  }

  const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
  }

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    
    if (email.length > 0 && 
      password.length > 0 &&
      name.length > 0) {

        dispatch(signUp({
          email,
          password,
          name
        }))
    }
    else {
      // show an error that there's empty boxes.
    }
  }

  return (
    <div>
      <Link to="/">Back</Link>
      <p>Sign Up, yo</p>
      <form onSubmit={handleSubmit}>
        <p>Name</p>
        <input
          type="text"
          value={name}
          onChange={handleNameChange}
        />
        <p>Email</p>
        <input
          type="text"
          value={email}
          onChange={handleEmailChange}
        />
        <p>Password</p>
        <input
          type="text"
          value={password}
          onChange={handlePasswordChange}
        />
        <input value='Sign Up' type='submit' />
      </form>

      <p>State: {signUpState}</p>
      <p>User: {JSON.stringify(user, null, 2)}</p>
    </div>
  );
}
