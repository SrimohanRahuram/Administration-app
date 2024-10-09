import {
  Text,
  TouchableOpacity,
  View,
  Image,
  Alert,
  BackHandler,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import styles from './ForgotPasswordOTP.Styles';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import OTPInputView from '@twotalltotems/react-native-otp-input';
import Colors from '../../../constants/Colors';
import Images from '../../../constants/images';
import ProgressOverlay from '../../../components/ProgressOverlay';
import ToastAlert from '../../../components/ToastAlert';
import {useSelector} from 'react-redux';

export default function ForgotPasswordOTP({navigation}) {
  const [progress, setProgress] = useState(20);
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

  const sendOtpValidation = async (email, otp) => {
    setIsLoading(true);
    console.log('sendOtpValidation RESPONSE :::::::: ' + email);
    try {
      const response = await otpValidation(email, otp);
      //console.log('sendOtpValidation RESPONSE :::::::: ' + JSON.stringify(response));

      if (response == 500) {
        setIsLoading(false);
        ToastAlert.ShowToast('error', 'Alert', 'Server Error!');
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
        ToastAlert.ShowToast('error', 'Alert', 'Incorrect OTP. Try again');
      } else if (response.status == 200) {
        setIsLoading(false);
        navigation.reset({
          index: 0,
          routes: [
            {
              name: 'ResetPassword',
            },
          ],
        });
      } else {
        setIsLoading(false);
        ToastAlert.ShowToast('error', 'Alert', 'Unexpected error occurred');
      }
    } catch (error) {
      setIsLoading(false);
      ToastAlert.ShowToast('error', 'Alert', 'Unexpected error occurred');
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

      {/* <Image source={Images.forgotPasswordOTP} style={styles.image} /> */}

      <View style={styles.middleView}>
        <TouchableOpacity
          onPress={() => {
            backAction();
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
          <Text style={styles.mainText}>enter_the_otp</Text>
        </TouchableOpacity>

        <Text style={styles.subText}>enter_the_otp</Text>

        <OTPInputView
          style={{
            width: '90%',
            height: 50,
            alignSelf: 'center',
            marginTop: 25,
            marginBottom: 10,
          }}
          pinCount={6}
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
          havent_received_the_email
          </Text>
          <TouchableOpacity>
            <Text style={{...styles.registerText, color: Colors.red}}>
            resend
            </Text>
          </TouchableOpacity>
        </View>
      </View>
      <ProgressOverlay visible={isLoading} message={'loading'} />
    </View>
  );
}
