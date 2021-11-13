import axios from "axios";

interface TokenResponse {
  access_token: string;
  token_type: string;
  expires_in: number;
}

export const getBearerToken = async (spotifyBasicAuthToken: string) => {
  console.log(`Basic Token: ${spotifyBasicAuthToken}`);

  try {
    const url = "https://accounts.spotify.com/api/token";

    const body = 'grant_type=client_credentials';

    const options = {
      headers: {
        'Authorization': `Basic ${spotifyBasicAuthToken}`,
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    };

    const tokenResponse = await axios.post(url, body, options);

    let data = tokenResponse.data as TokenResponse;
    
    return data.access_token;
  } catch (error) {
    console.error(error)
  }
}