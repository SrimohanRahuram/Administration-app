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
  SafeAreaView,
  Alert
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import styles from './Admin.Styles';
import Colors from '../../constants/Colors';
import Images from '../../constants/images';
import ProgressOverlay from '../../components/ProgressOverlay';
import ToastAlert from '../../components/ToastAlert';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import firestoreAdminService from '../../handlers/firestoreAdminService';
import {fetchAdminData} from '../../service/redux/actions';
import DocumentPicker from 'react-native-document-picker';
import {addImage, clearImages} from '../../service/redux/actions';
import ReactNativeBlobUtil from 'react-native-blob-util';
import {fetchEmployeesAllData} from '../../service/redux/actions';
import RNFS from 'react-native-fs';
import ExcelJS from 'exceljs';

export default function Admin({navigation}) {
  const dispatch = useDispatch();
  const {images} = useSelector(state => state.myReducers);
  const [isLoading, setIsLoading] = useState(false);
  const [AddAdminModal, setAddAdminModal] = useState(false);
  const [userName, setUserName] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [contactNo, setContactNo] = React.useState('');
  const [EditAdminModal, setEditAdminModal] = useState(false);
  const [selectedAdmin, setSelectedAdmin] = useState(null);

  // Accessing adminInfo from your Redux store
  //const adminData = useSelector(state => state.myReducers.adminInfo);
  const [search, setSearch] = React.useState('');
  const {employeeAllInfo} = useSelector(state => state.myReducers);

  const adminData = useSelector(state => state.myReducers.adminInfo) || [];
  const filteredData = Array.isArray(adminData)
    ? adminData.filter(item =>
        item.username.toLowerCase().includes(search.toLowerCase()),
      )
    : [];

  const reloadAction = () => {
    navigation.reset({
      index: 0,
      routes: [{name: 'Admin'}],
    });
  };

  useEffect(() => {
    // Fetch admin data when the component mounts
    dispatch(fetchAdminData());
    console.log('Fetch dispatched');
  }, [dispatch]);

  // Logging the admin data to see changes
  useEffect(() => {
    console.log('Admin data updated:', adminData);
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

  const handleOnSumbit = async e => {
    setIsLoading(true);
    e.preventDefault();
    const status = await firestoreAdminService.saveAdminData(
      userName,
      password,
      contactNo,
    );
    if (status == 'Success') {
      setIsLoading(false);
      ToastAlert.ShowToast('success', 'Alert', 'Sucessfully Admin created..');

      setAddAdminModal(false);
      reloadAction();
    } else {
      setIsLoading(false);
      ToastAlert.ShowToast(
        'error',
        'Alert',
        'error In  Admin creation.Try Again Later..',
      );
      dispatch(fetchAdminData());
      setAddAdminModal(false);
    }
  };

  const handleOnUpdate = async e => {
    setIsLoading(true);
    e.preventDefault();

    // Define updated data as an object
    const updatedData = {
      password: password,
      contactNo: contactNo,
    };

    try {
      const status = await firestoreAdminService.editAdminData(
        userName,
        updatedData,
      );
      if (status === 'Success') {
        setIsLoading(true);
        ToastAlert.ShowToast('success', 'Alert', 'Successfully updated admin.');
        dispatch(fetchAdminData()); // Refresh admin data
        setEditAdminModal(false);
        reloadAction(); // Close the modal
      } else {
        setIsLoading(true);
        ToastAlert.ShowToast('error', 'Alert', 'Error In updated admin.');
        dispatch(fetchAdminData()); // Refresh admin data
        setEditAdminModal(false); // Close the modal
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

  const handleOnDelete = async userName => {
    setIsLoading(true);
    try {
      const status = await firestoreAdminService.deleteAdminData(userName); // Call your delete function
      if (status === 'Success') {
        setIsLoading(false);
        ToastAlert.ShowToast(
          'success',
          'Alert',
          'Successfully deleted admin Info.',
        );
        reloadAction(); // Refresh admin data after deletion
      } else {
        setIsLoading(false);
        ToastAlert.ShowToast('error', 'Alert', 'Failed to delete admin.');
      }
    } catch (error) {
      ToastAlert.ShowToast('error', 'Alert', 'Failed to delete admin.');
      console.error('Error deleting admin:', error);
    }
  };

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
  useEffect(() => {
    // Fetch admin data when the component mounts
    dispatch(fetchEmployeesAllData());
    console.log('Fetch dispatched');
  }, [dispatch]);

  const handleExportPress = () => {
    Alert.alert(
      'Export Sales Report',
      'Do you want to export the sales report?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Yes',
          onPress: generateExcel,
        },
      ],
    );
  };
  const generateExcel = async () => {
    // Create a new workbook
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet('employeeAllInfo Report');

    // Set title at the top
    worksheet.mergeCells('A1:I1');
    const titleCell = worksheet.getCell('A1');
    titleCell.value = 'SALES REPORT';
    titleCell.font = {bold: true, size: 16, color: {argb: 'FFFFFFFF'}};
    titleCell.alignment = {horizontal: 'center', vertical: 'middle'};
    titleCell.fill = {
      type: 'pattern',
      pattern: 'solid',
      fgColor: {argb: '4BACC6'},
    };

    // Define headers
    const headers = [
      'Agent ID',
      'Agent Name',
      'Outlet ID',
      'Outlet Name',
      'Created Date',
      'Sales Amount',
      'Payment Method',
      'Paid Amount',
      'Products', // Placeholder for products
    ];

    const headerRow = worksheet.addRow(headers);

    // Style headers
    headerRow.eachCell(cell => {
      cell.font = {bold: true, color: {argb: 'FFFFFFFF'}};
      cell.alignment = {horizontal: 'center', vertical: 'middle'};
      cell.fill = {
        type: 'pattern',
        pattern: 'solid',
        fgColor: {argb: '4F81BD'},
      };
      cell.border = {
        top: {style: 'thin'},
        left: {style: 'thin'},
        bottom: {style: 'thin'},
        right: {style: 'thin'},
      };
    });

    // Add rows for each sale and handle products
    employeeAllInfo.forEach(sale => {
      // Add the main sale row first
      const mainRow = worksheet.addRow([sale.id, sale.userName]);
    
      // Style the main sale row
      mainRow.eachCell({ includeEmpty: true }, cell => {
        cell.alignment = { horizontal: 'left', vertical: 'middle' };
        cell.fill = {
          type: 'pattern',
          pattern: 'solid',
          fgColor: { argb: 'D9D9D9' }, // Light gray background color
        };
        cell.border = {
          top: { style: 'thin' },
          left: { style: 'thin' },
          bottom: { style: 'thin' },
          right: { style: 'thin' },
        };
      });
    
      // Check if there are any AdvanceRequests for the user
      if (sale.AdvanceRequests && sale.AdvanceRequests.length > 0) {
        sale.AdvanceRequests.forEach(request => {
          // Add a row for each advance request
          const requestRow = worksheet.addRow([
            '', // Leave the first column blank to align under the user's name
            '', // Leave the second column blank
            request.id,
            request.advance,
            request.status,
            new Date(request.requestTime.seconds * 1000).toLocaleString() // Convert timestamp to readable date
          ]);
    
          // Style the advance request rows
          requestRow.eachCell({ includeEmpty: true }, cell => {
            cell.alignment = { horizontal: 'left', vertical: 'middle' };
            cell.border = {
              top: { style: 'thin' },
              left: { style: 'thin' },
              bottom: { style: 'thin' },
              right: { style: 'thin' },
            };
          });
        });
      } else {
        // Add a placeholder row if no AdvanceRequests
        const noRequestRow = worksheet.addRow(['', '', 'No Advance Requests']);
        noRequestRow.eachCell({ includeEmpty: true }, cell => {
          cell.alignment = { horizontal: 'left', vertical: 'middle' };
          cell.border = {
            top: { style: 'thin' },
            left: { style: 'thin' },
            bottom: { style: 'thin' },
            right: { style: 'thin' },
          };
        });
      }
    });
    



    // Add the current date at the bottom of the sheet
    const currentDate = new Date().toISOString().split('T')[0]; // Get current date in YYYY-MM-DD format
    const dateRow = worksheet.addRow([`Report Generated on: ${currentDate}`]);

    // Merge the date row cells across the entire width and style it
    worksheet.mergeCells(`A${dateRow.number}:I${dateRow.number}`);
    dateRow.getCell(1).alignment = {horizontal: 'right', vertical: 'middle'};
    dateRow.getCell(1).font = {italic: true};

    // Set column widths for better visibility
    worksheet.columns = [
      {key: 'agent_name', width: 15},
      {key: 'agent_id', width: 15},
      {key: 'outlet_id', width: 15},
      {key: 'outlet_name', width: 25},
      {key: 'created_date', width: 20},
      {key: 'sales_amount', width: 20},
      {key: 'payment_method', width: 20},
      {key: 'paid_amount', width: 20},
      {key: 'products', width: 70}, // Wider for product descriptions
    ];

    // Generate a unique file name with a timestamp and download
    const timestamp = new Date().toISOString().replace(/[-T:.Z]/g, ''); // Format timestamp as YYYYMMDD_HHmmss
    const fileName = `employeeAllInfot_${timestamp}.xlsx`;
    const filePath = `${RNFS.DownloadDirectoryPath}/${fileName}`;
    const buffer = await workbook.xlsx.writeBuffer();
    RNFS.writeFile(filePath, buffer.toString('base64'), 'base64')
      .then(() => {
        Alert.alert(
          'Export Success',
          `Excel file has been saved at ${filePath}`,
        );
      })
      .catch(error => {
        Alert.alert('Export Failed', 'Error: ' + error.message);
      });
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.body}>
        <Text style={styles.header}>Admin</Text>
        <View style={styles.detailsBody}>
          <View
            style={{...styles.inputContainer, justifyContent: 'space-between'}}>
            <TouchableOpacity
              onPress={() => {
                handleExportPress();
              }}
              style={styles.button}>
              <Text style={styles.buttonText}>Excel </Text>
              <FontAwesome name="file-excel-o" color={Colors.white} size={13} />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => {}} style={styles.button}>
              <Text style={styles.buttonText}>Excel(Year) </Text>
              <FontAwesome name="file-excel-o" color={Colors.white} size={13} />
            </TouchableOpacity>
          </View>
          <View style={styles.inputContainer}>
            <TouchableOpacity
              onPress={() => {
                resetFields();
                setAddAdminModal(true);
              }}
              style={styles.button}>
              <Text style={styles.buttonText}>Add Admin </Text>
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
              <Text style={{...styles.modalhead2, width: '30%'}}>Name</Text>
              <Text style={{...styles.modalhead2, width: '30%'}}>
                Contact-No
              </Text>
              <Text style={{...styles.modalhead2, width: '15%'}}>Edit</Text>
              <Text style={{...styles.modalhead2, width: '15%'}}>Delete</Text>
            </View>
            <FlatList
              data={filteredData}
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
                    <FontAwesome name="edit" size={25} color={Colors.black} />
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={{
                      width: '15%',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                    onPress={() => {
                      setSelectedAdmin(item);
                      handleOnDelete(item.username);
                    }}>
                    <FontAwesome
                      name="trash-o"
                      size={25}
                      color={Colors.darkred}
                    />
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
        <SafeAreaView style={styles.body}>
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
                  onPress={handleOnSumbit}>
                  <Text style={styles.buttonText}>Create</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </SafeAreaView>
      </Modal>

      <Modal
        animationType="slide"
        transparent={true}
        visible={EditAdminModal}
        onRequestClose={() => {
          setEditAdminModal(!EditAdminModal);
        }}>
        <SafeAreaView style={styles.body}>
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
                <TouchableOpacity style={styles.modalbutton}>
                  <Text style={styles.buttonText} onPress={handleOnUpdate}>
                    Save
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </SafeAreaView>
      </Modal>
    </SafeAreaView>
  );
}
