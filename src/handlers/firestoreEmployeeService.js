import firestore from '@react-native-firebase/firestore';
import bcrypt from 'react-native-bcrypt';
import { Alert } from 'react-native'; 

const firestoreEmployeeService = {


  saveEmployeeData: async (userName, ID,password,shareCode,contactNo, Address,maxHours,perHourSalary,maxHoliday) => {
    try {

      const userDoc = await firestore().collection('Employee').doc(userName).get();
      
      if (userDoc.exists) {

        Alert.alert('Error', 'Username already exists. Please choose another username.');
        return 'Username already exists';
      }

      const saltRounds = 10;
      const salt = bcrypt.genSaltSync(saltRounds);  
      const hashedPassword = bcrypt.hashSync(password, salt);  

      await firestore()
        .collection('Employee')
        .doc(userName)
        .set({
          userName: userName,
          ID:ID,
          password: hashedPassword,
          contactNo:contactNo,
          shareCode:shareCode,
          Address:Address,
          maxHours:maxHours,
          perHourSalary:perHourSalary,
          maxHoliday:maxHoliday
        });

      console.log('Emlpoyeer data added successfully!');
      return 'Success';
    } catch (error) {
      console.error('Error adding Employee data: ', error);
      throw error;
    }
  },
}
  

export default firestoreEmployeeService;
