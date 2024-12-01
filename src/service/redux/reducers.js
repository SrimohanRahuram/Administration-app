import {ADD_USER_INFO, HolidayRequestsByEmployeeId} from './actions';
import {REMOVE_USER} from './actions';
import {CHANGE_ONLINE_STATUS} from './actions';
import {ITINERARY_LIST} from './actions';
import {OUTLET_INFO} from './actions';
import {ADD_IMAGES} from './actions';
import {CLEAR_IMAGES} from './actions';
import {TODAY_LOCATIONS} from './actions';
import {FETCH_ADMIN_DATA} from './actions';
import {FETCH_EMPLOYEE_DATA} from './actions';
import {FETCH_SHOP_DATA} from './actions';
import {UPDATE_ADMIN_DATA} from './actions';
import {DELETE_ADMIN_DATA} from './actions';
import {UPDATE_EMPLOYEE_DATA} from './actions';
import {DELETE_EMPLOYEE_DATA} from './actions';
import {UPDATE_SHOP_DATA} from './actions';
import {DELETE_SHOP_DATA} from './actions';
import {FETCH_EMPLOYEE_DATA_BY_ID} from './actions';
import {FETCH_ADMIN_DATA_BY_ID} from './actions';

import {ADVANCE_REQUESTS_DATA_BY_EMPLOYEEID} from './actions';
import {LEAVE_REQUESTS_DATA_BY_EMPLOYEEID} from './actions';
import {HOLIDAY_REQUESTS_DATA_BY_EMPLOYEEID} from './actions';
import {SHOP_LOGIN_DATA_BY_EMPLOYEEID} from './actions';
import {EDIT_APPROVE_ADVANCE_REQUEST_STATUS_SUCCESS} from './actions';
import {EDIT_REJECT_ADVANCE_REQUEST_STATUS_SUCCESS} from './actions';
import {EDIT_APPROVE_LEAVE_REQUEST_STATUS_SUCCESS} from './actions';
import {EDIT_REJECT_LEAVE_REQUEST_STATUS_SUCCESS} from './actions';
import {EDIT_APPROVE_HOLIDAY_REQUEST_STATUS_SUCCESS} from './actions';
import {EDIT_REJECT_HOLIDAY_REQUEST_STATUS_SUCCESS} from './actions';

import {ACTIVE_HOLIDAY_REQUESTS_DATA_BY_EMPLOYEEID} from './actions';
import { TOTALHOURS_DATA_BY_EMPLOYEEID } from './actions';
import { TOTALADVANCE_DATA_BY_EMPLOYEEID } from './actions';

import { ADVANCE_ALL_REQUESTS_DATA_BY_EMPLOYEEID } from './actions';
import { ALL_LEAVE_REQUESTS_DATA_BY_EMPLOYEEID } from './actions';
import { ALL_HOLIDAY_REQUESTS_DATA_BY_EMPLOYEEID } from './actions';

import { ADMIN_ADVANCE_ALL_REQUESTS_DATA_BY_EMPLOYEEID } from './actions';
import { ADMIN_ALL_LEAVE_REQUESTS_DATA_BY_EMPLOYEEID } from './actions';
import { ADMIN_ALL_HOLIDAY_REQUESTS_DATA_BY_EMPLOYEEID } from './actions';

