import { useContext, useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import axios from 'axios'
import { AuthContext } from '../store/auth-context';


function WelcomeScreen() {

  const [responeData, setResponseData] = useState('');
  const authCtx = useContext(AuthContext);
  const token = authCtx.token;

  useEffect(() =>{
    axios.get(
      'https://react-native-3e853-default-rtdb.firebaseio.com/message.json?auth=' + token
      ).then((response) => {
        setResponseData(response.data);
      }, [token]);

  });

  return (
    <View style={styles.rootContainer}>
      <Text style={styles.title}>Welcome!</Text>
      <Text>You authenticated successfully!</Text>

      <Text>{responeData}</Text>
    </View>
  );
}

export default WelcomeScreen;

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 32,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 8,
  },
});
