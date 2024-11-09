import React, {useEffect, useState} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  View,
  Text,
  TouchableOpacity,
  BackHandler,
  TextInput,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import styles from './Home.Styles';
import Colors from '../../constants/Colors';
import Images from '../../constants/images';
import ProgressOverlay from '../../components/ProgressOverlay';
import ToastAlert from '../../components/ToastAlert';
import Entypo from 'react-native-vector-icons/Entypo';
import {
  fetchEmployeeDataById,
  fetchShopData,
} from '../../service/redux/actions';
import {Dropdown} from 'react-native-element-dropdown';

export default function Home({navigation}) {
  const [isLoading, setIsLoading] = useState(false);
  const [isEnabled, setIsEnabled] = useState(false);
  const [value, setValue] = useState(null);
  const [userName, setUserName] = React.useState('');
  const [Id, setId] = React.useState('');
  const [contactNo, setContactNo] = React.useState('');
  const [currentDateTime, setCurrentDateTime] = useState('');

  useEffect(() => {
    BackHandler.addEventListener('hardwareBackPress', backAction);
    return () => {
      BackHandler.removeEventListener('hardwareBackPress', backAction);
    };
  }, []);

  const backAction = () => {
    navigation.navigate('Notifications');
  };

  const showoutletList = useSelector(state => state.myReducers.shopInfo);
  useEffect(() => {
    // Fetch shop data when the component mounts
    dispatch(fetchShopData());
    console.log('Fetch dispatched');
  }, [dispatch]);

  const dispatch = useDispatch();
  const employeeData = useSelector(state => state.myReducers.employeeInfo);

  useEffect(() => {
    // Fetch admin data when the component mounts
    dispatch(fetchEmployeeDataById());
    console.log('Fetch dispatched');
  }, [dispatch]);

  useEffect(() => {
    const updateDateTime = () => {
      const date = new Date();
      const formattedDateTime = date.toLocaleString('en-GB', {
        weekday: 'long',
        day: 'numeric',
        month: 'long',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
      });
      setCurrentDateTime(formattedDateTime);
    };

    updateDateTime();
    const intervalId = setInterval(updateDateTime, 1000); // Update every second

    return () => clearInterval(intervalId); // Cleanup interval on component unmount
  }, []);

  const data = [
    {key: '1', value: 'shop 1'},
    {key: '2', value: 'shop 2'},
    {key: '3', value: 'shop 3'},
    {key: '4', value: 'shop 4'},
    {key: '5', value: 'shop 5'},
  ];
  return (
    <View style={styles.container}>
      <View style={styles.body}>
        <View
          style={{
            ...styles.inputContainer,
            justifyContent: 'space-between',
          }}>
          <Text style={styles.header}>{employeeData.userName}</Text>
          <TouchableOpacity
            onPress={async () => {
              await AsyncStorage.removeItem('employeeId');
              navigation.navigate('LoginScreen');
            }}
            style={{
              ...styles.button,
              backgroundColor: Colors.white,
              width: '25%',
              height: 30,
              marginRight: 20,
            }}>
            <Text
              style={{
                ...styles.buttonText,
                color: Colors.black,
                marginRight: 0,
              }}>
              Log out
            </Text>
          </TouchableOpacity>
        </View>
        <View style={styles.detailsBody}>
          <Text style={{...styles.head, marginBottom: 10, fontSize: 20}}>
            Overview
          </Text>
          <View style={styles.detailsBody2}>
            <View
              style={{
                ...styles.inputContainer,
                justifyContent: 'space-between',
              }}>
              <Text style={{...styles.head, marginBottom: 10, fontSize: 15}}>
                {currentDateTime}
              </Text>
              <Text
                style={{
                  ...styles.head,
                  marginBottom: 10,
                  fontSize: 15,
                  color: isEnabled ? Colors.darkred : Colors.green,
                }}>
                {isEnabled ? 'Inactive' : 'Active'}
              </Text>
            </View>
            <Dropdown
              style={styles.dropdown}
              placeholderStyle={styles.placeholderStyle}
              selectedTextStyle={styles.selectedTextStyle}
              data={showoutletList}
              maxHeight={300}
              labelField="name"
              containerStyle={{marginTop: 8, borderRadius: 10}}
              itemContainerStyle={styles.label}
              itemTextStyle={styles.itemTextStyle}
              valueField="name"
              placeholder={'Select shop'}
              value={value}
              onChange={item => {
                setValue(item.name);
              }}
            />
            <TouchableOpacity
              onPress={() => {
                setIsEnabled(previousState => !previousState);
              }}
              style={[
                styles.button,
                isEnabled ? styles.activeButtonred : styles.activeButtongreen,
              ]}>
              {isEnabled ? (
                <View style={styles.buttonView}>
                  <Text style={styles.buttonText}>Clock-Out</Text>
                  <Entypo name="log-out" size={25} color={Colors.white} />
                </View>
              ) : (
                <View style={styles.buttonView}>
                  <Text style={styles.buttonText}>Clock-In</Text>
                  <Entypo name="login" size={25} color={Colors.white} />
                </View>
              )}
            </TouchableOpacity>
          </View>
          <Text style={{...styles.head, marginBottom: 10, fontSize: 20}}>
            Last Working Details
          </Text>
          <View style={styles.detailsBody2}>
            <Text style={{...styles.head, marginBottom: 10}}>
              Shop Name: London
            </Text>
            <Text style={{...styles.head, marginBottom: 10}}>
              Login: 12.00 2024-10-12
            </Text>
            <Text style={{...styles.head}}>Logout: 18.00 2024-10-12</Text>
          </View>
        </View>
      </View>
      <ProgressOverlay visible={isLoading} message={'Loading...'} />
    </View>
  );
}
