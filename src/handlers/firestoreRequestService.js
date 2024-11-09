import firestore from '@react-native-firebase/firestore';
import { Alert } from 'react-native'; 
const firestoreRequestService = {
    
    saveAdvanceRequestData: async (advance,employeeId ) => {
        try {
  
          const userDoc = await firestore().collection('Employee').doc(employeeId).get();
 
          if (userDoc.exists) {
   
          const advanceRequestSnapshot=  firestore()
            .collection('Employee')
            .doc(employeeId)
            .collection('AdvanceRequests');

            const newRequest = {
                employeeId:employeeId,
                advance: advance,
                status:'INACTIVE',
              };

            //   const docID = 'specificDocID';
              await advanceRequestSnapshot.add(newRequest);
                console.log('Request Sucessfully sent!');
                 return 'Success';

        }
        } catch (error) {
          console.error('Error adding Shop data: ', error);
          throw error;
        }
      },

      saveLeaveRequestData: async (from,To,employeeId ) => {
        try {
  
          const userDoc = await firestore().collection('Employee').doc(employeeId).get();
 
          if (userDoc.exists) {
   
          const advanceRequestSnapshot=  firestore()
            .collection('Employee')
            .doc(employeeId)
            .collection('LeaveRequests');

            const newRequest = {
                employeeId:employeeId,
                from: from,
                To:To,
                status:'INACTIVE',
              };

            //   const docID = 'specificDocID';
              await advanceRequestSnapshot.add(newRequest);
                console.log('Request Sucessfully sent!');
                 return 'Success';

        }
        } catch (error) {
          console.error('Error sent Request data: ', error);
          throw error;
        }
      },

      saveHolidayRequestData: async (from,To,Hours,employeeId ) => {
        try {
  
          const userDoc = await firestore().collection('Employee').doc(employeeId).get();
 
          if (userDoc.exists) {
   
          const advanceRequestSnapshot=  firestore()
            .collection('Employee')
            .doc(employeeId)
            .collection('HolidayRequests');

            const newRequest = {
                employeeId:employeeId,
                from: from,
                To:To,
                Hours:Hours,
                status:'INACTIVE',
              };

            //   const docID = 'specificDocID';
              await advanceRequestSnapshot.add(newRequest);
                console.log('Request Sucessfully sent!');
                 return 'Success';

        }
        } catch (error) {
          console.error('Error sent Request data: ', error);
          throw error;
        }
      },

      getAdvanceRequestsByEmployeeID: async (employeeID) => {
        try {
          const employeeDoc = await firestore().collection('Employee').doc(employeeID).get();
          if (employeeDoc.exists) {
       
          const advanceRequestSnapshot=  await firestore()
            .collection('Employee')
            .doc(employeeID)
            .collection('AdvanceRequests')
            .get();            

        const AdvanceRequestsData = advanceRequestSnapshot.docs
        .filter(doc => doc.data().status !== 'ACTIVE') // Only include requests where status is not 'active'
        .map(doc => ({
          id: doc.id,
          ...doc.data(),
        }));

          console.log('RetrievedAdvanceRequestsData:', AdvanceRequestsData);
          return AdvanceRequestsData;
        }
        } catch (error) {
          console.error('Error retrieving AdvanceRequestsData by ID: ', error);
          throw error;
        }
      },

      getLeaveRequestsByEmployeeID: async (employeeID) => {
        try {
          const employeeDoc = await firestore().collection('Employee').doc(employeeID).get();
          if (employeeDoc.exists) {
       
          const leaveRequestSnapshot=  await firestore()
            .collection('Employee')
            .doc(employeeID)
            .collection('LeaveRequests')
            .get();            

        const LeaveRequestsData = leaveRequestSnapshot.docs
        .filter(doc => doc.data().status !== 'ACTIVE') // Only include requests where status is not 'active'
        .map(doc => ({
          id: doc.id,
          ...doc.data(),
        }));

          console.log('Retrieved LeaveRequestsData:', LeaveRequestsData);
          return LeaveRequestsData;
        }
        } catch (error) {
          console.error('Error retrieving LeaveRequestsData by ID: ', error);
          throw error;
        }
      },

      getHolidayRequestsByEmployeeID: async (employeeID) => {
        try {
          const employeeDoc = await firestore().collection('Employee').doc(employeeID).get();
          if (employeeDoc.exists) {
       
          const holidayRequestSnapshot=  await firestore()
            .collection('Employee')
            .doc(employeeID)
            .collection('HolidayRequests')
            .get();            

        const HolidayRequestsData = holidayRequestSnapshot.docs
        .filter(doc => doc.data().status !== 'ACTIVE') // Only include requests where status is not 'active'
        .map(doc => ({
          id: doc.id,
          ...doc.data(),
        }));
    
          console.log('Retrieved HolidayRequestsData:', HolidayRequestsData);
          return HolidayRequestsData;
        }
        } catch (error) {
          console.error('Error retrieving HolidayRequestsData by ID: ', error);
          throw error;
        }
      },

}

export default firestoreRequestService;