import React from 'react';
import {StatusBar, View, StyleSheet} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import SplashScreen from './src/modules/splashScreen/SplashScreen';
import {Provider, useSelector, useDispatch} from 'react-redux';
import Toast from 'react-native-toast-message';
import {store} from './src/service/redux/store';
import NetInfo from '@react-native-community/netinfo';
import {changeOnlineStatus} from './src/service/redux/actions';
import {startNetworkLogging} from 'react-native-network-logger';
import LoginScreen from './src/modules/loginScreen/LoginScreen';
import ForgotPasswordEmail from './src/modules/forgetPassword/forgotPasswordEmail/ForgotPasswordEmail';
import ForgotPasswordOTP from './src/modules/forgetPassword/forgotPasswordOTP/ForgotPasswordOTP';
import ResetPassword from './src/modules/forgetPassword/resetPassword/ResetPassword';
import ResetSuccess from './src/modules/forgetPassword/resetSuccess/ResetSuccess';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

// function DashboardTabs() {
//   //const {t, i18n} = useTranslation();

//   return (
//     <Tab.Navigator
//       screenOptions={{
//         tabBarActiveTintColor: '#131212',
//         tabBarInactiveTintColor: Colors.verylightgray,
//         tabBarLabelStyle: {fontSize: 13, fontWeight: '600'},
//         tabBarStyle: {height: 60},
//       }}>
//       <Tab.Screen
//         name="Home"
//         component={DashBoard}
//         options={{
//           headerShown: false,
//           tabBarIcon: ({focused}) => (
//             <View style={focused ? styles.button : styles.button2}>
//               <MaterialCommunityIcons
//                 name="home-outline"
//                 color={focused ? Colors.white : Colors.verylightgray}
//                 size={25}
//               />
//             </View>
//           ),
//         }}
//       />
//       <Tab.Screen
//         name="Itineraries"
//         component={Itineraries}
//         options={{
//           headerShown: false,
//           tabBarIcon: ({focused}) => (
//             <View style={focused ? styles.button : styles.button2}>
//               <Feather
//                 name="user-plus"
//                 color={focused ? Colors.white : Colors.verylightgray}
//                 size={25}
//               />
//             </View>
//           ),
//         }}
//       />
//       <Tab.Screen
//         name="Notifications"
//         component={Notifications}
//         options={{
//           headerShown: false,
//           tabBarIcon: ({focused}) => (
//             <View style={focused ? styles.button : styles.button2}>
//               <MaterialCommunityIcons
//                 name="bell-badge-outline"
//                 color={focused ? Colors.white : Colors.verylightgray}
//                 size={25}
//               />
//             </View>
//           ),
//         }}
//       />
//       <Tab.Screen
//         name="Profile"
//         component={Profile}
//         options={{
//           headerShown: false,
//           tabBarIcon: ({focused}) => (
//             <View style={focused ? styles.button : styles.button2}>
//               <FontAwesome
//                 name="user-circle-o"
//                 color={focused ? Colors.white : Colors.verylightgray}
//                 size={25}
//               />
//             </View>
//           ),
//         }}
//       />
//     </Tab.Navigator>
//   );
// }
function StackDrawer() {
  const dispatch = useDispatch();

  React.useEffect(() => {
    const netConnection = NetInfo.addEventListener(({isConnected}) => {
      dispatch(changeOnlineStatus(isConnected));
      console.log('changeOnlineStatus::' + isConnected);
    });
    return netConnection;
  }, []);
  return (
    <Stack.Navigator initialRouteName="SplashScreen">
      <Stack.Screen
        name="SplashScreen"
        component={SplashScreen}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="LoginScreen"
        component={LoginScreen}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="ForgotPasswordEmail"
        component={ForgotPasswordEmail}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="ForgotPasswordOTP"
        component={ForgotPasswordOTP}
        options={{
          headerShown: false,
        }}
      />

      <Stack.Screen
        name="ResetPassword"
        component={ResetPassword}
        options={{
          headerShown: false,
        }}
      />

      <Stack.Screen
        name="ResetSuccess"
        component={ResetSuccess}
        options={{
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
}

export default function App() {
  // React Native logger library
  React.useEffect(() => {
    startNetworkLogging();
  }, []);

  //LocalDBConnection.createDBConnection();
  return (
    <Provider store={store}>
      <NavigationContainer>
        <StackDrawer />
        <Toast />
      </NavigationContainer>
    </Provider>
  );
}

const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    //backgroundColor: Colors.red,
    borderRadius: 50,
    top: -15,
    height: 50,
    width: 50,
    justifyContent: 'center',
    elevation: 5,
  },
  button2: {},
});
