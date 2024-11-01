import React, {useEffect, useState, } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  BackHandler,
  FlatList,
  Modal,
  Image,
  TextInput,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import styles from './Admin.Styles';
import Colors from '../../constants/Colors';
import Images from '../../constants/images';
import ProgressOverlay from '../../components/ProgressOverlay';
import ToastAlert from '../../components/ToastAlert';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Feather from 'react-native-vector-icons/Feather';
import AntDesign from 'react-native-vector-icons/AntDesign';
import firestoreAdminService from '../../handlers/firestoreAdminService';
import { fetchAdminData } from '../../service/redux/actions';

export default function Admin({navigation}) {
  const [isLoading, setIsLoading] = useState(false);
  const [AddAdminModal, setAddAdminModal] = useState(false);
  const [userName, setUserName] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [contactNo, setContactNo] = React.useState('');
  const [EditAdminModal, setEditAdminModal] = useState(false);
  const [search, setSearch] = React.useState('');
  const [selectedAdmin, setSelectedAdmin] = useState(null);
  
  const dispatch = useDispatch();
  
  // Accessing adminInfo from your Redux store
  const adminData = useSelector((state) => state.myReducers.adminInfo);

  useEffect(() => {
    // Fetch admin data when the component mounts
    dispatch(fetchAdminData());
    console.log("Fetch dispatched");
  }, [dispatch]);

  // Logging the admin data to see changes
  useEffect(() => {
    console.log("Admin data updated:", adminData);
  }, [adminData]);
 
  useEffect(() => {
    
    BackHandler.addEventListener('hardwareBackPress', backAction);
   

    return () => {
      BackHandler.removeEventListener('hardwareBackPress', backAction);
    };
  }, []);


  useEffect(() => {
    if (selectedAdmin) {
      setUserName(selectedAdmin.username); // Set username from selectedAdmin
      setPassword(''); // Start with empty password for security
      setContactNo(selectedAdmin.contactNo); // Set contact number from selectedAdmin
    }
  }, [selectedAdmin]);


  const backAction = () => {
    navigation.navigate('AdminHome');
  };

  const handleOnSumbit= async (e)=>{
    e.preventDefault()
   const status=await firestoreAdminService.saveAdminData(userName,password,contactNo);
   if(status=="Success"){
    ToastAlert.ShowToast('error', 'Alert', 'Sucessfully Admin created..');
    dispatch(fetchAdminData()); 
    setAddAdminModal(false);
   }
  }

  const handleOnUpdate = async (e) => {
    e.preventDefault();
    
    // Define updated data as an object
    const updatedData = {
      password:password,
      contactNo: contactNo,
    };
  
    try {
      const status = await firestoreAdminService.editAdminData(userName, updatedData);
      if (status === "Success") {
        ToastAlert.ShowToast('success', 'Alert', 'Successfully updated admin.');
        dispatch(fetchAdminData()); // Refresh admin data
        setEditAdminModal(false);    // Close the modal
      }
    } catch (error) {
      ToastAlert.ShowToast('error', 'Alert', 'Failed to update admin.');
      console.error('Error updating admin:', error);
    }
  };

  const resetFields = () => {
    setUserName('');
    setPassword('');
    setContactNo('');
  };


  const handleOnDelete = async (e) => {
    try {console.log("iraibaa>>>"+userName);
      const status = await firestoreAdminService.deleteAdminData(userName); // Call your delete function
      if (status === "Success") {
        ToastAlert.ShowToast('success', 'Alert', 'Successfully deleted admin.');
        dispatch(fetchAdminData()); // Refresh admin data after deletion
      } else {
        ToastAlert.ShowToast('error', 'Alert', 'Failed to delete admin.');
      }
    } catch (error) {
      ToastAlert.ShowToast('error', 'Alert', 'Failed to delete admin.');
      console.error('Error deleting admin:', error);
    }
  };
  

  return (
    <View style={styles.container}>
      <View style={styles.body}>
        <Text style={styles.header}>Admin</Text>
        <View style={styles.detailsBody}>
          <View style={styles.inputContainer}>
            <TouchableOpacity
              onPress={() => {
                resetFields();
                setAddAdminModal(true);
              }}
              style={styles.button}>
              <Text style={styles.buttonText}>Add Admin</Text>
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
              <Text style={{...styles.modalhead2, width: '30%'}}>Name</Text>
              <Text style={{...styles.modalhead2, width: '30%'}}>
                Contact-No
              </Text>
              <Text style={{...styles.modalhead2, width: '15%'}}>Edit</Text>
              <Text style={{...styles.modalhead2, width: '15%'}}>Delete</Text>
            </View>
            <FlatList
               data={adminData}
              nestedScrollEnabled={true}
              keyExtractor={(item) => item.id}
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
                
                  <Text style={{...styles.modalhead3, width: '30%'}}>
                    {item.username}
                  </Text>
                  <Text style={{...styles.modalhead3, width: '30%'}}>
                    {item.contactNo}
                  </Text>
                  <TouchableOpacity
                    style={{
                      width: '15%',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                    onPress={() => {
                      setSelectedAdmin(item);
                      setEditAdminModal(true);
                    }}>
                    <Feather name="edit" size={25} color={Colors.black} />
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={{
                      width: '15%',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                    onPress={() => {
                      setSelectedAdmin(item);
                      handleOnDelete();
                    }}
                    >
                    <AntDesign name="delete" size={25} color={Colors.darkred} />
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
        visible={AddAdminModal}
        onRequestClose={() => {
          setAddAdminModal(!AddAdminModal);
        }}>
        <View style={styles.body}>
          <Text style={styles.header}>Add Admin</Text>
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
              <Image source={Images.logo} style={styles.image} />

              <Text style={styles.modalhead}>UserName</Text>
              <View style={styles.inputView}>
                <TextInput
                  style={styles.input}
                  onChangeText={setUserName}
                  value={userName}
                  placeholder="Enter Name"
                />
              </View>
              {/* <Text style={styles.modalhead}>Shop- ID</Text>
              <View style={styles.inputView}>
                <TextInput
                  style={styles.input}
                  onChangeText={setShopId}
                  value={shopId}
                  placeholder="Enter ShopId"
                />
              </View> */}
              <Text style={styles.modalhead}>Password</Text>
              <View style={styles.inputView}>
                <TextInput
                  style={styles.input}
                  onChangeText={setPassword}
                  value={password}
                  placeholder="Enter Password"
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
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'flex-end',
                  marginTop: 10,
                }}>
                <TouchableOpacity
                  onPress={() => {
                    setAddAdminModal(false);
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
                onPress={handleOnSumbit} >
                  <Text style={styles.buttonText}>Create</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
      </Modal>

      <Modal
        animationType="slide"
        transparent={true}
        visible={EditAdminModal}
        onRequestClose={() => {
          setEditAdminModal(!EditAdminModal);
        }}>
        <View style={styles.body}>
          <Text style={styles.header}>Edit Admin</Text>
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
              <Image source={Images.logo} style={styles.image} />

              <Text style={styles.modalhead}>UserName</Text>
              <View style={styles.inputView}>
                <TextInput
                  style={styles.input}
                  onChangeText={setUserName}
                  editable={false}
                  value={userName}
                  placeholder="Enter Name"
                />
              </View>
              {/* <Text style={styles.modalhead}>Shop- ID</Text>
              <View style={styles.inputView}>
                <TextInput
                  style={styles.input}
                  onChangeText={setShopId}
                  value={shopId}
                  placeholder="Enter ShopId"
                />
              </View> */}
              <Text style={styles.modalhead}>Password</Text>
              <View style={styles.inputView}>
                <TextInput
                  style={styles.input}
                  onChangeText={setPassword}
                 
                  value={password}
                  placeholder="Enter Password"
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
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'flex-end',
                  marginTop: 10,
                }}>
                <TouchableOpacity
                  onPress={() => {
                    setEditAdminModal(false);
                  }}
                  style={{
                    ...styles.modalbutton,
                    backgroundColor: Colors.white,
                  }}>
                  <Text style={{...styles.buttonText, color: Colors.black}}>
                    Cancel
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.modalbutton}
                
                >
                  <Text 
                  style={styles.buttonText}
                  
                  onPress={handleOnUpdate}
                  >Save
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}
