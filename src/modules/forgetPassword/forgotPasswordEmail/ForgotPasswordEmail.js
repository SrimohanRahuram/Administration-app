import {
  Text,
  TouchableOpacity,
  View,
  Image,
  Alert,
  BackHandler,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import styles from './ForgotPasswordEmail.Styles';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {TextInput} from 'react-native-paper';
import Colors from '../../../constants/Colors';
import Images from '../../../constants/images';
import ProgressOverlay from '../../../components/ProgressOverlay';
import ToastAlert from '../../../components/ToastAlert';
import {useDispatch} from 'react-redux';
import {addUserToRedux} from '../../../service/redux/actions';

export default function ForgotPasswordEmail({navigation}) {
  const dispatch = useDispatch();
  const [email, onChangeEmail] = React.useState(null);
  const [progress, setProgress] = useState(10);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    BackHandler.addEventListener('hardwareBackPress', backAction);
    return () => {
      BackHandler.removeEventListener('hardwareBackPress', backAction);
    };
  }, []);

  const backAction = () => {
    navigation.reset({
      index: 0,
      routes: [{name: 'LoginScreen'}],
    });
    return true;
  };
  const emailValidate = () => {
    if (!email || email.trim().length === 0) {
      ToastAlert.ShowToast(
        'error',
        'Alert',
        t('Please enter registered email'),
      );
      return;
    }

    sendOtpRequest();
  };
  const sendOtpRequest = async () => {
    setIsLoading(true);
    try {
      const response = await requestOtp(email);
      //console.log('sendOtpRequest RESPONSE :::::::: ' + JSON.stringify(response));

      if (response == 500) {
        setIsLoading(false);
        ToastAlert.ShowToast('success', 'Alert', 'Server Error!');
      } else if (response == 401) {
        setIsLoading(false);
        navigation.reset({
          index: 0,
          routes: [
            {
              name: 'LoginScreen',
            },
          ],
        });
      } else if (response == 422) {
        setIsLoading(false);
        ToastAlert.ShowToast('error', 'Alert', 'Invalid Email');
      } else if (response.status == 200) {
        dispatch(addUserToRedux({email: email}));
        setIsLoading(false);
        ToastAlert.ShowToast('success', 'Alert', response.data.message);
        navigation.reset({
          index: 0,
          routes: [
            {
              name: 'ForgotPasswordOTP',
            },
          ],
        });
      } else {
        setIsLoading(false);
        ToastAlert.ShowToast('error', 'Alert', 'Unexpected error occurred');
      }
    } catch (error) {
      setIsLoading(false);
      ToastAlert.ShowToast('success', 'Alert', 'Server error!');
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <View style={styles.container}>
      <View style={styles.progressView}>
        <View
          style={[styles.segment, progress >= 10 && styles.segmentFilled]}
        />
        <View style={styles.separator} />
        <View
          style={[styles.segment, progress >= 20 && styles.segmentFilled]}
        />
        <View style={styles.separator} />
        <View
          style={[styles.segment, progress >= 30 && styles.segmentFilled]}
        />
        <View style={styles.separator} />
        <View
          style={[styles.segment, progress === 40 && styles.segmentFilled]}
        />
      </View>

      <Image source={Images.forgotPasswordEmail} style={styles.image} />

      <View style={styles.middleView}>
        <TouchableOpacity
          onPress={() => {
            navigation.reset({
              index: 0,
              routes: [{name: 'LoginScreen'}],
            });
          }}
          style={{
            flexDirection: 'row',
            alignItems: 'center',
          }}>
          <MaterialIcons
            name={'arrow-back-ios'}
            style={{
              color: Colors.black,
            }}
            size={17}
          />
          <Text style={styles.mainText}>enter_email</Text>
        </TouchableOpacity>

        <Text style={styles.subText}>enter_email_discription</Text>

        <TextInput
          style={styles.input}
          onChangeText={email => onChangeEmail(email)}
          value={email}
          label={'email'}
          mode="flat"
          autoCapitalize="none"
          theme={{
            colors: {primary: Colors.black, underlineColor: 'transparent'},
          }}
          returnKeyType="next"
        />

        <TouchableOpacity
          onPress={() => {
            navigation.reset({
              index: 0,
              routes: [
                {
                  name: 'ForgotPasswordOTP',
                },
              ],
            });
          }}
          style={styles.button}>
          <Text style={styles.buttonText}>send_code</Text>
        </TouchableOpacity>
      </View>
      <ProgressOverlay visible={isLoading} message={'loading'} />
    </View>
  );
}