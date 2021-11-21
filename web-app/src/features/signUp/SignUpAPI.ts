import { Auth } from "aws-amplify";
import { NewUserSignUpDetails } from "./signUpSlice";

export async function signUpWithAmplify(signUpDetails: NewUserSignUpDetails) {
  try {

    // validate input
    if (signUpDetails.email.length === 0 ||
      signUpDetails.password.length === 0 ||
      signUpDetails.name.length === 0) {
      return Promise.reject('No search value was provided.');
    }

    const response = await Auth.signUp({
      username: signUpDetails.email,
      password: signUpDetails.password,
      attributes: {
        name: signUpDetails.name
      }
    });
    console.log(response);

    return { cognitoUser: response.user, userSub: response.userSub };
  } catch (err: any) {
    return Promise.reject(err.message ? err.message : 'an auth error occurred')
  }
}