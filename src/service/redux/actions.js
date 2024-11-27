import firestoreAdminService from '../../handlers/firestoreAdminService';
import firestoreEmployeeService from '../../handlers/firestoreEmployeeService';
import AsyncStorage from '@react-native-async-storage/async-storage';
import firestoreShopService from '../../handlers/firestoreShopService';
import firestoreRequestService from '../../handlers/firestoreRequestService';
import { id } from 'date-fns/locale';

export const ADD_USER_INFO = 'ADD_USER_INFO';
export const REMOVE_USER = 'REMOVE_USER';
export const CHANGE_ONLINE_STATUS = 'CHANGE_ONLINE_STATUS';
export const ITINERARY_LIST = 'ITINERARY_LIST';
export const OUTLET_INFO = 'OUTLET_INFO';
export const ADD_IMAGES = 'ADD_IMAGES';
export const CLEAR_IMAGES = 'CLEAR_IMAGES';
export const TODAY_LOCATIONS = 'TODAY_LOCATIONS';
export const FETCH_ADMIN_DATA = 'FETCH_ADMIN_DATA';
export const FETCH_EMPLOYEE_DATA = 'FETCH_EMPLOYEE_DATA';
export const FETCH_ADMIN_DATA_BY_ID='FETCH_ADMIN_DATA_BY_ID';
export const FETCH_SHOP_DATA = 'FETCH_SHOP_DATA';
export const UPDATE_ADMIN_DATA = 'UPDATE_ADMIN_DATA';
export const DELETE_ADMIN_DATA = 'DELETE_ADMIN_DATA';
export const UPDATE_EMPLOYEE_DATA = 'UPDATE_EMPLOYEE_DATA';
export const DELETE_EMPLOYEE_DATA = 'DELETE_EMPLOYEE_DATA';
export const UPDATE_SHOP_DATA = 'UPDATE_SHOP_DATA';
export const DELETE_SHOP_DATA = 'DELETE_SHOP_DATA';
export const FETCH_EMPLOYEE_DATA_BY_ID = 'FETCH_EMPLOYEE_DATA_BY_ID';

export const ADVANCE_REQUESTS_DATA_BY_EMPLOYEEID =
  'ADVANCE_REQUESTS_DATA_BY_EMPLOYEEID';
export const LEAVE_REQUESTS_DATA_BY_EMPLOYEEID =
  'LEAVE_REQUESTS_DATA_BY_EMPLOYEEID';
export const HOLIDAY_REQUESTS_DATA_BY_EMPLOYEEID =
  'HOLIDAY_REQUESTS_DATA_BY_EMPLOYEEID';
export const SHOP_LOGIN_DATA_BY_EMPLOYEEID =
  'SHOP_LOGIN_DATA_BY_EMPLOYEEID';
export const ACTIVE_HOLIDAY_REQUESTS_DATA_BY_EMPLOYEEID =
  'ACTIVE_HOLIDAY_REQUESTS_DATA_BY_EMPLOYEEID';

export const EDIT_APPROVE_ADVANCE_REQUEST_STATUS_SUCCESS='EDIT_APPROVE_ADVANCE_REQUEST_STATUS_SUCCESS';
export const EDIT_REJECT_ADVANCE_REQUEST_STATUS_SUCCESS='EDIT_REJECT_ADVANCE_REQUEST_STATUS_SUCCESS';

export const EDIT_APPROVE_LEAVE_REQUEST_STATUS_SUCCESS='EDIT_APPROVE_LEAVE_REQUEST_STATUS_SUCCESS';
export const EDIT_REJECT_LEAVE_REQUEST_STATUS_SUCCESS='EDIT_REJECT_LEAVE_REQUEST_STATUS_SUCCESS';

export const EDIT_APPROVE_HOLIDAY_REQUEST_STATUS_SUCCESS='EDIT_APPROVE_HOLIDAY_REQUEST_STATUS_SUCCESS';
export const EDIT_REJECT_HOLIDAY_REQUEST_STATUS_SUCCESS='EDIT_REJECT_HOLIDAY_REQUEST_STATUS_SUCCESS';






export const addUserToRedux = data => dispatch => {
  // console.log('addUserToRedux ' + JSON.stringify(data));
  dispatch({
    type: ADD_USER_INFO,
    payload: data,
  });
};

export const removeUserRedux = () => dispatch => {
  dispatch({
    type: REMOVE_USER,
    payload: [],
  });
};

export const changeOnlineStatus = data => dispatch => {
  // console.log('Redux changeOnlineStatus ' + JSON.stringify(data));
  dispatch({
    type: CHANGE_ONLINE_STATUS,
    payload: data,
  });
};

