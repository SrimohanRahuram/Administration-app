import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  BackHandler,
  TextInput,
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
  const [isLoading, setIsLoading] = useState(false);
  const [formDate, setFormDate] = useState();
  const [toDate, setToDate] = useState();

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

  return (
    <View style={styles.container}>
      <View style={styles.body}>
        <Text style={styles.header}>Requests</Text>
        <View style={styles.detailsBody}>
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
                    <Text style={{...styles.calendertext, color: Colors.black}}>
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
                    <Text style={{...styles.calendertext, color: Colors.black}}>
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
        </View>
      </View>
      <ProgressOverlay visible={isLoading} message={'Loading...'} />
    </View>
  );
}
