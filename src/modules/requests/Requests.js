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
  const [number, onChangeNumber] = React.useState('');
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [lastVisitedDate, setLastVisitedDate] = useState();

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
      setLastVisitedDate(date);
      hideDatePicker();
    } else {
      setLastVisitedDate();
      setDatePickerVisibility(false);
      ToastAlert.ShowToast('error', 'Alert', 'Wrong Due Date');
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.body}>
        <Text style={styles.header}>Requests</Text>
        <View style={styles.detailsBody}>
          <View style={styles.detailsBody2}>
            <Text style={styles.head}>
              How much of money you need for Advance ?
            </Text>
            <View
              style={{
                ...styles.inputContainer,
                justifyContent: 'space-between',
              }}>
              <View style={styles.inputView}>
                <TextInput
                  style={styles.input}
                  onChangeText={onChangeNumber}
                  value={number}
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
            <Text style={styles.head}>How many leaves you need to ask?</Text>
            <View style={styles.inputContainer}>
              <Text style={styles.head}>Hours:</Text>
              <View style={{...styles.inputView, width: '62%'}}>
                <TextInput
                  style={styles.input}
                  onChangeText={onChangeNumber}
                  value={number}
                  placeholder="Enter Amount"
                  keyboardType="numeric"
                />
              </View>
            </View>
            <View style={styles.inputContainer}>
              <Text style={styles.head}>From:</Text>
              <View style={{...styles.inputView, width: '62%'}}>
                <View style={{width: '90%'}}>
                  {lastVisitedDate ? (
                    <Text style={{...styles.calendertext, color: Colors.black}}>
                      {lastVisitedDate.toLocaleDateString()}
                    </Text>
                  ) : (
                    <Text style={styles.calendertext}>Select Due date</Text>
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
              <Text style={styles.head}>To:</Text>
              <View style={{...styles.inputView, width: '62%'}}>
                <View style={{width: '90%'}}>
                  {lastVisitedDate ? (
                    <Text style={{...styles.calendertext, color: Colors.black}}>
                      {lastVisitedDate.toLocaleDateString()}
                    </Text>
                  ) : (
                    <Text style={styles.calendertext}>Select Due date</Text>
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
              <TouchableOpacity onPress={() => {}} style={styles.button}>
                <Text style={styles.buttonText}>Send Request</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
      <ProgressOverlay visible={isLoading} message={'Loading...'} />
    </View>
  );
}