export const addItineraryListRedux = data => dispatch => {
  // console.log('addItineraryListRedux ' + JSON.stringify(data));
  dispatch({
    type: ITINERARY_LIST,
    payload: data,
  });
};

export const outlet_info = data => dispatch => {
  // console.log('addItineraryListRedux ' + JSON.stringify(data));
  dispatch({
    type: OUTLET_INFO,
    payload: data,
  });
};

export const addImage = imageURI => dispatch => {
  // console.log(' Redux action image URI ::: ', JSON.stringify(imageURI)),
  dispatch({
    type: ADD_IMAGES,
    payload: imageURI,
  });
};

export const clearImages = data => dispatch => {
  dispatch({
    type: CLEAR_IMAGES,
    payload: data,
  });
};

export const addTodayLocationsRedux = data => dispatch => {
  // console.log('addTodayLocationsRedux ' + JSON.stringify(data));
  dispatch({
    type: TODAY_LOCATIONS,
    payload: data,
  });
};

//thinesh
export const fetchAdminData = () => async dispatch => {
  const adminData = await firestoreAdminService.getAllAdmins();
  console.log('Fetched Admin Data:', adminData);

  dispatch({
    type: FETCH_ADMIN_DATA,
    payload: adminData,
  });
};

export const fetchEmployeeData = () => async dispatch => {
  const employeeData = await firestoreEmployeeService.getAllEmployees();
  console.log('Fetched Employee Data:', employeeData);

  dispatch({
    type: FETCH_EMPLOYEE_DATA,
    payload: employeeData,
  });
};

export const fetchShopData = () => async dispatch => {
  const shopData = await firestoreShopService.getAllShops();
  console.log('Fetched Shops Data:', shopData);

  dispatch({
    type: FETCH_SHOP_DATA,
    payload: shopData,
  });
};

export const updateAdminData = (username, updatedData) => async dispatch => {
  try {
    const updatedAdminData = await firestoreAdminService.editAdminData(
      username,
      updatedData,
    );
    console.log('Updated Admin Data:', updatedAdminData);

    dispatch({
      type: UPDATE_ADMIN_DATA,
      payload: {
        username,
        ...updatedData,
      },
    });

    return 'Success';
  } catch (error) {
    console.error('Error updating admin data:', error);
    return 'Error';
  }
};

export const deleteAdminData = username => async dispatch => {
  try {
    await firestoreAdminService.deleteAdminData(username);
    console.log('Deleted Admin:', username);

    dispatch({
      type: DELETE_ADMIN_DATA,
      payload: username,
    });

    return 'Success';
  } catch (error) {
    console.error('Error deleting admin data:', error);
    return 'Error';
  }
};

export const updateEmployeeData = (username, updatedData) => async dispatch => {
  try {
    const updatedEmployeeData = await firestoreEmployeeService.editEmplyeeData(
      username,
      updatedData,
    );
    console.log('Updated Employee Data:', updatedEmployeeData);

    dispatch({
      type: UPDATE_EMPLOYEE_DATA,
      payload: {
        username,
        ...updatedData,
      },
    });

    return 'Success';
  } catch (error) {
    console.error('Error updating admin data:', error);
    return 'Error';
  }
};

export const deleteEmployeeData = username => async dispatch => {
  try {
    await firestoreEmployeeService.deleteEmployeeData(username);
    console.log('Deleted Employee:', username);

    dispatch({
      type: DELETE_EMPLOYEE_DATA,
      payload: username,
    });

    return 'Success';
  } catch (error) {
    console.error('Error deleting Employee data:', error);
    return 'Error';
  }
};

export const updateShopData = (id, updatedData) => async dispatch => {
  try {
    const updatedShopData = await firestoreShopService.editShopData(
      id,
      updatedData,
    );
    console.log('Updated Shop Data:', updatedShopData);

    dispatch({
      type: UPDATE_SHOP_DATA,
      payload: {
        id,
        ...updatedData,
      },
    });

    return 'Success';
  } catch (error) {
    console.error('Error updating employee data:', error);
    return 'Error';
  }
};

export const deleteShopData = id => async dispatch => {
  try {
    await firestoreShopService.deleteShopData(id);
    console.log('Deleted shop:', id);

    dispatch({
      type: DELETE_SHOP_DATA,
      payload: id,
    });

    return 'Success';
  } catch (error) {
    console.error('Error deleting Shop data:', error);
    return 'Error';
  }
};

