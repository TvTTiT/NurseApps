import { StyleSheet } from 'react-native';
export const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#ffffff',
  },
  notificationContainer: {
    marginBottom: 16,
    padding: 16,
    backgroundColor: '#f5f5f5',
    borderRadius: 8,
    borderWidth: 2,
  },
  message: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  timestamp: {
    fontSize: 12,
    color: '#888888',
  },
  notificationListContainer: {
    paddingBottom: 16, // Adjust as needed
  },
  noNotificationsContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  noNotificationsText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#888888',
  },
});
