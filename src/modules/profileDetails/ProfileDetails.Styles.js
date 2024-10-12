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
  details: {
    width: '100%',
    borderColor: Colors.black,
    borderWidth: 2,
    borderRadius: 10,
    justifyContent: 'center',
    padding: 20,
    alignSelf: 'center',
    marginBottom: 10,
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
    padding: 5,
    fontWeight: '500',
  },
  data: {
    color: Colors.black,
    fontWeight: '500',
  },
});

export default stylesNew;
