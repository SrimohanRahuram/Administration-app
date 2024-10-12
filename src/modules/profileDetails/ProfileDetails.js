import React, {useEffect, useState} from 'react';
import {View, Text, Image, BackHandler, TouchableOpacity} from 'react-native';
import styles from './ProfileDetails.Styles';
import Colors from '../../constants/Colors';
import Images from '../../constants/images';
import AntDesign from 'react-native-vector-icons/AntDesign';

export default function ProfileDetails({navigation}) {
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
              <Text style={styles.data}>Panadura to Colombo - 4 Route</Text>
            </View>
            <Text style={styles.head}>ID</Text>
            <View style={styles.details}>
              <Text style={styles.data}>Cargills Food City - Ward Place</Text>
            </View>
            <Text style={styles.head}>Contact-NO</Text>
            <View style={styles.details}>
              <Text style={styles.data}>
                No 22/3, 48 Ward Pl, Colombo 00700.
              </Text>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
}
