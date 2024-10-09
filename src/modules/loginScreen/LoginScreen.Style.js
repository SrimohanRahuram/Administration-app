import {StyleSheet, Dimensions} from 'react-native';
import Colors from '../../constants/Colors';
const scaledHeight = Dimensions.get('window').height;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  image: {
    alignSelf: 'center',
    height: 250,
    width: 250,
  },
  cardImage: {
    width: '100%',
    height: scaledHeight / 2,
  },
  card: {
    width: '90%',
    padding: 20,
    backgroundColor: Colors.white,
    alignSelf: 'center',
    elevation: 30,
  },
  input: {
    height: 60,
    marginTop: 20,
    width: '100%',
    overflow: 'hidden',
    alignSelf: 'center',
    borderRadius: 14,
    backgroundColor: Colors.white,
  },
  buttonContainer: {
    flexDirection: 'row',
    width: '100%',
    marginTop: 20,
    alignItems: 'center',
    //justifyContent: 'space-between',
  },
  text: {
    fontSize: 12,
    color: Colors.gray,
    fontWeight: 'bold',
  },
  button: {
    width: '95%',
    height: 50,
    backgroundColor: Colors.red,
    borderRadius: 5,
    alignSelf: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    color: Colors.white,
    textAlign: 'center',
    fontSize: 16,
    fontWeight: 'bold',
  },
  outletline: {
    backgroundColor: Colors.lightgray,
    width: '95%',
    height: 1,
    alignSelf: 'center',
    marginTop: 20,
  },
});

export default styles;
