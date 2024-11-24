import {
  Text,
  TouchableOpacity,
  View,
  Image,
  Alert,
  BackHandler,
  SafeAreaView
} from 'react-native';
import React, {useState, useEffect} from 'react';
import styles from './ResetSuccess.Styles';
import Images from '../../../constants/images';

export default function ResetSuccess({navigation}) {
  useEffect(() => {
    BackHandler.addEventListener('hardwareBackPress', backAction);
    return () => {
      BackHandler.removeEventListener('hardwareBackPress', backAction);
    };
  }, []);

  const backAction = () => {
    navigation.reset({
      index: 0,
      routes: [{name: 'ResetPassword'}],
    });
    return true;
  };

  return (
    <SafeAreaView style={styles.container}>
      <Image
        source={Images.successImage}
        style={styles.image}
        resizeMode="contain"
      />

      <View style={styles.middleView}>
        <View
          style={{
            flexDirection: 'row',
          }}>
          <Text style={styles.mainText}>Password Changed Successfully</Text>
        </View>

        <Text style={styles.subText}>Please Login again</Text>

        <TouchableOpacity
          onPress={() => {
            navigation.reset({
              index: 0,
              routes: [{name: 'LoginScreen'}],
            });
          }}
          style={styles.button}>
          <Text style={styles.buttonText}>LOGIN</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
