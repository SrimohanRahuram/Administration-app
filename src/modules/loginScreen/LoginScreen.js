import {
  Text,
  TouchableOpacity,
  View,
  Image,
  Alert,
  BackHandler,
  ImageBackground,
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

export default function LoginScreen({navigation}) {
  const dispatch = useDispatch();
  const [email, onChangeEmail] = useState(null);
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
        const email = await AsyncStorage.getItem('login_email');
        if (rememberme === 'true') {
          setRememberMe(rememberme);
          const password = await SInfo.getItem('login_password', {
            sharedPreferencesName: 'myAppPrefs',
            keychainService: 'myAppKeychain',
          });
          if (password) {
            onChangePassword(password);
            onChangeEmail(email);
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
      if (email) {
        if (password) {
          //login();
        } else {
          ToastAlert.ShowToast('error', 'Alert', 'Password is empty');
        }
      } else {
        ToastAlert.ShowToast('error', 'Alert', 'Email is empty');
      }
    } else {
      Alert.alert('Internet Connection...', t('No_internet_connection'), [
        {
          text: t('retry'),
          onPress: () =>
            navigation.reset({
              index: 0,
              routes: [{name: 'LoginScreen'}],
            }),
        },
      ]);
    }
  };
  const backAction = () => {
    Alert.alert('Alert', t('are_you_sure_you_want_to_exit'), [
      {
        text: t('no'),
        onPress: () => null,
        style: 'cancel',
      },
      {
        text: t('yes'),
        onPress: () => BackHandler.exitApp(),
      },
    ]);
    return true;
  };

  // const saveLogin = async (email, password, rememberme, accessToken) => {
  //   await AsyncStorage.setItem('login_email', email);
  //   await AsyncStorage.setItem('rememberMe', rememberme);
  //   await AsyncStorage.setItem('accessToken', accessToken);

  //   if (rememberme === 'true') {
  //     await SInfo.setItem('login_password', password, {
  //       sharedPreferencesName: 'myAppPrefs',
  //       keychainService: 'myAppKeychain',
  //     });
  //   } else {
  //     await SInfo.deleteItem('login_password', {
  //       sharedPreferencesName: 'myAppPrefs',
  //       keychainService: 'myAppKeychain',
  //     });
  //   }
  // };
  // const login = async () => {
  //   setIsLoading(true);
  //   try {
  //     const response = await SigninUser(email, password);
  //     console.log('LOGIN RESPONSE :::::::: ' + JSON.stringify(response));

  //     if (response !== 401) {
  //       if (response.data.validate === 'success') {
  //         if (response.data.http_status === 'ok') {
  //           const id = response.data.user.id;
  //           const name = response.data.user.name;
  //           const user_name = response.data.user.user_name;
  //           const role = response.data.user.user_type;
  //           const user_role_id = response.data.user.user_role_id;
  //           const registration_num = response.data.user.registration_num;
  //           const nic = response.data.user.nic;
  //           const gender = response.data.user.gender;
  //           const province = response.data.user.province;
  //           const district = response.data.user.district;
  //           const dsd = response.data.user.dsd;
  //           const gnd = response.data.user.gnd;
  //           const address = response.data.user.address;
  //           const user_image = response.data.user.user_image;
  //           const email = response.data.user.email;
  //           const created_at = response.data.user.created_at;
  //           const mobile_number = response.data.user.mobile_number;
  //           const accessToken = response.data.access_token;

  //           dispatch(
  //             addUserToRedux({
  //               email: email,
  //               name: name,
  //               id: id,
  //               address: address,
  //               created_at: created_at,
  //               registration_num: registration_num,
  //               mobile_number: mobile_number,
  //             }),
  //           );
  //           await saveLogin(email, password, '' + rememberme, accessToken);
  //           navigation.navigate('Dashboard', { screen: 'HOME' });
  //         } else {
  //           ToastAlert.ShowToast('error', 'Alert', 'Server error');
  //         }
  //       } else {
  //         ToastAlert.ShowToast(
  //           'error',
  //           'Alert',
  //           'Error : ' + response.data.validate,
  //         );
  //       }
  //     } else {
  //       ToastAlert.ShowToast('error', 'Alert', '401 (Unauthorized)');
  //     }
  //   } catch (error) {
  //     ToastAlert.ShowToast('error', 'Alert', 'Error : ' + error);
  //     console.log('error', error);
  //   } finally {
  //     setIsLoading(false);
  //   }
  // };
  return (
    <View style={styles.container}>
      <Image style={styles.image} resizeMode="center" source={Images.logo} />

      <View style={styles.card}>
        <TextInput
          style={styles.input}
          onChangeText={email => onChangeEmail(email)}
          value={email}
          label={'Email'}
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
              icon={hidePassword ? 'eye-off' : 'eye'}
              iconColor={Colors.gray}
              onPress={() => handleHidePassword()}
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
            checkedIcon="dot-circle-o"
            uncheckedIcon="circle-o"
            size={17}
          />

          <TouchableOpacity
            style={{width: '50%', alignItems: 'flex-end'}}
            onPress={() => {
              navigation.navigate('ForgotPasswordEmail');
            }}>
            <Text style={styles.text}>Forgot password?</Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity
          onPress={() => checkOnlineStatusLogin()}
          style={styles.button}>
          <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>
      </View>
      <ProgressOverlay visible={isLoading} message={'Loading'} />
    </View>
  );
}
