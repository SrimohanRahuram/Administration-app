import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  BackHandler,
  TextInput,
} from 'react-native';
import styles from './Home.Styles';
import Colors from '../../constants/Colors';
import Images from '../../constants/images';
import ProgressOverlay from '../../components/ProgressOverlay';
import ToastAlert from '../../components/ToastAlert';
import Entypo from 'react-native-vector-icons/Entypo';

export default function Home({navigation}) {
  const [isLoading, setIsLoading] = useState(false);
  const [isEnabled, setIsEnabled] = useState(false);

  useEffect(() => {
    BackHandler.addEventListener('hardwareBackPress', backAction);
    return () => {
      BackHandler.removeEventListener('hardwareBackPress', backAction);
    };
  }, []);

  const backAction = () => {
    navigation.navigate('Notifications');
  };

  return (
    <View style={styles.container}>
      <View style={styles.body}>
        <View
          style={{
            ...styles.inputContainer,
            justifyContent: 'space-between',
          }}>
          <Text style={styles.header}>Home</Text>
          <TouchableOpacity
            onPress={() => {}}
            style={{
              ...styles.button,
              backgroundColor: Colors.white,
              width: '25%',
              height:30,
              marginRight:20
            }}>
            <Text style={{...styles.buttonText, color: Colors.black,marginRight:0}}>
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
                Monday 18 April 2024
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
