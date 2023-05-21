import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fb5b5a',
  },
  backButton: {
    position: 'absolute',
    top: 20,
    left: 20,
    padding: 10,
    zIndex: 1,
  },
  backButtonText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
  },
  detailsContainer: {
    width: '80%',
    backgroundColor: '#ffffff',
    padding: 20,
    borderRadius: 10,
  },
  fieldContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  fieldLabel: {
    flex: 1,
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fb5b5a',
  },
  fieldValue: {
    flex: 1,
    fontSize: 16,
    color: '#333333',
  },
});
