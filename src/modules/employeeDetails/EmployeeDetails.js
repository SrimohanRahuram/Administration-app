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
  ActiveHolidayRequestsByEmployeeId,
} from '../../service/redux/actions';
import {format, getWeek, startOfWeek, endOfWeek} from 'date-fns';

export default function EmployeeDetails({navigation}) {
  const [isLoading, setIsLoading] = useState(false);
  const [SalaryModal, setSalaryModal] = useState(false);
  const [WorkPlace, setWorkPlace] = React.useState(false);
  const [Salary, setSalary] = React.useState(false);
  const [Holidays, setHolidays] = React.useState(false);
  const [Requests, setRequests] = React.useState(false);
  const {userinfo} = useSelector(state => state.myReducers);
  const [filteredData, setFilteredData] = React.useState([]);
  const [selectedItem, setSelectedItem] = React.useState('');

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
  const totalHours = activeholidayRequests.reduce((total, item) => total + parseFloat(item.Hours), 0);
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
  // const salarydata = [
  //   {key: '1', id: ' 11', in: '24/12/2024', out: '24/12/2024', salary: ' 110'},
  //   {key: '2', id: ' 12', in: '24/12/2024', out: '24/12/2024', salary: ' 110'},
  //   {key: '3', id: ' 31', in: '24/12/2024', out: '24/12/2024', salary: ' 110'},
  //   {key: '4', id: ' 14', in: '24/12/2024', out: '24/12/2024', salary: ' 110'},
  //   {key: '5', id: ' 51', in: '24/12/2024', out: '24/12/2024', salary: ' 110'},
  // ];

  const groupByWeek = () => {
    const groupedData = {};
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

    setFilteredData(sortedData);
    console.log('groupByWeek' + JSON.stringify(sortedData));
  };
  const transformedData = Object.keys(filteredData).map(key => ({
    ...filteredData[key],
    week: key,
  }));
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
                data={transformedData}
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
                      {Number(item.totalHours) * Number(userinfo.perHourSalary)}
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
                    <Text style={{...styles.modalhead3, width: '33%'}}>
                      {item.hoursOfWork}
                    </Text>
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
    </SafeAreaView>
  );
}
