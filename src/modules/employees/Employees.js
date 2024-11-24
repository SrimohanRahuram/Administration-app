import React, {useEffect, useState} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
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
  SafeAreaView
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import styles from './Employees.Styles';
import Colors from '../../constants/Colors';
import Images from '../../constants/images';
import ProgressOverlay from '../../components/ProgressOverlay';
import ToastAlert from '../../components/ToastAlert';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import firestoreEmployeeService from '../../handlers/firestoreEmployeeService';
import {fetchEmployeeData} from '../../service/redux/actions';
import DocumentPicker from 'react-native-document-picker';
import {addImage, clearImages} from '../../service/redux/actions';
import ReactNativeBlobUtil from 'react-native-blob-util';
import {addUserToRedux} from '../../service/redux/actions';

export default function Employees({navigation}) {
  const dispatch = useDispatch();
  const {images} = useSelector(state => state.myReducers);
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
  const [selectedEmployee, setSelectedEmployee] = useState(null);

  useEffect(() => {
    BackHandler.addEventListener('hardwareBackPress', backAction);
    return () => {
      BackHandler.removeEventListener('hardwareBackPress', backAction);
    };
  }, []);

  const backAction = () => {
    navigation.navigate('AdminHome');
  };

  const handleOnSubmit = async e => {
    e.preventDefault();
    const status = await firestoreEmployeeService.saveEmployeeData(
      userName,
      Id,
      password,
      code,
      contactNo,
      address,
      maxHours,
      hourSalary,
      maxHolidays,
    );
    if (status == 'Success') {
      ToastAlert.ShowToast('error', 'Alert', 'Sucessfully Emoloyee created..');
      dispatch(fetchEmployeeData());
      setAddEmployeeModal(false);
    }
  };

  // Accessing adminInfo from your Redux store
  const employeeData = useSelector(state => state.myReducers.employeeInfo);

  useEffect(() => {
    // Fetch admin data when the component mounts
    dispatch(fetchEmployeeData());
    console.log('Fetch dispatched');
  }, [dispatch]);

  // Logging the admin data to see changes
  useEffect(() => {
    console.log('employee data updated:', employeeData);
  }, [employeeData]);

  useEffect(() => {
    if (selectedEmployee) {
      setUserName(selectedEmployee.userName);
      setAddress(selectedEmployee.Address);
      setCode(selectedEmployee.shareCode);
      setHourSalary(selectedEmployee.perHourSalary);
      setId(selectedEmployee.ID);
      setMaxHours(selectedEmployee.maxHours);
      setPassword('');
      setmaxHolidays(selectedEmployee.maxHoliday);
      setContactNo(selectedEmployee.contactNo);
    }
  }, [selectedEmployee]);

  const handleOnUpdate = async e => {
    e.preventDefault();

    // Define updated data as an object
    const updatedData = {
      userName: userName,
      Address: address,
      shareCode: code,
      perHourSalary: hourSalary,
      maxHours: maxHours,
      password: password,
      maxHoliday: maxHolidays,
      contactNo: contactNo,
    };

    try {
      const status = await firestoreEmployeeService.editEmplyeeData(
        Id,
        updatedData,
      );
      if (status === 'Success') {
        ToastAlert.ShowToast(
          'success',
          'Alert',
          'Successfully updated employee.',
        );
        dispatch(fetchEmployeeData());
        setEditEmployeeModal(false);
      }
    } catch (error) {
      ToastAlert.ShowToast('error', 'Alert', 'Failed to update Employee.');
      console.error('Error updating employee:', error);
    }
  };

  const handleOnDelete = async e => {
    try {
      const status = await firestoreEmployeeService.deleteEmployeeData(Id); // Call your delete function
      if (status === 'Success') {
        ToastAlert.ShowToast(
          'success',
          'Alert',
          'Successfully deleted Employee.',
        );
        dispatch(fetchEmployeeData()); // Refresh admin data after deletion
      } else {
        ToastAlert.ShowToast('error', 'Alert', 'Failed to delete Employee.');
      }
    } catch (error) {
      ToastAlert.ShowToast('error', 'Alert', 'Failed to delete employee.');
      console.error('Error deleting employee:', error);
    }
  };

  const resetFields = () => {
    setUserName('');
    setPassword('');
    setContactNo('');
    setAddress('');
    setCode(''), setHourSalary(''), setMaxHours(''), setId('');
    setmaxHolidays('');
  };

  // const adminDetails = [
  //   {key: '1', id: 'EA - 1', name: 'Gowrisan', phone: '0123456789'},
  //   {key: '2', id: 'EA - 2', name: 'Gowrisan', phone: '0123456789'},
  //   {key: '3', id: 'EA - 3', name: 'Gowrisan', phone: '0123456789'},
  //   {key: '4', id: 'EA - 4', name: 'Gowrisan', phone: '0123456789'},
  //   {key: '5', id: 'EA - 5', name: 'Gowrisan', phone: '0123456789'},
  // ];

  const handleAddPdf = async () => {
    try {
      const response = await DocumentPicker.pick({
        type: [DocumentPicker.types.images],
      });
      dispatch(addImage(response));
    } catch (err) {
      if (DocumentPicker.isCancel(err)) {
      } else {
        throw err;
      }
    }
  };
  const convertPdfToBase64 = async image => {
    if (image) {
      try {
        const response = await ReactNativeBlobUtil.fs.readFile(
          image[0].uri,
          'base64',
        );
        return response;
      } catch (error) {
        console.error(`Error reading PDF from URI: ${image.uri}`, error);
        throw error;
      }
    } else {
      return null;
    }
  };
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.body}>
        <Text style={styles.header}>Employees</Text>
        <View style={styles.detailsBody}>
          <View style={styles.inputContainer}>
            <TouchableOpacity
              onPress={() => {
                resetFields();
                setAddEmployeeModal(true);
              }}
              style={styles.button}>
              <Text style={styles.buttonText}>Add Employee </Text>
              <FontAwesome name="plus" color={Colors.white} size={20} />
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
              data={employeeData}
              nestedScrollEnabled={true}
              keyExtractor={item => item.id}
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
                    {item.ID}
                  </Text>
                  <Text style={{...styles.modalhead3, width: '30%'}}>
                    {item.userName}
                  </Text>

                  <TouchableOpacity
                    style={{
                      width: '15%',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                    onPress={() => {
                      setSelectedEmployee(item);
                      setEditEmployeeModal(true);
                    }}>
                    <FontAwesome name="edit" size={25} color={Colors.black} />
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={{
                      width: '15%',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                    onPress={() => {
                      setSelectedEmployee(item);
                      handleOnDelete();
                    }}>
                    <FontAwesome name="trash-o" size={25} color={Colors.darkred} />
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
                    onPress  ={async () => {
                      setSelectedEmployee(item);
                      dispatch(addUserToRedux(item));

                      await AsyncStorage.setItem('employeeIdforRequest', item.ID);
                      console.log(Id);
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
        <SafeAreaView style={styles.body}>
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
                {images.length == 0 ? (
                  <TouchableOpacity onPress={() => handleAddPdf()}>
                    <Image source={Images.logo} style={styles.image} />
                  </TouchableOpacity>
                ) : null}
                {images.length > 0 ? (
                  <Image
                    resizeMode="cover"
                    source={{uri: images[0].uri}}
                    style={styles.image}
                  />
                ) : null}

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
                      dispatch(clearImages());
                    }}
                    style={{
                      ...styles.modalbutton,
                      backgroundColor: Colors.white,
                    }}>
                    <Text style={{...styles.buttonText, color: Colors.black}}>
                      Cancel
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.modalbutton}
                    onPress={handleOnSubmit}>
                    <Text style={styles.buttonText}>Create</Text>
                  </TouchableOpacity>
                </View>
              </ScrollView>
            </View>
          </View>
        </SafeAreaView>
      </Modal>
      <Modal
        animationType="slide"
        transparent={true}
        visible={EditEmployeeModal}
        onRequestClose={() => {
          setEditEmployeeModal(!EditEmployeeModal);
        }}>
        <SafeAreaView style={styles.body}>
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
                {images.length == 0 ? (
                  <TouchableOpacity onPress={() => handleAddPdf()}>
                    <Image source={Images.logo} style={styles.image} />
                  </TouchableOpacity>
                ) : null}
                {images.length > 0 ? (
                  <Image
                    resizeMode="cover"
                    source={{uri: images[0].uri}}
                    style={styles.image}
                  />
                ) : null}

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
                    editable={false}
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
                      dispatch(clearImages());
                    }}
                    style={{
                      ...styles.modalbutton,
                      backgroundColor: Colors.white,
                    }}>
                    <Text style={{...styles.buttonText, color: Colors.black}}>
                      Cancel
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.modalbutton}
                    onPress={handleOnUpdate}>
                    <Text style={styles.buttonText}>Save</Text>
                  </TouchableOpacity>
                </View>
              </ScrollView>
            </View>
          </View>
        </SafeAreaView>
      </Modal>
    </SafeAreaView>
  );
}
