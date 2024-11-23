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
import ProfileDetails from './src/modules/profileDetails/ProfileDetails';
import Colors from './src/constants/Colors';
import Requests from './src/modules/requests/Requests';
import Home from './src/modules/home/Home';
import AdminHome from './src/modules/adminHome/AdminHome';
import Shops from './src/modules/shops/Shops';
import Admin from './src/modules/admin/Admin';
import Employees from './src/modules/employees/Employees';
import EmployeeDetails from './src/modules/employeeDetails/EmployeeDetails';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function DashboardTabs() {

  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: '#131212',
        tabBarInactiveTintColor: Colors.verylightgray,
        tabBarLabelStyle: {fontSize: 13, fontWeight: '600'},
        tabBarStyle: {height: 60},
      }}>
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          headerShown: false,
          tabBarIcon: ({focused}) => (
            <View style={focused ? styles.button : styles.button2}>
              <FontAwesome
                name="home"
                color={focused ? Colors.white : Colors.verylightgray}
                size={25}
              />
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="Requests"
        component={Requests}
        options={{
          headerShown: false,
          tabBarIcon: ({focused}) => (
            <View style={focused ? styles.button : styles.button2}>
              <FontAwesome
                name="question-circle-o"
                size={25}
                color={focused ? Colors.white : Colors.verylightgray}
              />
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileDetails}
        options={{
          headerShown: false,
          tabBarIcon: ({focused}) => (
            <View style={focused ? styles.button : styles.button2}>
              <FontAwesome
                name="user"
                size={25}
                color={focused ? Colors.white : Colors.verylightgray}
              />
            </View>
          ),
        }}
      />
    </Tab.Navigator>
  );
}
function AdminDashboardTabs() {

  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: '#131212',
        tabBarInactiveTintColor: Colors.verylightgray,
        tabBarLabelStyle: {fontSize: 13, fontWeight: '600'},
        tabBarStyle: {height: 60},
      }}>
      <Tab.Screen
        name="Shops"
        component={Shops}
        options={{
          headerShown: false,
          tabBarIcon: ({focused}) => (
            <View style={focused ? styles.button : styles.button2}>
              <FontAwesome
                name="shopping-cart"
                color={focused ? Colors.white : Colors.verylightgray}
                size={25}
              />
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="Admin"
        component={Admin}
        options={{
          headerShown: false,
          tabBarIcon: ({focused}) => (
            <View style={focused ? styles.button : styles.button2}>
              <FontAwesome
                name="pencil"
                size={25}
                color={focused ? Colors.white : Colors.verylightgray}
              />
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="Employees"
        component={Employees}
        options={{
          headerShown: false,
          tabBarIcon: ({focused}) => (
            <View style={focused ? styles.button : styles.button2}>
              <FontAwesome
                name="group"
                size={25}
                color={focused ? Colors.white : Colors.verylightgray}
              />
            </View>
          ),
        }}
      />
    </Tab.Navigator>
  );
}
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
      <Stack.Screen
        name="DashBoard"
        component={DashboardTabs}
        options={{
          headerShown: false,
        }}
      />
       <Stack.Screen
        name="AdminHome"
        component={AdminDashboardTabs}
        options={{
          headerShown: false,
        }}
      />
       <Stack.Screen
        name="Shops"
        component={Shops}
        options={{
          headerShown: false,
        }}
      />
       <Stack.Screen
        name="Admin"
        component={Admin}
        options={{
          headerShown: false,
        }}
      />
       <Stack.Screen
        name="Employees"
        component={Employees}
        options={{
          headerShown: false,
        }}
      />
       <Stack.Screen
        name="EmployeeDetails"
        component={EmployeeDetails}
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
    backgroundColor: Colors.black,
    borderRadius: 50,
    top: -15,
    height: 50,
    width: 50,
    justifyContent: 'center',
    //elevation: 5,
  },
  button2: {},
});
