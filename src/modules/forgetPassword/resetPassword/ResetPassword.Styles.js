import {StyleSheet} from 'react-native';
import Colors from '../../../constants/Colors';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
  },

  progressView: {
    marginTop: 30,
    flexDirection: 'row',
    justifyContent: 'space-between',
    height: 5,
    width: '90%',
    backgroundColor: Colors.white,
    borderRadius: 5,
    overflow: 'hidden',
    alignSelf: 'center',
    marginBottom: '5%',
  },

  segment: {
    flex: 1,
    backgroundColor: Colors.gray,
  },
  segmentFilled: {
    backgroundColor: Colors.red,
  },

  separator: {
    width: 5,
  },

  image: {
    alignSelf: 'center',
    height: 250,
    width: 250,
  },

  middleView: {
    justifyContent: 'center',
    alignItems: 'center',
  },

  mainText: {
    color: Colors.black,
    fontSize: 17,
    alignSelf: 'center',
    fontWeight: 'bold',
  },

  subText: {
    marginTop: 10,
    color: Colors.black,
    fontSize: 17,
    alignSelf: 'center',
    textAlign: 'center',
    width:'80%'
  },

  input: {
    height: 60,
    marginTop: 30,
    width: '90%',
    overflow: 'hidden',
    alignSelf: 'center',
    borderRadius: 14,
    backgroundColor: Colors.white,
  },

  button: {
    marginTop: 30,
    width: '85%',
    height: '12%',
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
