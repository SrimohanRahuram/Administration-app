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
          contactNo: contactNumber,
        });

      console.log('Admin data added successfully!');
      return 'Success';
    } catch (error) {
      console.error('Error adding Admin data: ', error);
      throw error;
    }
  },

  getAllAdmins: async () => {
    try {
      const adminCollection = await firestore().collection('Admin').get();
      const admins = adminCollection.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      }));

      console.log('Retrieved all admin data:', admins);
      return admins;
    } catch (error) {
      console.error('Error retrieving admin data: ', error);
      throw error;
    }
  },

  editAdminData: async (username, updatedData) => {
    try {
      const adminDocRef = firestore().collection('Admin').doc(username);
      const adminDoc = await adminDocRef.get();

      if (!adminDoc.exists) {
        Alert.alert('Error', 'Admin does not exist.');
        return 'Admin not found';
      }

      // Update admin data
      if (updatedData.password) {
        const saltRounds = 10;
        const salt = bcrypt.genSaltSync(saltRounds);
        updatedData.password = bcrypt.hashSync(updatedData.password, salt);
      }

      await adminDocRef.update(updatedData);
      console.log('Admin data updated successfully!');
      return 'Success';
    } catch (error) {
      console.error('Error updating admin data: ', error);
      throw error;
    }
  },

  deleteAdminData: async (username) => {
    try {
      const adminDocRef = firestore().collection('Admin').doc(username);
      const adminDoc = await adminDocRef.get();

      if (!adminDoc.exists) {
        Alert.alert('Error', 'Admin does not exist.');
        return 'Admin not found';
      }

      await adminDocRef.delete();
      console.log('Admin data deleted successfully!');
      return 'Success';
    } catch (error) {
      console.error('Error deleting admin data: ', error);
      throw error;
    }
  },

};

export default firestoreAdminService;
