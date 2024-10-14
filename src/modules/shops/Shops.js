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
import AntDesign from 'react-native-vector-icons/AntDesign';

export default function Shops({navigation}) {
  const [isLoading, setIsLoading] = useState(false);
  const [AddShopModal, setAddShopModal] = useState(false);
  const [name, setName] = React.useState('');
  const [shopId, setShopId] = React.useState('');
  const [address, setAddress] = React.useState('');
  const [contactNo, setContactNo] = React.useState('');

  useEffect(() => {
    BackHandler.addEventListener('hardwareBackPress', backAction);
    return () => {
      BackHandler.removeEventListener('hardwareBackPress', backAction);
    };
  }, []);

  const backAction = () => {
    navigation.navigate('Notifications');
  };

  const showoutletList = [
    {key: '1', value: 'shop 1'},
    {key: '2', value: 'shop 2'},
    {key: '3', value: 'shop 3'},
    {key: '4', value: 'shop 4'},
    {key: '5', value: 'shop 5'},
  ];
  return (
    <View style={styles.container}>
      <View style={styles.body}>
        <Text style={styles.header}>Shops</Text>
        <View style={styles.detailsBody}>
          <View style={styles.inputContainer}>
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
              <TouchableOpacity style={styles.detailsBody2}>
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
                  marginTop:10
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
    </View>
  );
}
