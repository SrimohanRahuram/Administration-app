import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  BackHandler,
  TextInput,
  ScrollView,
} from 'react-native';
import styles from './Requests.Styles';
import Colors from '../../constants/Colors';
import Images from '../../constants/images';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import ProgressOverlay from '../../components/ProgressOverlay';
import ToastAlert from '../../components/ToastAlert';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

export default function Requests({navigation}) {
  const [advance, setAdvance] = React.useState('');
  const [leaveDates, setLeaveDates] = React.useState('');

  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [isDatePickerVisible2, setDatePickerVisibility2] = useState(false);
  const [formDate, setFormDate] = useState();
  const [toDate, setToDate] = useState();

  const [formDate2, setFormDate2] = useState();
  const [toDate2, setToDate2] = useState();
  const [isDatePickerVisible3, setDatePickerVisibility3] = useState(false);
  const [isDatePickerVisible4, setDatePickerVisibility4] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

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
  return (
    <View style={styles.container}>
      <View style={styles.body}>
        <Text style={styles.header}>Requests</Text>
        <View style={styles.detailsBody}>
          <ScrollView>
            <View
              style={{
                ...styles.inputContainer,
                justifyContent: 'space-between',
              }}>
              <View style={styles.totalDetails}>
                <Text style={{color: Colors.black, fontWeight: '500'}}>
                  Total Holiday = 3 hours
                </Text>
              </View>
              <View style={styles.totalDetails}>
                <Text style={{color: Colors.black, fontWeight: '500'}}>
                  Total Advance amount = $300
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
                <TouchableOpacity onPress={() => {}} style={styles.button}>
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
                    {toDate ? (
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
                onPress={() => {}}
                style={{...styles.button, width: '100%'}}>
                <Text style={styles.buttonText}>Send Request</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.detailsBody2}>
              <Text style={{...styles.head, marginBottom: 10}}>
                How many leaves you need to ask?
              </Text>
              <View style={styles.inputContainer}>
                <Text style={{...styles.head, width: '20%'}}>Hours:</Text>
                <View style={{...styles.inputView, width: '80%'}}>
                  <TextInput
                    style={styles.input}
                    onChangeText={setLeaveDates}
                    value={leaveDates}
                    placeholder="Enter Amount"
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
                onPress={() => {}}
                style={{...styles.button, width: '100%'}}>
                <Text style={styles.buttonText}>Send Request</Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </View>
      </View>
      <ProgressOverlay visible={isLoading} message={'Loading...'} />
    </View>
  );
}
