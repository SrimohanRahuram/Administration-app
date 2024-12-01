import React, {useEffect, useState} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useDispatch, useSelector} from 'react-redux';
import {
  View,
  Text,
  TouchableOpacity,
  BackHandler,
  FlatList,
  Modal,
  Image,
  TextInput,
  ScrollView,
  SafeAreaView,
} from 'react-native';
import styles from './EmployeeDetails.Styles';
import Colors from '../../constants/Colors';
import Images from '../../constants/images';
import ProgressOverlay from '../../components/ProgressOverlay';
import ToastAlert from '../../components/ToastAlert';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {
  AdvanceRequestsByEmployeeId,
  HolidayRequestsByEmployeeId,
  ShopLoginByEmployeeId,
  LeaveRequestsByEmployeeId,
  editRejectLeaveRequestStatus,
  editApproveLeaveRequestStatus,
  editApproveHolidayRequestStatus,
  editRejectHolidayRequestStatus,
  ActiveHolidayRequestsByEmployeeId,
  AdvanceAllRequestsByEmployeeId,
  AllLeaveRequestsByEmployeeId,
  AllHolidayRequestsByEmployeeId,
  AdminAdvanceAllRequestsByEmployeeId,
  AdminAllLeaveRequestsByEmployeeId,
  AdminAllHolidayRequestsByEmployeeId,
} from '../../service/redux/actions';
import {format, getWeek, startOfWeek, endOfWeek} from 'date-fns';
import {editApproveAdvanceRequestStatus} from '../../service/redux/actions';
import {combineReducers} from 'redux';
import firestoreRequestService from '../../handlers/firestoreRequestService';
import {Dropdown} from 'react-native-element-dropdown';

