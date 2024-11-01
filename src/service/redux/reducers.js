import {ADD_USER_INFO} from './actions';
import {REMOVE_USER} from './actions';
import {CHANGE_ONLINE_STATUS} from './actions';
import {ITINERARY_LIST} from './actions';
import {OUTLET_INFO} from './actions';
import {ADD_IMAGES} from './actions';
import {REMOVE_IMAGE} from './actions';
import {CLEAR_IMAGES} from './actions';
import {TODAY_LOCATIONS} from './actions';
import { FETCH_ADMIN_DATA } from './actions';
import { FETCH_EMPLOYEE_DATA } from './actions';

const initialState = {
  adminInfo: [],
  employeeInfo: [],
  jobinfo: [],
  online_status: false,
  itinerarylistinfo: [],
  outlet_info: [],
  images: [],
  today_locations: [],
};

function myReducers(state = initialState, action) {
  switch (action.type) {
    case ADD_USER_INFO:
      return {...state, userinfo: action.payload};

    case REMOVE_USER:
      return {...state, userinfo: []};

    case CHANGE_ONLINE_STATUS:
      return {...state, online_status: action.payload};

    case ITINERARY_LIST:
      return {...state, itinerarylistinfo: action.payload};

    case OUTLET_INFO:
      return {...state, outlet_info: action.payload};

    case ADD_IMAGES:
      return {...state, images: [...state.images, action.payload]};

    case REMOVE_IMAGE:
      return {
        ...state,
        images: state.images.filter(image => image !== action.payload),
      };

    case CLEAR_IMAGES:
      return {...state, images: []};

    case TODAY_LOCATIONS:
      return {...state, today_locations: action.payload};

      case FETCH_ADMIN_DATA:
        return { ...state, adminInfo: action.payload };

      case FETCH_EMPLOYEE_DATA:
        return { ...state, employeeInfo: action.payload };  
      


    default:
      return state;
  }
}

export default myReducers;
