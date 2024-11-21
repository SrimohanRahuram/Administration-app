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
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Feather from 'react-native-vector-icons/Feather';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {
  AdvanceRequestsByEmployeeId,
  HolidayRequestsByEmployeeId,
  ShopLoginByEmployeeId,
  LeaveRequestsByEmployeeId,
} from '../../service/redux/actions';

export default function EmployeeDetails({navigation}) {
  const [isLoading, setIsLoading] = useState(false);
  const [SalaryModal, setSalaryModal] = useState(false);
  const [WorkPlace, setWorkPlace] = React.useState(false);
  const [Salary, setSalary] = React.useState(false);
  const [Holidays, setHolidays] = React.useState(false);
  const [Requests, setRequests] = React.useState(false);
  const {userinfo} = useSelector(state => state.myReducers);

  // Accessing advancerequests from your Redux store
  const advanceRequests = useSelector(
    state => state.myReducers.advanceRequests,
  );
  const leaveRequests = useSelector(state => state.myReducers.leaveRequests);
  const holidayRequests = useSelector(
    state => state.myReducers.holidayRequests,
  );
  const shoplogin = useSelector(state => state.myReducers.shop_login);

  const dispatch = useDispatch();
  useEffect(() => {
    console.log('shop login updated:', shoplogin);
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
  //next

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

  const workplacedata = [
    {key: '1', id: 'shop 1', in: '24/12/2024 12.00', out: '24/12/2024 12.00'},
    {key: '2', id: 'shop 2', in: '24/12/2024 12.00', out: '24/12/2024 12.00'},
    {key: '3', id: 'shop 3', in: '24/12/2024 12.00', out: '24/12/2024 12.00'},
    {key: '4', id: 'shop 4', in: '24/12/2024 12.00', out: '24/12/2024 12.00'},
    {key: '5', id: 'shop 5', in: '24/12/2024 12.00', out: '24/12/2024 12.00'},
  ];
  const salarydata = [
    {key: '1', id: ' 11', in: '24/12/2024', out: '24/12/2024', salary: ' 110'},
    {key: '2', id: ' 12', in: '24/12/2024', out: '24/12/2024', salary: ' 110'},
    {key: '3', id: ' 31', in: '24/12/2024', out: '24/12/2024', salary: ' 110'},
    {key: '4', id: ' 14', in: '24/12/2024', out: '24/12/2024', salary: ' 110'},
    {key: '5', id: ' 51', in: '24/12/2024', out: '24/12/2024', salary: ' 110'},
  ];
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
              <AntDesign name="arrowleft" size={25} color={Colors.black} />
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
                <Text style={{...styles.modalhead2, width: '10%'}}>Hours</Text>
                <Text style={{...styles.modalhead2, width: '10%'}}>Salary</Text>
                <Text style={{...styles.modalhead2, width: '30%'}}>More</Text>
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
                    }}>
                    <Text style={{...styles.modalhead3, width: '25%'}}>
                      {item.checkInDateTime}
                    </Text>
                    <Text style={{...styles.modalhead3, width: '25%'}}>
                      {item.checkOutDateTime}
                    </Text>
                    <Text style={{...styles.modalhead3, width: '10%'}}>
                      {item.hoursOfWork}
                    </Text>
                    <Text style={{...styles.modalhead3, width: '10%'}}>
                      {item.hoursOfWork}
                    </Text>
                    <TouchableOpacity
                      style={{
                        ...styles.requestbuttoncontiner,
                        width: '29%',
                        backgroundColor: Colors.black,
                      }}
                      onPress={() => {
                        setSalaryModal(true);
                      }}>
                      <Text style={{...styles.modalhead3, color: Colors.white}}>
                        View more
                      </Text>
                    </TouchableOpacity>
                  </View>
                )}
              />
            </View>
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
                  Current Total holidays = 14 hours
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
                  data={salarydata}
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
                        {item.out}
                      </Text>
                      <Text style={{...styles.modalhead3, width: '33%'}}>
                        {item.in}
                      </Text>
                      <Text style={{...styles.modalhead3, width: '33%'}}>
                        {item.id}
                      </Text>
                    </View>
                  )}
                />
              </View>
            </>
          )}
          {Requests && (
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
                          onPress={() => {}}>
                          <Text style={styles.modalhead3}>Reject</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                          style={{
                            ...styles.requestbuttoncontiner,
                            width: '49%',
                            backgroundColor: Colors.black,
                          }}
                          onPress={() => {}}>
                          <Text
                            style={{...styles.modalhead3, color: Colors.white}}>
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
                          onPress={() => {}}>
                          <Text style={styles.modalhead3}>Reject</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                          style={{
                            ...styles.requestbuttoncontiner,
                            width: '49%',
                            backgroundColor: Colors.black,
                          }}
                          onPress={() => {}}>
                          <Text
                            style={{...styles.modalhead3, color: Colors.white}}>
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
                          onPress={() => {}}>
                          <Text style={styles.modalhead3}>Reject</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                          style={{
                            ...styles.requestbuttoncontiner,
                            width: '49%',
                            backgroundColor: Colors.black,
                          }}
                          onPress={() => {}}>
                          <Text
                            style={{...styles.modalhead3, color: Colors.white}}>
                            Approve
                          </Text>
                        </TouchableOpacity>
                      </View>
                    </View>
                  )}
                />
              )}
            </View>
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
        <View style={styles.body}>
          <Text style={styles.header}>Employee Details</Text>
          <View style={styles.detailsBody}>
            <View style={styles.inputContainer}>
              <TouchableOpacity
                onPress={() => {
                  setSalaryModal(false);
                }}>
                <AntDesign name="arrowleft" size={25} color={Colors.black} />
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
                  10/12/2024
                </Text>
                <Text
                  style={{
                    ...styles.modalhead2,
                    fontSize: 15,
                    textAlign: 'left',
                  }}>
                  17/12/2024
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
                  56 Hours
                </Text>
                <Text
                  style={{
                    ...styles.modalhead2,
                    fontSize: 15,
                    textAlign: 'left',
                  }}>
                  50 Pounds
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
                data={salarydata}
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
                      {item.out}
                    </Text>
                    <Text style={{...styles.modalhead3, width: '33%'}}>
                      {item.id}
                    </Text>
                    <Text style={{...styles.modalhead3, width: '33%'}}>
                      {item.id}
                    </Text>
                  </View>
                )}
              />
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
                marginTop: 5,
                justifyContent: 'center',
              }}>
              <Text style={{...styles.modalhead2, fontSize: 15}}>
                Also you exit Your total max Hours
              </Text>
            </View>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}
