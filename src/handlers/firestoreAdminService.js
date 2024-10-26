import firestore from '@react-native-firebase/firestore';
import bcrypt from 'react-native-bcrypt';
import { Alert } from 'react-native'; 

const firestoreAdminService = {

  saveAdminData: async (username, password, contactNumber) => {
    try {

      const userDoc = await firestore().collection('Admin').doc(username).get();
      
      if (userDoc.exists) {

        Alert.alert('Error', 'Username already exists. Please choose another username.');
        return 'Username already exists';
      }

      const saltRounds = 10;
      const salt = bcrypt.genSaltSync(saltRounds);  
      const hashedPassword = bcrypt.hashSync(password, salt);  

      await firestore()
        .collection('Admin')
        .doc(username)
        .set({
          username: username,
          password: hashedPassword,
          contactNumber: contactNumber,
        });

      console.log('Admin data added successfully!');
      return 'Success';
    } catch (error) {
      console.error('Error adding Admin data: ', error);
      throw error;
    }
  },

};

export default firestoreAdminService;