export const fetchEmployeeDataById = () => async dispatch => {
  try {
    const employeeId = await AsyncStorage.getItem('employeeId');
    const employeeData = await firestoreEmployeeService.getEmployeeDataByID(
      employeeId,
    );
    console.log('Fetched Employee Data by ID:', employeeData);

    if (employeeData) {
      dispatch({
        type: FETCH_EMPLOYEE_DATA_BY_ID,
        payload: employeeData,
      });
    } else {
      console.warn('No employee data found for the given ID');
    }
  } catch (error) {
    console.error('Error fetching employee data by ID:', error);
    throw error;
  }
};

export const fetchAdminDataById = () => async dispatch => {
  try {
    const adminId = await AsyncStorage.getItem('employeeId');
    const adminData = await firestoreEmployeeService.getAdminDataByID(
      adminId,
    );
    console.log('Fetched Employee Data by ID:', adminData);

    if (adminData) {
      dispatch({
        type: FETCH_ADMIN_DATA_BY_ID,
        payload: adminData,
      });
    } else {
      console.warn('No admin data found for the given ID');
    }
  } catch (error) {
    console.error('Error fetching employee data by ID:', error);
    throw error;
  }
};

export const AdvanceRequestsByEmployeeId = () => async dispatch => {
  try {
    const employeeIdforRequest = await AsyncStorage.getItem(
      'employeeIdforRequest',
    );
    console.log(employeeIdforRequest);
    const advanceRequestData =
      await firestoreRequestService.getAdvanceRequestsByEmployeeID(
        employeeIdforRequest,
      );
    console.log('Fetched Advance Requests Data by ID:', advanceRequestData);

    if (advanceRequestData) {
      dispatch({
        type: ADVANCE_REQUESTS_DATA_BY_EMPLOYEEID,
        payload: advanceRequestData,
      });
    } else {
      console.warn('No advance requests data found for the given ID');
    }
  } catch (error) {
    console.error('Error advance requests data by ID:', error);
    throw error;
  }
};

export const LeaveRequestsByEmployeeId = () => async dispatch => {
  try {
    const employeeIdforRequest = await AsyncStorage.getItem(
      'employeeIdforRequest',
    );
    console.log(employeeIdforRequest);
    const leaveRequestData =
      await firestoreRequestService.getLeaveRequestsByEmployeeID(
        employeeIdforRequest,
      );
    console.log('Fetched leaveRequestData by ID:', leaveRequestData);

    if (leaveRequestData) {
      dispatch({
        type: LEAVE_REQUESTS_DATA_BY_EMPLOYEEID,
        payload: leaveRequestData,
      });
    } else {
      console.warn('No leaveRequestData found for the given ID');
    }
  } catch (error) {
    console.error('Error leaveRequestData by ID:', error);
    throw error;
  }
};

export const HolidayRequestsByEmployeeId = () => async dispatch => {
  try {
    const employeeIdforRequest = await AsyncStorage.getItem(
      'employeeIdforRequest',
    );
    console.log(employeeIdforRequest);
    const holidayRequestData =
      await firestoreRequestService.getHolidayRequestsByEmployeeID(
        employeeIdforRequest,
      );
    console.log('Fetched holidayRequestData by ID:', holidayRequestData);

    if (holidayRequestData) {
      dispatch({
        type: HOLIDAY_REQUESTS_DATA_BY_EMPLOYEEID,
        payload: holidayRequestData,
      });
    } else {
      console.warn('No holidayRequestData found for the given ID');
    }
  } catch (error) {
    console.error('Error holidayRequestData by ID:', error);
    throw error;
  }
};

export const ShopLoginByEmployeeId = () => async dispatch => {
  try {
    const employeeIdforRequest = await AsyncStorage.getItem(
      'employeeIdforRequest',
    );
    console.log('employeeIdforRequest : '+employeeIdforRequest);
    const shopLoginData =
      await firestoreRequestService.getShopLoginByEmployeeID(
        employeeIdforRequest,
      );
    console.log('Fetched ShopLoginData by ID:', shopLoginData);

    if (shopLoginData) {
      dispatch({
        type: SHOP_LOGIN_DATA_BY_EMPLOYEEID,
        payload: shopLoginData,
      });
    } else {
      console.warn('No ShopLoginData found for the given ID');
    }
  } catch (error) {
    console.error('Error ShopLoginData by ID:', error);
    throw error;
  }
};


