import React, { useContext, useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity } from 'react-native';
import { styles } from '../../styles/homeStyles/NotificationStyles';
import { supabase } from '../../supabase/supabaseConfig';
import { UserContext } from '../../App';

const Notifications = () => {
  const { medicalProfessionalId } = useContext(UserContext);
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    fetchNotifications();

    // Subscribe to the channel for new notification events
    const newNotificationSubscription = supabase
      .channel('new-notification-chanel')
      .on('postgres_changes', {
        event: 'INSERT',
        schema: 'public',
        table: 'notifications',
      }, handleNewNotification)
      .subscribe();

    // Unsubscribe from the channel when the component unmounts
    return () => {
      newNotificationSubscription.unsubscribe();
    };
  }, [medicalProfessionalId]);

  const fetchNotifications = async () => {
    try {
      const { data, error } = await supabase
        .from('notifications')
        .select('*')
        .eq('medical_professional_id', medicalProfessionalId);

      if (error) {
        console.error('Error fetching notifications:', error);
      } else {
        setNotifications(data);
      }
    } catch (error) {
      console.error('Error fetching notifications:', error);
    }
  };

  const handleNewNotification = (payload) => {
    // Retrieve the new notification from the payload
    const newNotification = payload.new;

    // Update the notifications state by adding the new notification
    setNotifications((prevNotifications) => [...prevNotifications, newNotification]);
  };

  const handleNotificationPress = (notification) => {
    console.log('Notification Pressed:', notification);
  };

  const renderNotification = ({ item }) => {
    let priorityColor;
    if (item.priority.toLowerCase() === 'high') {
      priorityColor = '#FF0000'; // Red for high priority
    } else if (item.priority.toLowerCase() === 'medium') {
      priorityColor = '#008000'; // Green for medium priority
    } else {
      priorityColor = '#000000'; // Black for low priority
    }

    return (
      <TouchableOpacity
        style={[styles.notificationContainer, { borderColor: priorityColor }]}
        onPress={() => handleNotificationPress(item)}
      >
        <Text style={[styles.message, { color: priorityColor }]}>{item.message}</Text>
        <Text style={styles.timestamp}>{item.timestamp}</Text>
      </TouchableOpacity>
    );
  };

  const renderNoNotifications = () => (
    <View style={styles.noNotificationsContainer}>
      <Text style={styles.noNotificationsText}>No notifications found.</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      {notifications.length > 0 ? (
        <FlatList
          data={notifications}
          renderItem={renderNotification}
          keyExtractor={(item) => item.notification_id}
          contentContainerStyle={styles.notificationListContainer}
        />
      ) : (
        renderNoNotifications()
      )}
    </View>
  );
};

export default Notifications;
