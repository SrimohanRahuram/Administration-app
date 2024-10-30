import firestore from '@react-native-firebase/firestore';
import bcrypt from 'react-native-bcrypt';
import { Alert } from 'react-native'; 

const firestoreEmployeeService = {


  saveEmployeeData: async (userName, ID,password,shareCode,contactNo, Address,maxHours,perHourSalary,maxHoliday) => {
    try {

      const userDoc = await firestore().collection('Employee').doc(ID).get();
      
      if (userDoc.exists) {

        Alert.alert('Error', 'ID already exists. Please choose another ID.');
        return 'ID already exists';
      }

      const saltRounds = 10;
      const salt = bcrypt.genSaltSync(saltRounds);  
      const hashedPassword = bcrypt.hashSync(password, salt);  

      await firestore()
        .collection('Employee')
        .doc(ID)
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


  getAllEmployees: async () => {
    try {
      const employeeCollection = await firestore().collection('Employee').get();
      const employees = employeeCollection.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      }));

      console.log('Retrieved all employee data:', employees);
      return employees;
    } catch (error) {
      console.error('Error retrieving admin data: ', error);
      throw error;
    }
  },

}
  

export default firestoreEmployeeService;
