import React, { useState, useContext, useEffect, useLayoutEffect, useRef } from 'react';
import { View, Text, FlatList, TouchableOpacity, TextInput } from 'react-native';
import { styles } from '../../styles/homeStyles/MessagesStyles';
import { Ionicons } from '@expo/vector-icons';
import { supabase } from '../../lib/supabaseConfig';
import { UserContext } from '../../App';

const MessagesScreen = ({ navigation, route }) => {
  const patientId = route.params?.patient;
  const { medicalProfessionalId } = useContext(UserContext);
  const [messageText, setMessageText] = useState('');
  const [conversationData, setConversationData] = useState([]);
  const [isMessagesLoading, setIsMessagesLoading] = useState(true);
  const [chatId, setChatId] = useState(0);
  const flatListRef = useRef(null);

  useEffect(() => {
    fetchMessages();
    // Subscribe to the channel for new message events
    const newMessageSubscription = supabase
      .channel('new-message-chanel')
      .on('postgres_changes', {
        event: 'INSERT',
        schema: 'public',
        table: 'chats',
      }, handleNewMessage)
      .subscribe();
  
    // Unsubscribe from the channel when the component unmounts
    return () => {
      newMessageSubscription.unsubscribe();
    };
  }, [medicalProfessionalId, patientId]);
  
  const handleNewMessage = (payload) => {
    // Retrieve the new message from the payload
    const newMessage = payload.new;
  
    // Update the conversationData state with the new message
    setConversationData((prevData) => [...prevData, newMessage]);
  };
  
  const createNewChatId = async () => {
    try {
      const { data, error } = await supabase
        .from('chats')
        .select('*')
        .order('chat_id', { ascending: false })
        .limit(1);

      if (error) {
        console.error('Error fetching chats', error);
      } else {
        const maxId = data[0]?.chat_id || 0;
        const newChatID = maxId + 1;
        setChatId(newChatID);
        handleSendMessage(newChatID); // Pass newChatID as an argument
      }
    } catch (error) {
      console.error('Error fetching chats', error);
    }
  };

  const fetchMessages = async () => {
    try {
      setIsMessagesLoading(true);
  
      const { data, error } = await supabase
        .from('chats')
        .select('*')
        .eq('patient_id', patientId)
        .eq('medical_professional_id', medicalProfessionalId[0].medical_professional_id);
  
      if (error) {
        console.error('Error fetching Messages', error);
      } else {
        setConversationData(data);
        setChatId(data.length > 0 ? data[0].chat_id : 0);
      }
    } catch (error) {
      console.error('Error fetching Messages', error);
    } finally {
      setIsMessagesLoading(false);
    }
  };
  
  const renderMessage = ({ item }) => {
    const isNurse = item.sender === 'Admin';
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
    navigation.navigate('PatientData', { patient: patientId });
  };

  const handleSendMessage = async (newChatID) => {
    const newMessage = {
      sender: 'Nurse',
      message: messageText,
      timestamp: getCurrentTimestamp(),
    };
  
    const { message, timestamp } = newMessage;
    console.log('Sending Message:', { message, timestamp, newChatID });
  
    try {
      const { data, error } = await supabase
        .from('chats')
        .insert([
          {
            patient_id: patientId,
            medical_professional_id: medicalProfessionalId[0].medical_professional_id,
            message,
            timestamp,
            sender: 'Admin',
            chat_id: newChatID,
          },
        ]);
  
      console.log('Message Sent:', data);
      fetchMessages();

    } catch (error) {
      console.error('Error sending message', error);
    }
  
    setMessageText('');
  };
  
  const getCurrentTimestamp = () => {
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const day = String(now.getDate()).padStart(2, '0');
    const hour = String(now.getHours()).padStart(2, '0');
    const minute = String(now.getMinutes()).padStart(2, '0');
    const second = String(now.getSeconds()).padStart(2, '0');
    return `${year}-${month}-${day} ${hour}:${minute}:${second}`;
  };

  const handleContentSizeChange = () => {
    // Scroll to the bottom when the content size changes
    flatListRef.current.scrollToEnd();
  };

  useLayoutEffect(() => {
    navigation.setOptions({
      headerLeft: () => (
        <TouchableOpacity onPress={handleBackPress}>
          <Ionicons name="arrow-back" size={24} color="#000000" style={styles.backIcon} />
        </TouchableOpacity>
      ),
    });
  }, [navigation]);

  return (
    <View style={styles.container}>
      {isMessagesLoading ? (
        <View style={styles.loadingContainer}>
          <Ionicons name="chatbox-outline" size={64} color="#aaaaaa" />
          <Text style={styles.noMessagesText}>Loading messages...</Text>
        </View>
      ) : conversationData.length > 0 ? (
        <FlatList
          ref={flatListRef}
          data={conversationData}
          renderItem={renderMessage}
          keyExtractor={(item) => (item.id ? item.id.toString() : Math.random().toString())}
          onContentSizeChange={handleContentSizeChange}
          contentContainerStyle={styles.messagesContainer}
        />
      ) : (
        <View style={styles.noMessagesContainer}>
          <Ionicons name="chatbox-outline" size={64} color="#aaaaaa" />
          <Text style={styles.noMessagesText}>No messages available</Text>
        </View>
      )}
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Type your message"
          value={messageText}
          onChangeText={setMessageText}
        />
        <TouchableOpacity style={styles.sendButton} onPress={createNewChatId}>
          <Ionicons name="send" size={24} color="#ffffff" />
        </TouchableOpacity>
      </View>
    </View>
  );
  
};

export default MessagesScreen;
