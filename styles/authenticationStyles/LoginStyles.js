import { StyleSheet } from 'react-native';
export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
      },
      logo: {
        fontWeight: 'bold',
        fontSize: 50,
        color: '#fb5b5a',
        marginBottom: 40,
      },
      inputView: {
        width: '80%',
        backgroundColor: '#fff',
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 25,
        height: 50,
        marginBottom: 20,
        justifyContent: 'center',
        padding: 20,
      },
      inputText: {
        height: 50,
        color: 'black',
      },
      loginBtn: {
        width: '80%',
        backgroundColor: '#fb5b5a',
        borderRadius: 25,
        height: 50,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 40,
        marginBottom: 10,
      },
      loginText: {
        color: 'white',
      },
      forgot: {
        color: '#fb5b5a',
        fontSize: 12,
      },
      signup: {
        color: '#003f5c',
        fontSize: 12,
      },
      createBtn: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#4285F4',
        height: 50,
        borderRadius: 25,
        marginTop: 20,
        marginBottom: 10,
        width: '80%',
        justifyContent: 'center',
      },
       reateText: {
        marginLeft: 10,
        color: 'white',
        fontSize: 16,
      },
      googleIcon: {
        height: 20,
        width: 20,
      },
  });