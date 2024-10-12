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
  },
  detailsBody2: {
    padding: 20,
    borderWidth: 5,
    borderColor: Colors.black,
    borderRadius: 10,
    marginBottom: 20,
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
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
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
    width: '68%',
    borderRadius: 5,
    borderColor: Colors.black,
    borderWidth: 2,
    borderRadius: 10,
    backgroundColor: 'white',
    padding: 10,
    alignItems: 'center',
  },
  button: {
    width: '30%',
    height: 50,
    backgroundColor: Colors.black,
    borderRadius: 10,
    alignSelf: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    color: Colors.white,
    textAlign: 'center',
    fontSize: 12,
    fontWeight: 'bold',
  },
  calendertext: {
    color: '#525050',
    fontSize: 13,
    marginLeft: 10,
    fontWeight: '500',
  },
});

export default stylesNew;
