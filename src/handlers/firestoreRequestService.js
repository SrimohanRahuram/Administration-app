import firestore from '@react-native-firebase/firestore';
import {Alert} from 'react-native';
const firestoreRequestService = {
  saveAdvanceRequestData: async (advance, employeeId) => {
    try {
      const userDoc = await firestore()
        .collection('Employee')
        .doc(employeeId)
        .get();

      if (userDoc.exists) {
        const advanceRequestSnapshot = firestore()
          .collection('Employee')
          .doc(employeeId)
          .collection('AdvanceRequests');

        const newRequest = {
          employeeId: employeeId,
           advance:Number(advance),
          status: 'INACTIVE',
          requestTime: firestore.FieldValue.serverTimestamp(),
          CreatedTime: firestore.FieldValue.serverTimestamp(),
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

  saveLeaveRequestData: async (from, To, employeeId) => {
    try {
      const userDoc = await firestore()
        .collection('Employee')
        .doc(employeeId)
        .get();

      if (userDoc.exists) {
        const advanceRequestSnapshot = firestore()
          .collection('Employee')
          .doc(employeeId)
          .collection('LeaveRequests');

        const newRequest = {
          employeeId: employeeId,
          from: from,
          To: To,
          status: 'INACTIVE',
          CreatedTime: firestore.FieldValue.serverTimestamp(),
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

  saveHolidayRequestData: async (from, To, Hours, employeeId) => {
    try {
      const userDoc = await firestore()
        .collection('Employee')
        .doc(employeeId)
        .get();

      if (userDoc.exists) {
        const advanceRequestSnapshot = firestore()
          .collection('Employee')
          .doc(employeeId)
          .collection('HolidayRequests');

        const newRequest = {
          employeeId: employeeId,
          from: from,
          To: To,
          Hours: Number(Hours),
          status: 'INACTIVE',
          CreatedTime: firestore.FieldValue.serverTimestamp(),
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

  getAdvanceRequestsByEmployeeID: async employeeID => {
    try {
      const employeeDoc = await firestore()
        .collection('Employee')
        .doc(employeeID)
        .get();
      if (employeeDoc.exists) {
        const advanceRequestSnapshot = await firestore()
          .collection('Employee')
          .doc(employeeID)
          .collection('AdvanceRequests')
          .get();

        const AdvanceRequestsData = advanceRequestSnapshot.docs
          .filter(doc => doc.data().status == 'INACTIVE') // Only include requests where status is not 'active'
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

  getLeaveRequestsByEmployeeID: async employeeID => {
    try {
      const employeeDoc = await firestore()
        .collection('Employee')
        .doc(employeeID)
        .get();
      if (employeeDoc.exists) {
        const leaveRequestSnapshot = await firestore()
          .collection('Employee')
          .doc(employeeID)
          .collection('LeaveRequests')
          .get();

        const LeaveRequestsData = leaveRequestSnapshot.docs
          .filter(doc => doc.data().status == 'INACTIVE') // Only include requests where status is not 'active'
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

  getHolidayRequestsByEmployeeID: async employeeID => {
    try {
      const employeeDoc = await firestore()
        .collection('Employee')
        .doc(employeeID)
        .get();
      if (employeeDoc.exists) {
        const holidayRequestSnapshot = await firestore()
          .collection('Employee')
          .doc(employeeID)
          .collection('HolidayRequests')
          .get();

        const HolidayRequestsData = holidayRequestSnapshot.docs
          .filter(doc => doc.data().status == 'INACTIVE') // Only include requests where status is not 'active'
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

  getShopLoginByEmployeeID: async employeeID => {
    try {
      const employeeDoc = await firestore()
        .collection('Employee')
        .doc(employeeID)
        .get();
      if (employeeDoc.exists) {
        const ShopLoginDataSnapshot = await firestore()
          .collection('Employee')
          .doc(employeeID)
          .collection('shoplogin')
          .get();

        const ShopLoginData = ShopLoginDataSnapshot.docs
          .filter(doc => doc.data().status == 'INACTIVE') // Only include requests where status is not 'inactive'
          .map(doc => ({
            id: doc.id,
            ...doc.data(),
          }));

        console.log('Retrieved ShopLoginData:', ShopLoginData);
        return ShopLoginData;
      }
    } catch (error) {
      console.error('Error retrievingShopLoginData by ID: ', error);
      throw error;
    }
  },


  editApproveAdvanceRequestStatus: async (employeeID, requestID, newStatus) => {
 
    try {
      const employeeDoc = await firestore()
        .collection('Employee')
        .doc(employeeID)
        .get();
  
      if (employeeDoc.exists) {
        const requestDocRef = firestore()
          .collection('Employee')
          .doc(employeeID)
          .collection('AdvanceRequests')
          .doc(requestID);
  
        const requestDoc = await requestDocRef.get();
        if (requestDoc.exists) {
          await requestDocRef.update({ status: newStatus , requestTime: firestore.FieldValue.serverTimestamp() });
          console.log(`Advance request ${requestID} status updated to: ${newStatus}`);
          return { success: true, message: 'Status updated successfully' };
        } else {
          throw new Error('Advance request not found');
        }
      } else {
        throw new Error('Employee not found');
      }
    } 
    catch (error) {
      console.error('Error updating AdvanceRequest status1: ', error);
      throw error;
    }
  },

  editApproveLeaveRequestStatus: async (employeeID, requestID, newStatus) => {
    try {
      const employeeDoc = await firestore()
        .collection('Employee')
        .doc(employeeID)
        .get();
  
      if (employeeDoc.exists) {
        const requestDocRef = firestore()
          .collection('Employee')
          .doc(employeeID)
          .collection('LeaveRequests')
          .doc(requestID);
  
        const requestDoc = await requestDocRef.get();
        if (requestDoc.exists) {
          await requestDocRef.update({ status: newStatus ,  requestTime: firestore.FieldValue.serverTimestamp() });
          console.log(`Leave request ${requestID} status updated to: ${newStatus}`);
          return { success: true, message: 'Status updated successfully' };
        } else {
          throw new Error('Leave request not found');
        }
      } else {
        throw new Error('Employee not found');
      }
    } 
    catch (error) {
      console.error('Error updating LeaveRequest status1: ', error);
            throw error;
    }
  },

  getActiveHolidayRequestsByEmployeeID: async employeeID => {
    try {
      const employeeDoc = await firestore()
        .collection('Employee')
        .doc(employeeID)
        .get();
      if (employeeDoc.exists) {
        const holidayRequestSnapshot = await firestore()
          .collection('Employee')
          .doc(employeeID)
          .collection('HolidayRequests')
          .get();

        const HolidayRequestsData = holidayRequestSnapshot.docs
          .filter(doc => doc.data().status === 'APPROVED')
          .map(doc => ({
            id: doc.id,
            ...doc.data(),
          }));

        console.log(
          'Retrieved ActiveHolidayRequestsData:',
          HolidayRequestsData,
        );
        return HolidayRequestsData;
      }
    } catch (error) {
      console.error(
        'Error retrieving ActiveHolidayRequestsData by ID: ',
        error,
      );
      throw error;
    }
  },


  editApproveHolidayRequestStatus: async (employeeID, requestID, newStatus) => {
  
    try {
      const employeeDoc = await firestore()
        .collection('Employee')
        .doc(employeeID)
        .get();
  
      if (employeeDoc.exists) {
        const requestDocRef = firestore()
          .collection('Employee')
          .doc(employeeID)
          .collection('HolidayRequests')
          .doc(requestID);
  
        const requestDoc = await requestDocRef.get();
        if (requestDoc.exists) {
          await requestDocRef.update({ status: newStatus });
          console.log(`Holiday request ${requestID} status updated to: ${newStatus}`);
          return { success: true, message: 'Status updated successfully' };
        } else {
          throw new Error('Holiday request not found');
        }
      } else {
        throw new Error('Employee not found');
      }
    } 
    catch (error) {
      console.error('Error updating HolidayRequest status1: ', error);
      throw error;
    }
  },


  editActiveHolidayRequestsByEmployeeID: async (id, count, employeeID) => {
    console.log(employeeID);
    try {
      const employeeDoc = await firestore()
        .collection('Employee')
        .doc(employeeID)
        .get();

      if (employeeDoc.exists) {
        const holidayRequestRef = firestore()
          .collection('Employee')
          .doc(employeeID)
          .collection('shoplogin')
          .doc(id);
        const holidayRequestSnapshot = await holidayRequestRef.get();
        if (holidayRequestSnapshot.exists) {
          await holidayRequestRef.update({
            hoursOfWork: count,
          });
          return 'Success';
        } else {
          return 'Error';
        }
      } else {
        console.error('Employee document not found');
      }
    } catch (error) {
      console.error('Error updating HolidayRequestsData by ID: ', error);
      throw error;
    }
  },

  editAdvancePaymentByAdmin: async (id, EditAdvance, employeeID) => {
    console.log(employeeID);
    try {
      const employeeDoc = await firestore()
        .collection('Employee')
        .doc(employeeID)
        .get();

      if (employeeDoc.exists) {
        const advanceRequestRef = firestore()
          .collection('Employee')
          .doc(employeeID)
          .collection('AdvanceRequests')
          .doc(id);
        const advanceRequestSnapshot = await advanceRequestRef.get();
        if (advanceRequestSnapshot.exists) {
          await advanceRequestRef.update({
            advance: EditAdvance,
          });
          return 'Success';
        } else {
          return 'Error';
        }
      } else {
        console.error('Employee document not found');
      }
    } catch (error) {
      console.error('Error updating advanceRequest by ID: ', error);
      throw error;
    }
  },

  editAdvanceStatusByAdmin: async (id, EditAdvanceStatus, employeeID) => {
    console.log(employeeID);
    try {
      const employeeDoc = await firestore()
        .collection('Employee')
        .doc(employeeID)
        .get();

      if (employeeDoc.exists) {
        const advanceRequestRef = firestore()
          .collection('Employee')
          .doc(employeeID)
          .collection('AdvanceRequests')
          .doc(id);
        const advanceRequestSnapshot = await advanceRequestRef.get();
        if (advanceRequestSnapshot.exists) {
          await advanceRequestRef.update({
            status: EditAdvanceStatus,
          });
          return 'Success';
        } else {
          return 'Error';
        }
      } else {
        console.error('Employee document not found');
      }
    } catch (error) {
      console.error('Error updating advanceRequest by ID: ', error);
      throw error;
    }
  },

  editHolidayHoursByAdmin: async (id, EditHolidayHours, employeeID) => {
    console.log(employeeID);
    try {
      const employeeDoc = await firestore()
        .collection('Employee')
        .doc(employeeID)
        .get();

      if (employeeDoc.exists) {
        const advanceRequestRef = firestore()
          .collection('Employee')
          .doc(employeeID)
          .collection('HolidayRequests')
          .doc(id);
        const advanceRequestSnapshot = await advanceRequestRef.get();
        if (advanceRequestSnapshot.exists) {
          await advanceRequestRef.update({
            Hours: EditHolidayHours,
          });
          return 'Success';
        } else {
          return 'Error';
        }
      } else {
        console.error('Employee document not found');
      }
    } catch (error) {
      console.error('Error updating advanceRequest by ID: ', error);
      throw error;
    }
  },

  getAllAdvanceRequestsByEmployeeID: async employeeID => {
    try {
      const employeeDoc = await firestore()
        .collection('Employee')
        .doc(employeeID)
        .get();
      if (employeeDoc.exists) {
        const advanceRequestSnapshot = await firestore()
          .collection('Employee')
          .doc(employeeID)
          .collection('AdvanceRequests')
          .get();

        const AdvanceRequestsData = advanceRequestSnapshot.docs
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

  getAllApprovedAdvanceRequestsByEmployeeID: async employeeID => {
    try {
      const employeeDoc = await firestore()
        .collection('Employee')
        .doc(employeeID)
        .get();
      if (employeeDoc.exists) {
        const approvedAdvanceRequestSnapshot = await firestore()
          .collection('Employee')
          .doc(employeeID)
          .collection('AdvanceRequests')
          .get();

        const approvedAdvanceRequestsData = approvedAdvanceRequestSnapshot.docs
        .filter(doc => doc.data().status == 'APPROVED')
          .map(doc => ({
            id: doc.id,
            ...doc.data(),
          }));

        console.log('RetrievedAdvanceRequestsData:', approvedAdvanceRequestsData);
        return approvedAdvanceRequestsData;
      }
    } catch (error) {
      console.error('Error retrieving AdvanceRequestsData by ID: ', error);
      throw error;
    }
  },

  getAllLeaveRequestsByEmployeeID: async employeeID => {
    try {
      const employeeDoc = await firestore()
        .collection('Employee')
        .doc(employeeID)
        .get();
      if (employeeDoc.exists) {
        const leaveRequestSnapshot = await firestore()
          .collection('Employee')
          .doc(employeeID)
          .collection('LeaveRequests')
          .get();

        const LeaveRequestsData = leaveRequestSnapshot.docs
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

  getAllHolidayRequestsByEmployeeID: async employeeID => {
    try {
      const employeeDoc = await firestore()
        .collection('Employee')
        .doc(employeeID)
        .get();
      if (employeeDoc.exists) {
        const holidayRequestSnapshot = await firestore()
          .collection('Employee')
          .doc(employeeID)
          .collection('HolidayRequests')
          .get();

        const HolidayRequestsData = holidayRequestSnapshot.docs
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
};





export default firestoreRequestService;
