import {
  Text,
  TouchableOpacity,
  View,
  Image,
  Alert,
  BackHandler,
  ImageBackground,
  SafeAreaView,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import styles from './LoginScreen.Style';
import {TextInput} from 'react-native-paper';
import {CheckBox} from '@rneui/themed';
import Colors from '../../constants/Colors';
import Images from '../../constants/images';
import ToastAlert from '../../components/ToastAlert';
import {addUserToRedux} from '../../service/redux/actions';
import {useDispatch, useSelector} from 'react-redux';
import ProgressOverlay from '../../components/ProgressOverlay';
import SInfo from 'react-native-sensitive-info';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {promptForEnableLocationIfNeeded} from 'react-native-android-location-enabler';
import firestoreLoginService from '../../handlers/firestoreLoginService';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

export default function LoginScreen({navigation}) {
  const dispatch = useDispatch();
  const [username, onChangeUsername] = useState(null);
  const [password, onChangePassword] = useState(null);
  const [hidePassword, setHidePassword] = useState(true);
  const [rememberme, setRememberMe] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const {online_status} = useSelector(state => state.myReducers);

  const handleHidePassword = () => {
    setHidePassword(!hidePassword);
  };

  useEffect(() => {
    fetchRememberMeData();
    async function fetchRememberMeData() {
      try {
        AsyncStorage.removeItem('accessToken');
        const rememberme = await AsyncStorage.getItem('rememberMe');
        const username = await AsyncStorage.getItem('login_email');
        if (rememberme === 'true') {
          setRememberMe(rememberme);
          const password = await SInfo.getItem('login_password', {
            sharedPreferencesName: 'myAppPrefs',
            keychainService: 'myAppKeychain',
          });
          if (password) {
            onChangePassword(password);
            onChangeUsername(username);
          }
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }
    BackHandler.addEventListener('hardwareBackPress', backAction);
    return () => {
      BackHandler.removeEventListener('hardwareBackPress', backAction);
    };
  }, []);
  const checkOnlineStatusLogin = () => {
    if (online_status == true) {
      if (username) {
        if (password) {
          handleLogin();
        } else {
          ToastAlert.ShowToast('error', 'Alert', 'Password is empty');
        }
      } else {
        ToastAlert.ShowToast('error', 'Alert', 'Username is empty');
      }
    } else {
      Alert.alert('Internet Connection...', t('No_internet_connection'), [
        {
          text: 'retry',
          onPress: () =>
            navigation.reset({
              index: 0,
              routes: [{name: 'LoginScreen'}],
            }),
        },
      ]);
    }
  };
  const handleLogin = async () => {
    setIsLoading(true);
    const status = await firestoreLoginService.loginUser(username, password);
    if (status.successMessage == 'Admin login successful!') {
      await AsyncStorage.setItem('employeeId', status.employeeID);
      ToastAlert.ShowToast('success', 'Alert', 'Admin login successful!');
      setIsLoading(false);
      await saveLogin(username, password, '' + rememberme);
      navigation.navigate('AdminHome');
    } else if (status.successMessage == 'Employee login successful!') {
      await AsyncStorage.setItem('employeeId', status.employeeID);
      ToastAlert.ShowToast('success', 'Alert', 'Employee login successful!');
      setIsLoading(false);
      await saveLogin(username, password, '' + rememberme);
      navigation.navigate('DashBoard');
    } else {
      setIsLoading(false);
      ToastAlert.ShowToast('error', 'Alert', 'Wrong user name or password...!');
    }
  };

  const saveLogin = async (email, password, rememberme) => {
    await AsyncStorage.setItem('login_email', email);
    await AsyncStorage.setItem('rememberMe', rememberme);

    if (rememberme === 'true') {
      await SInfo.setItem('login_password', password, {
        sharedPreferencesName: 'myAppPrefs',
        keychainService: 'myAppKeychain',
      });
    } else {
      await SInfo.deleteItem('login_password', {
        sharedPreferencesName: 'myAppPrefs',
        keychainService: 'myAppKeychain',
      });
    }
  };

  const backAction = () => {
    Alert.alert('Alert', 'are_you_sure_you_want_to_exit', [
      {
        text: 'no',
        onPress: () => null,
        style: 'cancel',
      },
      {
        text: 'yes',
        onPress: () => BackHandler.exitApp(),
      },
    ]);
    return true;
  };
  return (
    <SafeAreaView style={styles.container}>
      <Image style={styles.image} resizeMode="center" source={Images.logo} />

      <View style={styles.card}>
        <TextInput
          style={styles.input}
          onChangeText={username => onChangeUsername(username)}
          value={username}
          label={'Username'}
          mode="outlined"
          autoCapitalize="none"
          theme={{
            colors: {primary: Colors.black, underlineColor: 'transparent'},
          }}
          returnKeyType="next"
        />

        <TextInput
          style={styles.input}
          onChangeText={password => onChangePassword(password)}
          value={password}
          label={'Password'}
          mode="outlined"
          autoCapitalize="none"
          secureTextEntry={hidePassword}
          right={
            <TextInput.Icon
              icon={() => (
                <FontAwesome
                  name={hidePassword ? 'eye-slash' : 'eye'}
                  size={20}
                  color={Colors.gray}
                  onPress={() => handleHidePassword()}
                />
              )}
            />
          }
          theme={{
            colors: {primary: Colors.black, underlineColor: 'transparent'},
          }}
        />

        <View style={styles.buttonContainer}>
          <CheckBox
            title={'Remember me'}
            onPress={() => setRememberMe(!rememberme)}
            containerStyle={{
              backgroundColor: 'transparent',
              borderWidth: 0,
              marginLeft: 0,
            }}
            textStyle={{color: Colors.gray, fontSize: 12}}
            checked={rememberme}
            checkedIcon={
              <FontAwesome name="dot-circle-o" size={17} color={Colors.gray} />
            }
            uncheckedIcon={
              <FontAwesome name="circle-o" size={17} color={Colors.gray} />
            }
            size={17}
          />

          {/* <TouchableOpacity
            style={{width: '50%', alignItems: 'flex-end'}}
            onPress={() => {
              navigation.navigate('ForgotPasswordusername');
            }}>
            <Text style={styles.text}>Forgot password?</Text>
          </TouchableOpacity> */}
        </View>

        <TouchableOpacity
          onPress={() => {
            checkOnlineStatusLogin();
          }}
          style={styles.button}>
          <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>
      </View>
      <ProgressOverlay visible={isLoading} message={'Loading'} />
    </SafeAreaView>
  );
}
