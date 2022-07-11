import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableNativeFeedback,
  ActivityIndicator,
} from 'react-native';
import '../global';
import AsyncStorage from '@react-native-community/async-storage';
import Icon from 'react-native-vector-icons/AntDesign';

import {useNavigation} from '@react-navigation/native';

export default function Login() {
  useEffect(() => {
    // setEmail('naveenkumr.dps@gmail.com');
    // setPassword('123456');
    if (Email.includes('@') && Password.length > 8) {
      setButtonStatus(0);
    }
  });
  const navigation = useNavigation();
  const [Email, setEmail] = useState('');
  const [Password, setPassword] = useState('');
  const [loginResult, setLoginResult] = useState(1);
  const [indicatorStatus, setIndicatorStatus] = useState(0);
  const [buttonStatus, setButtonStatus] = useState(1);
  const Login = async (email, pass) => {
    console.log(`Logging in, email=${email}&pass=${pass}`);
    try {
      let response = await fetch(
        'https://paathshala.priden.co/restapi/public/api/v1/login',
        {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            email: email,
            password: pass,
            username: '',
          }),
        },
      );
      let json = await response.json();
      const result = json;
      console.log(result);
      if (result.hasOwnProperty('success')) {
        global.User = {
          firstName: result.success.firstname,
          lastName: result.success.lastname,
          email: result.success.email,
          id: result.success.id,
          phone: result.success.phone,
          school: result.success.school,
          type: result.success.type,
          course: result.success.course,
          token: result.success.token,
          pwd: pass,
        };
        try {
          await AsyncStorage.setItem('User', JSON.stringify(global.User));
        } catch (error) {
          console.log('Error saving data');
        }
        navigation.reset({
          index: 0,
          routes: [{name: 'Home'}],
        });
        setLoginResult(1);
      } else {
        console.log('None');
        setLoginResult(0);
      }
    } catch (error) {
      console.error(error);
    }
    setIndicatorStatus(0);
  };
  return (
    <View style={styles.container}>
      <View style={styles.topBar}>
        <Text />
        <Text style={styles.title}>
          {'  '}paathshala{'  '}
        </Text>
        <Text />
      </View>
      <View
        style={{
          flex: 1,
          alignItems: 'center',
          justifyContent: 'center',
          transform: [{translateY: -50}],
        }}>
        <Text
          style={{
            fontWeight: 'bold',
            padding: 20,
            color: 'white',
            fontSize: 15,
          }}>
          Log-In
        </Text>

        <TextInput
          style={styles.inputs}
          placeholder="E-mail Address"
          placeholderTextColor="#a9a9a9"
          onChangeText={(text) => setEmail(text)}
          keyboardType="email-address"
          autoCapitalize="none"
        />
        <TextInput
          style={styles.inputs}
          placeholder="Password"
          placeholderTextColor="#a9a9a9"
          secureTextEntry={true}
          onChangeText={(text) => setPassword(text)}
        />
        <TouchableNativeFeedback
          disabled={buttonStatus}
          onPress={() => {
            setIndicatorStatus(1);
            Login(Email, Password);
          }}>
          <View
            style={{
              padding: 12,
              alignContent: 'center',
              backgroundColor: global.Dark ? '#0095F6' : '#ffa033',
              elevation: 2,
              borderRadius: 5,
              width: 300,
            }}>
            {indicatorStatus ? (
              <ActivityIndicator color="white" />
            ) : (
              <Text
                style={{
                  color: 'white',
                  width: '100%',
                  fontSize: 14,
                  textAlign: 'center',
                }}>
                Submit
              </Text>
            )}
          </View>
        </TouchableNativeFeedback>
        <Text style={{paddingTop: 8, color: 'lightblue'}}>
          Forgot your password?
        </Text>
        <Text style={{padding: 20, color: 'gray'}}>⎯⎯⎯⎯⎯⎯ {'  '}OR ⎯⎯⎯⎯⎯⎯</Text>
        <TouchableNativeFeedback>
          <View
            style={{
              padding: 12,
              alignContent: 'center',
              backgroundColor: '#DB4C3E',
              elevation: 2,
              borderRadius: 5,
              width: 300,
              marginBottom: 10,
            }}>
            <Text
              style={{
                color: 'white',
                width: '100%',
                fontSize: 14,
                textAlign: 'center',
              }}>
              <Icon name="google" size={18} color="white" />
              {'   '}Sign In With Google
            </Text>
          </View>
        </TouchableNativeFeedback>
        <TouchableNativeFeedback>
          <View
            style={{
              padding: 12,
              alignContent: 'center',
              backgroundColor: '#4385F5',
              elevation: 2,
              borderRadius: 5,
              width: 300,
              marginBottom: 10,
            }}>
            <Text
              style={{
                color: 'white',
                width: '100%',
                fontSize: 14,
                textAlign: 'center',
              }}>
              <Icon name="facebook-square" size={18} color="white" />
              {'   '}Sign In With Facebook
            </Text>
          </View>
        </TouchableNativeFeedback>
      </View>
      <TouchableNativeFeedback onPress={() => navigation.navigate('SignUp01')}>
        <View style={styles.signup}>
          <Text style={{color: 'white', textAlign: 'center', fontSize: 14}}>
            New here? Create an account!
          </Text>
        </View>
      </TouchableNativeFeedback>
      {loginResult ? null : (
        <View style={styles.error}>
          <Text style={{color: 'white', textAlign: 'center', fontSize: 14}}>
            The e-mail and password don't match.
          </Text>
        </View>
      )}
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: global.Dark ? '#202020' : '#f5f5f5',
  },
  error: {
    position: 'absolute',
    bottom: 50,
    padding: 15,
    backgroundColor: '#DB4C3E',
    margin: 10,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: 'red',
    alignContent: 'center',
  },
  signup: {
    position: 'absolute',
    bottom: 0,
    padding: 20,
    backgroundColor: '#0d0d0d',
    width: '100%',
    alignContent: 'center',
  },
  inputs: {
    width: 300,
    height: 40,
    borderColor: 'gray',
    borderWidth: 0.5,
    padding: 10,
    borderRadius: 5,
    color: 'white',
    marginBottom: 15,
  },
  topBar: {
    alignSelf: 'stretch',
    height: 60,
    flexDirection: 'row', // row
    alignItems: 'center',
    justifyContent: 'space-between', // center, space-around
    padding: 15,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    backgroundColor: global.Dark ? '#202020' : 'white',
    elevation: 5,
    borderBottomWidth: 0.5,
    borderBottomColor: '#545454',
  },
  title: {
    alignSelf: 'center',
    fontWeight: 'bold',
    fontSize: 25,
    color: '#FD8D08',
  },
});
