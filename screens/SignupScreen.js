import {useState, useContext} from 'react';
import AuthContent from '../components/Auth/AuthContent';
import { createUser } from '../util/auth';
import LoadingOverlay from '../components/ui/LoadingOverlay'
import { Alert } from 'react-native';
import { AuthContext } from '../store/auth-context';

function SignupScreen() {

  const authCtx = useContext(AuthContext);

  const [isAuthenticating, setIsAuthenticating] = useState(false);

  async function signUpHandler({email, password})
  {
    setIsAuthenticating(true);
    try
    {
      const token = await createUser(email, password);
      console.log("I am here");
      authCtx.authenticate(token);
      console.log("I am here2");
    }
    catch(error)
    {
      Alert.alert("Sign up failed! Check input details or try after sometimes");
      setIsAuthenticating(false);
    }

    
  }

  if (isAuthenticating)
  {
    return <LoadingOverlay message="Creating user...."></LoadingOverlay>
  }

  return <AuthContent onAuthenticate={signUpHandler}/>;
}

export default SignupScreen;
