import React, {useEffect, useState} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  View,
  Text,
  TouchableOpacity,
  BackHandler,
  TextInput,
  ScrollView,
  SafeAreaView,
  Modal,
  FlatList,
} from 'react-native';
import styles from './Requests.Styles';
import Colors from '../../constants/Colors';
import Images from '../../constants/images';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import ProgressOverlay from '../../components/ProgressOverlay';
import ToastAlert from '../../components/ToastAlert';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import firestoreRequestService from '../../handlers/firestoreRequestService';
import {SelectCountry} from 'react-native-element-dropdown';
import { employeeTotalAdvanceCalc, employeeTotalHolidayHoursCalc, employeeTotalHoursCalc } from '../../service/redux/actions';
import { useDispatch } from 'react-redux';

export default function Requests({navigation}) {
  const [advance, setAdvance] = React.useState(0);
  const [leaveDates, setLeaveDates] = React.useState(0);

  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [isDatePickerVisible2, setDatePickerVisibility2] = useState(false);
  const [formDate, setFormDate] = useState();
  const [toDate, setToDate] = useState();

  const [formDate2, setFormDate2] = useState();
  const [toDate2, setToDate2] = useState();
  const [isDatePickerVisible3, setDatePickerVisibility3] = useState(false);
  const [isDatePickerVisible4, setDatePickerVisibility4] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const [RequestModal, setRequestModal] = useState(false);
  const [employeeTotalHoliday, setEmployeeTotalHoliday] = useState(false);
  const [employeeTotalAdvance, setEmployeeTotalAdvance] = useState(false);
  
   dispatch=useDispatch();

   useEffect(() => {
    dispatch(employeeTotalHolidayHoursCalc())
      .then(response => {
        setEmployeeTotalHoliday(response); // Update state with the response
        console.log('Response:', response); // Log the response for debugging
      })
      .catch(error => {
        console.error('Error calculating total holiday hours:', error);
      });
  }, [dispatch]);

  useEffect(() => {
    dispatch(employeeTotalAdvanceCalc())
      .then(response => {
        setEmployeeTotalAdvance(response); // Update state with the response
        console.log('employeeTotalAdvanceCalc:', response); // Log the response for debugging
      })
      .catch(error => {
        console.error('Error calculating total holiday hours:', error);
      });
  }, [dispatch]);


  useEffect(() => {
    BackHandler.addEventListener('hardwareBackPress', backAction);
    return () => {
      BackHandler.removeEventListener('hardwareBackPress', backAction);
    };
  }, []);

  const backAction = () => {
    navigation.navigate('Notifications');
  };
  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };
  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };
  const handleConfirm = date => {
    const currentDate = new Date();
    if (date > currentDate) {
      setFormDate(date);
      hideDatePicker();
    } else {
      setFormDate();
      setDatePickerVisibility(false);
      ToastAlert.ShowToast('error', 'Alert', 'Wrong Due Date');
    }
  };
  const showDatePicker2 = () => {
    setDatePickerVisibility2(true);
  };
  const hideDatePicker2 = () => {
    setDatePickerVisibility2(false);
  };
  const handleConfirm2 = date => {
    const currentDate = new Date();
    if (date > currentDate) {
      setToDate(date);
      hideDatePicker2();
    } else {
      setToDate();
      setDatePickerVisibility2(false);
      ToastAlert.ShowToast('error', 'Alert', 'Wrong Due Date');
    }
  };
  const showDatePicker3 = () => {
    setDatePickerVisibility3(true);
  };
  const hideDatePicker3 = () => {
    setDatePickerVisibility3(false);
  };
  const handleConfirm3 = date => {
    const currentDate = new Date();
    if (date > currentDate) {
      setFormDate2(date);
      hideDatePicker3();
    } else {
      setFormDate2();
      setDatePickerVisibility3(false);
      ToastAlert.ShowToast('error', 'Alert', 'Wrong Due Date');
    }
  };
  const showDatePicker4 = () => {
    setDatePickerVisibility4(true);
  };
  const hideDatePicker4 = () => {
    setDatePickerVisibility4(false);
  };
  const handleConfirm4 = date => {
    const currentDate = new Date();
    if (date > currentDate) {
      setToDate2(date);
      hideDatePicker4();
    } else {
      setToDate2();
      setDatePickerVisibility4(false);
      ToastAlert.ShowToast('error', 'Alert', 'Wrong Due Date');
    }
  };

  const handleAdvanceSentRequest = async e => {
    setIsLoading(true);
    const employeeId = await AsyncStorage.getItem('employeeId');
    const status = await firestoreRequestService.saveAdvanceRequestData(
      advance,
      employeeId,
    );
    if (status == 'Success') {
      setIsLoading(false);
      ToastAlert.ShowToast(
        'success',
        'Alert',
        'Sucessfully Advance Request sent..',
      );
      setAdvance('');
      // dispatch();
    }
    else{
      setIsLoading(false);
    ToastAlert.ShowToast(
      'error',
      'Alert',
      'error Advance Request sent..',
    );
    }
  };

  const handleLeaveSentRequest = async e => {
    setIsLoading(true);
    const employeeId = await AsyncStorage.getItem('employeeId');
    const status = await firestoreRequestService.saveLeaveRequestData(
      formDate2,
      toDate2,
      employeeId,
    );
    if (status == 'Success') {
      setIsLoading(false);
      ToastAlert.ShowToast(
        'success',
        'Alert',
        'error Advance Request sent..',
      );
      
      setFormDate2('');
      setToDate2('');
      // dispatch();
    }
    else{
    setIsLoading(false);
    ToastAlert.ShowToast(
      'error',
      'Alert',
      'error Advance Request sent..',
    );
    }
  };

  const handleHolidaySentRequest = async e => {
    setIsLoading(true);
    const employeeId = await AsyncStorage.getItem('employeeId');

    const status = await firestoreRequestService.saveHolidayRequestData(
      formDate,
      toDate,
      leaveDates,
      employeeId,
    );
    if (status == 'Success') {
      setIsLoading(false);
      ToastAlert.ShowToast(
        'success',
        'Alert',
        'Sucessfully Advance Request sent..',
      );
      setFormDate('');
      setToDate('');
      setLeaveDates('');
      // dispatch();
    }
    else{
      setIsLoading(false);
      ToastAlert.ShowToast(
        'error',
        'Alert',
        'Sucessfully Advance Request sent..',
      );
    }
  };

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
        <Text style={styles.header}>Requests</Text>
        <View style={styles.detailsBody}>
          <View style={styles.inputContainer2}>
            <TouchableOpacity
              onPress={() => {
                setRequestModal(true);
              }}
              style={styles.button2}>
              <Text style={styles.buttonText}>View Request Response</Text>
            </TouchableOpacity>
          </View>
          <ScrollView>
            <View
              style={{
                ...styles.inputContainer,
                justifyContent: 'space-between',
              }}>
              <View style={styles.totalDetails}>
                <Text style={{color: Colors.black, fontWeight: '500'}}>
                  Total Holiday = {employeeTotalHoliday}
                </Text>
              </View>
              <View style={styles.totalDetails}>
                <Text style={{color: Colors.black, fontWeight: '500'}}>
                  Total Advance amount = ${employeeTotalAdvance}
                </Text>
              </View>
            </View>
            <View style={styles.detailsBody2}>
              <Text style={{...styles.head, marginBottom: 10}}>
                How much of money you need for Advance ?
              </Text>
              <View
                style={{
                  ...styles.inputContainer,
                  justifyContent: 'space-between',
                }}>
                <View style={{...styles.inputView, marginBottom: 0}}>
                  <TextInput
                    style={styles.input}
                    onChangeText={setAdvance}
                    value={advance}
                    placeholder="Enter Amount"
                    keyboardType="numeric"
                  />
                </View>
                <TouchableOpacity
                  onPress={() => {
                    handleAdvanceSentRequest();
                  }}
                  style={styles.button}>
                  <Text style={styles.buttonText}>Send Request</Text>
                </TouchableOpacity>
              </View>
            </View>
            <View style={styles.detailsBody2}>
              <Text style={{...styles.head, marginBottom: 10}}>
                How many leaves you need to ask?
              </Text>
              <View style={styles.inputContainer}>
                <Text style={{...styles.head, width: '20%'}}>From:</Text>
                <View style={{...styles.inputView, width: '80%'}}>
                  <View style={{width: '90%'}}>
                    {formDate2 ? (
                      <Text
                        style={{...styles.calendertext, color: Colors.black}}>
                        {formDate2.toLocaleDateString()}
                      </Text>
                    ) : (
                      <Text style={styles.calendertext}>Select Date</Text>
                    )}
                  </View>

                  <TouchableOpacity onPress={showDatePicker3}>
                    <View>
                      <FontAwesome
                        name="calendar-plus-o"
                        size={18}
                        color="##666666"
                      />
                    </View>
                  </TouchableOpacity>
                  <DateTimePickerModal
                    isVisible={isDatePickerVisible3}
                    mode="date"
                    onConfirm={handleConfirm3}
                    onCancel={hideDatePicker3}
                    datePickerStyle={{color: 'red'}}
                  />
                </View>
              </View>
              <View style={styles.inputContainer}>
                <Text style={{...styles.head, width: '20%'}}>To:</Text>
                <View style={{...styles.inputView, width: '80%'}}>
                  <View style={{width: '90%'}}>
                    {toDate2 ? (
                      <Text
                        style={{...styles.calendertext, color: Colors.black}}>
                        {toDate2.toLocaleDateString()}
                      </Text>
                    ) : (
                      <Text style={styles.calendertext}>Select Date</Text>
                    )}
                  </View>

                  <TouchableOpacity onPress={showDatePicker4}>
                    <View>
                      <FontAwesome
                        name="calendar-plus-o"
                        size={18}
                        color="##666666"
                      />
                    </View>
                  </TouchableOpacity>
                  <DateTimePickerModal
                    isVisible={isDatePickerVisible4}
                    mode="date"
                    onConfirm={handleConfirm4}
                    onCancel={hideDatePicker4}
                    datePickerStyle={{color: 'red'}}
                  />
                </View>
              </View>
              <TouchableOpacity
                onPress={() => {
                  handleLeaveSentRequest();
                }}
                style={{...styles.button, width: '100%'}}>
                <Text style={styles.buttonText}>Send Leave Request</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.detailsBody2}>
              <Text style={{...styles.head, marginBottom: 10}}>
                How many Holidays you need to ask?
              </Text>
              <View style={styles.inputContainer}>
                <Text style={{...styles.head, width: '20%'}}>Hours:</Text>
                <View style={{...styles.inputView, width: '80%'}}>
                  <TextInput
                    style={styles.input}
                    onChangeText={setLeaveDates}
                    value={leaveDates}
                    placeholder="Enter Hours"
                    keyboardType="numeric"
                  />
                </View>
              </View>
              <View style={styles.inputContainer}>
                <Text style={{...styles.head, width: '20%'}}>From:</Text>
                <View style={{...styles.inputView, width: '80%'}}>
                  <View style={{width: '90%'}}>
                    {formDate ? (
                      <Text
                        style={{...styles.calendertext, color: Colors.black}}>
                        {formDate.toLocaleDateString()}
                      </Text>
                    ) : (
                      <Text style={styles.calendertext}>Select Date</Text>
                    )}
                  </View>

                  <TouchableOpacity onPress={showDatePicker}>
                    <View>
                      <FontAwesome
                        name="calendar-plus-o"
                        size={18}
                        color="##666666"
                      />
                    </View>
                  </TouchableOpacity>
                  <DateTimePickerModal
                    isVisible={isDatePickerVisible}
                    mode="date"
                    onConfirm={handleConfirm}
                    onCancel={hideDatePicker}
                    datePickerStyle={{color: 'red'}}
                  />
                </View>
              </View>
              <View style={styles.inputContainer}>
                <Text style={{...styles.head, width: '20%'}}>To:</Text>
                <View style={{...styles.inputView, width: '80%'}}>
                  <View style={{width: '90%'}}>
                    {toDate ? (
                      <Text
                        style={{...styles.calendertext, color: Colors.black}}>
                        {toDate.toLocaleDateString()}
                      </Text>
                    ) : (
                      <Text style={styles.calendertext}>Select Date</Text>
                    )}
                  </View>

                  <TouchableOpacity onPress={showDatePicker2}>
                    <View>
                      <FontAwesome
                        name="calendar-plus-o"
                        size={18}
                        color="##666666"
                      />
                    </View>
                  </TouchableOpacity>
                  <DateTimePickerModal
                    isVisible={isDatePickerVisible2}
                    mode="date"
                    onConfirm={handleConfirm2}
                    onCancel={hideDatePicker2}
                    datePickerStyle={{color: 'red'}}
                  />
                </View>
              </View>
              <TouchableOpacity
                onPress={() => {
                  handleHolidaySentRequest();
                }}
                style={{...styles.button, width: '100%'}}>
                <Text style={styles.buttonText}>Send Request</Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </View>
      </View>
      <ProgressOverlay visible={isLoading} message={'Loading...'} />
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
                    {item.salary}
                    </Text>
                    <Text style={{...styles.modalhead3, width: '33%'}}>
                    {item.salary}
                    </Text>
                    <Text style={{...styles.modalhead3, width: '33%'}}>
                    {item.salary}
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
