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
  SafeAreaView
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import styles from './Shops.Styles';
import Colors from '../../constants/Colors';
import Images from '../../constants/images';
import ProgressOverlay from '../../components/ProgressOverlay';
import ToastAlert from '../../components/ToastAlert';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import firestoreShopService from '../../handlers/firestoreShopService';
import {fetchShopData} from '../../service/redux/actions';
import DocumentPicker from 'react-native-document-picker';
import {addImage, clearImages} from '../../service/redux/actions';
import ReactNativeBlobUtil from 'react-native-blob-util';

export default function Shops({navigation}) {
  const dispatch = useDispatch();
  const {images} = useSelector(state => state.myReducers);
  const [isLoading, setIsLoading] = useState(false);
  const [AddShopModal, setAddShopModal] = useState(false);
  const [name, setName] = React.useState('');
  const [shopID, setShopID] = React.useState('');
  const [address, setAddress] = React.useState('');
  const [contactNo, setContactNo] = React.useState('');

  const [ShopModal, setShopModal] = useState(false);
  const [EditShopModal, setEditShopModal] = useState(false);
  const [summaryModal, setSummaryModal] = useState(false);
  const [selectedShop, setSelectedShop] = useState(null);

  const handleOnSubmit = async e => {
    e.preventDefault();
    const status = await firestoreShopService.saveShopData(
      name,
      shopID,
      address,
      contactNo,
    );
    if (status == 'Success') {
      ToastAlert.ShowToast('error', 'Alert', 'Sucessfully Shop created..');
      dispatch(fetchShopData());
      setAddShopModal(false);
    }
  };

  // Accessing shopInfo from your Redux store
  const showoutletList = useSelector(state => state.myReducers.shopInfo);

  useEffect(() => {
    // Fetch shop data when the component mounts
    dispatch(fetchShopData());
    console.log('Fetch dispatched');
  }, [dispatch]);

  // Logging the admin data to see changes
  useEffect(() => {
    console.log('shop data updated:', showoutletList);
  }, [showoutletList]);

  useEffect(() => {
    BackHandler.addEventListener('hardwareBackPress', backAction);
    return () => {
      BackHandler.removeEventListener('hardwareBackPress', backAction);
    };
  }, []);

  const backAction = () => {
    navigation.navigate('AdminHome');
  };

  useEffect(() => {
    if (selectedShop) {
      setAddress(selectedShop.address);
      setContactNo(selectedShop.contactNo);
      setName(selectedShop.name);
      setShopID(selectedShop.shopID);
    }
  }, [selectedShop]);

  const handleOnUpdate = async e => {
    e.preventDefault();

    // Define updated data as an object
    const updatedData = {
      name: name,
      address: address,
      contactNo: contactNo,
    };

    try {
      const status = await firestoreShopService.editShopData(
        shopID,
        updatedData,
      );
      if (status === 'Success') {
        ToastAlert.ShowToast('success', 'Alert', 'Successfully updated shop.');
        dispatch(fetchShopData()); // Refresh admin data
        setEditShopModal(false); // Close the modal
      }
    } catch (error) {
      ToastAlert.ShowToast('error', 'Alert', 'Failed to update shop.');
      console.error('Error updating shop:', error);
    }
  };

  const resetFields = () => {
    setAddress(''), setContactNo(''), setName(''), setShopID('');
  };

  const handleOnDelete = async e => {
    try {
      const status = await firestoreShopService.deleteShopData(shopID); // Call your delete function
      if (status === 'Success') {
        ToastAlert.ShowToast('success', 'Alert', 'Successfully deleted shop.');
        setShopModal(false);
        dispatch(fetchShopData());
      } else {
        ToastAlert.ShowToast('error', 'Alert', 'Failed to delete shop.');
      }
    } catch (error) {
      ToastAlert.ShowToast('error', 'Alert', 'Failed to delete shop.');
      console.error('Error deleting shop:', error);
    }
  };

  // const showoutletList = [
  //   {key: '1', value: 'shop 1'},
  //   {key: '2', value: 'shop 2'},
  //   {key: '3', value: 'shop 3'},
  //   {key: '4', value: 'shop 4'},
  //   {key: '5', value: 'shop 5'},
  // ];

  const shopsummary = [
    {key: '1', id: 'shop 1', in: '24/12/2024 12.00', out: '24/12/2024 12.00'},
    {key: '2', id: 'shop 2', in: '24/12/2024 12.00', out: '24/12/2024 12.00'},
    {key: '3', id: 'shop 3', in: '24/12/2024 12.00', out: '24/12/2024 12.00'},
    {key: '4', id: 'shop 4', in: '24/12/2024 12.00', out: '24/12/2024 12.00'},
    {key: '5', id: 'shop 5', in: '24/12/2024 12.00', out: '24/12/2024 12.00'},
  ];
  const handleAddShopImage = async () => {
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
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}>
          <Text style={styles.header}>Gowrisan</Text>
          <Text style={styles.header}>Shops</Text>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('LoginScreen');
            }}
            style={{
              ...styles.button,
              backgroundColor: Colors.white,
              width: '25%',
              height: 30,
              marginRight: 20,
            }}>
            <Text
              style={{
                ...styles.buttonText,
                color: Colors.black,
                marginRight: 0,
              }}>
              Log out
            </Text>
          </TouchableOpacity>
        </View>

        <View style={styles.detailsBody}>
          <View style={styles.inputContainer}>
            <TouchableOpacity
              onPress={() => {
                resetFields();
                setAddShopModal(true);
              }}
              style={styles.button}>
              <Text style={styles.buttonText}>Add Shops </Text>
              <FontAwesome name="plus" color={Colors.white} size={20} />
            </TouchableOpacity>
          </View>
          <FlatList
            data={showoutletList}
            numColumns={2}
            contentContainerStyle={{justifyContent: 'space-between'}}
            nestedScrollEnabled={true}
            keyExtractor={item => item.id}
            renderItem={({item}) => (
              <TouchableOpacity
                onPress={() => {
                  setSelectedShop(item);
                  setShopModal(true);
                }}
                style={styles.detailsBody2}>
                <Text style={styles.head}>{item.name}</Text>
              </TouchableOpacity>
            )}
          />
        </View>
      </View>
      <ProgressOverlay visible={isLoading} message={'Loading...'} />
      <Modal
        animationType="slide"
        transparent={true}
        visible={AddShopModal}
        onRequestClose={() => {
          setAddShopModal(!AddShopModal);
        }}>
        <View style={styles.body}>
          <Text style={styles.header}>Add Shop</Text>
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
              {images.length == 0 ? (
                <TouchableOpacity onPress={() => handleAddShopImage()}>
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
                  onChangeText={setName}
                  value={name}
                  placeholder="Enter Name"
                />
              </View>
              <Text style={styles.modalhead}>Shop- ID</Text>
              <View style={styles.inputView}>
                <TextInput
                  style={styles.input}
                  onChangeText={setShopID}
                  value={shopID}
                  placeholder="Enter ShopId"
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
                    dispatch(clearImages());
                    setAddShopModal(false);
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
                  <Text style={styles.buttonText} onPress={handleOnSubmit}>
                    Create
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
      </Modal>
      <Modal
        animationType="slide"
        transparent={true}
        visible={ShopModal}
        onRequestClose={() => {
          setShopModal(!ShopModal);
        }}>
        <View style={styles.body}>
          <Text style={styles.header}>Shop-1</Text>
          <View
            style={{
              ...styles.modalBody,
              borderTopLeftRadius: 10,
              borderTopRightRadius: 10,
            }}>
            <TouchableOpacity
              onPress={() => {
                setShopModal(false);
              }}>
              <FontAwesome name="arrow-left" size={20} color={Colors.black} />
            </TouchableOpacity>
            <View
              style={{
                ...styles.inputContainer,
                marginTop: 10,
              }}>
              <TouchableOpacity
                onPress={() => {
                  setEditShopModal(true);
                }}
                style={{...styles.button, width: '20%'}}>
                <Text style={styles.buttonText}>Edit</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  setSummaryModal(true);
                }}
                style={{...styles.button, width: '25%'}}>
                <Text
                  style={styles.buttonText}
                  onPress={() => {
                    handleOnDelete();
                  }}>
                  Delete
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  setSummaryModal(true);
                }}
                style={{...styles.button, width: '49%'}}>
                <Text style={styles.buttonText}>Shop Summary</Text>
              </TouchableOpacity>
            </View>
            <Text style={{...styles.modalText, fontSize: 20}}>
              Shops Details
            </Text>
            <View style={styles.modaldetailsBody2}>
              <Text style={styles.modalText}>Shop Name: {name}</Text>
              <Text style={styles.modalText}>Shop Address:{address}</Text>
              <Text style={styles.modalText}>Shop ID:{shopID}</Text>
              <Text style={styles.modalText}>Shop Contact-No:{contactNo}</Text>
            </View>

            <Text style={{...styles.modalText, fontSize: 20}}>
              Current Active Employee
            </Text>
            <View style={styles.modaldetailsBody2}>
              <Text style={styles.modalText}>Employee Name:</Text>
              <Text style={styles.modalText}>Employee ID:</Text>
              <Text style={styles.modalText}>Login time:</Text>
            </View>
          </View>
        </View>
      </Modal>
      <Modal
        animationType="slide"
        transparent={true}
        visible={EditShopModal}
        onRequestClose={() => {
          setEditShopModal(!EditShopModal);
        }}>
        <View style={styles.body}>
          <Text style={styles.header}>Edit Shop</Text>
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
                  onChangeText={setName}
                  value={name}
                  placeholder="Enter Name"
                />
              </View>
              <Text style={styles.modalhead}>Shop- ID</Text>
              <View style={styles.inputView}>
                <TextInput
                  style={styles.input}
                  onChangeText={setShopID}
                  value={shopID}
                  placeholder="Enter ShopId"
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
                    dispatch(clearImages());
                    setEditShopModal(false);
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
                  <Text style={styles.buttonText}>update</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
      </Modal>
      <Modal
        animationType="slide"
        transparent={true}
        visible={summaryModal}
        onRequestClose={() => {
          setSummaryModal(!summaryModal);
        }}>
        <View style={styles.body}>
          <Text style={styles.header}>Shop Summary</Text>
          <View
            style={{
              ...styles.modalBody,
              borderTopLeftRadius: 10,
              borderTopRightRadius: 10,
            }}>
            <TouchableOpacity
              onPress={() => {
                setSummaryModal(false);
              }}>
              <FontAwesome name="arrow-left" size={20} color={Colors.black} />
            </TouchableOpacity>
            <View
              style={{
                ...styles.modalBody,
                borderWidth: 5,
                borderColor: Colors.black,
                borderRadius: 10,
                marginTop: 10,
                padding: 0,
              }}>
              <View
                style={{
                  flexDirection: 'row',
                  borderColor: Colors.gray,
                  borderBottomWidth: 2,
                  height: 50,
                  alignItems: 'center',
                }}>
                <Text style={styles.modalhead2}> ID </Text>
                <Text style={styles.modalhead2}>Check-In</Text>
                <Text style={styles.modalhead2}>Check-Out</Text>
              </View>
              <FlatList
                data={shopsummary}
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
                    <Text style={styles.modalhead3}>{item.id}</Text>
                    <Text style={styles.modalhead3}>{item.in}</Text>
                    <Text style={styles.modalhead3}>{item.out}</Text>
                  </View>
                )}
              />
            </View>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}
