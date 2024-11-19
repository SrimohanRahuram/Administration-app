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
import styles from './ResetPassword.Styles';
import {TextInput} from 'react-native-paper';
import Colors from '../../../constants/Colors';
import Images from '../../../constants/images';
import {useSelector} from 'react-redux';
import ProgressOverlay from '../../../components/ProgressOverlay';
import ToastAlert from '../../../components/ToastAlert';

export default function ResetPassword({navigation}) {
  const [newPassword, setNewPassword] = React.useState(null);
  const [confirmNewPassword, setConfirmNewPassword] = React.useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const {userinfo} = useSelector(state => state.myReducers);
  const [hidePassword, setHidePassword] = useState(true);
  const [hideConfirmPassword, setHideConfirmPassword] = useState(true);

  const handleHidePassword = () => {
    setHidePassword(!hidePassword);
  };
  const handleHideConfirmPassword = () => {
    setHideConfirmPassword(!hideConfirmPassword);
  };
  useEffect(() => {
    BackHandler.addEventListener('hardwareBackPress', backAction);
    return () => {
      BackHandler.removeEventListener('hardwareBackPress', backAction);
    };
  }, []);

  const backAction = () => {
    navigation.reset({
      index: 0,
      routes: [{name: 'ForgotPasswordOTP'}],
    });
    return true;
  };

  const validateAndSubmit = () => {
    // Check for empty fields
    if (!newPassword || !confirmNewPassword) {
      ToastAlert.ShowToast('error', 'Alert', 'Please fill in both fields');
      return;
    }

    // Check if passwords match
    if (newPassword !== confirmNewPassword) {
      ToastAlert.ShowToast('error', 'Alert', 'Passwords do not match');
      return;
    }

    // Call API to reset password
    sendResetPasssword();
  };

  const sendResetPasssword = async () => {
    setIsLoading(true);
    try {
      const response = await resetPassword(
        userinfo.email,
        newPassword,
        confirmNewPassword,
      );
      //console.log('sendResetPasssword RESPONSE :::::::: ' + JSON.stringify(response));

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
        ToastAlert.ShowToast('error', 'Alert', 'Password');
      } else if (response.status == 200) {
        setIsLoading(false);
        navigation.reset({
          index: 0,
          routes: [
            {
              name: 'ResetSuccess',
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
    <SafeAreaView style={styles.container}>
      <Image source={Images.resetPassword} style={styles.image} />

      <View style={styles.middleView}>
        <View
          style={{
            flexDirection: 'row',
          }}>
          <Text style={styles.mainText}>New Password</Text>
        </View>

        <TextInput
          style={styles.input}
          onChangeText={newPassword => setNewPassword(newPassword)}
          value={newPassword}
          label={'New Password'}
          mode="outlined"
          autoCapitalize="none"
          theme={{
            colors: {primary: Colors.black, underlineColor: 'transparent'},
          }}
          secureTextEntry={hidePassword}
          right={
            <TextInput.Icon
              icon={hidePassword ? 'eye-off' : 'eye'}
              iconColor={Colors.gray}
              onPress={() => handleHidePassword()}
            />
          }
          returnKeyType="next"
        />

        <TextInput
          style={styles.input}
          onChangeText={confirmNewPassword =>
            setConfirmNewPassword(confirmNewPassword)
          }
          value={confirmNewPassword}
          label={'Confirm New Password'}
          mode="outlined"
          autoCapitalize="none"
          theme={{
            colors: {primary: Colors.black, underlineColor: 'transparent'},
          }}
          secureTextEntry={hideConfirmPassword}
          right={
            <TextInput.Icon
              icon={hideConfirmPassword ? 'eye-off' : 'eye'}
              iconColor={Colors.gray}
              onPress={() => handleHideConfirmPassword()}
            />
          }
          returnKeyType="next"
        />

        <TouchableOpacity
          onPress={() => {
            navigation.reset({
              index: 0,
              routes: [
                {
                  name: 'ResetSuccess',
                },
              ],
            });
          }}
          style={styles.button}>
          <Text style={styles.buttonText}>Confirm</Text>
        </TouchableOpacity>
      </View>
      <ProgressOverlay visible={isLoading} message={'loading'} />
    </SafeAreaView>
  );
}
