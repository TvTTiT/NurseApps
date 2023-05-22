import React, { useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, TextInput } from 'react-native';
import { styles } from '../../styles/patientStyles/MessagesStyles';
import { Ionicons } from '@expo/vector-icons';

const MessagesScreen = ({navigation}) => {
  const [messageText, setMessageText] = useState('');
  const [conversationData, setConversationData] = useState([
    {
      id: '1',
      sender: 'Nurse',
      message: 'How are you feeling today?',
      timestamp: '9:30 AM',
    },
    {
      id: '2',
      sender: 'Patient',
      message: "I'm feeling much better, thank you!",
      timestamp: '10:15 AM',
    },
    {
      id: '3',
      sender: 'Nurse',
      message: "That's great to hear!",
      timestamp: '11:45 AM',
    },
    // Add more conversation messages here
  ]);

  const renderMessage = ({ item }) => {
    const isNurse = item.sender === 'Nurse';
    const messageBubbleStyle = [
      styles.messageBubble,
      isNurse ? styles.nurseBubble : styles.patientBubble,
    ];
    const messageTextStyle = [
      styles.messageText,
      isNurse ? styles.nurseMessageText : styles.patientMessageText,
    ];
    const messageContainerStyle = [
      styles.messageContainer,
      isNurse ? styles.nurseContainer : styles.patientContainer,
    ];

    return (
      <View style={messageContainerStyle}>
        {isNurse ? null : (
          <Ionicons name="person-circle-outline" size={24} color="#fb5b5a" />
        )}
        <View style={messageBubbleStyle}>
          <Text style={messageTextStyle}>{item.message}</Text>
          <Text style={styles.timestamp}>{item.timestamp}</Text>
        </View>
      </View>
    );
  };

  const handleBackPress = () => {
    navigation.navigate('Patients List');
    
  };

  const handleSendMessage = () => {
    const newMessage = {
      id: String(conversationData.length + 1),
      sender: 'Nurse',
      message: messageText,
      timestamp: getCurrentTimestamp(),
    };

    setConversationData([...conversationData, newMessage]);
    setMessageText('');
  };

  const getCurrentTimestamp = () => {
    // Logic to get current timestamp
    return new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.backButton} onPress={handleBackPress}>
        <Ionicons name="arrow-back" size={24} color="#fb5b5a" />
      </TouchableOpacity>
      <FlatList
        data={conversationData}
        renderItem={renderMessage}
        keyExtractor={(item) => item.id}
      />
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Type your message"
          value={messageText}
          onChangeText={setMessageText}
        />
        <TouchableOpacity style={styles.sendButton} onPress={handleSendMessage}>
          <Ionicons name="send" size={24} color="#ffffff" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default MessagesScreen;
