import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  BackHandler,
  TextInput,
} from 'react-native';
import styles from './AdminHome.Styles';
import Colors from '../../constants/Colors';
import Images from '../../constants/images';
import ProgressOverlay from '../../components/ProgressOverlay';
import ToastAlert from '../../components/ToastAlert';
import Entypo from 'react-native-vector-icons/Entypo';

export default function AdminHome({navigation}) {
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
          <Text style={styles.header}>Gowrisan</Text>
          <TouchableOpacity
            onPress={() => {}}
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
          <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate('Shops');
              }}
              style={styles.detailsBody2}>
              <Text style={styles.head}>Shop</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.detailsBody2}>
              <Text style={styles.head}>Employee</Text>
            </TouchableOpacity>
          </View>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('Admin');
            }}
            style={{...styles.detailsBody2, alignSelf: 'center'}}>
            <Text style={styles.head}>Admin</Text>
          </TouchableOpacity>
        </View>
      </View>
      <ProgressOverlay visible={isLoading} message={'Loading...'} />
    </View>
  );
}
