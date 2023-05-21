import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f0f0',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 16,
    textTransform: 'uppercase',
  },
  card: {
    backgroundColor: '#fb5b5a',
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
    width: '80%',
  },
  infoText: {
    fontSize: 18,
    color: '#fff',
    marginBottom: 8,
    textAlign: 'center',
  },
  tabButton: {
    backgroundColor: '#fff',
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 24,
    alignSelf: 'center',
    marginBottom: 16,
  },
  tabButtonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fb5b5a',
    textTransform: 'uppercase',
  },
  logoutButton: {
    backgroundColor: '#fff',
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 24,
    alignSelf: 'center',
  },
  logoutButtonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fb5b5a',
    textTransform: 'uppercase',
  },
  tabContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    width: '100%',
    marginBottom: 16,
  },
  tabButton: {
    alignItems: 'center',
  },
  tabButtonText: {
    fontSize: 12,
    color: '#fb5b5a',
    marginTop: 4,
  }, 
});
