import React, { useState, useContext } from 'react';
import { Text, View, TextInput, TouchableOpacity } from 'react-native';
import { styles } from '../../../styles/homeStyles/ChangeNameStyles';
import { Ionicons } from '@expo/vector-icons';
import { supabase } from '../../../lib/supabaseConfig';
import { UserContext } from '../../../App';

const ChangeEmailScreen = ({ navigation, route }) => {
  const Email = route.params?.email;
  const { medicalProfessionalId, userID } = useContext(UserContext);
  const [email, setEmail] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const updateMedicalEmail = async () => {
    try {
      const { error } = await supabase
        .from('medicalprofessionals')
        .update({ email })
        .eq('medical_professional_id', medicalProfessionalId[0].medical_professional_id);

      if (error) {
        console.error('Error updating medical email:', error);
        return;
      }
      console.log('Medical Email updated successfully');
      updateUserEmail();
    } catch (error) {
      console.error('Error updating email:', error);
    }
  };
  const updateUserEmail = async () => {
    try {
      const { error } = await supabase
        .from('users')
        .update({ email })
        .eq('user_id', userID);

      if (error) {
        console.error('Error user updating email:', error);
        return;
      }
      alert('User Email updated successfully');
      setConfirmPassword('');
      setEmail('');
      navigation.navigate('PersonalDetails');
    } catch (error) {
      console.error('Error updating user email:', error);
    }
  };
  const handleUpdateEmail = async () => {
    try {
      let { data: user_password, error } = await supabase
        .from('users')
        .select('password')
        .eq('user_id', userID);

      if (error) {
        console.error('Error selecting password:', error);
        alert('Error selecting password');
        return;
      }
      const userPassword = user_password[0]?.password;
      if(confirmPassword == userPassword) {
        updateMedicalEmail();
      }else{
        alert('Incorrect password!!!');
      }
    } catch (error) {
      console.error('Error selecting email:', error);
    }
  }
  const goBack = () => {
    setConfirmPassword('');
    setEmail('');
    navigation.navigate('PersonalDetails');
  };

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
