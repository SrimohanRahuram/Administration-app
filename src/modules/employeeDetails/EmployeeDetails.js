import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  BackHandler,
  FlatList,
  Modal,
  Image,
  TextInput,
  ScrollView,
} from 'react-native';
import styles from './EmployeeDetails.Styles';
import Colors from '../../constants/Colors';
import Images from '../../constants/images';
import ProgressOverlay from '../../components/ProgressOverlay';
import ToastAlert from '../../components/ToastAlert';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Feather from 'react-native-vector-icons/Feather';
import AntDesign from 'react-native-vector-icons/AntDesign';

export default function EmployeeDetails({navigation}) {
  const [isLoading, setIsLoading] = useState(false);
  const [AddEmployeeModal, setAddEmployeeModal] = useState(false);
  const [name, setName] = React.useState('');
  const [Id, setId] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [code, setCode] = React.useState('');
  const [address, setAddress] = React.useState('');
  const [contactNo, setContactNo] = React.useState('');
  const [maxHours, setMaxHours] = React.useState('');
  const [hourSalary, setHourSalary] = React.useState('');
  const [maxHolidays, setmaxHolidays] = React.useState('');

  const [EditEmployeeModal, setEditEmployeeModal] = useState(false);

  const [WorkPlace, setWorkPlace] = React.useState(false);
  const [Salary, setSalary] = React.useState(false);
  const [Holidays, setHolidays] = React.useState(false);
  const [Requests, setRequests] = React.useState(false);

  useEffect(() => {
    BackHandler.addEventListener('hardwareBackPress', backAction);
    return () => {
      BackHandler.removeEventListener('hardwareBackPress', backAction);
    };
  }, []);

  const backAction = () => {
    navigation.navigate('AdminHome');
  };
  const OnPressWorkPlace = () => {
    setWorkPlace(true);
    setSalary(false);
    setHolidays(false);
    setRequests(false);
  };
  const OnPressSalary = () => {
    setWorkPlace(false);
    setSalary(true);
    setHolidays(false);
    setRequests(false);
  };
  const OnPressHolidays = () => {
    setWorkPlace(false);
    setSalary(false);
    setHolidays(true);
    setRequests(false);
  };
  const OnPressRequests = () => {
    setWorkPlace(false);
    setSalary(false);
    setHolidays(false);
    setRequests(true);
  };
  const adminDetails = [
    {key: '1', id: 'EA - 1', name: 'Gowrisan', phone: '0123456789'},
    {key: '2', id: 'EA - 2', name: 'Gowrisan', phone: '0123456789'},
    {key: '3', id: 'EA - 3', name: 'Gowrisan', phone: '0123456789'},
    {key: '4', id: 'EA - 4', name: 'Gowrisan', phone: '0123456789'},
    {key: '5', id: 'EA - 5', name: 'Gowrisan', phone: '0123456789'},
  ];
  const workplacedata = [
    {key: '1', id: 'shop 1', in: '24/12/2024 12.00', out: '24/12/2024 12.00'},
    {key: '2', id: 'shop 2', in: '24/12/2024 12.00', out: '24/12/2024 12.00'},
    {key: '3', id: 'shop 3', in: '24/12/2024 12.00', out: '24/12/2024 12.00'},
    {key: '4', id: 'shop 4', in: '24/12/2024 12.00', out: '24/12/2024 12.00'},
    {key: '5', id: 'shop 5', in: '24/12/2024 12.00', out: '24/12/2024 12.00'},
  ];
  const salarydata = [
    {key: '1', id: ' 11', in: '24/12/2024', out: '24/12/2024', salary: ' 110'},
    {key: '2', id: ' 12', in: '24/12/2024', out: '24/12/2024', salary: ' 110'},
    {key: '3', id: ' 31', in: '24/12/2024', out: '24/12/2024', salary: ' 110'},
    {key: '4', id: ' 14', in: '24/12/2024', out: '24/12/2024', salary: ' 110'},
    {key: '5', id: ' 51', in: '24/12/2024', out: '24/12/2024', salary: ' 110'},
  ];
  return (
    <View style={styles.container}>
      <View style={styles.body}>
        <Text style={styles.header}>Employee Details</Text>
        <View style={styles.detailsBody}>
          <View style={styles.inputContainer}>
            <TouchableOpacity
              onPress={() => {
                backAction();
              }}>
              <AntDesign name="arrowleft" size={25} color={Colors.black} />
            </TouchableOpacity>
            <View style={{...styles.button, backgroundColor: Colors.white}}>
              <Text
                style={{...styles.buttonText, color: Colors.black}}>
                Gowrisan-En-101
              </Text>
            </View>
            <View/>
          </View>
          <View
            style={{
              flexDirection: 'row',
              backgroundColor: Colors.white,
              alignItems: 'center',
              marginBottom: 10,
              borderRadius: 10,
              elevation: 10,
            }}>
            <TouchableOpacity
              style={[
                styles.buttoncontainer,
                WorkPlace
                  ? styles.buttoncontainercolor
                  : styles.buttoncontainercolor2,
              ]}
              onPress={() => {
                OnPressWorkPlace();
              }}>
              <Text style={styles.modalhead2}> Work Place</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.buttoncontainer,
                Salary
                  ? styles.buttoncontainercolor
                  : styles.buttoncontainercolor2,
              ]}
              onPress={() => {
                OnPressSalary();
              }}>
              <Text style={styles.modalhead2}>Salary</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.buttoncontainer,
                Holidays
                  ? styles.buttoncontainercolor
                  : styles.buttoncontainercolor2,
              ]}
              onPress={() => {
                OnPressHolidays();
              }}>
              <Text style={styles.modalhead2}>Holidays</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.buttoncontainer,
                Requests
                  ? styles.buttoncontainercolor
                  : styles.buttoncontainercolor2,
              ]}
              onPress={() => {
                OnPressRequests();
              }}>
              <Text style={styles.modalhead2}>Requests</Text>
            </TouchableOpacity>
          </View>
          {WorkPlace && (
            <View
              style={{
                ...styles.modalBody,
                borderWidth: 5,
                borderColor: Colors.black,
                borderRadius: 10,
                padding: 0,
                width: '100%',
              }}>
              <View
                style={{
                  flexDirection: 'row',
                  borderColor: Colors.gray,
                  borderBottomWidth: 2,
                  height: 50,
                  alignItems: 'center',
                  justifyContent: 'space-between',
                }}>
                <Text style={{...styles.modalhead2, width: '33%'}}>
                  Shop Name
                </Text>
                <Text style={{...styles.modalhead2, width: '33%'}}>
                  Check-In
                </Text>
                <Text style={{...styles.modalhead2, width: '33%'}}>
                  Check-Out
                </Text>
              </View>
              <FlatList
                data={workplacedata}
                nestedScrollEnabled={true}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({item}) => (
                  <View
                    style={{
                      flexDirection: 'row',
                      borderColor: Colors.white,
                      borderBottomWidth: 5,
                      backgroundColor: Colors.lightgray,
                      height: 50,
                      alignItems: 'center',
                      justifyContent: 'space-between',
                    }}>
                    <Text style={{...styles.modalhead3, width: '33%'}}>
                      {item.id}
                    </Text>
                    <Text style={{...styles.modalhead3, width: '33%'}}>
                      {item.in}
                    </Text>
                    <Text style={{...styles.modalhead3, width: '33%'}}>
                      {item.out}
                    </Text>
                  </View>
                )}
              />
            </View>
          )}
          {Salary && (
            <View
              style={{
                ...styles.modalBody,
                borderWidth: 5,
                borderColor: Colors.black,
                borderRadius: 10,
                padding: 0,
                width: '100%',
              }}>
              <View
                style={{
                  flexDirection: 'row',
                  borderColor: Colors.gray,
                  borderBottomWidth: 2,
                  height: 50,
                  alignItems: 'center',
                }}>
                <Text style={{...styles.modalhead2, width: '25%'}}>From</Text>
                <Text style={{...styles.modalhead2, width: '25%'}}>To</Text>
                <Text style={{...styles.modalhead2, width: '10%'}}>Hours</Text>
                <Text style={{...styles.modalhead2, width: '10%'}}>Salary</Text>
                <Text style={{...styles.modalhead2, width: '30%'}}>More</Text>
              </View>
              <FlatList
                data={salarydata}
                nestedScrollEnabled={true}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({item}) => (
                  <View
                    style={{
                      flexDirection: 'row',
                      borderColor: Colors.white,
                      borderBottomWidth: 5,
                      backgroundColor: Colors.lightgray,
                      height: 50,
                      alignItems: 'center',
                    }}>
                    <Text style={{...styles.modalhead3, width: '25%'}}>
                      {item.in}
                    </Text>
                    <Text style={{...styles.modalhead3, width: '25%'}}>
                      {item.out}
                    </Text>
                    <Text style={{...styles.modalhead3, width: '10%'}}>
                      {item.id}
                    </Text>
                    <Text style={{...styles.modalhead3, width: '10%'}}>
                      {item.salary}
                    </Text>

                    <TouchableOpacity
                      style={{
                        width: '29%',
                        alignItems: 'center',
                        justifyContent: 'center',
                        backgroundColor: Colors.black,
                        borderRadius: 5,
                        padding: 3,
                        paddingBottom: 5,
                      }}
                      onPress={() => {}}>
                      <Text style={{...styles.modalhead3, color: Colors.white}}>
                        View more
                      </Text>
                    </TouchableOpacity>
                  </View>
                )}
              />
            </View>
          )}
          {Holidays && (
            <>
              <View
                style={{
                  backgroundColor: Colors.rose,
                  width: '100%',
                  borderRadius: 10,
                  marginBottom: 5,
                  padding: 5,
                }}>
                <Text style={styles.modalhead2}>
                  Current Total holidays = 14 hours
                </Text>
              </View>
              <View
                style={{
                  ...styles.modalBody,
                  borderWidth: 5,
                  borderColor: Colors.black,
                  borderRadius: 10,
                  padding: 0,
                  width: '100%',
                }}>
                <View
                  style={{
                    flexDirection: 'row',
                    borderColor: Colors.gray,
                    borderBottomWidth: 2,
                    height: 50,
                    alignItems: 'center',
                    justifyContent: 'space-between',
                  }}>
                  <Text style={{...styles.modalhead2, width: '33%'}}>From</Text>
                  <Text style={{...styles.modalhead2, width: '33%'}}>To</Text>
                  <Text style={{...styles.modalhead2, width: '33%'}}>
                    Hours
                  </Text>
                </View>
                <FlatList
                  data={salarydata}
                  nestedScrollEnabled={true}
                  keyExtractor={(item, index) => index.toString()}
                  renderItem={({item}) => (
                    <View
                      style={{
                        flexDirection: 'row',
                        borderColor: Colors.white,
                        borderBottomWidth: 5,
                        backgroundColor: Colors.lightgray,
                        height: 50,
                        alignItems: 'center',
                        justifyContent: 'space-between',
                      }}>
                      <Text style={{...styles.modalhead3, width: '33%'}}>
                        {item.out}
                      </Text>
                      <Text style={{...styles.modalhead3, width: '33%'}}>
                        {item.in}
                      </Text>
                      <Text style={{...styles.modalhead3, width: '33%'}}>
                        {item.id}
                      </Text>
                    </View>
                  )}
                />
              </View>
            </>
          )}
        </View>
      </View>
      <ProgressOverlay visible={isLoading} message={'Loading...'} />
      <Modal
        animationType="slide"
        transparent={true}
        visible={AddEmployeeModal}
        onRequestClose={() => {
          setAddEmployeeModal(!AddEmployeeModal);
        }}>
        <View style={styles.body}>
          <Text style={styles.header}>Add Employee</Text>
          <View
            style={{
              ...styles.modalBody,
              borderTopLeftRadius: 10,
              borderTopRightRadius: 10,
            }}>
            <View
              style={{
                ...styles.modalBody,
                borderWidth: 5,
                borderColor: Colors.black,
                borderRadius: 10,
              }}>
              <ScrollView>
                <Image source={Images.logo} style={styles.image} />

                <Text style={styles.modalhead}>Name</Text>
                <View style={styles.inputView}>
                  <TextInput
                    style={styles.input}
                    onChangeText={setName}
                    value={name}
                    placeholder="Enter Name"
                  />
                </View>
                <Text style={styles.modalhead}>ID</Text>
                <View style={styles.inputView}>
                  <TextInput
                    style={styles.input}
                    onChangeText={setId}
                    value={Id}
                    placeholder="Enter Id"
                  />
                </View>
                <Text style={styles.modalhead}>Create password</Text>
                <View style={styles.inputView}>
                  <TextInput
                    style={styles.input}
                    onChangeText={setPassword}
                    value={password}
                    placeholder="Enter Password"
                  />
                </View>
                <Text style={styles.modalhead}>Share Code</Text>
                <View style={styles.inputView}>
                  <TextInput
                    style={styles.input}
                    onChangeText={setCode}
                    value={code}
                    placeholder="Enter Code"
                  />
                </View>
                <Text style={styles.modalhead}>Contact-No</Text>
                <View style={styles.inputView}>
                  <TextInput
                    style={styles.input}
                    onChangeText={setContactNo}
                    value={contactNo}
                    placeholder="Enter ContactNo"
                  />
                </View>
                <Text style={styles.modalhead}>Address</Text>
                <View style={styles.inputView}>
                  <TextInput
                    style={styles.input}
                    onChangeText={setAddress}
                    value={address}
                    placeholder="Enter Address"
                  />
                </View>
                <Text style={styles.modalhead}>Max hours</Text>
                <View style={styles.inputView}>
                  <TextInput
                    style={styles.input}
                    onChangeText={setMaxHours}
                    value={maxHours}
                    placeholder="Enter Max hours"
                  />
                </View>
                <Text style={styles.modalhead}>Per hour Salary $</Text>
                <View style={styles.inputView}>
                  <TextInput
                    style={styles.input}
                    onChangeText={setHourSalary}
                    value={hourSalary}
                    placeholder="Enter Salary"
                  />
                </View>
                <Text style={styles.modalhead}>Max Holidays Hours</Text>
                <View style={styles.inputView}>
                  <TextInput
                    style={styles.input}
                    onChangeText={setmaxHolidays}
                    value={maxHolidays}
                    placeholder="Enter Hours"
                  />
                </View>

                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'flex-end',
                    marginTop: 10,
                  }}>
                  <TouchableOpacity
                    onPress={() => {
                      setAddEmployeeModal(false);
                    }}
                    style={{
                      ...styles.modalbutton,
                      backgroundColor: Colors.white,
                    }}>
                    <Text style={{...styles.buttonText, color: Colors.black}}>
                      Cancel
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.modalbutton}>
                    <Text style={styles.buttonText}>Create</Text>
                  </TouchableOpacity>
                </View>
              </ScrollView>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}
