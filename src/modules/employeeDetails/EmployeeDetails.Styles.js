import {StyleSheet, Dimensions} from 'react-native';
import Colors from '../../constants/Colors';

const stylesNew = StyleSheet.create({
  container: {
    flex: 1,
  },
  body: {
    flexDirection: 'column',
    backgroundColor: Colors.black,
    flex: 1,
  },
  header: {
    fontSize: 17,
    color: Colors.white,
    margin: 20,
    alignSelf: 'center',
    fontWeight: 'bold',
  },
  barView: {
    flexDirection: 'row',
    width: '100%',
    alignSelf: 'center',
    alignItems: 'center',
  },
  detailsBody: {
    flexDirection: 'column',
    backgroundColor: Colors.white,
    flex: 1,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    padding: 20,
    alignItems: 'center',
  },
  detailsBody2: {
    height: 120,
    borderWidth: 5,
    borderColor: Colors.black,
    borderRadius: 10,
    marginBottom: 20,
    width: '49%',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 5,
  },
  details: {
    width: '100%',
    borderColor: Colors.black,
    borderWidth: 2,
    borderRadius: 10,
    justifyContent: 'center',
    padding: 10,
    alignSelf: 'center',
    marginBottom: 10,
  },
  totalDetails: {
    backgroundColor: Colors.rose,
    padding: 3,
    borderRadius: 5,
    marginBottom: 5,
    width: '49%',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: Colors.black,
    height: 50,
    justifyContent: 'center',
  },
  inputContainer: {
    flexDirection: 'row',
    width: '100%',
    marginBottom: 10,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  image: {
    alignSelf: 'center',
    height: 150,
    width: 150,
    borderRadius: 200,
    backgroundColor: Colors.black,
  },
  head: {
    color: Colors.black,
    backgroundColor: Colors.white,
    fontWeight: '500',
    fontSize: 20,
  },
  data: {
    color: Colors.black,
    fontWeight: '500',
  },
  input: {
    height: 60,
    margin: 12,
    width: '90%',
  },
  inputView: {
    flexDirection: 'row',
    height: 50,
    width: '100%',
    borderRadius: 5,
    borderColor: Colors.black,
    borderWidth: 2,
    borderRadius: 10,
    backgroundColor: 'white',
    padding: 10,
    alignItems: 'center',
    marginBottom: 5,
  },
  button: {
    backgroundColor: Colors.black,
    borderRadius: 10,
    alignSelf: 'center',
    justifyContent: 'center',
    padding: 5,
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 20,
    paddingRight: 20,
  },
  buttonView: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  activeButtongreen: {
    backgroundColor: Colors.green,
  },
  activeButtonred: {
    backgroundColor: Colors.darkred,
  },
  buttonText: {
    color: Colors.white,
    textAlign: 'center',
    fontSize: 15,
    fontWeight: '800',
    marginRight: 5,
  },
  buttoncontainer: {
    width: '25%',
    alignItems: 'center',
    justifyContent: 'center',
    height: 40,
    borderRadius: 10,
  },
  buttoncontainercolor: {
    backgroundColor: Colors.lightgray,
  },
  buttoncontainercolor2: {
    backgroundColor: Colors.white,
  },
  ///////////////////
  modalBody: {
    flexDirection: 'column',
    backgroundColor: Colors.white,
    flex: 1,
    padding: 20,
  },
  modalhead: {
    color: Colors.black,
    backgroundColor: Colors.white,
    fontWeight: '500',
    fontSize: 12,
    marginBottom: 5,
  },
  modalbutton: {
    backgroundColor: Colors.black,
    borderRadius: 10,
    alignSelf: 'center',
    justifyContent: 'center',
    padding: 5,
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 20,
    paddingRight: 20,
    borderWidth: 2,
    borderColor: Colors.black,
    marginLeft: 10,
  },
  modaldetailsBody2: {
    padding: 20,
    borderWidth: 5,
    borderColor: Colors.black,
    borderRadius: 10,
    marginBottom: 20,
  },
  modalText: {
    color: Colors.black,
    backgroundColor: Colors.white,
    fontWeight: '500',
    fontSize: 15,
    marginBottom: 10,
  },
  modalhead2: {
    color: Colors.black,
    fontWeight: '800',
    fontSize: 17,
    textAlign: 'center',
  },
  modalhead3: {
    color: Colors.black,
    fontWeight: '500',
    fontSize: 15,
    textAlign: 'center',
  },
  requestbuttoncontiner: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.white,
    borderRadius: 5,
    padding: 3,
    paddingBottom: 5,
  },

  modalcontainer: {
    width: '92%',
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    backgroundColor: 'white',
    margin: 15,
    padding: 15,
    borderRadius: 5,
  },
  modalheaderview: {
    flexDirection: 'row',
    width: '100%',
    height: 40,
    backgroundColor: '#6666661A',
    justifyContent:'space-between',
    alignItems: 'center',
    marginBottom: 15,
    paddingLeft:15,
    paddingRight:15,
    borderRadius:5
  },
  modalheadertext: {
    fontWeight: '700',
    fontSize: 17,
    color: '#131212',
  },
  modaltextinput: {
    height: 50,
    marginBottom: 15,
    backgroundColor: 'white',
    width: '100%',
    alignSelf: 'center',
    borderWidth: 1,
    borderColor: '#D9D9D9',
    borderRadius: 5,
    fontSize: 14,
    paddingLeft:10
  },
  modalline: {
    backgroundColor: '#D9D9D9',
    width: '100%',
    height: 1,
    alignSelf: 'center',
    marginBottom: 10,
  },
  modalbuttonview: {
    width: '48%',
    height: 50,
    backgroundColor: Colors.black,
    borderRadius: 5,
    alignSelf: 'center',
    justifyContent: 'center',
  },
  modalbuttontext: {
    color: '#FFFFFF',
    textAlign: 'center',
    fontSize: 15,
    fontWeight: '600',
  },

  inputContainer2: {
    flexDirection: 'row',
    width: '100%',
    marginBottom: 10,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  button2: {
    backgroundColor: Colors.black,
    borderRadius: 10,
    alignSelf: 'center',
    justifyContent: 'center',
    padding: 5,
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 20,
    paddingRight: 20,
  },
  dropdown: {
    height: 50,
    borderRadius: 10,
    marginBottom: 10,
    //elevation: 10,
    backgroundColor: 'white',
    padding: 10,
    borderWidth: 1,
    borderColor: '#131212',
    width:'100%'
  },
  label: {
    backgroundColor: 'white',
    borderBottomWidth: 1,
    borderColor: '#CCCCCC',
    borderRadius: 10,
  },
  placeholderStyle: {
    fontSize: 13,
  },
  selectedTextStyle: {
    fontSize: 13,
    marginLeft: 10,
  },
  itemTextStyle: {
    fontSize: 13,
    color: '#131212',
  },
});

export default stylesNew;
