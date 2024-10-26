import firestoreAdminService from "../../handlers/firestoreAdminService";
import firestoreEmployeeService from "../../handlers/firestoreEmployeeService";

export const ADD_USER_INFO = 'ADD_USER_INFO';
export const REMOVE_USER = 'REMOVE_USER';
export const CHANGE_ONLINE_STATUS = 'CHANGE_ONLINE_STATUS';
export const ITINERARY_LIST = 'ITINERARY_LIST';
export const OUTLET_INFO= 'OUTLET_INFO';
export const ADD_IMAGES = 'ADD_IMAGES';
export const REMOVE_IMAGE = 'REMOVE_IMAGE';
export const CLEAR_IMAGES = 'CLEAR_IMAGES';
export const TODAY_LOCATIONS = 'TODAY_LOCATIONS';
export const FETCH_ADMIN_DATA = 'FETCH_ADMIN_DATA';
export const FETCH_EMPLOYEE_DATA='FETCH_EMPLOYEE_DATA';

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

export const removeImage = image => dispatch => {
  dispatch({
    type: REMOVE_IMAGE,
    payload: image,
  });
};

export const clearImages = data => dispatch => {
  // console.log(' Redux REMOVE PDF ------------ ', data),
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
export const fetchAdminData  = () => async dispatch => {
  const adminData = await  firestoreAdminService.getAllAdmins();
  console.log('Fetched Admin Data:', adminData); 

  dispatch({
    type: FETCH_ADMIN_DATA,
    payload: adminData,
  });
};

export const fetchEmployeeData  = () => async dispatch => {
  const employeeData = await  firestoreEmployeeService.getAllEmployees();
  console.log('Fetched Employee Data:', employeeData); 

  dispatch({
    type: FETCH_EMPLOYEE_DATA,
    payload: employeeData,
  });
};