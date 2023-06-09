import React, { useState, useEffect, useContext } from 'react';
import { Text, View, TextInput, TouchableOpacity } from 'react-native';
import { styles } from '../../styles/authenticationStyles/SigupStyles'; 
import { supabase } from '../../lib/supabaseConfig';
import { UserContext } from '../../App';

const SignupScreen = ({ navigation }) => {
  const [userName, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const { setUserID, userID,setUserEmail,userEmail} = useContext(UserContext);

  useEffect(() => {
    console.log(userID);
  }, [userID,userEmail]);

  const checkEmail = () => {
    const emailRegex = /^\S+@\S+\.\S+$/;
    if (!emailRegex.test(email)) {
      alert('Please enter a valid email address');
      return;
    } else {
      setUserEmail(email);
      handleNewUser();
    }
  }

  const handleNewUser = async () => {
    try {
      const { data, error } = await supabase
        .from('users')
        .select('email, username')
        .or(`email.eq.${email}, username.eq.${userName}`)
        .single();

      if (data) {
        if (data.email === email) {
          alert('Email already exists');
        }
  
        if (data.username === userName) {
          alert('Username already exists');
        }
      } else {
        // Proceed with creating a new user
        handlePassword();
      }
    } catch (error) {
      console.error('Error getting information:', error);
    }
  };

  const handlePassword = async () => {
    if (password !== confirmPassword) {
      alert("Passwords do not match");
    } else if (password === '' || confirmPassword === '') {
      alert("Passwords are empty");
    } else {
      await createNewUser();
    }
  };

  const createNewUser = async () => {
    try {
      // Get the maximum current user ID from the users table
      const { data, error } = await supabase
        .from('users')
        .select('user_id')
        .order('user_id', { ascending: false })
        .limit(1);

      if (error) {
        console.error('Error retrieving max user ID:', error);
        return;
      }

      const maxUserId = data[0]?.user_id || 0;
      const newUserID = maxUserId + 1;
      setUserID(newUserID);

      const { error: createUserError } = await supabase
        .from('users')
        .insert([
          {
            user_id: newUserID,
            user_role: 'Admin',
            username: userName,
            email: email,
            password: password,
          },
        ]);

      if (createUserError) {
        console.error('Error creating new user:', createUserError);
        return;
      }
      navigation.navigate("Information Form");
    } catch (error) {
      console.error('Error creating new user:', error);
    }
  };

  const goBack = () => {
    navigation.goBack();
  }
  return (
    <View style={styles.container}>
      <Text style={styles.logo}>Sign Up</Text>
      <View style={styles.inputView}>
        <TextInput
          style={styles.inputText}
          placeholder="User Name..."
          placeholderTextColor="#003f5c"
          value={userName}
          onChangeText={(text) => setUserName(text)}
        />
      </View>
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
      <TouchableOpacity style={styles.signupBtn} onPress={checkEmail}>
        <Text style={styles.signupText}>SIGN UP</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={goBack}>
        <Text style={styles.login}>Already have an account? Log in here</Text>
      </TouchableOpacity>
    </View>
  );
};



export default SignupScreen;