export default function EmployeeDetails({navigation}) {
  const [isLoading, setIsLoading] = useState(false);
  const [SalaryModal, setSalaryModal] = useState(false);
  const [WorkPlace, setWorkPlace] = React.useState(false);
  const [Salary, setSalary] = React.useState(false);
  const [Holidays, setHolidays] = React.useState(false);
  const [Requests, setRequests] = React.useState(false);
  const {userinfo} = useSelector(state => state.myReducers);
  const [filteredData, setFilteredData] = React.useState([]);
  const [filteredData2, setFilteredData2] = React.useState([]);
  const [filteredData3, setFilteredData3] = React.useState([]);
  const [selectedItem, setSelectedItem] = React.useState('');
  const [CountModal, setCountModal] = useState(false);
  const [Count, setCount] = React.useState(null);
  const [CountItem, setCountItem] = React.useState(null);
  const [RequestModal, setRequestModal] = useState(false);
  const [value, setValue] = useState(null);
  const [transformData, setTransformData] = React.useState([]);

  // Accessing advancerequests from your Redux store
  const advanceRequests = useSelector(
    state => state.myReducers.advanceRequests,
  );
  const leaveRequests = useSelector(state => state.myReducers.leaveRequests);
  const holidayRequests = useSelector(
    state => state.myReducers.holidayRequests,
  );
  const shoplogin = useSelector(state => state.myReducers.shop_login);
  const activeholidayRequests = useSelector(
    state => state.myReducers.activeholidayRequests,
  );
  const totalHours = activeholidayRequests.reduce(
    (total, item) => total + parseFloat(item.Hours),
    0,
  );
  const dispatch = useDispatch();

  useEffect(() => {
    console.log('shop login updated:', shoplogin);
    groupByWeek();
  }, [shoplogin]);

  useEffect(() => {
    dispatch(AdvanceRequestsByEmployeeId());
    console.log('Fetch dispatched');
  }, [dispatch]);

  useEffect(() => {
    dispatch(LeaveRequestsByEmployeeId());
    console.log('Fetch dispatched');
  }, [dispatch]);

  useEffect(() => {
    dispatch(HolidayRequestsByEmployeeId());
    console.log('Fetch dispatched');
  }, [dispatch]);

  useEffect(() => {
    dispatch(ShopLoginByEmployeeId());
    console.log('Fetch dispatched');
  }, [dispatch]);

  useEffect(() => {
    dispatch(ActiveHolidayRequestsByEmployeeId());
    console.log('Fetch dispatched');
  }, [dispatch]);
  //next
  useEffect(() => {
    if (dropdowndata.length > 0) {
      const firstItem = dropdowndata[0];
      setValue(firstItem.name);
      SelectSalaryData(firstItem.key); 
    }
  }, [filteredData]);

  useEffect(() => {
    OnPressWorkPlace();
    BackHandler.addEventListener('hardwareBackPress', backAction);
    return () => {
      BackHandler.removeEventListener('hardwareBackPress', backAction);
    };
  }, []);

  const backAction = () => {
    navigation.navigate('AdminHome');
  };
  const OnPressWorkPlace = () => {
    setWorkPlace(true);
    setSalary(false);
    setHolidays(false);
    setRequests(false);
  };
  const OnPressSalary = () => {
    setWorkPlace(false);
    setSalary(true);
    setHolidays(false);
    setRequests(false);
  };
  const OnPressHolidays = () => {
    setWorkPlace(false);
    setSalary(false);
    setHolidays(true);
    setRequests(false);
  };
  const OnPressRequests = () => {
    setWorkPlace(false);
    setSalary(false);
    setHolidays(false);
    setRequests(true);
  };

  // const requestsdata = [
  //   {key: '1', name: 'Request $500 for Advance Amount?'},
  //   {
  //     key: '2',
  //     name: 'Request for holiday 3 hours?',
  //     in: '24/12/2024',
  //     out: '24/12/2024',
  //   },
  //   {
  //     key: '3',
  //     name: 'Request for Leave?',
  //     in: '24/12/2024',
  //     out: '24/12/2024',
  //   },
  //   {key: '4', name: 'Request $200 for Advance Amount?'},
  //   {
  //     key: '5',
  //     name: 'Request for holiday 32hours?',
  //     in: '24/12/2024',
  //     out: '24/12/2024',
  //   },
  // ];

  // const workplacedata = [
  //   {key: '1', id: 'shop 1', in: '24/12/2024 12.00', out: '24/12/2024 12.00'},
  //   {key: '2', id: 'shop 2', in: '24/12/2024 12.00', out: '24/12/2024 12.00'},
  //   {key: '3', id: 'shop 3', in: '24/12/2024 12.00', out: '24/12/2024 12.00'},
  //   {key: '4', id: 'shop 4', in: '24/12/2024 12.00', out: '24/12/2024 12.00'},
  //   {key: '5', id: 'shop 5', in: '24/12/2024 12.00', out: '24/12/2024 12.00'},
  // ];
  const salarydata = [
    {key: '1', id: ' 11', in: '24/12/2024', out: '24/12/2024', salary: ' 110'},
    {key: '2', id: ' 12', in: '24/12/2024', out: '24/12/2024', salary: ' 110'},
    {key: '3', id: ' 31', in: '24/12/2024', out: '24/12/2024', salary: ' 110'},
    {key: '4', id: ' 14', in: '24/12/2024', out: '24/12/2024', salary: ' 110'},
    {key: '5', id: ' 51', in: '24/12/2024', out: '24/12/2024', salary: ' 110'},
  ];

  const groupByWeek = () => {
    const groupedData = {};
    const currentDate = new Date();
    const currentMonth = currentDate.getMonth(); // Current month (0-indexed)
    const currentYear = currentDate.getFullYear();

    const lastMonthDate = new Date(currentYear, currentMonth - 1, 1); // Start of last month
    const lastMonth = lastMonthDate.getMonth();
    const lastMonthYear = lastMonthDate.getFullYear();

    shoplogin.forEach(item => {
      const parsedDate = item.createdAt.toDate();
      const weekNumber = getWeek(parsedDate);
      const year = parsedDate.getFullYear();
      const weekKey = `${year}-W${weekNumber}`;
      const startDate = startOfWeek(parsedDate, {weekStartsOn: 1}); // Week starts on Monday
      const endDate = endOfWeek(parsedDate, {weekStartsOn: 1});

      if (!groupedData[weekKey]) {
        groupedData[weekKey] = {
          startDate: format(startDate, 'yyyy-MM-dd'),
          endDate: format(endDate, 'yyyy-MM-dd'),
          totalHours: 0,
          items: [],
        };
      }

      groupedData[weekKey].items.push(item);
      groupedData[weekKey].totalHours += item.hoursOfWork || 0;
    });

    const sortedData = Object.entries(groupedData)
      .sort(([a], [b]) => a.localeCompare(b)) // Sort keys in ascending order
      .reduce((acc, [key, value]) => {
        acc[key] = value;
        return acc;
      }, {});

    const currentMonthData = [];
    const lastMonthData = [];

    Object.values(sortedData).forEach(week => {
      const weekStartDate = new Date(week.startDate);
      if (
        weekStartDate.getMonth() === currentMonth &&
        weekStartDate.getFullYear() === currentYear
      ) {
        currentMonthData.push(week);
      } else if (
        weekStartDate.getMonth() === lastMonth &&
        weekStartDate.getFullYear() === lastMonthYear
      ) {
        lastMonthData.push(week);
      }
    });
    setFilteredData(sortedData);
    setFilteredData2(currentMonthData);
    setFilteredData3(lastMonthData);
  };

  const transformedData = Object.keys(filteredData).map(key => ({
    ...filteredData[key],
    week: key,
  }));
  const transformedData2 = Object.keys(filteredData2).map(key => ({
    ...filteredData2[key],
    week: key,
  }));
  const transformedData3 = Object.keys(filteredData3).map(key => ({
    ...filteredData3[key],
    week: key,
  }));
  const handleApproveAdvanceSentRequest = async requestId => {
    try {
      setIsLoading(true);
      const newStatus = 'APPROVED';
      const employeeID = userinfo.id;
      console.log(employeeID);

      console.log(requestId+"requestId");

      const response =  dispatch(editApproveAdvanceRequestStatus(employeeID, requestId, newStatus))
      .then(response => {
        console.log('Response:', response); 
        if (response=="Success") {
          setIsLoading(false);
          ToastAlert.ShowToast(
            'success',
            'Alert',
            'Advance Request Approved Sucessfully..',
          );
          reloadAction();
        } else {
          ToastAlert.ShowToast(
            'error',
            'Alert',
            'Erro in Advance Request Approved .Try Again..',
          );
        }// "Success" or error object
      })
      .catch(err => {
        console.error('Error:', err);
      });
      console.log("response">>+response); 
    }catch (error) {
      console.error('Error dispatching the action:', error);
    }   
  };

  const handleRejectAdvanceSentRequest = async requestId => {
    try {
      setIsLoading(true);
      const newStatus = 'REJECT';
      const employeeID = userinfo.id;
      console.log(employeeID);

      console.log(requestId+"requestId");

      const response =  dispatch(editApproveAdvanceRequestStatus(employeeID, requestId, newStatus))
      .then(response => {
        console.log('Response:', response); 
        if (response=="Success") {
          setIsLoading(false);
          ToastAlert.ShowToast(
            'success',
            'Alert',
            ' Advance Request Rejected..',
          );
          reloadAction();
        } else {
          ToastAlert.ShowToast(
            'error',
            'Alert',
            'Erro in Advance Request Rejection.Try Again Later..',
          );
        }// "Success" or error object
      })
      .catch(err => {
        console.error('Error:', err);
      });
      console.log("response">>+response);  
    }catch (error) {
      console.error('Error dispatching the action:', error);
    } 
  };

  const handleApproveLeaveSentRequest = async requestId => {
    try {
      setIsLoading(true);
      const newStatus = 'APPROVED';
      const employeeID = userinfo.id;
      console.log(employeeID);
      console.log(requestId+"requestId");

      const response =  dispatch(editApproveLeaveRequestStatus(employeeID, requestId, newStatus))
      .then(response => {
        console.log('Response:', response); 
        if (response=="Success") {
          setIsLoading(false);
           ToastAlert.ShowToast(
            'success',
            'Alert',
            'Leave Request Approved Sucessfully..',
          );
          reloadAction();
         
        } else {
          setIsLoading(false);
          ToastAlert.ShowToast(
            'error',
            'Alert',
            'Erro in Leave Request Approved .Try Again..',
          );

        }// "Success" or error object
      })
      .catch(err => {
        console.error('Error:', err);
      });
      console.log("response">>+response);  
    }catch (error) {
      console.error('Error dispatching the action:', error);
    } 
  };

  const handleRejectLeaveSentRequest = async requestId => {
    try {
      setIsLoading(true);
      const newStatus = 'REJECT';
      const employeeID = userinfo.id;
      console.log(employeeID);
      console.log(requestId + 'requestId');

      const response = dispatch(
        editRejectLeaveRequestStatus(employeeID, requestId, newStatus),
      )
        .then(response => {
          console.log('Response:', response);
          if (response == 'Success') {
            setIsLoading(false);
            ToastAlert.ShowToast(
              'success',
              'Alert',
              ' Leave Request Rejected..',
            );
          } else {
            ToastAlert.ShowToast(
              'error',
              'Alert',
              'Erro in Leave Request Rejection.Try Again Later..',
            );
          } // "Success" or error object
        })
        .catch(err => {
          console.error('Error:', err);
        });
      console.log('response' >> +response);
    } catch (error) {
      console.error('Error dispatching the action:', error);
    }
  };

  const handleApproveHolidaySentRequest = async requestId => {
    try {
      setIsLoading(true);
      const newStatus = 'APPROVED';
      const employeeID = userinfo.id;
      console.log(employeeID);
      console.log(requestId + 'requestId');

      const response = dispatch(
        editApproveHolidayRequestStatus(employeeID, requestId, newStatus),
      )
        .then(response => {
          console.log('Response:', response);
          if (response == 'Success') {
            setIsLoading(false);
            ToastAlert.ShowToast(
              'success',
              'Alert',
              'Holiday Request Approved Sucessfully..',
            );
            reloadAction();
          } else {
            setIsLoading(false);
            ToastAlert.ShowToast(
              'error',
              'Alert',
              'Erro in Holiday Request Approved .Try Again..',
            );
          } // "Success" or error object
        })
        .catch(err => {
          console.error('Error:', err);
        });
      console.log('response' >> +response);
    } catch (error) {
      console.error('Error dispatching the action:', error);
    }
  };

  const handleRejectHolidaySentRequest = async requestId => {
    try {
      setIsLoading(true);
      const newStatus = 'REJECT';
      const employeeID = userinfo.id;
      console.log(employeeID);
      console.log(requestId + 'requestId');

      const response = dispatch(
        editRejectHolidayRequestStatus(employeeID, requestId, newStatus),
      )
        .then(response => {
          console.log('Response:', response);
          if (response == 'Success') {
            setIsLoading(false);
            ToastAlert.ShowToast(
              'success',
              'Alert',
              ' Holiday Request Rejected..',
            );
          } else {
            setIsLoading(false);
            ToastAlert.ShowToast(
              'error',
              'Alert',
              'Erro in Holiday Request Rejection.Try Again Later..',
            );
          } // "Success" or error object
        })
        .catch(err => {
          console.error('Error:', err);
        });
      console.log('response' >> +response);
    } catch (error) {
      console.error('Error dispatching the action:', error);
    }
  };

  const reloadAction = () => {
    navigation.reset({
      index: 0,
      routes: [{name: 'EmployeeDetails'}],
    });
    return true;
  };
  const EditCount = async e => {
    setIsLoading(true);
    const status =
      await firestoreRequestService.editActiveHolidayRequestsByEmployeeID(
        CountItem.id,
        Number(Count),
        userinfo.ID,
      );
    if (status == 'Success') {
      setIsLoading(false);
      ToastAlert.ShowToast('success', 'Alert', 'Successfully Edit count');
      reloadAction();
    } else {
      setIsLoading(false);
    }
  };

  const dropdowndata = [
    {key: '1', name: 'All'},
    {key: '2', name: 'Current month'},
    {key: '3', name: 'Last month'},
  ];
  const SelectSalaryData = Id => {
    if (Id === '1') {
      setTransformData(transformedData);
    } else if (Id === '2') {
      setTransformData(transformedData2);
    } else if (Id === '3') {
      setTransformData(transformedData3);
    }
  };

  const AllAdvanceData = useSelector(state => state.myReducers.AllAdvanceRequets);
  useEffect(() => {
    // Fetch admin data when the component mounts
    dispatch(AdminAdvanceAllRequestsByEmployeeId());
    console.log('Fetch dispatched');
  }, [dispatch]);

  const AllLeaveData = useSelector(state => state.myReducers.AllLeaveRequests);
  useEffect(() => {
    // Fetch admin data when the component mounts
    dispatch(AdminAllLeaveRequestsByEmployeeId());
    console.log('Fetch dispatched');
  }, [dispatch]);

  const AllHolidayData = useSelector(state => state.myReducers.AllHolidayRequets);
  useEffect(() => {
    // Fetch admin data when the component mounts
    dispatch(AdminAllHolidayRequestsByEmployeeId());
    console.log('Fetch dispatched');
  }, [dispatch]);
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.body}>
        <Text style={styles.header}>Employee Details</Text>
        <View style={styles.detailsBody}>
          <View style={styles.inputContainer}>
            <TouchableOpacity
              onPress={() => {
                backAction();
              }}>
              <FontAwesome name="arrow-left" size={25} color={Colors.black} />
            </TouchableOpacity>
            <View style={{...styles.button, backgroundColor: Colors.white}}>
              <Text style={{...styles.buttonText, color: Colors.black}}>
                {/* {userinfo.userName} */}
              </Text>
            </View>
            <View />
          </View>
          <View
            style={{
              flexDirection: 'row',
              backgroundColor: Colors.white,
              alignItems: 'center',
              marginBottom: 10,
              borderRadius: 10,
              elevation: 5,
              borderWidth: 1,
              borderColor: Colors.lightgray,
            }}>
            <TouchableOpacity
              style={[
                styles.buttoncontainer,
                WorkPlace
                  ? styles.buttoncontainercolor
                  : styles.buttoncontainercolor2,
              ]}
              onPress={() => {
                OnPressWorkPlace();
              }}>
              <Text style={styles.modalhead2}> Work Place</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.buttoncontainer,
                Salary
                  ? styles.buttoncontainercolor
                  : styles.buttoncontainercolor2,
              ]}
              onPress={() => {
                OnPressSalary();
              }}>
              <Text style={styles.modalhead2}>Salary</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.buttoncontainer,
                Holidays
                  ? styles.buttoncontainercolor
                  : styles.buttoncontainercolor2,
              ]}
              onPress={() => {
                OnPressHolidays();
              }}>
              <Text style={styles.modalhead2}>Holidays</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.buttoncontainer,
                Requests
                  ? styles.buttoncontainercolor
                  : styles.buttoncontainercolor2,
              ]}
              onPress={() => {
                OnPressRequests();
              }}>
              <Text style={styles.modalhead2}>Requests</Text>
            </TouchableOpacity>
          </View>
          {WorkPlace && (
            <View
              style={{
                ...styles.modalBody,
                borderWidth: 5,
                borderColor: Colors.black,
                borderRadius: 10,
                padding: 0,
                width: '100%',
              }}>
              <View
                style={{
                  flexDirection: 'row',
                  borderColor: Colors.gray,
                  borderBottomWidth: 2,
                  height: 50,
                  alignItems: 'center',
                  justifyContent: 'space-between',
                }}>
                <Text style={{...styles.modalhead2, width: '33%'}}>
                  Shop Name
                </Text>
                <Text style={{...styles.modalhead2, width: '33%'}}>
                  Check-In
                </Text>
                <Text style={{...styles.modalhead2, width: '33%'}}>
                  Check-Out
                </Text>
              </View>
              <FlatList
                data={shoplogin}
                nestedScrollEnabled={true}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({item}) => (
                  <View
                    style={{
                      flexDirection: 'row',
                      borderColor: Colors.white,
                      borderBottomWidth: 5,
                      backgroundColor: Colors.lightgray,
                      height: 50,
                      alignItems: 'center',
                      justifyContent: 'space-between',
                    }}>
                    <Text style={{...styles.modalhead3, width: '33%'}}>
                      {item.shopName}
                    </Text>
                    <Text style={{...styles.modalhead3, width: '33%'}}>
                      {item.checkInDateTime}
                    </Text>
                    <Text style={{...styles.modalhead3, width: '33%'}}>
                      {item.checkOutDateTime}
                    </Text>
                  </View>
                )}
              />
            </View>
          )}
          {Salary && (
            <>
              <Dropdown
                style={styles.dropdown}
                placeholderStyle={styles.placeholderStyle}
                selectedTextStyle={styles.selectedTextStyle}
                data={dropdowndata}
                maxHeight={300}
                labelField="name"
                containerStyle={{marginTop: 8, borderRadius: 10}}
                itemContainerStyle={styles.label}
                itemTextStyle={styles.itemTextStyle}
                valueField="name"
                placeholder={'Select'}
                value={value}
                onChange={item => {
                  setValue(item.name);
                  SelectSalaryData(item.key);
                }}
              />
              <View
                style={{
                  ...styles.modalBody,
                  borderWidth: 5,
                  borderColor: Colors.black,
                  borderRadius: 10,
                  padding: 0,
                  width: '100%',
                }}>
                <View
                  style={{
                    flexDirection: 'row',
                    borderColor: Colors.gray,
                    borderBottomWidth: 2,
                    height: 50,
                    alignItems: 'center',
                  }}>
                  <Text style={{...styles.modalhead2, width: '25%'}}>From</Text>
                  <Text style={{...styles.modalhead2, width: '25%'}}>To</Text>
                  <Text style={{...styles.modalhead2, width: '10%'}}>
                    Hours
                  </Text>
                  <Text style={{...styles.modalhead2, width: '10%'}}>
                    Salary
                  </Text>
                  <Text style={{...styles.modalhead2, width: '30%'}}>More</Text>
                </View>
                <FlatList
                  data={transformData}
                  nestedScrollEnabled={true}
                  keyExtractor={(item, index) => index.toString()}
                  renderItem={({item}) => (
                    <View
                      style={{
                        flexDirection: 'row',
                        borderColor: Colors.white,
                        borderBottomWidth: 5,
                        backgroundColor: Colors.lightgray,
                        height: 50,
                        alignItems: 'center',
                      }}>
                      <Text style={{...styles.modalhead3, width: '25%'}}>
                        {item.startDate}
                      </Text>
                      <Text style={{...styles.modalhead3, width: '25%'}}>
                        {item.endDate}
                      </Text>
                      <Text style={{...styles.modalhead3, width: '10%'}}>
                        {item.totalHours}
                      </Text>
                      <Text style={{...styles.modalhead3, width: '10%'}}>
                        {Number(item.totalHours) *
                          Number(userinfo.perHourSalary)}
                      </Text>
                      <TouchableOpacity
                        style={{
                          ...styles.requestbuttoncontiner,
                          width: '29%',
                          backgroundColor: Colors.black,
                        }}
                        onPress={() => {
                          setSalaryModal(true);
                          setSelectedItem(item);
                          // console.log(
                          //   'view item' + JSON.stringify(item),
                          // );
                        }}>
                        <Text
                          style={{...styles.modalhead3, color: Colors.white}}>
                          View more
                        </Text>
                      </TouchableOpacity>
                    </View>
                  )}
                />
              </View>
            </>
          )}
          {Holidays && (
            <>
              <View
                style={{
                  backgroundColor: Colors.rose,
                  width: '100%',
                  borderRadius: 10,
                  marginBottom: 5,
                  padding: 5,
                }}>
                <Text style={styles.modalhead2}>
                  Current Total holidays = {totalHours} hours
                </Text>
              </View>
              <View
                style={{
                  ...styles.modalBody,
                  borderWidth: 5,
                  borderColor: Colors.black,
                  borderRadius: 10,
                  padding: 0,
                  width: '100%',
                }}>
                <View
                  style={{
                    flexDirection: 'row',
                    borderColor: Colors.gray,
                    borderBottomWidth: 2,
                    height: 50,
                    alignItems: 'center',
                    justifyContent: 'space-between',
                  }}>
                  <Text style={{...styles.modalhead2, width: '33%'}}>From</Text>
                  <Text style={{...styles.modalhead2, width: '33%'}}>To</Text>
                  <Text style={{...styles.modalhead2, width: '33%'}}>
                    Hours
                  </Text>
                </View>
                <FlatList
                  data={activeholidayRequests}
                  nestedScrollEnabled={true}
                  keyExtractor={(item, index) => index.toString()}
                  renderItem={({item}) => (
                    <View
                      style={{
                        flexDirection: 'row',
                        borderColor: Colors.white,
                        borderBottomWidth: 5,
                        backgroundColor: Colors.lightgray,
                        height: 50,
                        alignItems: 'center',
                        justifyContent: 'space-between',
                      }}>
                      <Text style={{...styles.modalhead3, width: '33%'}}>
                        {item.from && item.from.toDate
                          ? new Date(item.from.toDate())
                              .toISOString()
                              .split('T')[0]
                          : 'Date not available'}
                      </Text>
                      <Text style={{...styles.modalhead3, width: '33%'}}>
                        {item.To && item.To.toDate
                          ? new Date(item.To.toDate())
                              .toISOString()
                              .split('T')[0]
                          : 'Date not available'}
                      </Text>
                      <Text style={{...styles.modalhead3, width: '33%'}}>
                        {item.Hours}
                      </Text>
                    </View>
                  )}
                />
              </View>
            </>
          )}
          {Requests && (

            <>
              <View style={styles.inputContainer2}>
                <TouchableOpacity
                  onPress={() => {
                    setRequestModal(true);
                  }}
                  style={styles.button2}>
                  <Text style={styles.buttonText}>View Request Response</Text>
                </TouchableOpacity>
              </View>
              <View
                style={{
                  ...styles.modalBody,
                  borderWidth: 5,
                  borderColor: Colors.black,
                  borderRadius: 10,
                  padding: 0,
                  width: '100%',
                }}>
                {advanceRequests != null && (
                  <FlatList
                    data={advanceRequests}
                    nestedScrollEnabled={true}
                    keyExtractor={(item, id) => id.toString()}
                    renderItem={({item}) => (
                      <View
                        style={{
                          padding: 5,
                          borderColor: Colors.black,
                          borderBottomWidth: 2,
                        }}>
                        <View
                          style={{
                            flexDirection: 'row',
                            borderColor: Colors.white,
                            borderBottomWidth: 5,
                            backgroundColor: Colors.white,
                            height: 50,
                            alignItems: 'center',
                            justifyContent: 'space-between',
                          }}>
                          <Text style={styles.modalhead3}>
                            {' '}
                            Request ${item.advance} for Advance Amount?
                          </Text>
                        </View>
                        {item.in && (
                          <View
                            style={{
                              flexDirection: 'row',
                              justifyContent: 'space-between',
                              alignItems: 'center',
                              marginBottom: 10,
                            }}>
                            <View
                              style={{
                                ...styles.requestbuttoncontiner,
                                width: '20%',
                              }}>
                              <Text style={styles.modalhead3}>From</Text>
                            </View>
                            <View
                              style={{
                                ...styles.requestbuttoncontiner,
                                width: '30%',
                                borderWidth: 1,
                                borderColor: Colors.black,
                              }}>
                              <Text style={styles.modalhead3}>{item.in}</Text>
                            </View>
                            <View
                              style={{
                                ...styles.requestbuttoncontiner,
                                width: '20%',
                              }}>
                              <Text style={styles.modalhead3}>To</Text>
                            </View>
                            <View
                              style={{
                                ...styles.requestbuttoncontiner,
                                width: '30%',
                                borderWidth: 1,
                                borderColor: Colors.black,
                              }}>
                              <Text style={styles.modalhead3}>{item.in}</Text>
                            </View>
                          </View>
                        )}
                        <View
                          style={{
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            marginBottom: 5,
                          }}>
                          <TouchableOpacity
                            style={{
                              ...styles.requestbuttoncontiner,
                              width: '49%',
                              borderWidth: 1,
                              borderColor: Colors.black,
                            }}
                            onPress={() => {
                              handleRejectAdvanceSentRequest(item.id);
                            }}>
                            <Text style={styles.modalhead3}>Reject</Text>
                          </TouchableOpacity>
                          <TouchableOpacity
                            style={{
                              ...styles.requestbuttoncontiner,
                              width: '49%',
                              backgroundColor: Colors.black,
                            }}
                            onPress={() => {
                              handleApproveAdvanceSentRequest(item.id);
                            }}>
                            <Text
                              style={{
                                ...styles.modalhead3,
                                color: Colors.white,
                              }}>
                              Approve
                            </Text>
                          </TouchableOpacity>
                        </View>
                      </View>
                    )}
                  />
                )}
                {leaveRequests != null && (
                  <FlatList
                    data={leaveRequests}
                    nestedScrollEnabled={true}
                    keyExtractor={(item, id) => id.toString()}
                    renderItem={({item}) => (
                      <View
                        style={{
                          padding: 5,
                          borderColor: Colors.black,
                          borderBottomWidth: 2,
                        }}>
                        <View
                          style={{
                            flexDirection: 'row',
                            borderColor: Colors.white,
                            borderBottomWidth: 5,
                            backgroundColor: Colors.white,
                            height: 50,
                            alignItems: 'center',
                            justifyContent: 'space-between',
                          }}>
                          <Text style={styles.modalhead3}>
                            {' '}
                            Request for Leave?
                          </Text>
                        </View>
                        {item.from && (
                          <View
                            style={{
                              flexDirection: 'row',
                              justifyContent: 'space-between',
                              alignItems: 'center',
                              marginBottom: 10,
                            }}>
                            <View
                              style={{
                                ...styles.requestbuttoncontiner,
                                width: '20%',
                              }}>
                              <Text style={styles.modalhead3}>From</Text>
                            </View>
                            <View
                              style={{
                                ...styles.requestbuttoncontiner,
                                width: '30%',
                                borderWidth: 1,
                                borderColor: Colors.black,
                              }}>
                              <Text style={styles.modalhead3}>
                                {' '}
                                {item.from.toDate().toLocaleDateString()}
                              </Text>
                            </View>
                            <View
                              style={{
                                ...styles.requestbuttoncontiner,
                                width: '20%',
                              }}>
                              <Text style={styles.modalhead3}>To</Text>
                            </View>
                            <View
                              style={{
                                ...styles.requestbuttoncontiner,
                                width: '30%',
                                borderWidth: 1,
                                borderColor: Colors.black,
                              }}>
                              <Text style={styles.modalhead3}>
                                {item.To.toDate().toLocaleDateString()}
                              </Text>
                            </View>
                          </View>
                        )}
                        <View
                          style={{
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            marginBottom: 5,
                          }}>
                          <TouchableOpacity
                            style={{
                              ...styles.requestbuttoncontiner,
                              width: '49%',
                              borderWidth: 1,
                              borderColor: Colors.black,
                            }}
                            onPress={() => {
                              handleRejectLeaveSentRequest(item.id);
                            }}>
                            <Text style={styles.modalhead3}>Reject</Text>
                          </TouchableOpacity>
                          <TouchableOpacity
                            style={{
                              ...styles.requestbuttoncontiner,
                              width: '49%',
                              backgroundColor: Colors.black,
                            }}
                            onPress={() => {
                              handleApproveLeaveSentRequest(item.id);
                            }}>
                            <Text
                              style={{
                                ...styles.modalhead3,
                                color: Colors.white,
                              }}>
                              Approve
                            </Text>
                          </TouchableOpacity>
                        </View>
                      </View>
                    )}
                  />
                )}

                {holidayRequests != null && (
                  <FlatList
                    data={holidayRequests}
                    nestedScrollEnabled={true}
                    keyExtractor={(item, id) => id.toString()}
                    renderItem={({item}) => (
                      <View
                        style={{
                          padding: 5,
                          borderColor: Colors.black,
                          borderBottomWidth: 2,
                        }}>
                        <View
                          style={{
                            flexDirection: 'row',
                            borderColor: Colors.white,
                            borderBottomWidth: 5,
                            backgroundColor: Colors.white,
                            height: 50,
                            alignItems: 'center',
                            justifyContent: 'space-between',
                          }}>
                          <Text style={styles.modalhead3}>
                            {' '}
                            Request for holiday {item.Hours} hours?
                          </Text>
                        </View>
                        {item.from && (
                          <View
                            style={{
                              flexDirection: 'row',
                              justifyContent: 'space-between',
                              alignItems: 'center',
                              marginBottom: 10,
                            }}>
                            <View
                              style={{
                                ...styles.requestbuttoncontiner,
                                width: '20%',
                              }}>
                              <Text style={styles.modalhead3}>From</Text>
                            </View>
                            <View
                              style={{
                                ...styles.requestbuttoncontiner,
                                width: '30%',
                                borderWidth: 1,
                                borderColor: Colors.black,
                              }}>
                              <Text style={styles.modalhead3}>
                                {item.from.toDate().toLocaleDateString()}
                              </Text>
                            </View>
                            <View
                              style={{
                                ...styles.requestbuttoncontiner,
                                width: '20%',
                              }}>
                              <Text style={styles.modalhead3}>To</Text>
                            </View>
                            <View
                              style={{
                                ...styles.requestbuttoncontiner,
                                width: '30%',
                                borderWidth: 1,
                                borderColor: Colors.black,
                              }}>
                              <Text style={styles.modalhead3}>
                                {item.To.toDate().toLocaleDateString()}
                              </Text>
                            </View>
                          </View>
                        )}
                        <View
                          style={{
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            marginBottom: 5,
                          }}>
                          <TouchableOpacity
                            style={{
                              ...styles.requestbuttoncontiner,
                              width: '49%',
                              borderWidth: 1,
                              borderColor: Colors.black,
                            }}
                            onPress={() => {
                              handleRejectHolidaySentRequest(item.id);
                            }}>
                            <Text style={styles.modalhead3}>Reject</Text>
                          </TouchableOpacity>
                          <TouchableOpacity
                            style={{
                              ...styles.requestbuttoncontiner,
                              width: '49%',
                              backgroundColor: Colors.black,
                            }}
                            onPress={() => {
                              handleApproveHolidaySentRequest(item.id);
                            }}>
                            <Text
                              style={{
                                ...styles.modalhead3,
                                color: Colors.white,
                              }}>
                              Approve
                            </Text>
                          </TouchableOpacity>
                        </View>
                      </View>
                    )}
                  />
                )}
              </View>
            </>
          )}
        </View>
      </View>
      <ProgressOverlay visible={isLoading} message={'Loading...'} />
      <Modal
        animationType="slide"
        transparent={true}
        visible={SalaryModal}
        onRequestClose={() => {
          setSalaryModal(!SalaryModal);
        }}>
        <SafeAreaView style={styles.body}>
          <Text style={styles.header}>Employee Details</Text>
          <View style={styles.detailsBody}>
            <View style={styles.inputContainer}>
              <TouchableOpacity
                onPress={() => {
                  setSalaryModal(false);
                }}>
                <FontAwesome name="arrow-left" size={25} color={Colors.black} />
              </TouchableOpacity>
              <View style={{...styles.button, backgroundColor: Colors.white}}>
                <Text style={{...styles.buttonText, color: Colors.black}}>
                  {userinfo.userName}
                </Text>
              </View>
              <View />
            </View>
            <View
              style={{
                backgroundColor: Colors.white,
                width: '100%',
                borderRadius: 10,
                marginBottom: 5,
                padding: 5,
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
                borderWidth: 2,
                borderColor: Colors.black,
              }}>
              <View style={{width: '15%'}}>
                <Text
                  style={{
                    ...styles.modalhead2,
                    fontSize: 15,
                    textAlign: 'left',
                  }}>
                  From :
                </Text>
                <Text
                  style={{
                    ...styles.modalhead2,
                    fontSize: 15,
                    textAlign: 'left',
                  }}>
                  To :
                </Text>
              </View>
              <View style={{width: '30%'}}>
                <Text
                  style={{
                    ...styles.modalhead2,
                    fontSize: 15,
                    textAlign: 'left',
                  }}>
                  {selectedItem.startDate}
                </Text>
                <Text
                  style={{
                    ...styles.modalhead2,
                    fontSize: 15,
                    textAlign: 'left',
                  }}>
                  {selectedItem.endDate}
                </Text>
              </View>
              <View style={{width: '25%'}}>
                <Text
                  style={{
                    ...styles.modalhead2,
                    fontSize: 15,
                    textAlign: 'left',
                  }}>
                  Total Hours :
                </Text>
                <Text
                  style={{
                    ...styles.modalhead2,
                    fontSize: 15,
                    textAlign: 'left',
                  }}>
                  Salary :
                </Text>
              </View>
              <View style={{width: '30%'}}>
                <Text
                  style={{
                    ...styles.modalhead2,
                    fontSize: 15,
                    textAlign: 'left',
                  }}>
                  {selectedItem.totalHours} Hours
                </Text>
                <Text
                  style={{
                    ...styles.modalhead2,
                    fontSize: 15,
                    textAlign: 'left',
                  }}>
                  {Number(selectedItem.totalHours) *
                    Number(userinfo.perHourSalary)}{' '}
                  Pounds
                </Text>
              </View>
            </View>
            <View
              style={{
                backgroundColor: Colors.rose,
                width: '100%',
                borderRadius: 10,
                marginBottom: 5,
                padding: 5,
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
                paddingLeft: 10,
              }}>
              <Text style={{...styles.modalhead2, fontSize: 15}}>
                Current Total Advance payment $1500
              </Text>
              <TouchableOpacity
                style={{
                  ...styles.requestbuttoncontiner,
                  backgroundColor: Colors.black,
                  paddingLeft: 10,
                  paddingRight: 10,
                }}
                onPress={() => {}}>
                <Text style={{...styles.modalhead3, color: Colors.white}}>
                  Advance
                </Text>
              </TouchableOpacity>
            </View>
            <View
              style={{
                ...styles.modalBody,
                borderWidth: 5,
                borderColor: Colors.black,
                borderRadius: 10,
                padding: 0,
                width: '100%',
              }}>
              <View
                style={{
                  flexDirection: 'row',
                  borderColor: Colors.gray,
                  borderBottomWidth: 2,
                  height: 50,
                  alignItems: 'center',
                  justifyContent: 'space-between',
                }}>
                <Text style={{...styles.modalhead2, width: '33%'}}>Dates</Text>
                <Text style={{...styles.modalhead2, width: '33%'}}>Hours</Text>
                <Text style={{...styles.modalhead2, width: '33%'}}>Salary</Text>
              </View>
              <FlatList
                data={selectedItem.items}
                nestedScrollEnabled={true}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({item}) => (
                  <View
                    style={{
                      flexDirection: 'row',
                      borderColor: Colors.white,
                      borderBottomWidth: 5,
                      backgroundColor: Colors.lightgray,
                      height: 50,
                      alignItems: 'center',
                      justifyContent: 'space-between',
                    }}>
                    <Text style={{...styles.modalhead3, width: '33%'}}>
                      {item.createdAt
                        ? new Date(item.createdAt.toDate())
                            .toISOString()
                            .split('T')[0]
                        : 'Date not available'}
                    </Text>
                    <View
                      style={{
                        width: '33%',
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}>
                      <Text style={{...styles.modalhead3, marginRight: 15}}>
                        {item.hoursOfWork}
                      </Text>
                      <TouchableOpacity
                        onPress={() => {
                          setCountModal(true);
                          setCountItem(item);
                        }}>
                        <FontAwesome
                          name="pencil"
                          size={25}
                          color={Colors.black}
                        />
                      </TouchableOpacity>
                    </View>

                    <Text style={{...styles.modalhead3, width: '33%'}}>
                      {Number(item.hoursOfWork) *
                        Number(userinfo.perHourSalary)}
                    </Text>
                  </View>
                )}
              />
            </View>
            {Number(userinfo.maxHours) <
            Number(selectedItem.totalHours) * Number(userinfo.perHourSalary) ? (
              <View
                style={{
                  backgroundColor: Colors.rose,
                  width: '100%',
                  borderRadius: 10,
                  marginBottom: 5,
                  padding: 5,
                  flexDirection: 'row',
                  alignItems: 'center',
                  marginTop: 5,
                  justifyContent: 'center',
                }}>
                <Text style={{...styles.modalhead2, fontSize: 15}}>
                  Also you exit Your total max Hours
                </Text>
              </View>
            ) : (
              ''
            )}
          </View>
        </SafeAreaView>
      </Modal>

      <Modal
        animationType="fade"
        transparent={true}
        visible={CountModal}
        onRequestClose={() => {
          setCountModal(!CountModal);
        }}>
        <SafeAreaView
          style={{
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
          }}>
          <View style={styles.modalcontainer}>
            <View style={styles.modalheaderview}>
              <Text style={styles.modalheadertext}>Edit Count</Text>
            </View>

            <TextInput
              style={styles.modaltextinput}
              onChangeText={Count => setCount(Count)}
              textColor="#BB0000"
              value={Count}
              placeholder={' hours..'}
              placeholderTextColor="#D9D9D9"
              theme={{
                colors: {
                  primary: 'transparent',
                  underlineColor: 'transparent',
                },
              }}
              returnKeyType="next"
              multiline={true}
              keyboardType="numeric"
            />
            <View style={styles.modalline} />
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
                width: '100%',
              }}>
              <TouchableOpacity
                onPress={() => {
                  // if (Count) {
                  //   //CountNotToCome();
                  // } else {
                  //   ToastAlert.ShowToast(
                  //     'error',
                  //     'Alert',
                  //     'Please add hours',
                  //   );
                  // }
                  EditCount();
                  setCountModal(false);
                  console.log('CountItem' + JSON.stringify(CountItem));
                }}
                style={styles.modalbuttonview}>
                <Text style={styles.modalbuttontext}>Send</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  setCountModal(false);
                  setCount(null);
                }}
                style={{
                  ...styles.modalbuttonview,
                  backgroundColor: Colors.white,
                  borderWidth: 1,
                  borderColor: Colors.lightgray,
                }}>
                <Text
                  style={{...styles.modalbuttontext, color: Colors.darkText}}>
                  Cancel
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </SafeAreaView>
      </Modal>

      <Modal
        animationType="slide"
        transparent={true}
        visible={RequestModal}
        onRequestClose={() => {
          setRequestModal(!RequestModal);
        }}>
        <SafeAreaView style={styles.body}>
          <Text style={styles.header}>Employee Details</Text>
          <View style={styles.detailsBody}>
            <View style={styles.inputContainer}>
              <TouchableOpacity
                onPress={() => {
                  setRequestModal(false);
                }}>
                <FontAwesome name="arrow-left" size={25} color={Colors.black} />
              </TouchableOpacity>
              <View style={{...styles.button, backgroundColor: Colors.white}}>
                <Text style={{...styles.buttonText, color: Colors.black}}>
                  Gowrisan
                </Text>
              </View>
              <View />
            </View>
            <View
              style={{
                ...styles.modalBody,
                borderWidth: 5,
                borderColor: Colors.black,
                borderRadius: 10,
                padding: 0,
                width: '100%',
              }}>
              <View
                style={{
                  flexDirection: 'row',
                  borderColor: Colors.gray,
                  borderBottomWidth: 2,
                  height: 50,
                  alignItems: 'center',
                  justifyContent: 'space-between',
                }}>
                <Text style={{...styles.modalhead2, width: '50%'}}>Advance</Text>
                <Text style={{...styles.modalhead2, width: '50%'}}>Status</Text>
              </View>
              <FlatList
                data={AllAdvanceData}
                nestedScrollEnabled={true}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({item}) => (
                  <View
                    style={{
                      flexDirection: 'row',
                      borderColor: Colors.white,
                      borderBottomWidth: 5,
                      backgroundColor: Colors.lightgray,
                      height: 50,
                      alignItems: 'center',
                      justifyContent: 'space-between',
                    }}>
                    <Text style={{...styles.modalhead3, width: '50%'}}>
                    {item.advance}
                    </Text>
                    <Text style={{...styles.modalhead3, width: '50%'}}>
                    {item.status}
                    </Text>
                  </View>
                )}
              />
              <View
                style={{
                  flexDirection: 'row',
                  borderColor: Colors.gray,
                  borderBottomWidth: 2,
                  height: 50,
                  alignItems: 'center',
                  justifyContent: 'space-between',
                }}>
                <Text style={{...styles.modalhead2, width: '33%'}}>From</Text>
                <Text style={{...styles.modalhead2, width: '33%'}}>To</Text>
                <Text style={{...styles.modalhead2, width: '33%'}}>Status</Text>
              </View>
              <FlatList
                data={AllLeaveData}
                nestedScrollEnabled={true}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({item}) => (
                  <View
                    style={{
                      flexDirection: 'row',
                      borderColor: Colors.white,
                      borderBottomWidth: 5,
                      backgroundColor: Colors.lightgray,
                      height: 50,
                      alignItems: 'center',
                      justifyContent: 'space-between',
                    }}>
                    <Text style={{...styles.modalhead3, width: '33%'}}>
                    {item.from.toDate().toLocaleDateString()}
                    </Text>
                    <Text style={{...styles.modalhead3, width: '33%'}}>
                    {item.To.toDate().toLocaleDateString()}
                    </Text>
                    <Text style={{...styles.modalhead3, width: '33%'}}>
                    {item.status}
                    </Text>
                  </View>
                )}
              />
              <View
                style={{
                  flexDirection: 'row',
                  borderColor: Colors.gray,
                  borderBottomWidth: 2,
                  height: 50,
                  alignItems: 'center',
                  justifyContent: 'space-between',
                }}>
                <Text style={{...styles.modalhead2, width: '25%'}}>From</Text>
                <Text style={{...styles.modalhead2, width: '25%'}}>To</Text>
                <Text style={{...styles.modalhead2, width: '25%'}}>Hours</Text>
                <Text style={{...styles.modalhead2, width: '25%'}}>Status</Text>
              </View>
              <FlatList
                data={AllHolidayData}
                nestedScrollEnabled={true}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({item}) => (
                  <View
                    style={{
                      flexDirection: 'row',
                      borderColor: Colors.white,
                      borderBottomWidth: 5,
                      backgroundColor: Colors.lightgray,
                      height: 50,
                      alignItems: 'center',
                      justifyContent: 'space-between',
                    }}>
                    <Text style={{...styles.modalhead3, width: '25%'}}>
                    {item.from.toDate().toLocaleDateString()}
                    </Text>
                    <Text style={{...styles.modalhead3, width: '25%'}}>
                    {item.To.toDate().toLocaleDateString()}
                    </Text>
                    <Text style={{...styles.modalhead3, width: '25%'}}>
                    {item.Hours}
                    </Text>
                    <Text style={{...styles.modalhead3, width: '25%'}}>
                    {item.status}
                    </Text>
                  </View>
                )}
              />
            </View>
          </View>
        </SafeAreaView>
      </Modal>
    </SafeAreaView>
  );
}
