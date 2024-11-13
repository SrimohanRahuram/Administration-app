import firestore from '@react-native-firebase/firestore';
import bcrypt from 'react-native-bcrypt';
import {Alert} from 'react-native';
import moment from 'moment';

const firestoreEmployeeService = {
  saveEmployeeData: async (
    userName,
    ID,
    password,
    shareCode,
    contactNo,
    Address,
    maxHours,
    perHourSalary,
    maxHoliday,
  ) => {
    try {
      const userDoc = await firestore().collection('Employee').doc(ID).get();

      if (userDoc.exists) {
        Alert.alert('Error', 'ID already exists. Please choose another ID.');
        return 'ID already exists';
      }

      const saltRounds = 10;
      const salt = bcrypt.genSaltSync(saltRounds);
      const hashedPassword = bcrypt.hashSync(password, salt);

      await firestore().collection('Employee').doc(ID).set({
        userName: userName,
        ID: ID,
        password: hashedPassword,
        contactNo: contactNo,
        shareCode: shareCode,
        Address: Address,
        maxHours: maxHours,
        perHourSalary: perHourSalary,
        maxHoliday: maxHoliday,
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

  editEmplyeeData: async (ID, updatedData) => {
    try {
      const employeeDocRef = firestore().collection('Employee').doc(ID);
      const employeeDoc = await employeeDocRef.get();

      if (!employeeDoc.exists) {
        Alert.alert('Error', 'Employee does not exist.');
        return 'Employee not found';
      }

      // Update admin data
      if (updatedData.password) {
        const saltRounds = 10;
        const salt = bcrypt.genSaltSync(saltRounds);
        updatedData.password = bcrypt.hashSync(updatedData.password, salt);
      }

      await employeeDocRef.update(updatedData);
      console.log('Employee data updated successfully!');

      return 'Success';
    } catch (error) {
      console.error('Error updating Employee data: ', error);
      throw error;
    }
  },

  deleteEmployeeData: async ID => {
    try {
      const employeeDocRef = firestore().collection('Employee').doc(ID);
      const employeeDoc = await employeeDocRef.get();

      if (!employeeDoc.exists) {
        Alert.alert('Error', 'Employee does not exist.');
        return 'Employee not found';
      }

      await employeeDocRef.delete();
      console.log('Employee data deleted successfully!');
      return 'Success';
    } catch (error) {
      console.error('Error deleting Employee data: ', error);
      throw error;
    }
  },

  getEmployeeDataByID: async employeeID => {
    try {
      const employeeDoc = await firestore()
        .collection('Employee')
        .doc(employeeID)
        .get();

      if (!employeeDoc.exists) {
        Alert.alert('Error', 'Employee does not exist.');
        return null;
      }

      const employeeData = {
        id: employeeDoc.id,
        ...employeeDoc.data(),
      };

      console.log('Retrieved employee data:', employeeData);
      return employeeData;
    } catch (error) {
      console.error('Error retrieving Employee data by ID: ', error);
      throw error;
    }
  },

  saveLoginTimeAndDate: async (checkInOutDateTime, shopID, employeeId) => {
    try {
      const userDoc = await firestore()
        .collection('Employee')
        .doc(employeeId)
        .get();

      if (userDoc.exists) {
        const formattedDate = moment(checkInOutDateTime).format('YYYY-MM-DD');
        let currentDate = new Date();
        let hours = currentDate.getHours();
        let minutes = currentDate.getMinutes();
        if (minutes < 30) {
          minutes = 30;
        } else {
          minutes = 0;
          hours += 1;
        }
        currentDate.setHours(hours, minutes, 0, 0);
        const formattedTime = moment(currentDate).format('HH:mm');

        const shopLoginRef = firestore()
          .collection('Employee')
          .doc(employeeId)
          .collection('shoplogin')
          .doc(shopID)
          .collection(formattedDate);

        const latestDocSnapshot = await shopLoginRef
          .orderBy('checkInDateTime', 'desc')
          .limit(1)
          .get();

        let newStatus = 'ACTIVE';
        let timeDifference = null;

        if (!latestDocSnapshot.empty) {
          const lastDocData = latestDocSnapshot.docs[0].data();
          const lastCheckIn = moment(lastDocData.checkInDateTime, 'HH:mm');
          const currentTime = moment(formattedTime, 'HH:mm');
          timeDifference = currentTime.diff(lastCheckIn, 'minutes');
          newStatus = lastDocData.status === 'ACTIVE' ? 'INACTIVE' : 'ACTIVE';
        }

        const newRequest = {
          checkInDateTime:
            newStatus === 'ACTIVE'
              ? formattedTime
              : latestDocSnapshot.docs[0]?.data().checkInDateTime,
          checkOutDateTime: newStatus === 'INACTIVE' ? formattedTime : '',
          shopID: shopID,
          status: newStatus,
          hoursOfWork: timeDifference,
        };

        const advanceRequestRef = shopLoginRef.doc(formattedTime);
        await advanceRequestRef.set(newRequest);

        console.log('Request Successfully sent!');
        return 'Success';
      }
    } catch (error) {
      console.error('Error adding Shop data: ', error);
      throw error;
    }
  },
};

export default firestoreEmployeeService;
