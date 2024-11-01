import firestore from '@react-native-firebase/firestore';
import bcrypt from 'react-native-bcrypt';
import { Alert } from 'react-native'; 

const firestoreLoginService = {

  loginUser: async (username, password) => {
    try {
      let userDoc;
      let collectionName;

      userDoc = await firestore().collection('Admin').doc(username).get();
      collectionName = 'Admin';

      if (!userDoc.exists) {
        userDoc = await firestore().collection('Employee').doc(username).get();
        collectionName = 'Employee';
      }

      if (!userDoc.exists) {

        Alert.alert('Error', 'Username not found. Please check your username.');
        return 'Username not found';
      }

      const { password: hashedPassword } = userDoc.data();


      const isPasswordValid = bcrypt.compareSync(password, hashedPassword);
      
      if (!isPasswordValid) {

        Alert.alert('Error', 'Incorrect password. Please try again.');
        return 'Invalid password';
      }

      const successMessage = collectionName === 'Admin'
        ? 'Admin login successful!'
        : 'Employee login successful!';
        
      console.log(successMessage);
      return successMessage;
    } catch (error) {
      console.error('Error logging in: ', error);
      throw error;
    }
  },


};

export default firestoreLoginService;
