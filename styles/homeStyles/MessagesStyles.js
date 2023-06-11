import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  messagesContainer: {
    flexGrow: 1,
    justifyContent: 'flex-end',
    paddingBottom: 80, // Adjust the paddingBottom to make space for the input container
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  noMessagesContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  noMessagesText: {
    marginTop: 16,
    fontSize: 16,
    color: '#888888',
  },
  messageContainer: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    paddingVertical: 8,
    alignItems: 'center',
  },
  nurseContainer: {
    justifyContent: 'flex-end',
    marginLeft: 'auto',
  },
  patientContainer: {
    justifyContent: 'flex-start',
    marginRight: 'auto',
  },
  messageBubble: {
    borderRadius: 20,
    paddingVertical: 12,
    paddingHorizontal: 16,
    maxWidth: '80%',
    marginBottom: 8,
  },
  nurseBubble: {
    backgroundColor: '#dddddd',
  },
  patientBubble: {
    backgroundColor: '#dddddd',
  },
  nurseMessageText: {
    color: '#000000',
  },
  patientMessageText: {
    color: '#000000',
  },
  timestamp: {
    fontSize: 12,
    marginTop: 4,
    textAlign: 'right',
    color: '#888888',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderTopWidth: 1,
    borderTopColor: '#dddddd',
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#ffffff', // Add a background color to the input container
  },
  input: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 8,
    marginRight: 8,
    fontSize: 16, 
    color: '#000000', 
  },
  sendButton: {
    backgroundColor: '#fb5b5a',
    borderRadius: 20,
    padding: 10,
  },
});
