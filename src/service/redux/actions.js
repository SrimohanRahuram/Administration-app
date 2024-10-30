import firestoreAdminService from "../../handlers/firestoreAdminService";
import firestoreEmployeeService from "../../handlers/firestoreEmployeeService";
import firestoreShopService from "../../handlers/firestoreShopService";

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
export const FETCH_SHOP_DATA='FETCH_SHOP_DATA';
export const UPDATE_ADMIN_DATA='UPDATE_ADMIN_DATA';
export const DELETE_ADMIN_DATA='DELETE_ADMIN_DATA';
export const UPDATE_EMPLOYEE_DATA='UPDATE_EMPLOYEE_DATA';
export const DELETE_EMPLOYEE_DATA='DELETE_EMPLOYEE_DATA';
export const UPDATE_SHOP_DATA='UPDATE_SHOP_DATA';
export const DELETE_SHOP_DATA='DELETE_SHOP_DATA';

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

export const fetchShopData  = () => async dispatch => {
  const shopData = await  firestoreShopService.getAllShops();
  console.log('Fetched Shops Data:', shopData); 

  dispatch({
    type: FETCH_SHOP_DATA,
    payload: shopData,
  });
};

export const updateAdminData = (username, updatedData) => async dispatch => {
  try {
    const updatedAdminData = await firestoreAdminService.editAdminData(username, updatedData);
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


export const deleteAdminData = (username) => async (dispatch) => {
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
    const updatedEmployeeData = await firestoreEmployeeService.editEmplyeeData(username, updatedData);
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


export const deleteEmployeeData = (username) => async (dispatch) => {
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
    const updatedShopData = await firestoreShopService.editShopData(id, updatedData);
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


export const deleteShopData = (id) => async (dispatch) => {
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