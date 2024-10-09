import {StyleSheet} from 'react-native';
import Colors from '../../../constants/Colors';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
    justifyContent: 'center',
  },
  image: {
    alignSelf: 'center',
    width: '40%',
    height: '20%',
  },

  middleView: {
    justifyContent: 'center',
    alignItems: 'center',
  },

  mainText: {
    color: Colors.black,
    fontSize: 20,
    alignSelf: 'center',
    fontWeight: 'bold',
    textAlign:'center'
  },

  subText: {
    marginTop: 10,
    color: Colors.black,
    fontSize: 17,
    alignSelf: 'center',
    textAlign: 'center',
  },

  button: {
    marginTop: 30,
    width: '70%',
    height: '18%',
    backgroundColor: Colors.red,
    marginVertical: 10,
    borderRadius: 5,
    shadowColor: '#1F41BB',
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.3,
    shadowRadius: 10,
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
