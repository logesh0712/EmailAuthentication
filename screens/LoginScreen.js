import {useState, useContext} from 'react';
import { login } from '../util/auth';
import LoadingOverlay from '../components/ui/LoadingOverlay'
import { Alert } from 'react-native';

import AuthContent from '../components/Auth/AuthContent';
import { AuthContext } from '../store/auth-context';

function LoginScreen() {
  const authCtx = useContext(AuthContext);

  const [isAuthenticating, setIsAuthenticating] = useState(false);

  async function loginHandler({email, password})
  {
    setIsAuthenticating(true);
    try{
      console.log("Before login");
      const token = await login(email, password);
      
      console.log("After login. Token"+ token);
      authCtx.authenticate(token);
    }
    catch(error){
      Alert.alert(error.message);
      setIsAuthenticating(false);
    }
    
  }

  if (isAuthenticating)
  {
    return <LoadingOverlay message="Logging in...."></LoadingOverlay>
  }

  return <AuthContent isLogin onAuthenticate={loginHandler}/>;
}

export default LoginScreen;
