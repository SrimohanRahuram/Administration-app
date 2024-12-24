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
  Alert,
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
    Alert.alert('Export Reports', 'Do you want to export the reports?', [
      {
        text: 'Cancel',
        style: 'cancel',
      },
      {
        text: 'Yes',
        onPress: () => {
          LeaveRequest_generateExcel();
          WorkPlace_generateExcel();
          Salary_generateExcel();
        },
      },
    ]);
  };
  const handleExportPress2 = () => {
    Alert.alert('Export Reports', 'Do you want to export the reports?', [
      {
        text: 'Cancel',
        style: 'cancel',
      },
      {
        text: 'Yes',
        onPress: () => {
          AdvanceRequest_generateExcel();
          HolidayRequest_generateExcel();
        },
      },
    ]);
  };
  const AdvanceRequest_generateExcel = async () => {
    // Create a new workbook
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet('Advance_Request_Report');
    // Set title at the top
    worksheet.mergeCells('A1:F1');
    const titleCell = worksheet.getCell('A1');
    titleCell.value = 'Advance Request Report';
    titleCell.font = {bold: true, color: {argb: 'FFFFFFFF'}};
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
      'Request ID',
      'Request Advance',
      'Request Status',
      'Request Date',
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
    const now = new Date();
    const currentYear = now.getFullYear();
    const lastYear = currentYear - 1;
    const rangeStart = new Date(lastYear, 3, 1);
    const rangeEnd = new Date(currentYear, 2, 31, 23, 59, 59);
    employeeAllInfo.forEach(data => {
      if (data.AdvanceRequests && data.AdvanceRequests.length > 0) {
        data.AdvanceRequests.forEach(request => {
          const createdAtDate = new Date(request.CreatedTime.seconds * 1000);
          if (createdAtDate >= rangeStart && createdAtDate <= rangeEnd) {
            const requestRow = worksheet.addRow([
              data.id,
              data.userName,
              request.id,
              request.advance,
              request.status,
              new Date(request.requestTime.seconds * 1000).toLocaleString(),
            ]);
            requestRow.eachCell({includeEmpty: true}, cell => {
              cell.alignment = {horizontal: 'right', vertical: 'middle'};
              cell.border = {
                top: {style: 'thin'},
                left: {style: 'thin'},
                bottom: {style: 'thin'},
                right: {style: 'thin'},
              };
            });
          }
        });
      } else {
        // Add a placeholder row if no AdvanceRequests
        const noRequestRow = worksheet.addRow([
          data.id,
          data.userName,
          '',
          '',
          '',
          '',
        ]);
        noRequestRow.eachCell({includeEmpty: true}, cell => {
          cell.alignment = {horizontal: 'right', vertical: 'middle'};
          cell.border = {
            top: {style: 'thin'},
            left: {style: 'thin'},
            bottom: {style: 'thin'},
            right: {style: 'thin'},
          };
        });
      }
    });

    // Add the current date at the bottom of the sheet
    const currentDate = new Date().toISOString().split('T')[0]; // Get current date in YYYY-MM-DD format
    const dateRow = worksheet.addRow([`Report Generated on: ${currentDate}`]);
    // Merge the date row cells across the entire width and style it
    worksheet.mergeCells(`A${dateRow.number}:F${dateRow.number}`);
    dateRow.getCell(1).alignment = {horizontal: 'right', vertical: 'middle'};
    dateRow.getCell(1).font = {italic: true};

    // Set column widths for better visibility
    worksheet.columns = [
      {key: 'agent_name', width: 30},
      {key: 'agent_id', width: 30},
      {key: 'request_id', width: 30},
      {key: 'request_advance', width: 30},
      {key: 'request_status', width: 30},
      {key: 'request_date', width: 30},
    ];
    // Generate a unique file name with a timestamp and download
    const timestamp = new Date().toISOString().replace(/[-T:.Z]/g, ''); // Format timestamp as YYYYMMDD_HHmmss
    const fileName = `AdvanceRequestReport_${timestamp}.xlsx`;
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
  const HolidayRequest_generateExcel = async () => {
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet('Holiday_Request_Report');
    worksheet.mergeCells('A1:G1');
    const titleCell = worksheet.getCell('A1');
    titleCell.value = 'Holiday Request Report';
    titleCell.font = {bold: true, color: {argb: 'FFFFFFFF'}};
    titleCell.alignment = {horizontal: 'center', vertical: 'middle'};
    titleCell.fill = {
      type: 'pattern',
      pattern: 'solid',
      fgColor: {argb: '4BACC6'},
    };
    const headers = [
      'Agent ID',
      'Agent Name',
      'Holiday ID',
      'Holiday Status',
      'Holiday From',
      'Holiday To',
      'Holiday Hours',
    ];
    const headerRow = worksheet.addRow(headers);
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
    const now = new Date();
    const currentYear = now.getFullYear();
    const lastYear = currentYear - 1;
    const rangeStart = new Date(lastYear, 3, 1);
    const rangeEnd = new Date(currentYear, 2, 31, 23, 59, 59);
    employeeAllInfo.forEach(data => {
      if (data.HolidayRequests && data.HolidayRequests.length > 0) {
        data.HolidayRequests.forEach(request => {
          const createdAtDate = new Date(request.CreatedTime.seconds * 1000);
          if (createdAtDate >= rangeStart && createdAtDate <= rangeEnd) {
            const requestRow = worksheet.addRow([
              data.id,
              data.userName,
              request.id,
              request.status,
              new Date(request.from.seconds * 1000).toLocaleString(),
              new Date(request.To.seconds * 1000).toLocaleString(),
              request.Hours,
            ]);
            requestRow.eachCell({includeEmpty: true}, cell => {
              cell.alignment = {horizontal: 'right', vertical: 'middle'};
              cell.border = {
                top: {style: 'thin'},
                left: {style: 'thin'},
                bottom: {style: 'thin'},
                right: {style: 'thin'},
              };
            });
          }
        });
      } else {
        const noRequestRow = worksheet.addRow([
          data.id,
          data.userName,
          '',
          '',
          '',
          '',
          '',
        ]);
        noRequestRow.eachCell({includeEmpty: true}, cell => {
          cell.alignment = {horizontal: 'right', vertical: 'middle'};
          cell.border = {
            top: {style: 'thin'},
            left: {style: 'thin'},
            bottom: {style: 'thin'},
            right: {style: 'thin'},
          };
        });
      }
    });

    const currentDate = new Date().toISOString().split('T')[0];
    const dateRow = worksheet.addRow([`Report Generated on: ${currentDate}`]);
    worksheet.mergeCells(`A${dateRow.number}:G${dateRow.number}`);
    dateRow.getCell(1).alignment = {horizontal: 'right', vertical: 'middle'};
    dateRow.getCell(1).font = {italic: true};

    worksheet.columns = [
      {key: 'agent_name', width: 30},
      {key: 'agent_id', width: 30},
      {key: 'request_id', width: 30},
      {key: 'request_status', width: 30},
      {key: 'request_to', width: 30},
      {key: 'request_from', width: 30},
      {key: 'request_hours', width: 30},
    ];
    const timestamp = new Date().toISOString().replace(/[-T:.Z]/g, '');
    const fileName = `HolidayRequestReport_${timestamp}.xlsx`;
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
  const LeaveRequest_generateExcel = async () => {
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet('Leave_Request_Report');
    worksheet.mergeCells('A1:F1');
    const titleCell = worksheet.getCell('A1');
    titleCell.value = 'Leave Request Report';
    titleCell.font = {bold: true, color: {argb: 'FFFFFFFF'}};
    titleCell.alignment = {horizontal: 'center', vertical: 'middle'};
    titleCell.fill = {
      type: 'pattern',
      pattern: 'solid',
      fgColor: {argb: '4BACC6'},
    };
    const headers = [
      'Agent ID',
      'Agent Name',
      'Leave ID',
      'Leave Status',
      'Leave From',
      'Leave To',
    ];
    const headerRow = worksheet.addRow(headers);
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
    const now = new Date();
    const currentMonth = now.getMonth();
    const currentYear = now.getFullYear();
    const lastMonth = currentMonth === 0 ? 11 : currentMonth - 1;
    const lastMonthYear = currentMonth === 0 ? currentYear - 1 : currentYear;
    employeeAllInfo.forEach(data => {
      if (data.LeaveRequests && data.LeaveRequests.length > 0) {
        data.LeaveRequests.forEach(request => {
          const createdAtDate = new Date(request.CreatedTime.seconds * 1000);
          const createdMonth = createdAtDate.getMonth();
          const createdYear = createdAtDate.getFullYear();
          if (
            (createdMonth === currentMonth && createdYear === currentYear) ||
            (createdMonth === lastMonth && createdYear === lastMonthYear)
          ) {
            //none
          } else {
            const requestRow = worksheet.addRow([
              data.id,
              data.userName,
              request.id,
              request.status,
              new Date(request.from.seconds * 1000).toLocaleString(),
              new Date(request.To.seconds * 1000).toLocaleString(),
            ]);
            requestRow.eachCell({includeEmpty: true}, cell => {
              cell.alignment = {horizontal: 'right', vertical: 'middle'};
              cell.border = {
                top: {style: 'thin'},
                left: {style: 'thin'},
                bottom: {style: 'thin'},
                right: {style: 'thin'},
              };
            });
          }
        });
      } else {
        const noRequestRow = worksheet.addRow([
          data.id,
          data.userName,
          '',
          '',
          '',
          '',
        ]);
        noRequestRow.eachCell({includeEmpty: true}, cell => {
          cell.alignment = {horizontal: 'right', vertical: 'middle'};
          cell.border = {
            top: {style: 'thin'},
            left: {style: 'thin'},
            bottom: {style: 'thin'},
            right: {style: 'thin'},
          };
        });
      }
    });

    const currentDate = new Date().toISOString().split('T')[0];
    const dateRow = worksheet.addRow([`Report Generated on: ${currentDate}`]);
    worksheet.mergeCells(`A${dateRow.number}:F${dateRow.number}`);
    dateRow.getCell(1).alignment = {horizontal: 'right', vertical: 'middle'};
    dateRow.getCell(1).font = {italic: true};

    worksheet.columns = [
      {key: 'agent_name', width: 30},
      {key: 'agent_id', width: 30},
      {key: 'leave_id', width: 30},
      {key: 'leave_status', width: 30},
      {key: 'leave_to', width: 30},
      {key: 'leave_from', width: 30},
    ];
    const timestamp = new Date().toISOString().replace(/[-T:.Z]/g, '');
    const fileName = `LeaveRequestReport_${timestamp}.xlsx`;
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
  const WorkPlace_generateExcel = async () => {
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet('WorkPlace_Report');
    worksheet.mergeCells('A1:F1');
    const titleCell = worksheet.getCell('A1');
    titleCell.value = 'WorkPlace Report';
    titleCell.font = {bold: true, color: {argb: 'FFFFFFFF'}};
    titleCell.alignment = {horizontal: 'center', vertical: 'middle'};
    titleCell.fill = {
      type: 'pattern',
      pattern: 'solid',
      fgColor: {argb: '4BACC6'},
    };
    const headers = [
      'Agent ID',
      'Agent Name',
      'WorkPlace ID',
      'WorkPlace Shop Name',
      'WorkPlace From',
      'WorkPlace To',
    ];
    const headerRow = worksheet.addRow(headers);
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
    const now = new Date();
    const currentMonth = now.getMonth();
    const currentYear = now.getFullYear();
    const lastMonth = currentMonth === 0 ? 11 : currentMonth - 1;
    const lastMonthYear = currentMonth === 0 ? currentYear - 1 : currentYear;
    employeeAllInfo.forEach(data => {
      if (data.shoplogin && data.shoplogin.length > 0) {
        data.shoplogin.forEach(request => {
          const createdAtDate = new Date(request.createdAt.seconds * 1000);
          const createdMonth = createdAtDate.getMonth();
          const createdYear = createdAtDate.getFullYear();
          if (
            (createdMonth === currentMonth && createdYear === currentYear) ||
            (createdMonth === lastMonth && createdYear === lastMonthYear)
          ) {
            //none
          } else {
            const requestRow = worksheet.addRow([
              data.id,
              data.userName,
              request.id,
              request.shopName,
              request.checkInDateTime,
              request.checkOutDateTime,
            ]);
            requestRow.eachCell({includeEmpty: true}, cell => {
              cell.alignment = {horizontal: 'right', vertical: 'middle'};
              cell.border = {
                top: {style: 'thin'},
                left: {style: 'thin'},
                bottom: {style: 'thin'},
                right: {style: 'thin'},
              };
            });
          }
        });
      } else {
        const noRequestRow = worksheet.addRow([
          data.id,
          data.userName,
          '',
          '',
          '',
          '',
        ]);
        noRequestRow.eachCell({includeEmpty: true}, cell => {
          cell.alignment = {horizontal: 'right', vertical: 'middle'};
          cell.border = {
            top: {style: 'thin'},
            left: {style: 'thin'},
            bottom: {style: 'thin'},
            right: {style: 'thin'},
          };
        });
      }
    });

    const currentDate = new Date().toISOString().split('T')[0];
    const dateRow = worksheet.addRow([`Report Generated on: ${currentDate}`]);
    worksheet.mergeCells(`A${dateRow.number}:F${dateRow.number}`);
    dateRow.getCell(1).alignment = {horizontal: 'right', vertical: 'middle'};
    dateRow.getCell(1).font = {italic: true};

    worksheet.columns = [
      {key: 'agent_name', width: 30},
      {key: 'agent_id', width: 30},
      {key: 'workplace_id', width: 30},
      {key: 'workplace_shopname', width: 30},
      {key: 'workplace_to', width: 30},
      {key: 'workplace_from', width: 30},
    ];
    const timestamp = new Date().toISOString().replace(/[-T:.Z]/g, '');
    const fileName = `WorkPlaceReport_${timestamp}.xlsx`;
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
  const Salary_generateExcel = async () => {
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet('Salary_Report');
    worksheet.mergeCells('A1:F1');
    const titleCell = worksheet.getCell('A1');
    titleCell.value = 'Salary Report';
    titleCell.font = {bold: true, color: {argb: 'FFFFFFFF'}};
    titleCell.alignment = {horizontal: 'center', vertical: 'middle'};
    titleCell.fill = {
      type: 'pattern',
      pattern: 'solid',
      fgColor: {argb: '4BACC6'},
    };
    const headers = [
      'Agent ID',
      'Agent Name',
      'Salary ID',
      'Salary',
      'Salary From',
      'Salary To',
    ];
    const headerRow = worksheet.addRow(headers);
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
    const now = new Date();
    const currentMonth = now.getMonth();
    const currentYear = now.getFullYear();
    const lastMonth = currentMonth === 0 ? 11 : currentMonth - 1;
    const lastMonthYear = currentMonth === 0 ? currentYear - 1 : currentYear;
    employeeAllInfo.forEach(data => {
      if (data.shoplogin && data.shoplogin.length > 0) {
        data.shoplogin.forEach(request => {
          const createdAtDate = new Date(request.createdAt.seconds * 1000);
          const createdMonth = createdAtDate.getMonth();
          const createdYear = createdAtDate.getFullYear();
          if (
            (createdMonth === currentMonth && createdYear === currentYear) ||
            (createdMonth === lastMonth && createdYear === lastMonthYear)
          ) {
            //none
          } else {
            const requestRow = worksheet.addRow([
              data.id,
              data.userName,
              request.id,
              Number(request.hoursOfWork) * Number(data.perHourSalary),
              request.checkInDateTime,
              request.checkOutDateTime,
            ]);
            requestRow.eachCell({includeEmpty: true}, cell => {
              cell.alignment = {horizontal: 'right', vertical: 'middle'};
              cell.border = {
                top: {style: 'thin'},
                left: {style: 'thin'},
                bottom: {style: 'thin'},
                right: {style: 'thin'},
              };
            });
          }
        });
      } else {
        const noRequestRow = worksheet.addRow([
          data.id,
          data.userName,
          '',
          '',
          '',
          '',
        ]);
        noRequestRow.eachCell({includeEmpty: true}, cell => {
          cell.alignment = {horizontal: 'right', vertical: 'middle'};
          cell.border = {
            top: {style: 'thin'},
            left: {style: 'thin'},
            bottom: {style: 'thin'},
            right: {style: 'thin'},
          };
        });
      }
    });

    const currentDate = new Date().toISOString().split('T')[0];
    const dateRow = worksheet.addRow([`Report Generated on: ${currentDate}`]);
    worksheet.mergeCells(`A${dateRow.number}:F${dateRow.number}`);
    dateRow.getCell(1).alignment = {horizontal: 'right', vertical: 'middle'};
    dateRow.getCell(1).font = {italic: true};

    worksheet.columns = [
      {key: 'agent_name', width: 30},
      {key: 'agent_id', width: 30},
      {key: 'salary_id', width: 30},
      {key: 'salary', width: 30},
      {key: 'salary_to', width: 30},
      {key: 'salary_from', width: 30},
    ];
    const timestamp = new Date().toISOString().replace(/[-T:.Z]/g, '');
    const fileName = `SalaryReport_${timestamp}.xlsx`;
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
            {employeeAllInfo.length > 0 ? (
              <TouchableOpacity
                onPress={() => {
                  handleExportPress();
                }}
                style={styles.button}>
                <Text style={styles.buttonText}>Excel </Text>
                <FontAwesome
                  name="file-excel-o"
                  color={Colors.white}
                  size={13}
                />
              </TouchableOpacity>
            ) : (
              ''
            )}
            {employeeAllInfo.length > 0 ? (
              <TouchableOpacity
                onPress={() => {
                  handleExportPress2();
                }}
                style={styles.button}>
                <Text style={styles.buttonText}>Excel(Year) </Text>
                <FontAwesome
                  name="file-excel-o"
                  color={Colors.white}
                  size={13}
                />
              </TouchableOpacity>
            ) : (
              ''
            )}
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