export const editApproveAdvanceRequestStatus = (employeeID, requestID, newStatus) => async dispatch =>{

    try {

      const advanceRequestData = await firestoreRequestService.editApproveAdvanceRequestStatus(
        employeeID,
        requestID,
        newStatus,
      );
      console.log('Updated advance Data:', advanceRequestData);
  
      dispatch({
        type:EDIT_APPROVE_ADVANCE_REQUEST_STATUS_SUCCESS,
        payload: {
          id,
          ...advanceRequestData,
        },
      });
      console.log("thinesh");
      return "Success";
      
    } catch (error) {
      console.error('Error updating AdvanceRequest status2: ', error);
      return { success: false, message: error.message };
    }
  
};

export const editRejectAdvanceRequestStatus = (employeeID, requestID, newStatus) => async dispatch =>{

  try {

    const advanceRequestData = await firestoreRequestService.editApproveAdvanceRequestStatus(
      employeeID,
      requestID,
      newStatus,
    );
    console.log('Updated advance Data:', advanceRequestData);

    dispatch({
      type:EDIT_REJECT_ADVANCE_REQUEST_STATUS_SUCCESS,
      payload: {
        id,
        ...advanceRequestData,
      },
    });
   
    return "Success";
    
  } catch (error) {
    console.error('Error updating AdvanceRequest status: ', error);
    return { success: false, message: error.message };
  }

};

export const editApproveLeaveRequestStatus = (employeeID, requestID, newStatus) => async dispatch =>{

  try {

    const leaveRequestData = await firestoreRequestService.editApproveLeaveRequestStatus(
      employeeID,
      requestID,
      newStatus,
    );
    console.log('Updated Leave Data:', leaveRequestData);

    dispatch({
      type:EDIT_APPROVE_LEAVE_REQUEST_STATUS_SUCCESS,
      payload: {
        id,
        ...leaveRequestData,
      },
    });
   
    return "Success";
    
  } catch (error) {
    console.error('Error updating AdvanceRequest status: ', error);
    return { success: false, message: error.message };
  }
};

export const editRejectLeaveRequestStatus = (employeeID, requestID, newStatus) => async dispatch =>{

  try {

    const leaveRequestData = await firestoreRequestService.editApproveLeaveRequestStatus(
      employeeID,
      requestID,
      newStatus,
    );
    console.log('Updated advance Data:', leaveRequestData);

    dispatch({
      type:EDIT_REJECT_LEAVE_REQUEST_STATUS_SUCCESS,
      payload: {
        id,
        ...leaveRequestData,
      },
    });
   
    return "Success";
    
  } catch (error) {
    console.error('Error updating AdvanceRequest status: ', error);
    return { success: false, message: error.message };
  }
};

export const editApproveHolidayRequestStatus = (employeeID, requestID, newStatus) => async dispatch =>{

  try {

    const HolidayRequestData = await firestoreRequestService.editApproveHolidayRequestStatus(
      employeeID,
      requestID,
      newStatus,
    );
    console.log('Updated Holiday Data:', HolidayRequestData);

    dispatch({
      type:EDIT_APPROVE_HOLIDAY_REQUEST_STATUS_SUCCESS,
      payload: {
        id,
        ...HolidayRequestData,
      },
    });
   
    return "Success";
    
  } catch (error) {
    console.error('Error updating AdvanceRequest status: ', error);
    return { success: false, message: error.message };
  }
};

export const editRejectHolidayRequestStatus = (employeeID, requestID, newStatus) => async dispatch =>{

  try {

    const HolidayRequestData = await firestoreRequestService.editApproveHolidayRequestStatus(
      employeeID,
      requestID,
      newStatus,
    );
    console.log('Updated advance Data:', HolidayRequestData);

    dispatch({
      type:EDIT_REJECT_HOLIDAY_REQUEST_STATUS_SUCCESS,
      payload: {
        id,
        ...HolidayRequestData,
      },
    });
   
    return "Success";
    
  } catch (error) {
    console.error('Error updating HolidayRequest status: ', error);
    return { success: false, message: error.message };
  }
};


export const ActiveHolidayRequestsByEmployeeId = () => async dispatch => {
  try {
    const employeeIdforRequest = await AsyncStorage.getItem(
      'employeeIdforRequest',
    );
    console.log(employeeIdforRequest);
    const holidayRequestData =
      await firestoreRequestService.getActiveHolidayRequestsByEmployeeID(
        employeeIdforRequest,
      );
    console.log('Fetched activeholidayRequestData by ID:', holidayRequestData);

    if (holidayRequestData) {
      dispatch({
        type: ACTIVE_HOLIDAY_REQUESTS_DATA_BY_EMPLOYEEID,
        payload: holidayRequestData,
      });
    } else {
      console.warn('No holidayRequestData found for the given ID');
    }
  } catch (error) {
    console.error('Error holidayRequestData by ID:', error);
    throw error;
  }
};
