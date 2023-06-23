import React, { useState, useContext } from 'react';
import { Text, View, TextInput, TouchableOpacity } from 'react-native';
import { styles } from '../../../styles/homeStyles/ChangeNameStyles'; 
import { Ionicons } from '@expo/vector-icons';
import { supabase } from '../../../supabase/supabaseConfig';
import { UserContext } from '../../../App';

const ChangeWorkPlaceScreen = ({ navigation,route }) => {
  const workPlace = route.params?.workPlace;
  const { userPassword , userID} = useContext(UserContext);
  const [place, setPlace] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const updateWorkPlace = async () => {
    try {
      const { data, error } = await supabase
        .from('medicalprofessionals')
        .update({ 
            hospital_or_clinic: place
        })
        .eq('user_id', userID);

      if (error) {
        console.error('Error updating workPlace:', error);
        return;
      }
      alert('workPlace updated successfully');
      setPlace('');
      setConfirmPassword('');
      navigation.navigate('PersonalDetails');
    } catch (error) {
      console.error('Error updating workPlace:', error);
    }
  };
  const handleUpdateWorkPlace = async () => {
    if(confirmPassword !== userPassword){
      alert("Incorrect Password");
    }else{
      updateWorkPlace();
    }
  };

  const goBack = () => {
    setPlace('');
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
      <Text style={styles.title}>Changing work place</Text>
      <View style={styles.inputView}>
        <TextInput
          style={styles.inputText}
          placeholder={workPlace}
          placeholderTextColor="#003f5c"
          value={place}
          onChangeText={(text) => setPlace(text)}
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
      <TouchableOpacity style={styles.signupBtn} onPress={handleUpdateWorkPlace}>
        <Text style={styles.signupText}>Confirm</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={goBack}>
        <Text style={styles.back}>Changing your mind? Click here</Text>
      </TouchableOpacity>
    </View>
  );
};

export default ChangeWorkPlaceScreen;
