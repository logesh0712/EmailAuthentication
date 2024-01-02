import axios from 'axios';

const API_KEY = 'AIzaSyAI6UDlC30wgsIRhy8MMmPaxzbQsBH_uwc';

async function authenticate(mode, email, password)
{
    const url = `https://identitytoolkit.googleapis.com/v1/accounts:${mode}?key=${API_KEY}`;

    const response = await axios.post(
        url,
        {
            email: email,
            password: password,
            returnSecureToken: true
        }
    );

    console.log("Response is"+ JSON.stringify(response.data));
    console.log("Token"+ response.data.idToken);
    const token = response.data.idToken;

    return token;
}

export async function createUser(email, password)
{
    const token = await authenticate("signUp");
    return token;
}

export async function login(email, password)
{
    const token = await authenticate('signInWithPassword', email, password);
    return token;
}