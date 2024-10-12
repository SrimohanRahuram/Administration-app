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
    height: '30%',
    width: '100%',
  },

  card: {
    width: '100%',
    padding: 20,
    backgroundColor: Colors.white,
    alignSelf: 'center',
  },
  input: {
    height: 60,
    marginTop: 20,
    width: '100%',
    overflow: 'hidden',
    alignSelf: 'center',
    borderRadius: 20,
    backgroundColor: Colors.white,
    borderRadius:1,
    borderColor:Colors.black
  },
  buttonContainer: {
    flexDirection: 'row',
    width: '100%',
    marginTop: 20,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  text: {
    fontSize: 12,
    color: Colors.gray,
    fontWeight: 'bold',
  },
  button: {
    width: '100%',
    height: 50,
    backgroundColor: Colors.black,
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
});

export default styles;