const initialState = {
  adminInfo: [],
  employeeInfo: [],
  shopInfo: [],
  jobinfo: [],
  online_status: false,
  itinerarylistinfo: [],
  outlet_info: [],
  images: [],
  today_locations: [],
  advanceRequests: [],
  leaveRequests: [],
  holidayRequests: [],
  shop_login: [],
  activeholidayRequests: [],
  totalHolidayHours:[],
  totalAdvance:[],
  AllAdvanceRequets:[],
  AllLeaveRequests:[],
  AllHolidayRequets:[],
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
      return {...state, images: action.payload};

    case CLEAR_IMAGES:
      return {...state, images: []};

    case TODAY_LOCATIONS:
      return {...state, today_locations: action.payload};

    case FETCH_ADMIN_DATA:
      return {...state, adminInfo: action.payload};

    case FETCH_EMPLOYEE_DATA:
      return {...state, employeeInfo: action.payload};

    case FETCH_SHOP_DATA:
      return {...state, shopInfo: action.payload};

    case UPDATE_ADMIN_DATA:
      return {
        ...state,
        admins: state.admins.map(admin =>
          admin.username === action.payload.username
            ? {...admin, ...action.payload}
            : admin,
        ),
      };

    case DELETE_ADMIN_DATA:
      return {
        ...state,
        admins: state.admins.filter(admin => admin.username !== action.payload),
      };

    case UPDATE_EMPLOYEE_DATA:
      return {
        ...state,
        employees: state.employees.map(employee =>
          employee.username === action.payload.username
            ? {...employee, ...action.payload}
            : employee,
        ),
      };

    case DELETE_EMPLOYEE_DATA:
      return {
        ...state,
        employee: state.employee.filter(
          employee => employee.username !== action.payload,
        ),
      };

    case UPDATE_SHOP_DATA:
      return {
        ...state,
        shops: state.shops.map(shop =>
          shop.id === action.payload.id ? {...shop, ...action.payload} : shop,
        ),
      };

    case DELETE_SHOP_DATA:
      return {
        ...state,
        shop: state.shop.filter(shop => shop.id !== action.payload),
      };

    case FETCH_EMPLOYEE_DATA_BY_ID:
      return {
        ...state,
        employeeInfo: action.payload,
      };

    case FETCH_ADMIN_DATA_BY_ID:
      return {
        ...state,
        adminInfo: action.payload,
      };

    case ADVANCE_REQUESTS_DATA_BY_EMPLOYEEID:
      return {
        ...state,
        advanceRequests: action.payload,
      };

    case LEAVE_REQUESTS_DATA_BY_EMPLOYEEID:
      return {
        ...state,
        leaveRequests: action.payload,
      };

    case HOLIDAY_REQUESTS_DATA_BY_EMPLOYEEID:
      return {
        ...state,
        holidayRequests: action.payload,
      };

    case SHOP_LOGIN_DATA_BY_EMPLOYEEID:
      return {
        ...state,
        shop_login: action.payload,
      };

    case EDIT_APPROVE_ADVANCE_REQUEST_STATUS_SUCCESS: {
      const {employeeID, requestID, newStatus} = action.payload;

      return {
        ...state,
        loading: false,
        advanceRequests: state.advanceRequests.map(request =>
          request.employeeID === employeeID && request.id === requestID
            ? {...request, status: newStatus}
            : request,
        ),
      };
    }

    case EDIT_REJECT_ADVANCE_REQUEST_STATUS_SUCCESS: {
      const {employeeID, requestID, newStatus} = action.payload;

      return {
        ...state,
        loading: false,
        advanceRequests: state.advanceRequests.map(request =>
          request.employeeID === employeeID && request.id === requestID
            ? {...request, status: newStatus}
            : request,
        ),
      };
    }

    case EDIT_APPROVE_LEAVE_REQUEST_STATUS_SUCCESS: {
      const {employeeID, requestID, newStatus} = action.payload;

      return {
        ...state,
        loading: false,
        leaveRequests: state.leaveRequests.map(request =>
          request.employeeID === employeeID && request.id === requestID
            ? {...request, status: newStatus}
            : request,
        ),
      };
    }

    case EDIT_REJECT_LEAVE_REQUEST_STATUS_SUCCESS: {
      const {employeeID, requestID, newStatus} = action.payload;

      return {
        ...state,
        loading: false,
        leaveRequests: state.leaveRequests.map(request =>
          request.employeeID === employeeID && request.id === requestID
            ? {...request, status: newStatus}
            : request,
        ),
      };
    }

    case EDIT_APPROVE_HOLIDAY_REQUEST_STATUS_SUCCESS: {
      const {employeeID, requestID, newStatus} = action.payload;

      return {
        ...state,
        loading: false,
        holidayRequests: state.holidayRequests.map(request =>
          request.employeeID === employeeID && request.id === requestID
            ? {...request, status: newStatus}
            : request,
        ),
      };
    }

    case EDIT_REJECT_HOLIDAY_REQUEST_STATUS_SUCCESS: {
      const {employeeID, requestID, newStatus} = action.payload;


      return {
        ...state,
        loading: false,
        holidayRequests: state.holidayRequests.map(request =>
          request.employeeID === employeeID && request.id === requestID
            ? {...request, status: newStatus}
            : request,
        ),
      };
    }
    case ACTIVE_HOLIDAY_REQUESTS_DATA_BY_EMPLOYEEID:{

      return {
        ...state,
        activeholidayRequests: action.payload,
      };

    }

    case TOTALHOURS_DATA_BY_EMPLOYEEID:{
      return {
        ...state,
        totalHolidayHours: action.payload,
      };
    }

    case TOTALADVANCE_DATA_BY_EMPLOYEEID:{
      return {
        ...state,
        totalAdvance: action.payload,
      };
    }

    case ADVANCE_ALL_REQUESTS_DATA_BY_EMPLOYEEID:
      return {
        ...state,
        advanceRequests: action.payload,
      };

      case ALL_LEAVE_REQUESTS_DATA_BY_EMPLOYEEID:
        return {
          ...state,
          leaveRequests: action.payload,
        };
  
      case ALL_HOLIDAY_REQUESTS_DATA_BY_EMPLOYEEID:
        return {
          ...state,
          holidayRequests: action.payload,
        };
        case ADMIN_ADVANCE_ALL_REQUESTS_DATA_BY_EMPLOYEEID:
          return {
            ...state,
            AllAdvanceRequets: action.payload,
          };
    
          case ADMIN_ALL_LEAVE_REQUESTS_DATA_BY_EMPLOYEEID:
            return {
              ...state,
              AllLeaveRequests: action.payload,
            };
      
          case ADMIN_ALL_HOLIDAY_REQUESTS_DATA_BY_EMPLOYEEID:
            return {
              ...state,
              AllHolidayRequets: action.payload,
            };

    default:
      return state;
  }
}
export default myReducers;
