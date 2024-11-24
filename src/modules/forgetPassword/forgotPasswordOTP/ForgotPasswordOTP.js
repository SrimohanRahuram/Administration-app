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
import styles from './ForgotPasswordOTP.Styles';
import OTPInputView from '@twotalltotems/react-native-otp-input';
import Colors from '../../../constants/Colors';
import Images from '../../../constants/images';
import ProgressOverlay from '../../../components/ProgressOverlay';
import ToastAlert from '../../../components/ToastAlert';
import {useSelector} from 'react-redux';

export default function ForgotPasswordOTP({navigation}) {
  const [seconds, setSeconds] = useState(45);
  const [isLoading, setIsLoading] = useState(false);
  const {userinfo} = useSelector(state => state.myReducers);

  useEffect(() => {
    // const interval = setInterval(() => {
    //   setSeconds(prevSeconds => {
    //     if (prevSeconds > 0) {
    //       return prevSeconds - 1;
    //     } else {
    //       clearInterval(interval);
    //       return 0;
    //     }
    //   });
    // }, 1000);

    BackHandler.addEventListener('hardwareBackPress', backAction);
    return () => {
      //clearInterval(interval);
      BackHandler.removeEventListener('hardwareBackPress', backAction);
    };
  }, []);

  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;

  const backAction = () => {
    navigation.reset({
      index: 0,
      routes: [{name: 'ForgotPasswordEmail'}],
    });
    return true;
  };

  // const sendOtpValidation = async (email, otp) => {
  //   setIsLoading(true);
  //   console.log('sendOtpValidation RESPONSE :::::::: ' + email);
  //   try {
  //     const response = await otpValidation(email, otp);
  //     //console.log('sendOtpValidation RESPONSE :::::::: ' + JSON.stringify(response));

  //     if (response == 500) {
  //       setIsLoading(false);
  //       ToastAlert.ShowToast('error', 'Alert', 'Server Error!');
  //     } else if (response == 401) {
  //       setIsLoading(false);

  //       navigation.reset({
  //         index: 0,
  //         routes: [
  //           {
  //             name: 'LoginScreen',
  //           },
  //         ],
  //       });
  //     } else if (response == 422) {
  //       setIsLoading(false);
  //       ToastAlert.ShowToast('error', 'Alert', 'Incorrect OTP. Try again');
  //     } else if (response.status == 200) {
  //       setIsLoading(false);
  //       navigation.reset({
  //         index: 0,
  //         routes: [
  //           {
  //             name: 'ResetPassword',
  //           },
  //         ],
  //       });
  //     } else {
  //       setIsLoading(false);
  //       ToastAlert.ShowToast('error', 'Alert', 'Unexpected error occurred');
  //     }
  //   } catch (error) {
  //     setIsLoading(false);
  //     ToastAlert.ShowToast('error', 'Alert', 'Unexpected error occurred');
  //   } finally {
  //     setIsLoading(false);
  //   }
  // };
  return (
    <SafeAreaView style={styles.container}>
      <Image source={Images.forgotPasswordOTP} style={styles.image} />

      <View style={styles.middleView}>
        <TouchableOpacity
          onPress={() => {
            backAction();
          }}
          style={{
            flexDirection: 'row',
            alignItems: 'center',
          }}>
          <Text style={styles.mainText}>Verification</Text>
        </TouchableOpacity>

        <Text style={styles.subText}>
          Enter your 4 digits code that you received on your email.
        </Text>

        <OTPInputView
          style={{
            width: 240,
            height: 50,
            alignSelf: 'center',
            marginTop: 25,
            marginBottom: 10,
          }}
          pinCount={4}
          // onCodeChanged={code => {
          //   this.setState({code});
          // }}
          autoFocusOnLoad={false}
          codeInputFieldStyle={styles.underlineStyleBase}
          codeInputHighlightStyle={styles.underlineStyleHighLighted}
          onCodeFilled={code => {
            navigation.reset({
              index: 0,
              routes: [
                {
                  name: 'ResetPassword',
                },
              ],
            });
          }}
        />

        {/* <Text style={[styles.subText, {fontSize: 15}]}>
          {t('try_again')} {minutes}m {remainingSeconds}s
        </Text> */}
        <View style={{flexDirection: 'row', marginTop: '50%'}}>
          <Text style={styles.registerText}>
            If you didn’t receive a code!{' '}
          </Text>
          <TouchableOpacity>
            <Text style={{...styles.registerText, color: Colors.red}}>
              resend
            </Text>
          </TouchableOpacity>
        </View>
      </View>
      <ProgressOverlay visible={isLoading} message={'loading'} />
    </SafeAreaView>
  );
}
