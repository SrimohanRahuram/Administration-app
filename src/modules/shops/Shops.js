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
} from 'react-native';
import styles from './Shops.Styles';
import Colors from '../../constants/Colors';
import Images from '../../constants/images';
import ProgressOverlay from '../../components/ProgressOverlay';
import ToastAlert from '../../components/ToastAlert';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import AntDesign from 'react-native-vector-icons/AntDesign';

export default function Shops({navigation}) {
  const [isLoading, setIsLoading] = useState(false);
  const [AddShopModal, setAddShopModal] = useState(false);
  const [name, setName] = React.useState('');
  const [shopId, setShopId] = React.useState('');
  const [address, setAddress] = React.useState('');
  const [contactNo, setContactNo] = React.useState('');

  const [ShopModal, setShopModal] = useState(false);
  const [EditShopModal, setEditShopModal] = useState(false);
  const [summaryModal, setSummaryModal] = useState(false);

  useEffect(() => {
    BackHandler.addEventListener('hardwareBackPress', backAction);
    return () => {
      BackHandler.removeEventListener('hardwareBackPress', backAction);
    };
  }, []);

  const backAction = () => {
    navigation.navigate('AdminHome');
  };

  const showoutletList = [
    {key: '1', value: 'shop 1'},
    {key: '2', value: 'shop 2'},
    {key: '3', value: 'shop 3'},
    {key: '4', value: 'shop 4'},
    {key: '5', value: 'shop 5'},
  ];
  const shopsummary = [
    {key: '1', id: 'shop 1', in: '24/12/2024 12.00', out: '24/12/2024 12.00'},
    {key: '2', id: 'shop 2', in: '24/12/2024 12.00', out: '24/12/2024 12.00'},
    {key: '3', id: 'shop 3', in: '24/12/2024 12.00', out: '24/12/2024 12.00'},
    {key: '4', id: 'shop 4', in: '24/12/2024 12.00', out: '24/12/2024 12.00'},
    {key: '5', id: 'shop 5', in: '24/12/2024 12.00', out: '24/12/2024 12.00'},
  ];
  return (
    <View style={styles.container}>
      <View style={styles.body}>
        <Text style={styles.header}>Shops</Text>
        <View style={styles.detailsBody}>
          <View style={styles.inputContainer}>
            <TouchableOpacity
              onPress={() => {
                backAction();
              }}>
              <AntDesign name="arrowleft" size={25} color={Colors.black} />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                setAddShopModal(true);
              }}
              style={styles.button}>
              <Text style={styles.buttonText}>Add Shops</Text>
              <MaterialIcons name="add-box" color={Colors.white} size={25} />
            </TouchableOpacity>
          </View>
          <FlatList
            data={showoutletList}
            numColumns={2}
            contentContainerStyle={{justifyContent: 'space-between'}}
            nestedScrollEnabled={true}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({item}) => (
              <TouchableOpacity
                onPress={() => {
                  setShopModal(true);
                }}
                style={styles.detailsBody2}>
                <Text style={styles.head}>{item.value}</Text>
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
              <Text style={styles.modalhead}>Shop- ID</Text>
              <View style={styles.inputView}>
                <TextInput
                  style={styles.input}
                  onChangeText={setShopId}
                  value={shopId}
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
              <AntDesign name="arrowleft" size={20} color={Colors.black} />
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
                style={{...styles.button, width: '49%'}}>
                <Text style={styles.buttonText}>Edit</Text>
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
              <Text style={styles.modalText}>Shop Name: London</Text>
              <Text style={styles.modalText}>Shop Address:</Text>
              <Text style={styles.modalText}>Shop ID:</Text>
              <Text style={styles.modalText}>Shop Contact-No:</Text>
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
              <Text style={styles.modalhead}>Shop- ID</Text>
              <View style={styles.inputView}>
                <TextInput
                  style={styles.input}
                  onChangeText={setShopId}
                  value={shopId}
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
                <TouchableOpacity style={styles.modalbutton}>
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
              <AntDesign name="arrowleft" size={20} color={Colors.black} />
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
    </View>
  );
}
