import React, { useState, useEffect, useContext } from 'react';
import { Text, View, TextInput, TouchableOpacity } from 'react-native';
import { styles } from '../../styles/authenticationStyles/SigupStyles';
import { supabase } from '../../supabase/supabaseConfig';
import { UserContext } from '../../App';

const SignupScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { setUserID, setUserEmail, userID, userEmail } = useContext(UserContext);

  useEffect(() => {
  }, [userID, userEmail]);

  useEffect(() => {
    if (navigation.isFocused()) {
      supabase.auth.onAuthStateChange((event, session) => {
        if (event === 'SIGNED_IN' && session.user.confirmed_at) {
              alert('Email Confirmed', 'Your email has been confirmed successfully.', [
            { text: 'OK', onPress: handleConfirmation }
          ]);
        }
        handleConfirmation();
      });
    }
  }, [navigation]);

  const handleConfirmation = () => {
    navigation.navigate('Information Form');
  };

  const handleConfirmationEmail = async () => {
    const response = await supabase.auth.signInWithPassword({
      email: email,
      password: password
    });

    const { user, error } = response.data;

    if (error) {
      console.log(error);
      return;
    }

    if (user) {
      console.log(user);
      setUserID(user.id);
      console.log(userID);
    } else {
      alert('Please confirm your email then try again.');
    }
  };

  const checkEmail = () => {
    const emailRegex = /^\S+@\S+\.\S+$/;
    if (!emailRegex.test(email)) {
      alert('Please enter a valid email address');
      return;
    } else {
      handleNewUser();
    }
  };

  const handleNewUser = async () => {
    if (password !== confirmPassword) {
      alert('Passwords do not match');
    } else if (password === '' || confirmPassword === '') {
      alert('Passwords are empty');
    } else if (password.length < 6) {
      alert('Password should be at least 6 characters');
    } else {
      setIsLoading(true);
      try {
        const response = await supabase.auth.signUp({
          email: email,
          password: password
        });
        const { user, error } = response.data;
        if (error) {
          alert('An error occurred during signup. Please try again.');
          setIsLoading(false);
          return;
        }
        if (user) {
          setUserEmail(email);
          console.log(user);
          setIsLoading(false);
          handleConfirmationEmail();
          return;
        }
      } catch (error) {
        alert('An error occurred during signup. Please try again.');
        setIsLoading(false);
      }
    }
  };

  const goBack = () => {
    navigation.goBack();
  };


  return (
    <View style={styles.container}>
      <Text style={styles.logo}>Sign Up</Text>
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
      <View style={styles.inputView}>
        <TextInput
          style={styles.inputText}
          placeholder="Confirm Password..."
          placeholderTextColor="#003f5c"
          secureTextEntry={true}
          value={confirmPassword}
          onChangeText={(text) => setConfirmPassword(text)}
        />
      </View>
      <TouchableOpacity
        style={styles.signupBtn}
        onPress={checkEmail}
        disabled={isLoading}
      >
        {isLoading ? (
          <Text style={styles.signupText}>Signing Up...</Text>
        ) : (
          <Text style={styles.signupText}>SIGN UP</Text>
        )}
      </TouchableOpacity>
      <TouchableOpacity onPress={goBack}>
        <Text style={styles.login}>Already have an account? Log in here</Text>
      </TouchableOpacity>
    </View>
  );
};

export default SignupScreen;
