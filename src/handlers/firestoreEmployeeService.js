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
 
  getAdminDataByID: async adminId => {
    try {
      const adminDoc = await firestore()
        .collection('Admin')
        .doc(adminId)
        .get();

      if (!adminDoc.exists) {
        Alert.alert('Error', 'Employee does not exist.');
        return null;
      }

      const adminData = {
        username: adminDoc.username,
        ...adminDoc.data(),
      };

      console.log('Retrieved employee data:', adminData);
      return adminData;
    } catch (error) {
      console.error('Error retrieving Employee data by ID: ', error);
      throw error;
    }
  },


  saveLoginTimeAndDate: async (shopName, shopID, employeeId) => {
    try {
      const userDoc = await firestore()
        .collection('Employee')
        .doc(employeeId)
        .get();

      if (userDoc.exists) {
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

        let currentDate2 = new Date();
        let hours2 = currentDate2.getHours();
        let minutes2 = currentDate2.getMinutes();
        if (minutes2 < 30) {
          minutes2 = 0;
        } else {
          minutes2 = 30;
        }
        currentDate2.setHours(hours2, minutes2, 0, 0);
        const formattedTime2 = moment(currentDate2).format('HH:mm');

        const shopLoginRef = firestore()
          .collection('Employee')
          .doc(employeeId)
          .collection('shoplogin');
        const latestDocSnapshot = await shopLoginRef
          .orderBy('createdAt', 'desc')
          .limit(1)
          .get();

        let newStatus = 'ACTIVE';
        let timeDifference = 0;

        if (!latestDocSnapshot.empty) {
          const lastDocData = latestDocSnapshot.docs[0].data();
          const lastDocId = latestDocSnapshot.docs[0].id;
          if (lastDocData.status === 'ACTIVE') {
            const lastCheckIn = moment(lastDocData.checkInDateTime, 'HH:mm');
            const currentTime = moment(formattedTime2, 'HH:mm');
            if (currentTime.diff(lastCheckIn, 'minutes') < 0) {
              timeDifference = 0;
            } else {
              timeDifference = currentTime.diff(lastCheckIn, 'hours');
            }
            newStatus = 'INACTIVE';
            await shopLoginRef.doc(lastDocId).delete();
          }
        }

        const newRequest = {
          checkInDateTime:
            newStatus === 'ACTIVE'
              ? formattedTime
              : latestDocSnapshot.docs[0]?.data().checkInDateTime,
          checkOutDateTime:
            newStatus === 'INACTIVE'
              ? formattedTime2 > formattedTime
                ? formattedTime2
                : formattedTime
              : '',
          shopID: shopID,
          status: newStatus,
          hoursOfWork: timeDifference,
          createdAt: firestore.FieldValue.serverTimestamp(),
          shopName: shopName,
        };

        const advanceRequestRef = shopLoginRef.doc();
        await advanceRequestRef.set(newRequest);

        console.log('Request Successfully sent!');
        return 'Success';
      }
    } catch (error) {
      console.error('Error adding Shop data: ', error);
      throw error;
    }
  },

  getLastWorkingDetails: async employeeId => {
    try {
      const shopLoginRef = firestore()
        .collection('Employee')
        .doc(employeeId)
        .collection('shoplogin');

      const latestDocSnapshot = await shopLoginRef
        .orderBy('createdAt', 'desc')
        .limit(1)
        .get();

      if (!latestDocSnapshot.empty) {
        const lastDocData = latestDocSnapshot.docs[0].data();
        console.log('Last Working Details:', lastDocData);
        return {
          status: lastDocData.status || 'Unknown status',
          shopID: lastDocData.shopID || 'No shopID',
          shopName: lastDocData.shopName || 'No shopName',
          checkInDateTime: lastDocData.checkInDateTime || 'No checkInDateTime',
          checkOutDateTime: lastDocData.checkOutDateTime || 'No checkOutDateTime',
          createdAt: lastDocData.createdAt || 'No createdAt',
        };
      } else {
        console.log('No working details found for today.');
        return {
          status: 'N/A',
          shopID: 'N/A',
          shopName: 'N/A',
          checkInDateTime: 'N/A',
          checkOutDateTime: 'N/A',
          createdAt: 'N/A',
        };
      }
    } catch (error) {
      console.error('Error fetching last working details:', error);
      throw error;
    }
  },

  employeeTotalHoursCalc: async employeeID => {
    let totalHolidaySum = 0;
    try {
      const employeeDoc = await firestore()
        .collection('Employee')
        .doc(employeeID)
        .get();
      if (employeeDoc.exists) {
        const employeeTotalHoursCalcSnapshot = await firestore()
          .collection('Employee')
          .doc(employeeID)
          .collection('HolidayRequests')
          .get();
          
        
        for (const doc of employeeTotalHoursCalcSnapshot.docs) {
          const data = doc.data();
          if (data.status === 'APPROVED') { 
            totalHolidaySum += data.Hours || 0; 
          }// Add totalHours, default to 0 if not present
        }

        console.log('totalHolidaySum:', totalHolidaySum);
       
      }
      return totalHolidaySum;

    } catch (error) {
      console.error('Error retrieving totalHolidaySum by ID: ', error);
      throw error;
    }
  },

  employeeTotalAdvanceCalc: async employeeID => {
    let totalAdvanceSum = 0;
    try {
      const employeeDoc = await firestore()
        .collection('Employee')
        .doc(employeeID)
        .get();
      if (employeeDoc.exists) {
        const employeeTotalAdvanceCalcSnapshot = await firestore()
          .collection('Employee')
          .doc(employeeID)
          .collection('AdvanceRequests')
          .get();
          
        
        for (const doc of employeeTotalAdvanceCalcSnapshot.docs) {
          const data = doc.data();
          if (data.status === 'APPROVED') { 
            totalAdvanceSum += data.advance || 0; 
          }// Add totalHours, default to 0 if not present
        }

        console.log('totalAdvanceSum:', totalAdvanceSum);
       
      }
      return totalAdvanceSum;

    } catch (error) {
      console.error('Error retrieving totalAdvanceSum by ID: ', error);
      throw error;
    }
  },

};

export default firestoreEmployeeService;
