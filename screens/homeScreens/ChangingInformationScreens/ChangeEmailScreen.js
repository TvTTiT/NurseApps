import React, { useState, useContext, useEffect } from 'react';
import { Text, View, TextInput, TouchableOpacity } from 'react-native';
import { styles } from '../../../styles/homeStyles/ChangeNameStyles';
import { Ionicons } from '@expo/vector-icons';
import { supabase } from '../../../supabase/supabaseConfig';
import { UserContext } from '../../../App';

const ChangeEmailScreen = ({ navigation , route}) => {
  const Email = route.params?.email;
  const { userPassword, userID } = useContext(UserContext);
  const [email, setEmail] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isEmailUpdated, setIsEmailUpdated] = useState(false);

  const updateMedicalEmail = async () => {
    try {
      const { error } = await supabase
        .from('medicalprofessionals')
        .update({ email })
        .eq('user_id', userID);

      if (error) {
        console.error('Error updating medical email:', error);
        return;
      }
      alert('User email updated successfully');
      goBack();
    } catch (error) {
      console.error('Error updating email:', error);
    }
  };
  const updateUserEmail = async () => {
    try {
      const { data, error } = await supabase.auth.updateUser({
        email: email
      });
      
      if (error) {
        throw error;
      }
      alert('please confirm your email', data);
      updateMedicalEmail();
    } catch (error) {
      console.error('Error updating user email:', error);
    }
  };
  
  const handleUpdateEmail = async () => {
    if(confirmPassword !== userPassword){
      console.log(userPassword);
      alert("Incorrect Password");
    }else{
      updateUserEmail();
    }
  }
  const goBack = () => {
    setConfirmPassword('');
    setEmail('');
    navigation.navigate('PersonalDetails');
  };

  useEffect(() => {
    const updateUserListener = supabase.auth.onAuthStateChange((event, session) => {
      if (event === 'USER_UPDATED') {
        setIsEmailUpdated(true);
      }
    });
    
    return () => {
      updateUserListener.unsubscribe();
    };
  }, []);

  useEffect(() => {
    if (isEmailUpdated) {
      updateMedicalEmail();
    }
  }, [isEmailUpdated,userPassword,userID]);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => goBack()}>
          <Ionicons name="arrow-back" size={24} color="#000" style={styles.goBackIcon} />
        </TouchableOpacity>
      </View>
      <Text style={styles.title}>Changing Email</Text>
      <View style={styles.inputView}>
        <TextInput
          style={styles.inputText}
          placeholder={Email}
          placeholderTextColor="#003f5c"
          value={email}
          onChangeText={(text) => setEmail(text)}
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
      <TouchableOpacity style={styles.signupBtn} onPress={handleUpdateEmail}>
        <Text style={styles.signupText}>Confirm</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={goBack}>
        <Text style={styles.back}>Changing your mind? click here</Text>
      </TouchableOpacity>
    </View>
  );
};

export default ChangeEmailScreen;
