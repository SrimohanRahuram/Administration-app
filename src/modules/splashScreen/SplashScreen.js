import React, {useEffect} from 'react';
import {View, Image, ImageBackground} from 'react-native';
import styles from './SplashScreen.Styles';
import Images from '../../constants/images';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function SplashScreen({navigation}) {
  useEffect(() => {
    setTimeout(() => {
      navigation.navigate('LoginScreen');
    }, 3000);
  }, []);

  return (
    <ImageBackground
      source={Images.backgroundImage}
      resizeMode="stretch"
      style={styles.backgroundImage}>
      <View style={styles.container}>
        <View>
          <Image
            style={styles.image}
            resizeMode="center"
            source={Images.logo}
          />
        </View>
      </View>
    </ImageBackground>
  );
}
