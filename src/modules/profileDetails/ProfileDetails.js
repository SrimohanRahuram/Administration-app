import React, {useEffect, useState} from 'react';
import {View, Text, Image, BackHandler, TouchableOpacity} from 'react-native';
import styles from './ProfileDetails.Styles';
import Colors from '../../constants/Colors';
import Images from '../../constants/images';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { useDispatch, useSelector } from 'react-redux';

export default function ProfileDetails({navigation}) {


  const employeeData = useSelector((state) => state.myReducers.employeeInfo);
  useEffect(() => {
    BackHandler.addEventListener('hardwareBackPress', backAction);
    return () => {
      BackHandler.removeEventListener('hardwareBackPress', backAction);
    };
  }, []);

  const backAction = () => {
    navigation.navigate('Home');
  };

  return (
    <View style={styles.container}>
      <View style={styles.body}>
        <Text style={styles.header}>Profile</Text>
        <View style={styles.detailsBody}>
          <View
            style={{
              ...styles.detailsBody,
              borderWidth: 5,
              borderColor: Colors.black,
              borderRadius: 10,
            }}>

            <Image source={Images.logo} style={styles.image} />

            <Text style={styles.head}>Name</Text>
            <View style={styles.details}>
              <Text style={styles.data}>{employeeData.userName}</Text>
            </View>
            <Text style={styles.head}>ID</Text>
            <View style={styles.details}>
              <Text style={styles.data}>{employeeData.ID}</Text>
            </View>
            <Text style={styles.head}>Contact-NO</Text>
            <View style={styles.details}>
              <Text style={styles.data}>
              {employeeData.contactNo}
              </Text>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
}
