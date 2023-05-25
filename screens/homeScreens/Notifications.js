import React from 'react';
import { View, Text, FlatList, TouchableOpacity } from 'react-native';
import { styles } from '../../styles/homeStyles/NotificationStyles';
const Notifications = () => {
    const notificationsData = [
      {
        notification_id: '1',
        patient_id: 'P001',
        medical_professional_id: 'M001',
        message: 'Patient P001 has abnormal body temperature.',
        timestamp: '2023-05-22 11:40 AM',
        priority: 'High',
        notification_type: 'Health Data',
        acknowledged: false,
      },
      {
        notification_id: '2',
        patient_id: 'P002',
        medical_professional_id: 'M002',
        message: 'Patient P002 has abnormal blood pressure.',
        timestamp: '2023-05-22 11:45 AM',
        priority: 'High',
        notification_type: 'Health Data',
        acknowledged: false,
      },
      // Add more notifications here
    ];
  
    const handleNotificationPress = (notification) => {
      // Handle notification press here
      console.log('Notification Pressed:', notification);
    };
  
    const renderNotification = ({ item }) => {
      return (
        <TouchableOpacity
          style={styles.notificationContainer}
          onPress={() => handleNotificationPress(item)}
        >
          <Text style={styles.message}>{item.message}</Text>
          <Text style={styles.timestamp}>{item.timestamp}</Text>
        </TouchableOpacity>
      );
    };
  
    return (
      <View style={styles.container}>
        <FlatList
          data={notificationsData}
          renderItem={renderNotification}
          keyExtractor={(item) => item.notification_id}
        />
      </View>
    );
  };
  
  export default Notifications;