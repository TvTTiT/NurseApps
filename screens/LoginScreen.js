import React, { useState } from 'react';
import {  Text, View, TextInput, TouchableOpacity } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import * as Google from 'expo-auth-session/providers/google';
import * as WebBrowser from 'expo-web-browser';
import { styles } from '../styles/LoginStyles'; 
WebBrowser.maybeCompleteAuthSession();

const LoginScreen = ({navigation,onLogin}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [token, setToken] = useState("");
  const [userInfo, setUserInfo] = useState(null);
  const [request, response, promptAsync] = Google.useAuthRequest({
    expoClientId: "416178102798-568cpitk4g7osme6ui0gufghrindqtcu.apps.googleusercontent.com",
    androidClientId: "416178102798-1g3tq23jmhuujtllu01mjke8va6lktd1.apps.googleusercontent.com",
    iosClientId: "416178102798-85qgtig54csc7jlmfm4ub3s13b7mmd2j.apps.googleusercontent.com",
  });
  const handleLogin = () => {
    // Perform login logic here
    // Check if email is in valid format
    const emailRegex = /^\S+@\S+\.\S+$/;
    if (!emailRegex.test(email)) {
      alert('Please enter a valid email address');
      return;
    }
    // authentication
    onLogin();
  }

  const handleCreateAccount = () => {
    // Handle creating a new account here
    navigation.navigate("Signup Screen");
    
  }

  const handleForgotPassword = () => {
    // Handle resetting the password here
    navigation.navigate("Forgot Screen");
  }

  const handleGoogleLogin = async () => {
    try {
      const result = await promptAsync();
      const response = result.type === "success" ? result : null;
      if (response) {
        const token = response.authentication.accessToken;
        const userResponse = await fetch(
          "https://www.googleapis.com/userinfo/v2/me",
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        const userInfo = await userResponse.json();
        setToken(token);
        setUserInfo(userInfo);
        console.log(response);
        console.log(token);
        console.log(userInfo);
      }
    } catch (error) {
      // Add your own error handler here
    }
  };
  
  return (
    <View style={styles.container}>
      <Text style={styles.logo}>RoboMedic Solutions</Text>
      <View style={styles.inputView}>
        <TextInput
          style={styles.inputText}
          placeholder="Email..."
          placeholderTextColor="#003f5c"
          value={email}
          onChangeText={(text) => setEmail(text)}
        />
      </View>
      <View style={styles.inputView}>
        <TextInput
          style={styles.inputText}
          placeholder="Password..."
          placeholderTextColor="#003f5c"
          secureTextEntry={true}
          value={password}
          onChangeText={(text) => setPassword(text)}
        />
      </View>
      <TouchableOpacity style={styles.loginBtn} onPress={handleLogin}>
        <Text style={styles.loginText}>LOGIN</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={handleForgotPassword}>
        <Text style={styles.forgot}>Forgot Password?</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={handleCreateAccount}>
        <Text style={styles.signup}>Don't have an account? Sign up here</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.googleBtn} onPress={handleGoogleLogin} >
        <AntDesign name="google" size={24} color="white" />
        <Text style={styles.googleText}>Login with Google</Text>
      </TouchableOpacity>
    </View>
  );
};

export default LoginScreen;