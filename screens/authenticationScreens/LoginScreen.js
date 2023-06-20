import React, { useState } from 'react';
import { Text, View, TextInput, TouchableOpacity } from 'react-native';
import * as WebBrowser from 'expo-web-browser';
import { styles } from '../../styles/authenticationStyles/LoginStyles';
import { supabase } from '../../supabase/supabaseConfig';

WebBrowser.maybeCompleteAuthSession();

const LoginScreen = ({ navigation, onLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
 
  const fetchRole = async (id) => {
    try {
      const { data: medicalprofessionals, error: Error } = await supabase
        .from('medicalprofessionals')
        .select('*')
        .eq('user_id',id)
        .limit(1);

      if (Error) {
        console.log(Error);
        alert('An error occurred while fetching user data. Please try again.');
      return;
      }

      if (medicalprofessionals && medicalprofessionals.length > 0) {
        // login
        onLogin(medicalprofessionals[0].medical_professional_id,id);
      }else{
        alert('Invalid email or password or an error occurred during login.');
      }
    } catch (error) {
      alert('An error occurred while fetching medicalprofessionals data. Please try again.');
      console.error(error);
    }
  };
  
  const handleLogin = async () => {
    // Check if email is in valid format
    const emailRegex = /^\S+@\S+\.\S+$/;
    if (!emailRegex.test(email)) {
      alert('Please enter a valid email address');
      return;
    }
    
    try {
      const response = await supabase.auth.signInWithPassword({
        email: email,
        password: password
      });
  
      const { user, error } = response.data;
  
      if (error) {
        console.log(error);
        if (error.message === 'Invalid login credentials') {
          alert('Invalid email or password. Please try again.');
        } else {
          alert('An error occurred during login. Please try again.');
        }
        return;
      }
  
      if (user) {
        // User logged in successfully
        fetchRole(user.id);
      }else{
        alert('Invalid email or password. Please try again.');
      }
    } catch (error) {
      alert('An error occurred during login. Please try again.');
      console.error(error);
    }
  };
  
  
  const handleCreateAccount = () => {
    // Handle creating a new account here
    navigation.navigate('Signup Screen');
  };

  const handleForgotPassword = () => {
    // Handle resetting the password here
    navigation.navigate('Forgot Screen');
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
      <TouchableOpacity style={styles.createBtn} onPress={handleCreateAccount}>
        <Text style={styles.createText}>SIGN UP</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={handleForgotPassword}>
        <Text style={styles.forgot}>Forgot Password?</Text>
      </TouchableOpacity>
    </View>
  );
};

export default LoginScreen;