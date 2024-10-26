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
import styles from './Employees.Styles';
import Colors from '../../constants/Colors';
import Images from '../../constants/images';
import ProgressOverlay from '../../components/ProgressOverlay';
import ToastAlert from '../../components/ToastAlert';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Feather from 'react-native-vector-icons/Feather';
import AntDesign from 'react-native-vector-icons/AntDesign';
import firestoreEmployeeService from '../../handlers/firestoreEmployeeService';

export default function Employees({navigation}) {
  const [isLoading, setIsLoading] = useState(false);
  const [AddEmployeeModal, setAddEmployeeModal] = useState(false);
  const [userName, setUserName] = React.useState('');
  const [Id, setId] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [code, setCode] = React.useState('');
  const [address, setAddress] = React.useState('');
  const [contactNo, setContactNo] = React.useState('');
  const [maxHours, setMaxHours] = React.useState('');
  const [hourSalary, setHourSalary] = React.useState('');
  const [maxHolidays, setmaxHolidays] = React.useState('');

  const [EditEmployeeModal, setEditEmployeeModal] = useState(false);
  const [search, setSearch] = React.useState('');

  useEffect(() => {
    BackHandler.addEventListener('hardwareBackPress', backAction);
    return () => {
      BackHandler.removeEventListener('hardwareBackPress', backAction);
    };
  }, []);

  const backAction = () => {
    navigation.navigate('AdminHome');
  };

  const handleOnSubmit= async (e)=>{
    e.preventDefault()
   const status=await firestoreEmployeeService.saveEmployeeData(userName, Id,password,code,contactNo, address,maxHours,hourSalary,maxHolidays);
   if(status=="Success"){
    ToastAlert.ShowToast('error', 'Alert', 'Sucessfully Emoloyee created..');
    setAddEmployeeModal(false);
   }
  }

  const adminDetails = [
    {key: '1', id: 'EA - 1', name: 'Gowrisan', phone: '0123456789'},
    {key: '2', id: 'EA - 2', name: 'Gowrisan', phone: '0123456789'},
    {key: '3', id: 'EA - 3', name: 'Gowrisan', phone: '0123456789'},
    {key: '4', id: 'EA - 4', name: 'Gowrisan', phone: '0123456789'},
    {key: '5', id: 'EA - 5', name: 'Gowrisan', phone: '0123456789'},
  ];
  return (
    <View style={styles.container}>
      <View style={styles.body}>
        <Text style={styles.header}>Employees</Text>
        <View style={styles.detailsBody}>
          <View style={styles.inputContainer}>
            <TouchableOpacity
              onPress={() => {
                setAddEmployeeModal(true);
              }}
              style={styles.button}>
              <Text style={styles.buttonText}>Add Employee</Text>
              <MaterialIcons name="add-box" color={Colors.white} size={25} />
            </TouchableOpacity>
          </View>
          <View style={{...styles.inputView, borderColor: Colors.lightgray}}>
            <TextInput
              style={styles.input}
              onChangeText={setSearch}
              value={search}
              placeholder="Search"
            />
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
              }}>
              <Text style={{...styles.modalhead2, width: '10%'}}> ID </Text>
              <Text style={{...styles.modalhead2, width: '30%'}}>Name</Text>
              <Text style={{...styles.modalhead2, width: '15%'}}>Edit</Text>
              <Text style={{...styles.modalhead2, width: '15%'}}>Delete</Text>
              <Text style={{...styles.modalhead2, width: '30%'}}>More</Text>
            </View>
            <FlatList
              data={adminDetails}
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
                  <Text style={{...styles.modalhead3, width: '10%'}}>
                    {item.id}
                  </Text>
                  <Text style={{...styles.modalhead3, width: '30%'}}>
                    {item.name}
                  </Text>

                  <TouchableOpacity
                    style={{
                      width: '15%',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                    onPress={() => {
                      setEditEmployeeModal(true);
                    }}>
                    <Feather name="edit" size={25} color={Colors.black} />
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={{
                      width: '15%',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                    onPress={() => {}}>
                    <AntDesign name="delete" size={25} color={Colors.darkred} />
                  </TouchableOpacity>
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
                    onPress={() => {
                      navigation.navigate('EmployeeDetails');
                    }}>
                    <Text style={{...styles.modalhead3, color: Colors.white}}>
                      View more
                    </Text>
                  </TouchableOpacity>
                </View>
              )}
            />
          </View>
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
                    onChangeText={setUserName}
                    value={userName}
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
                  <TouchableOpacity style={styles.modalbutton} onPress={handleOnSubmit}>
                    <Text style={styles.buttonText}>Create</Text>
                  </TouchableOpacity>
                </View>
              </ScrollView>
            </View>
          </View>
        </View>
      </Modal>
      <Modal
        animationType="slide"
        transparent={true}
        visible={EditEmployeeModal}
        onRequestClose={() => {
          setEditEmployeeModal(!EditEmployeeModal);
        }}>
        <View style={styles.body}>
          <Text style={styles.header}>Edit Employee</Text>
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
                    onChangeText={setUserName}
                    value={userName}
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
                      setEditEmployeeModal(false);
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
                    <Text style={styles.buttonText}>Save</Text>
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

