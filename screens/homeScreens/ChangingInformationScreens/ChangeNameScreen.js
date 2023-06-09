import React, { useState, useContext } from 'react';
import { Text, View, TextInput, TouchableOpacity } from 'react-native';
import { styles } from '../../../styles/homeStyles/ChangeNameStyles'; 
import { Ionicons } from '@expo/vector-icons';
import { supabase } from '../../../supabase/supabaseConfig';
import { UserContext } from '../../../App';

const ChangeNameScreen = ({ navigation,route }) => {
  const first_name = route.params?.first_name;
  const last_name = route.params?.last_name;
  const { userPassword , userID} = useContext(UserContext);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const updateName = async () => {
    try {
      const { data, error } = await supabase
        .from('medicalprofessionals')
        .update({ 
          first_name: firstName,
          last_name: lastName
        })
        .eq('user_id', userID);

      if (error) {
        console.error('Error updating name:', error);
        return;
      }
      alert('Name updated successfully');
      setFirstName('');
      setLastName('');
      setConfirmPassword('');
      navigation.navigate('PersonalDetails');
    } catch (error) {
      console.error('Error updating name:', error);
    }
  };
  const handleUpdateName = async () => {
    if(confirmPassword !== userPassword){
      alert("Incorrect Password");
    }else{
      updateName();
    }
  };

  const goBack = () => {
    setFirstName('');
    setLastName('');
    setConfirmPassword('');
    navigation.navigate('PersonalDetails');
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => goBack()}>
          <Ionicons name="arrow-back" size={24} color="#000" style={styles.goBackIcon} />
        </TouchableOpacity>
      </View>
      <Text style={styles.title}>Changing user name</Text>
      <View style={styles.inputView}>
        <TextInput
          style={styles.inputText}
          placeholder={first_name}
          placeholderTextColor="#003f5c"
          value={firstName}
          onChangeText={(text) => setFirstName(text)}
        />
      </View>
      <View style={styles.inputView}>
        <TextInput
          style={styles.inputText}
          placeholder={last_name}
          placeholderTextColor="#003f5c"
          value={lastName}
          onChangeText={(text) => setLastName(text)}
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
      <TouchableOpacity style={styles.signupBtn} onPress={handleUpdateName}>
        <Text style={styles.signupText}>Confirm</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={goBack}>
        <Text style={styles.back}>Changing your mind? Click here</Text>
      </TouchableOpacity>
    </View>
  );
};

export default ChangeNameScreen;
